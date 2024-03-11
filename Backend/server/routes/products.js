var express = require('express');
var router = express.Router();
var db = require('../models/database');

//Lấy thông tin 1 sản phẩm
router.get('/info/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: 'ID không hợp lệ' });
    return;
  }

  var sql = `SELECT * FROM product where id_pd = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay san pham' });
    } else {
      res.json(result[0]);
    }
  });
});

//Lấy danh sách sản phẩm
router.get('/list', (req, res) => {
  var sql = `SELECT * FROM product`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay san pham' });
    } else {
      res.json(result);
    }
  });
});
router.get('/list/view/:sosp?', (req, res) => {
  let sosp = parseInt(req.params.sosp || 1);
  if (sosp < 1) sosp = 1;
  let sql = 'SELECT * FROM product ORDER BY view DESC LIMIT 0, ?';
  db.query(sql, sosp, (err, data) => {
    if (err) res.json({ 'Thông báo': 'Lỗi lấy list sp', err });
    else res.json(data);
  });
});
//Lấy danh sách loại sản phẩm
router.get('/listcategory', (req, res) => {
  var sql = `SELECT * FROM category`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay san pham' });
    } else {
      res.json(result);
    }
  });
});

//Lấy danh sách sản phẩm theo danh mục
router.get('/list/category/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: 'ID không hợp lệ' });
    return;
  }

  var sql = `SELECT * FROM product where id_cate = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay san pham' });
    } else {
      res.json(result);
    }
  });
});

//Lấy màu sản phẩm
router.get('/color/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: 'ID không hợp lệ' });
    return;
  }

  var sql = `SELECT * FROM color where id_pd = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay mau san pham' });
    } else {
      res.json(result);
    }
  });
});

//Lấy hình sản phẩm
router.get('/image/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: 'ID không hợp lệ' });
    return;
  }

  var sql = `SELECT * FROM image where id_pd = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay hinh san pham' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
