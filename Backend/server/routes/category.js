var express = require('express');
var router = express.Router();
var db = require('../models/database');

//Lấy danh sách danh mục
router.get('/list', (req, res) => {
  var sql = `SELECT * FROM category`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong tim thay danh muc" });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;