var express = require('express');
var router = express.Router();
var db = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync('./private-key.txt');
const nodemailer = require('nodemailer');

//Lấy thông tin 1 user
router.get('/info', (req, res) => {
  var email = req.body.email;

  var sql = `SELECT * FROM user where email = '${email}'`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: "Khong tim thay user" });
    } else {
      res.json(result);
    }
  });
});

//Đăng ký
router.post('/register', (req, res) => {
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  var phone = req.body.phone;
  var avatar = req.body.avatar;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  var sql = `INSERT INTO user (name, phone, email, password, avatar) VALUES ('${name}', '${phone}', '${email}', '${hashPassword}', '${avatar}')`;
  db.query(sql, (err, result) => {
    if(err) {
      res.json({ error: err.message });
    } else {
      console.log(result);
      res.json({ success: 'Đăng ký thành công'});
    }
  });
});

//Đăng nhập
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (await checkUserPass(email, password)) {
      const userInfo = await getUserInfo(email);   
      const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
          algorithm: 'RS256',  
          expiresIn: 3600, 
          subject: String(userInfo.id)
      })          
          //res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:false});
      res.status(200).json({ idToken: jwtBearerToken, expiresIn: 3600, userInfo: userInfo, thongbao: 'Đăng nhập thành công' });
  }
      else res.status(401).json({thongbao: 'Sai thông tin đăng nhập'}); // send status 401 Unauthorized  
})
async function checkUserPass(email, password) {
  const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE email=?", [email], (err, result) => {
          if(err) {
              reject(err);
          } else {
              resolve(result);
          }
      });
  });

  if (result.length === 0) {
      return false;
  }

  const user = result[0];
  const match = bcrypt.compareSync(password, user.password);
  return match;
}

getUserInfo = async (email) => {
  return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user WHERE email='${email}'`, function(err, result){
          if(err) {
              reject(err);
          } else {
              resolve(result[0]);
          }
      });
  }).catch((error) => {
      console.error(error);
      return {"error": "Lỗi lấy thông tin user"};
  });
}

module.exports = router;