var express = require("express");
var router = express.Router();
var db = require("../models/database");

//Lịch sử mua hàng
router.get("/list/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }

    var sql = `SELECT * FROM bill where id_user = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay lich su mua hang" });
        } else {
            res.json(result);
        }
    });
});

//Chi tiết 1 đơn hàng
router.get("/detailbill/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }

    var sql = `SELECT * FROM bill_detail where id_bill = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay chi tiet don hang" });
        } else {
            res.json(result);
        }
    });
});

//Thêm đơn hàng
router.post("/add", (req, res) => {
    var data = req.body;
    var sql = `INSERT INTO bill SET ?`;
    db.query(sql, data, (err, result) => {
        if (err)
            res.json({ thongbao: "Lỗi truy vấn CSDL", error: err.message });
        else {
            id_dh = result.insertId;
            res.json({ thongbao: "Đặt hàng thành công", id_dh: id_dh });
        }
    });
});

//Thêm chi tiết đơn hàng
router.post("/add-detail", async (req, res) => {
    try {
        var data = req.body;
        var values = data.map((item) => [
            item.id_bill,
            item.name,
            item.price,
            item.color,
            item.quantity,
            item.total_price,
            item.id_pd,
        ]);

        var sql = `INSERT INTO bill_detail (id_bill, name, price, color, quantity, total_price, id_pd) VALUES ?`;

        await db.query(sql, [values]);

        res.json({ thongbao: "Thêm chi tiết đơn hàng thành công" });
    } catch (err) {
        res.json({ thongbao: "Lỗi truy vấn CSDL", error: err.message });
    }
});

//Danh sách đơn hàng
router.get("/list", (req, res) => {
    var sql = `SELECT * FROM bill`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay don hang" });
        } else {
            res.json(result);
        }
    });
});
//trang đơn hàng
router.get("/detail/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }

    var sql = `SELECT * FROM bill  where id_bill = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay  don hang" });
        } else {
            res.json(result[0]);
        }
    });
});

//Set trạng thái đơn hàng
router.put("/set-status/:id", (req, res) => {
    var id = req.params.id;
    var status = req.body.status;
    console.log(status);
    var sql = `UPDATE bill SET status = '${status}' WHERE id_bill = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json({ success: "Set trạng thái đơn hàng thành công" });
        }
    });
});
// Route để kiểm tra đơn hàng và trả về đơn hàng
router.post("/check-bill", (req, res) => {
    const { phone } = req.body;
    const sql = `SELECT * FROM bill WHERE phone = ?`;
    db.query(sql, [phone], (err, result) => {
        if (err) {
            console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
            res.status(500).send({ error: "Lỗi khi truy vấn cơ sở dữ liệu." });
            return;
        }

        if (result.length > 0) {
            res.send({ validDiscount: true, bills: result });
        } else {
            res.send({
                validDiscount: false,
                error: "Không tìm thấy đơn hàng nào cho số điện thoại này",
            });
        }
    });
});
// Route để gửi mail khi đặt hàng thành công
router.post("/order-success", async (req, res) => {
    const email = req.body.email;
    console.log(email);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //pattern email
    // cấu hình gửi mail
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "daleather.2024@gmail.com", pass: "erqccpsqpfrnybyw" }, //pass ứng dụng
        tls: { rejectUnauthorized: false },
    });

    try {
            console.log(result[0]);
            if (email != "" && emailPattern.test(email)) {
                var mailOptions = {
                    from: "daleather.2024@gmail.com",
                    to: email,
                    subject: "Thư xác nhận đặt hàng thành công",
                    html: mailForgotPassword.replace("{{name}}", email).replace("{{password}}", newpass),
                };
            }
            await transporter.sendMail(mailOptions);
            return res.json({
                success:
                    "Chúng tôi đã gửi thư đến email của bạn. Vui lòng kiểm tra email và đăng nhập lại",
            });
        }
        catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
