var express = require('express');
var router = express.Router();
var db = require('../models/database');

//Favorite
router.get('/list/:id', (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
      res.json({ error: "ID không hợp lệ" });
      return;
    }
  
    // var sql = `SELECT * FROM favorite where id_user = '${id}'`;
    var sql = `SELECT product.id_pd, product.name, product.price, product.image, product.id_cate FROM product INNER JOIN favorite ON product.id_pd = favorite.id_pd WHERE favorite.id_user = '${id}'`;
    db.query(sql, (err, result) => {
      if(err) {
        res.json({ error: "Khong tim thay favorite" });
      } else {
        res.json(result);
      }
    });
  });

module.exports = router;