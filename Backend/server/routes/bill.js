var express = require('express');
var router = express.Router();
var db = require('../models/database');

//Lịch sử mua hàng
router.get('/list/:id', (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
      res.json({ error: "ID không hợp lệ" });
      return;
    }
  
    var sql = `SELECT * FROM bill where id_user = '${id}'`;
    db.query(sql, (err, result) => {
      if(err) {
        res.json({ error: "Khong tim thay lich su mua hang" });
      } else {
        res.json(result);
      }
    });
  });
  
//Chi tiết 1 đơn hàng
router.get('/detail/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: "ID không hợp lệ" });
    return;
  }

  var sql = `SELECT * FROM bill_detail where id_bill = '${id}'`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong tim thay chi tiet don hang" });
    } else {
      res.json(result);
    }
  });
});

//Thêm đơn hàng
router.post('/add', (req, res) => {
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var note = req.body.note || null;
  var total_price = req.body.total_price;
  var status = req.body.status;
  var payment_type = req.body.payment_type;
  var id_user = req.body.id_user;
  var id_gc = req.body.id_gc | null;

  var sql = `INSERT INTO bill (name, address, phone, note, total_price, status, payment_type, id_user, id_gc) VALUES ('${name}', '${address}', '${phone}', '${note}', '${total_price}', '${status}', '${payment_type}', '${id_user}', '${id_gc}')`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Them don hang that bai" });
    } else {
      res.json({ success: "Them don hang thanh cong" });
    }
  });
});

module.exports = router;