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

//Thêm sản phẩm
router.post("/add-product", async (req, res) => {
    try {
        var { name, description, price, price_sale, image, quantity, id_cate } =
            req.body;
        var sql = `INSERT INTO product (name, description, price, price_sale, image, quantity, id_cate) VALUES ('${name}', '${description}', '${price}', '${price_sale}', '${image}', '${quantity}', '${id_cate}')`;
        await queryDB(sql);
        res.json({ success: "Thêm sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Sửa thông tin sản phẩm
router.put("/edit/:id", async (req, res) => {
    var id_pd = parseInt(req.params.id);
    if (isNaN(id_pd) || id_pd < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        var {
            name,
            description,
            price,
            price_sale,
            image,
            quantity,
            id_cate,
        } = req.body;
        var sql = `UPDATE product SET name='${name}', description='${description}', price='${price}', price_sale='${price_sale}', image='${image}', quantity='${quantity}', id_cate='${id_cate}' WHERE id_pd='${id_pd}'`;
        await queryDB(sql);
        res.json({ success: "Sửa sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Xóa sản phẩm
router.delete("/delete/:id", async (req, res) => {
    var id_pd = parseInt(req.params.id);
    if (isNaN(id_pd) || id_pd < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        await queryDB(`DELETE FROM color WHERE id_pd='${id_pd}'`);
        await queryDB(`DELETE FROM image WHERE id_pd='${id_pd}'`);
        await queryDB(`DELETE FROM product WHERE id_pd='${id_pd}'`);
        res.json({ success: "Xóa sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Thêm ảnh sản phẩm
router.post("/add-image", async (req, res) => {
    try {
        const { name, id_pd } = req.body;
        const sql = `INSERT INTO image (id_pd,name ) VALUES ('${id_pd}', '${name}')`;
        await queryDB(sql);
        res.json({ success: "Thêm hình sản phẩm thành công" });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

//Sửa ảnh sản phẩm
router.put("/edit-image/:id", async (req, res) => {
    var id_img = parseInt(req.params.id);
    if (isNaN(id_img) || id_img < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        const { name } = req.body;
        const sql = `UPDATE image SET name='${name}' WHERE id_img='${id_img}'`;
        await queryDB(sql);
        res.json({ success: "Sửa hình sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Thêm màu sản phẩm
router.post("/add-color", async (req, res) => {
    try {
        const { name, code, id_pd } = req.body;
        const sql = `INSERT INTO color (id_pd,name,code ) VALUES ('${id_pd}', '${name}','${code}')`;
        await queryDB(sql);
        res.json({ success: "Thêm màu sản phẩm thành công" });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

//Sửa màu sản phẩm
router.put("/edit-color/:id", async (req, res) => {
    var id_color = parseInt(req.params.id);
    if (isNaN(id_color) || id_color < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        const { name, code } = req.body;
        const sql = `UPDATE color SET name='${name}', code='${code}' WHERE id_color='${id_color}'`;
        await queryDB(sql);
        res.json({ success: "Sửa màu sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;
