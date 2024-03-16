var express = require("express");
var router = express.Router();
var db = require("../models/database");

//Lịch sử mua hàng
router.get("/list/:id", (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: "ID không hợp lệ" });
    return;
  }

  var sql = `SELECT * FROM bill where id_user = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: "Khong tim thay lich su mua hang" });
    } else {
      res.json(result);
    }
  });
});

//Chi tiết 1 đơn hàng
router.get("/detail/:id", (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: "ID không hợp lệ" });
    return;
  }

  var sql = `SELECT * FROM bill_detail where id_bill = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: "Khong tim thay chi tiet don hang" });
    } else {
      res.json(result);
    }
  });
});

//Thêm đơn hàng
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      note = null,
      total_price,
      status,
      payment_type,
      id_user,
      id_gc = null,
      id_pd,
      quantity,
      price,
      pd_name,
    } = req.body;

    const sql = `INSERT INTO bill (name, address, phone, note, total_price, status, payment_type, id_user, id_gc) VALUES ('${name}', '${address}', '${phone}', '${note}', '${total_price}', '${status}', '${payment_type}', '${id_user}', '${id_gc}')`;
    const result = await db.query(sql);

    const id_bill = result.insertId;
    const sql2 = `INSERT INTO bill_detail (name, price, quantity, total_price, id_pd, id_bill) VALUES ('${pd_name}', '${price}', '${quantity}', '${total_price}', '${id_pd}', '${id_bill}')`;
    await db.query(sql2);

    res.json({ success: "Them don hang thanh cong" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Them don hang that bai" });
  }
});

module.exports = router;
