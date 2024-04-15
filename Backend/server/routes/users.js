var express = require("express");
var router = express.Router();
var db = require("../models/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const mailForgotPassword = fs.readFileSync(
    "./Mail/MailForgotPass/index.html",
    "utf8",
    "rs"
);
const mailDelivery = fs.readFileSync("./Mail/MailDelivery.html", "utf8", "rs");
const PRIVATE_KEY = fs.readFileSync("./private-key.txt");
const nodemailer = require("nodemailer");

//Lấy thông tin 1 user
router.get("/info/:id", (req, res) => {
    var id = req.params.id;

    var sql = `SELECT * FROM user WHERE id_user = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay user" });
        } else {
            res.json(result[0]);
        }
    });
});
//Lấy thông tin 1 user
router.get("/role/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }

    var sql = `SELECT * FROM user where id_user = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Không tìm thấy user" });
        } else {
            res.json(result[0]);
        }
    });
});

//Lấy toàn bộ user
router.get("/list", (req, res) => {
    var sql = `SELECT * FROM user`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay user" });
        } else {
            res.json(result);
        }
    });
});

//set role user
router.put("/set-role/:id", (req, res) => {
    var id = req.params.id;
    var role = req.body.role;
    var sql = `UPDATE user SET role = '${role}' WHERE id_user = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            // console.log(result);
            res.json({ success: "Set role thành công" });
        }
    });
});

//Đăng ký
router.post("/register", (req, res) => {
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    var sql = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${hashPassword}')`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            console.log(result);
            res.json({ success: "Đăng ký thành công" });
        }
    });
});

//Đăng nhập
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (await checkUserPass(email, password)) {
        const userInfo = await getUserInfo(email);
        const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: 1800,
            subject: String(userInfo.id),
        });
        //res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:false});
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 1800,
            userInfo: userInfo,
            thongbao: "Đăng nhập thành công",
        });
    } else res.status(401).json({ thongbao: "Sai thông tin đăng nhập" }); // send status 401 Unauthorized
});
async function checkUserPass(email, password) {
    const result = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM user WHERE email=?", [email], (err, result) => {
            if (err) {
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
        db.query(
            `SELECT * FROM user WHERE email=?`,
            [email],
            function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            }
        );
    }).catch((error) => {
        console.error(error);
        return { error: "Lỗi lấy thông tin user" };
    });
};

//Đổi mật khẩu
router.post("/change-password", async (req, res) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmpassword = req.body.confirmpassword;
    if (await checkUserPass(email, oldPassword)) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);
        var sql = `UPDATE user SET password = '${hashPassword}' WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if (err) {
                res.json({ error: err.message });
            } else {
                console.log(result);
                res.json({ success: "Đổi mật khẩu thành công" });
            }
        });
    } else res.status(401).json({ thongbao: "Sai mật khẩu cũ" }); // send status 401 Unauthorized
});

//Quên mật khẩu
router.post("/forgot-password", async (req, res) => {
    const email = req.body.email;
    // console.log(email);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //pattern email
    // cấu hình gửi mail
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "daleather.2024@gmail.com", pass: "erqccpsqpfrnybyw" }, //pass ứng dụng
        tls: { rejectUnauthorized: false },
    });

    try {
        const result = await db.query(
            `SELECT * FROM user WHERE email=?`,
            email
        );
        if (result.length == 0) {
            return res.sendStatus(401);
        } else {
            // console.log(result[0]);
            if (email != "" && emailPattern.test(email)) {
                function generateRandomPassword(length) {
                    const charset =
                        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
                    let password = "";

                    for (let i = 0; i < length; i++) {
                        const randomIndex = Math.floor(
                            Math.random() * charset.length
                        );
                        password += charset[randomIndex];
                    }
                    return password;
                }
                const newpass = generateRandomPassword(8);
                const salt = bcrypt.genSaltSync(10);
                const pass_mahoa = bcrypt.hashSync(newpass, salt);
                await db.query(`UPDATE user SET password=? WHERE email=?`, [
                    pass_mahoa,
                    email,
                ]);
                var mailOptions = {
                    from: "daleather.2024@gmail.com",
                    to: email,
                    subject: "Thư gửi về việc mật khẩu cấp lại mật khẩu mới",
                    // html: "Mật khẩu mới của bạn là: <b>" + newpass + "</b>",
                    html: mailForgotPassword
                        .replace("{{name}}", email)
                        .replace("{{password}}", newpass),
                };
            }
            await transporter.sendMail(mailOptions);
            return res.json({
                success:
                    "Chúng tôi đã gửi thư đến email của bạn. Vui lòng kiểm tra email và đăng nhập lại",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

//Mail giao hàng
router.post("/delivery", async (req, res) => {
    const {
        address,
        name,
        phone,
        email,
        total_price,
        status,
        note,
        payment_type,
    } = req.body;
    const products = req.body;

    // Kiểm tra xem các trường thông tin có đầy đủ không
    if (
        !address ||
        !name ||
        !phone ||
        !email ||
        !total_price ||
        !status ||
        !note ||
        !payment_type ||
        !products ||
        Object.keys(products).length === 0
    ) {
        return res.status(400).json({ error: "Thiếu thông tin đơn hàng" });
    }

    // Xử lý sản phẩm
    const imageProducts = Object.values(products)
        .slice(0, -7)
        .map((product) => {
            return `<p>${product.image}</p>`;
        })
        .join("");
    const mailProducts = Object.values(products)
        .slice(0, -7)
        .map((product) => {
            return `<p>${product.name}</p>`;
        })
        .join("");
    const quantityProducts = Object.values(products)
        .slice(0, -7)
        .map((product) => {
            return `<p>${product.quantity}</p>`;
        })
        .join("");
    const priceProducts = Object.values(products)
        .slice(0, -7)
        .map((product) => {
            return `<p>${product.price}</p>`;
        })
        .join("");
    const currentDate = new Date().toLocaleDateString("en-GB");
    // cấu hình gửi mail
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "daleather.2024@gmail.com", pass: "erqccpsqpfrnybyw" }, //pass ứng dụng
        tls: { rejectUnauthorized: false },
    });

    var mailOptions = {
        from: "daleather.2024@gmail.com",
        to: email, // Sử dụng email từ req.body
        subject: "Thư gửi về thông tin đơn hàng",
        html: mailDelivery
            .replace("{{TenKhachHang}}", name)
            .replace("{{NgayDatHang}}", currentDate)
            .replace("{{DiaChi}}", address)
            .replace("{{HinhSanPham}}", imageProducts)
            .replace("{{TenSanPham}}", mailProducts)
            .replace("{{SoLuong}}", quantityProducts)
            .replace("{{Gia}}", priceProducts)
            .replace("{{TongTien}}", total_price)
            .replace("{{TongGiaTri}}", total_price)
            .replace("{{TongGiaTri}}", total_price),
    };

    // Gửi email và xử lý kết quả
    try {
        await transporter.sendMail(mailOptions);
        return res.json({
            success:
                "Cảm ơn bạn đã mua hàng của chúng tôi. Chúng tôi đã gửi thư xác nhận đến email của bạn. Vui lòng kiểm tra email của bạn để xem thông tin chi tiết đơn hàng của bạn",
        });
    } catch (error) {
        console.error("Lỗi khi gửi email:", error);
        return res.status(500).json({ error: "Đã xảy ra lỗi khi gửi email" });
    }
});

//Check email tồn tại
router.get("/check-email/:email", (req, res) => {
    var email = req.params.email;
    var sql = `SELECT * FROM user WHERE email LIKE ?`;
    db.query(sql, `%${email}%`, (err, result) => {
        if (err) {
            res.json({ error: "Lỗi truy vấn CSDL", error: err.message });
        } else {
            if (result.length > 0) {
                res.json(true);
            } else {
                res.json(false);
            }
        }
    });
});
//Xóa người dùng
router.delete("/delete/:id", async (req, res) => {
    var id_user = parseInt(req.params.id);
    if (isNaN(id_user) || id_user < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }

    var sql = `DELETE FROM user WHERE id_user='${id_user}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            // console.log(result);
            res.json({ success: "xóa người dùng thành công" });
        }
    });
});
//Cập nhật thông tin người dùng
router.put("/update/:id", (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var avatar = req.body.image;
    var sql = `UPDATE user SET name = '${name}', email = '${email}', phone = '${phone}', avatar = '${avatar}' WHERE id_user = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            // console.log(result);
            res.json({ success: "Cập nhật thông tin thành công" });
        }
    });
});
module.exports = router;
