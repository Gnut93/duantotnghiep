var express = require('express');
var router = express.Router();
var db = require('../models/database');

//Lấy danh sách danh mục
router.get('/list', (req, res) => {
  var sql = `SELECT * FROM category`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay danh muc' });
    } else {
      res.json(result);
    }
  });
});
router.get('/:id_cate', function (req, res) {
  let id_cate = parseInt(req.params.id_cate);
  let sql = 'SELECT * FROM category WHERE id_cate = ?';
  db.query(sql, id_cate, (err, data) => {
    if (err) res.json({ 'Thông báo': 'Lỗi lấy loại', err });
    else res.json(data[0]);
  });
});

module.exports = router;
