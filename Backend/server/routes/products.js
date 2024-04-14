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
  var sql = `SELECT product.*, product_detail.* FROM product INNER JOIN product_detail ON product.id_pd = product_detail.id_pd WHERE product.id_pd = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay san pham' });
    } else {
      res.json(result);
    }
  });
});

//Lấy 8 sản phẩm mới nhất
router.get('/newest', (req, res) => {
  var sql = `SELECT * FROM product ORDER BY id_pd DESC LIMIT 0, 8`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay san pham' });
    } else {
      res.json(result);
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

//Tăng view sau mỗi lượt nhấp vô sản phẩm
router.put('/view/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: 'ID không hợp lệ' });
    return;
  }

  var sql = `UPDATE product SET view = view + 1 WHERE id_pd = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Lỗi tăng view' });
    } else {
      res.json({ success: 'Tăng view thành công' });
    }
  });
});

//Tìm sản phẩm theo tên
router.get('/search/:keyword', (req, res) => {
  var keyword = req.params.keyword;
  var sql = `SELECT * FROM product WHERE name LIKE ?`;
  db.query(sql, `%${keyword}%`, (err, result) => {
    if (err) res.json({ thongbao: 'Lỗi truy vấn CSDL', error: err.message });
    else res.json(result);
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

router.get('/product-detail/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: 'ID không hợp lệ' });
    return;
  }

  var sql = `SELECT * FROM product_detail where id_pd = ${id}`;
  console.log(id);
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay san pham' });
    } else {
      res.json(result);
    }
  });
});

//Lấy màu sản phẩm
// router.get('/color/:id', (req, res) => {
//   var id = parseInt(req.params.id);
//   if (isNaN(id) || id < 1) {
//     res.json({ error: 'ID không hợp lệ' });
//     return;
//   }

//   var sql = `SELECT * FROM product_detail where id_pd = '${id}'`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.json({ error: 'Khong tim thay mau san pham' });
//     } else {
//       if (result.length > 0) {
//         res.json(result);
//       } else {
//         res.json({ error: 'Khong tim thay mau san pham' });
//       }
//     }
//   });
// });

//Lấy danh sách màu sản phẩm
// router.get('/color/list/:id', (req, res) => {
//   var id = parseInt(req.params.id);
//   if (isNaN(id) || id < 1) {
//     res.json({ error: 'ID không hợp lệ' });
//     return;
//   }

//   var sql = `SELECT * FROM color where id_pd = '${id}'`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.json({ error: 'Khong tim thay mau san pham' });
//     } else {
//       res.json(result);
//     }
//   });
// });

//Lấy hình 1 sản phẩm
// router.get('/image/:id', (req, res) => {
//   var id = parseInt(req.params.id);
//   if (isNaN(id) || id < 1) {
//     res.json({ error: 'ID không hợp lệ' });
//     return;
//   }

//   var sql = `SELECT * FROM image where id_img = '${id}'`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.json({ error: 'Khong tim thay hinh san pham' });
//     } else {
//       res.json(result[0]);
//     }
//   });
// });

// //  lấy list hình chi tiết
// router.get("/img/list", (req, res) => {
//     var sql = `SELECT * FROM image`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             res.json({ error: "Khong tim thay san pham" });
//         } else {
//             res.json(result);
//         }
//     });
// });
// // Lấy list màu
router.get('/col/list', (req, res) => {
  var sql = `SELECT * FROM product_detail`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay color' });
    } else {
      res.json(result);
    }
  });
});
// // lấy màu chi tiết sản phẩm
router.get('/color/detail/:id', (req, res) => {
  var id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    res.json({ error: 'ID không hợp lệ' });
    return;
  }
  var sql = `SELECT * FROM product_detail where id_pd_detail = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: 'Khong tim thay mau san pham' });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.json({ error: 'Khong tim thay mau san pham' });
      }
    }
  });
});

//Lấy hình  1sản phẩm
// router.get('/image/detail/:id', (req, res) => {
//   var id = parseInt(req.params.id);
//   if (isNaN(id) || id < 1) {
//     res.json({ error: 'ID không hợp lệ' });
//     return;
//   }

//   var sql = `SELECT * FROM image where id_pd = '${id}'`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.json({ error: 'Khong tim thay hinh san pham' });
//     } else {
//       res.json(result);
//     }
//   });
// });

module.exports = router;
