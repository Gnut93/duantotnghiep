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

module.exports = router;