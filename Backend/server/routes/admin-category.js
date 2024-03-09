var express = require("express");
var router = express.Router();
var db = require("../models/database");

function queryDB(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//Thêm danh mục
router.post("/add", async (req, res) => {
    try {
        var { name } = req.body;
        var sql = `INSERT INTO category (name) VALUES ('${name}')`;
        var result = await queryDB(sql);
        res.json({ success: "Thêm danh mục thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Sửa thông tin danh mục
router.put("/edit/:id", async (req, res) => {
    var id_cate = parseInt(req.params.id);
    if (isNaN(id_cate) || id_cate < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        var { name } = req.body;
        var sql = `UPDATE category SET name='${name}' WHERE id_cate='${id_cate}'`;
        await queryDB(sql);
        res.json({ success: "Sửa danh mục thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Xóa danh mục
router.delete("/delete/:id", async (req, res) => {
    var id_cate = parseInt(req.params.id);
    if (isNaN(id_cate) || id_cate < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        await queryDB(`DELETE FROM category WHERE id_cate='${id_cate}'`);
        res.json({ success: "Xóa danh mục thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;