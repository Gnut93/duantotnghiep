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

//Thêm post
router.post('/add', (req, res) => {
  var heading = req.body.heading;
  var description = req.body.description;
  var image = req.body.image;
  var sql = `INSERT INTO post (heading, description, image) VALUES ('${heading}', '${description}', '${image}')`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong them duoc post" });
    } else {
      res.json({ success: "Them post thanh cong" });
    }
  });
});

//Sửa post
router.put('/update/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: "ID không hợp lệ" });
    return;
  }
  var heading = req.body.heading;
  var description = req.body.description;
  var image = req.body.image;
  var sql = `UPDATE post SET heading = '${heading}', description = '${description}', image = '${image}' WHERE id_post = '${id}'`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong sua duoc post" });
    } else {
      res.json({ success: "Sua post thanh cong" });
    }
  });
});

//Xóa post
router.delete('/delete/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: "ID không hợp lệ" });
    return;
  }
  var sql = `DELETE FROM post WHERE id_post = '${id}'`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong xoa duoc post" });
    } else {
      res.json({ success: "Xoa post thanh cong" });
    }
  });
});

module.exports = router;