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
const mailDelivery = fs.readFileSync("./Mail/Maildelivery/index.html", "utf8", "rs");
const PRIVATE_KEY = fs.readFileSync("./private-key.txt");
const nodemailer = require("nodemailer");

//Lấy thông tin 1 user
router.get("/info/:id", (req, res) => {
    var id = req.params.id;

    var sql = `SELECT * FROM user 
    JOIN address ON user.id_user = address.id_user 
    WHERE user.id_user = ? 
    ORDER BY address.id_address DESC
    LIMIT 1
    `;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay user" });
        } else {
            var user = result[0];
            // Nối lại địa chỉ
            user.address = [
                user.address || "",
                user.ward || "",
                user.district || "",
                user.province || "",
            ].join(", ");
            res.json(user);
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
                    const user = result[0];
                    db.query(
                        `SELECT * FROM address WHERE id_user=? ORDER BY id_address DESC LIMIT 1`,
                        [user.id_user],
                        function (err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                let userInfo = { ...user };
                                // Kiểm tra xem kết quả truy vấn địa chỉ có tồn tại hay không
                                if (result[0]) {
                                    const address = result[0];
                                    // Nối thông tin địa chỉ thành một chuỗi hoàn chỉnh
                                    const fullAddress = [
                                        address.address,
                                        address.ward,
                                        address.district,
                                        address.province,
                                    ].join(", ");
                                    // Nối thông tin địa chỉ vào object user
                                    userInfo = {
                                        ...userInfo,
                                        address: fullAddress,
                                    };
                                }
                                resolve(userInfo);
                            }
                        }
                    );
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
                res.json({ thongbao: "Đổi mật khẩu thành công" });
            }
        });
    } else res.status(401).json({ thongbao: "Sai mật khẩu cũ" }); // send status 401 Unauthorized
});

//Quên mật khẩu
router.post("/forgot-password", async (req, res) => {
    const email = req.body.email;
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
    const { address, name, phone, email, total_price, status, payment_type } =
        req.body;
    const products = req.body;
    console.log(products);

    // Kiểm tra xem các trường thông tin có đầy đủ không
    if (
        !address ||
        !name ||
        !phone ||
        !email ||
        !total_price ||
        !status ||
        !payment_type ||
        !products ||
        Object.keys(products).length === 0
    ) {
        return res.status(400).json({ error: "Thiếu thông tin đơn hàng" });
    }

    // Xử lý sản phẩm
    const productHTML = Object.values(products)
    .slice(0, -7)
    .filter(product => product && product.image)
    .map((product) => {
        const formattedPrice = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        const totalPrice = product.price * product.quantity;
        const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

        return `
        <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 600px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #ffffff;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                  "
                >
                  <div
                    class="u-col u-col-50p"
                    style="
                      max-width: 320px;
                      min-width: 200px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: 'Lato', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px;
                                  font-family: 'Lato', sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tr>
                                    <td
                                      class="v-text-align"
                                      style="
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                      align="center"
                                    >
                                      <img
                                        align="center"
                                        border="0"
                                        src="${product.image}"
                                        alt="${product.name}"
                                        title="${product.name}"
                                        style="
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                          clear: both;
                                          display: inline-block !important;
                                          border: none;
                                          height: auto;
                                          float: none;
                                          width: 100%;
                                          max-width: 180px;
                                        "
                                        width="180"
                                        class="v-src-width v-src-max-width"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div
                    class="u-col u-col-50p"
                    style="
                      max-width: 320px;
                      min-width: 400px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="height: 100%; width: 100% !important">
                      <div
                        style="
                          box-sizing: border-box;
                          height: 100%;
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      >
                        <table
                          style="font-family: 'Lato', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px;
                                  font-family: 'Lato', sans-serif;
                                "
                                align="left"
                              >
                                <h3
                                  class="v-text-align v-font-size"
                                  style="
                                    margin: 0px;
                                    color: #333333;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                    font-family: comic sans ms, sans-serif;
                                    font-size: 18px;
                                    font-weight: 400;
                                  "
                                >
                                  <strong>${product.name}</strong>
                                </h3>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Lato', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px 5px;
                                  font-family: 'Lato', sans-serif;
                                "
                                align="left"
                              >
                                <h3
                                  class="v-text-align v-font-size"
                                  style="
                                    margin: 0px;
                                    color: #333333;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                    font-family: 'Lato', sans-serif;
                                    font-size: 18px;
                                    font-weight: 400;
                                  "
                                >
                                  Số lượng: ${product.quantity}
                                </h3>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Lato', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px;
                                  font-family: 'Lato', sans-serif;
                                "
                                align="left"
                              >
                                <h3
                                  class="v-text-align v-font-size"
                                  style="
                                    margin: 0px;
                                    color: #333333;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                    font-family: 'Lato', sans-serif;
                                    font-size: 18px;
                                    font-weight: 400;
                                  "
                                >
                                  Giá: ${formattedPrice}
                                </h3>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: 'Lato', sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px 10px;
                                  font-family: 'Lato', sans-serif;
                                "
                                align="left"
                              >
                                <h3
                                  class="v-text-align v-font-size"
                                  style="
                                    margin: 0px;
                                    color: #333333;
                                    line-height: 140%;
                                    text-align: left;
                                    word-wrap: break-word;
                                    font-family: 'Lato', sans-serif;
                                    font-size: 18px;
                                    font-weight: 400;
                                  "
                                >
                                  Thành tiền : ${formattedTotalPrice}
                                </h3>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `
    }).join("");

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
            .replace("{{DiaChi}}", address)
            .replace("{{SanPham}}", productHTML)
            // .replace("{{TenSanPham}}", mailProducts)
    //         .replace("{{SoLuong}}", quantityProducts)
    //         .replace("{{Gia}}", priceProducts)
    //         .replace("{{ThanhTien}}", total_price)
    //         .replace("{{TongGiaTri}}", total_price)
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
            res.json({ success: "xóa người dùng thành công" });
        }
    });
});
router.put("/update/:id", (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var avatar = req.body.image;
    console.log(avatar);
    var fullAddress = req.body.address;

    // Tách địa chỉ ra thành các phần
    var addressParts = fullAddress.split(",").map((part) => part.trim());
    var address = addressParts[0] || "";
    var ward = addressParts[1] || "";
    var district = addressParts[2] || "";
    var province = addressParts[3] || "";

    var sql = `UPDATE user SET name = '${name}', email = '${email}', phone = '${phone}', avatar = '${avatar}' WHERE id_user = '${id}'`;
    var sql_address = `INSERT INTO address (id_user, address, ward, district, province) VALUES ('${id}', '${address}', '${ward}', '${district}', '${province}') 
                        ON DUPLICATE KEY UPDATE address = '${address}', ward = '${ward}', district = '${district}', province = '${province}'`;

    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            db.query(sql_address, (err, result) => {
                if (err) {
                    res.json({ error: err.message });
                } else {
                    res.json({ success: "Cập nhật thông tin thành công" });
                }
            });
        }
    });
});

//danh sách người dùng theo tháng
router.get("/listmonth/:month", (req, res) => {
    var month = parseInt(req.params.month);
    if (isNaN(month) || month < 1 || month > 12) {
        res.json({ error: "Tháng không hợp lệ" });
        return;
    }

    var sql = `SELECT * FROM user WHERE MONTH(created_date) = ${month}`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Không tìm thấy lịch sử mua hàng" });
        } else {
            res.json(result);
        }
    });
});
module.exports = router;
