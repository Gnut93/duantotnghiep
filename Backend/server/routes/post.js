var express = require('express');
var router = express.Router();
var db = require('../models/database');

//Lấy tất cả post
router.get('/list', (req, res) => {
  var sql = `SELECT * FROM post`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong tim thay post" });
    } else {
      res.json(result);
    }
  });
});

//Lấy thông tin 1 post
router.get('/info/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: "ID không hợp lệ" });
    return;
  }

  var sql = `SELECT * FROM post where id_post = '${id}'`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong tim thay post" });
    } else {
      res.json(result[0]);
    }
  });
});


module.exports = router;