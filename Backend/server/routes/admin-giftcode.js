var express = require("express");
var router = express.Router();
var db = require("../models/database");

async function queryDB(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
router.get("/list", (req, res) => {
    var sql = `SELECT * FROM gif_code`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay danh muc" });
        } else {
            res.json(result);
        }
    });
});

router.get("/detail/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    var sql = `SELECT * FROM gif_code WHERE id_gc=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay giftcode" });
        } else {
            res.json(result[0]);
        }
    });
});

//Thêm giftcode
router.post("/add", async (req, res) => {
    try {
        var { code, quantity, price, expiration_date } = req.body;

        expiration_date = new Date(expiration_date);
        expiration_date.setDate(expiration_date.getDate());

        var sql = `INSERT INTO gif_code (code, quantity, price, expiration_date) VALUES (?, ?, ?, ?)`;
        await queryDB(sql, [code, quantity, price, expiration_date]);
        res.json({ success: "Thêm giftcode thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Sửa thông tin giftcode
router.put("/edit/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        var { code, quantity, price, expiration_date } = req.body;
        expiration_date = new Date(expiration_date);
        expiration_date.setDate(expiration_date.getDate());
        var sql = `UPDATE gif_code SET code=?, quantity=?, price=?, expiration_date=? WHERE id_gc=?`;
        await queryDB(sql, [code, quantity, price, expiration_date, id]);
        res.json({ success: "Sửa giftcode thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});
// cập nhật số lượng sản phẩm
router.put("/edit-quantity/:id", async (req, res) => {
    var id_gc = parseInt(req.params.id);
    if (isNaN(id_gc) || id_gc < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        const { quantity } = req.body;
        const sql = `UPDATE gif_code SET  quantity='${quantity}' WHERE id_gc='${id_gc}'`;
        await queryDB(sql);
        res.json({ success: "Cập nhật số lượng  sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Xóa giftcode
router.delete("/delete/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        await queryDB(`DELETE FROM gif_code WHERE id_gc=?`, [id]);
        res.json({ success: "Xóa giftcode thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});
// Route để kiểm tra mã giảm giá và trả về giá giảm
router.post("/check-discount", (req, res) => {
    const { discount } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại (VD: '2024-04-04')
    const sql = `SELECT id_gc, price, quantity, expiration_date FROM gif_code WHERE code = ?  AND expiration_date >= ?`;
    db.query(sql, [discount, currentDate, currentDate], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            const { id_gc, price, quantity } = result[0];
            res.send({ validDiscount: true, id_gc, price, quantity });
        } else {
            res.send({
                validDiscount: false,
                error: "Mã giảm giá không tồn tại hoặc đã hết hạn.",
            });
        }
    });
});

module.exports = router;
