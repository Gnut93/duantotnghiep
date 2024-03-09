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

//Đổi mật khẩu
router.post('/change-password', async (req, res) => {
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  if (await checkUserPass(email, oldPassword)) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newPassword, salt);
      var sql = `UPDATE user SET password = '${hashPassword}' WHERE email = '${email}'`;
      db.query(sql, (err, result) => {
        if(err) {
          res.json({ error: err.message });
        } else {
          console.log(result);
          res.json({ success: 'Đổi mật khẩu thành công'});
        }
      });
  }
  else res.status(401).json({thongbao: 'Sai mật khẩu cũ'}); // send status 401 Unauthorized  
});

//Quên mật khẩu
router.post('/forgot-password', async (req, res) => {
  const email = req.body.email;
    console.log(email);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //pattern email
    // cấu hình gửi mail
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'lesyhoan1803@gmail.com',pass: 'sxalgmbxycxdusfa' }, //pass ứng dụng
        tls: { rejectUnauthorized: false  }
    });
    db.query(`SELECT * FROM user WHERE email=?`, email, function(err, result){
        if(err) throw err;
        if (result.length == 0){
            return res.sendStatus(401);
        } else {
            console.log(result[0]);
            if (email!="" && emailPattern.test(email)){
                function generateRandomPassword(length){
                    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
                    let password = "";
                    
                    for (let i = 0; i < length; i++) {
                        const randomIndex = Math.floor(Math.random() * charset.length);
                        password += charset[randomIndex];
                    }
                    return password;
                }
                const newpass = generateRandomPassword(8);
                const salt = bcrypt.genSaltSync(10);
                const pass_mahoa = bcrypt.hashSync(newpass, salt);
                db.query(`UPDATE user SET password=? WHERE email=?`, [pass_mahoa, email]);
                var mailOptions = {
                    from: 'lesyhoan1803@gmail.com',
                    to: email,
                    subject: 'Thư gửi về việc mật khẩu cấp lại mật khẩu mới',
                    html: 'Mật khẩu mới của bạn là: <b>' + newpass + '</b>', //gửi mật khẩu mới chưa mã hóa đến email
                    }
            }
            transporter.sendMail(mailOptions, function(error, info){
                if (error) console.log(error); 
                else console.log('Đã gửi mail: ' + info.response);
                return res.json({ success: 'Chúng tôi đã gửi thư đến email của bạn. Vui lòng kiểm tra email và đăng nhập lại'});
            });
        }
    });
});

module.exports = router;