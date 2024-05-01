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
// lấy bill theo tháng
router.get("/listmonth/:month", (req, res) => {
    var month = parseInt(req.params.month);
    if (isNaN(month) || month < 1 || month > 12) {
        res.json({ error: "Tháng không hợp lệ" });
        return;
    }

    var sql = `SELECT * FROM bill WHERE MONTH(created_date) = ${month}`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Không tìm thấy lịch sử mua hàng" });
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
            item.image,
            item.quantity,
            item.total_price,
            item.id_pd_detail,
        ]);

        var sql = `INSERT INTO bill_detail (id_bill, name, price,color,image, quantity, total_price, id_pd_detail) VALUES ?`;

        await db.query(sql, [values]);

        res.json({ thongbao: "Thêm chi tiết đơn hàng thành công" });
    } catch (err) {
        res.json({ thongbao: "Lỗi truy vấn CSDL", error: err.message });
    }
});

//Danh sách đơn hàng
router.get("/list", (req, res) => {
    var sql = `SELECT * FROM bill ORDER BY created_date	 DESC `;
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
    var sql = `UPDATE bill SET status = '${status}' WHERE id_bill = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json({ success: "Set trạng thái đơn hàng thành công" });
        }
    });
});
//set trạng thái hủy đơn hàng
router.put("/set-statusCancelOrder", (req, res) => {
    var id = req.body.id;
    var sql = `UPDATE bill SET status = 'Đã Hủy' WHERE id_bill = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json({ success: "Set trạng thái đơn hàng thành công" });
        }
    });
});
// thay đổi địa chỉ đơn hàng
router.put("/set-address/:id", (req, res) => {
    var id = req.params.id;
    var data = req.body.newaddress;
    var sql = `UPDATE bill SET address = '${data}' WHERE id_bill = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json({ success: "Thay đổi địa chỉ đơn hàng thành công" });
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

module.exports = router;
