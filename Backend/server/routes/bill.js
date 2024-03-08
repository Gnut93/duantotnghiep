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

module.exports = router;