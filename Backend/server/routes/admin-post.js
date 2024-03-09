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

//Thêm post
router.post("/add", async (req, res) => {
    try {
        var { heading, description, image } = req.body;
        var sql = `INSERT INTO post (heading, description, image) VALUES ('${heading}', '${description}', '${image}')`;
        var result = await queryDB(sql);
        res.json({ success: "Thêm bài viết thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Sửa thông tin post
router.put("/edit/:id", async (req, res) => {
    var id_post = parseInt(req.params.id);
    if (isNaN(id_post) || id_post < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        var { heading, description, image } = req.body;
        var sql = `UPDATE post SET heading='${heading}', description='${description}', image='${image}' WHERE id_post='${id_post}'`;
        await queryDB(sql);
        res.json({ success: "Sửa bài viết thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Xóa post
router.delete("/delete/:id", async (req, res) => {
    var id_post = parseInt(req.params.id);
    if (isNaN(id_post) || id_post < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        await queryDB(`DELETE FROM post WHERE id_post='${id_post}'`);
        res.json({ success: "Xóa bài viết thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;