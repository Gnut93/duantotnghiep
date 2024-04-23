var express = require("express");
var router = express.Router();
var db = require("../models/database");

function queryDB(sql, params) {
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

//Thêm bảng custom
router.post("/add", async (req, res) => {
    try {
        var { name, loai, email, color, image, phone, description } = req.body;
        var sql = `INSERT INTO custom (name, loai, email, color, image, phone, description) VALUES (?, ?, ?, ?, ?, ?,?)`;
        await queryDB(sql, [
            name,
            loai,
            email,
            color,
            image,
            phone,
            description,
        ]);
        res.json({ success: "Thêm custom thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});
router.get("/list", (req, res) => {
    var sql = `SELECT * FROM custom`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay don hang custom" });
        } else {
            res.json(result);
        }
    });
});
module.exports = router;
