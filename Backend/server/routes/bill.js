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
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       name,
//       address,
//       phone,
//       note = '',
//       total_price,
//       status,
//       payment_type,
//       id_user,
//       id_gc = null,
//       id_pd,
//       quantity,
//       price,
//       pd_name,
//     } = req.body;

//     // Sử dụng prepared statements để tránh SQL injection
//     const sql = `INSERT INTO bill (name, address, phone, note, total_price, status, payment_type, id_user, id_gc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const values = [name, address, phone, note, total_price, status, payment_type, id_user, id_gc];
//     const result = await db.query(sql, values);
//     console.log(result);

//     if (result && 'insertId' in result) {
//       const id_bill = result.insertId;
//       console.log(id_bill);

//       // Sử dụng prepared statements cho câu lệnh SQL thứ hai
//       const sql2 = `INSERT INTO bill_detail (name, price, quantity, total_price, id_pd, id_bill) VALUES (?, ?, ?, ?, ?, ?)`;
//       const values2 = [pd_name, price, quantity, total_price, id_pd, id_bill];
//       await db.query(sql2, values2);

//       res.json({ success: "Thêm đơn hàng thành công" });
//     } else {
//       throw new Error('Không thể lấy insertId');
//     }
//   } catch (err) {
//     console.log(err);
//     if (err.code === "ER_NO_REFERENCED_ROW_2") {
//       res.status(400).json({ error: "id_user không tồn tại trong bảng user" });
//     } else {
//       res.status(500).json({ error: "Thêm đơn hàng thất bại" });
//     }
//   }
// });

//Thêm đơn hàng
router.post("/add", (req, res) => {
  var data = req.body;
  var sql = `INSERT INTO bill SET ?`;
  db.query(sql, data, (err, result) => {
      if (err) res.json({ "thongbao" : "Lỗi truy vấn CSDL", error: err.message });
      else {
          id_dh = result.insertId;
          res.json({ "thongbao" : "Đặt hàng thành công", "id_dh" : id_dh });
      }
  });
});

//Thêm chi tiết đơn hàng
router.post("/add-detail", (req, res) => {
  var data = req.body;
  var sql = `INSERT INTO bill_detail SET ?`;
  db.query(sql, data, (err, result) => {
      if (err) res.json({ "thongbao" : "Lỗi truy vấn CSDL", error: err.message });
      else res.json({ "thongbao" : "Thêm chi tiết đơn hàng thành công" });
  });
});

module.exports = router;
