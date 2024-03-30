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
        var { name, description, price, price_sale, image, id_cate } = req.body;
        var sql = `INSERT INTO product (name, description, price, price_sale, image, id_cate) VALUES ('${name}', '${description}', '${price}', '${price_sale}', '${image}', '${id_cate}')`;
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
        var { name, description, price, price_sale, image, id_cate } = req.body;
        var sql = `UPDATE product SET name='${name}', description='${description}', price='${price}', price_sale='${price_sale}', image='${image}', id_cate='${id_cate}' WHERE id_pd='${id_pd}'`;
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
        const sql = `INSERT INTO image (name,id_pd ) VALUES ( '${name}','${id_pd}')`;
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

//Xóa hình sản phẩm
router.delete("/delete-image/:id", async (req, res) => {
    var id_image = parseInt(req.params.id);
    if (isNaN(id_image) || id_image < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        await queryDB(`DELETE FROM image WHERE id_img='${id_image}'`);
        res.json({ success: "Xóa hình sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Thêm màu sản phẩm
router.post("/add-color", async (req, res) => {
    try {
        const { name, code, quantity, id_pd } = req.body;
        const sql = `INSERT INTO color ( name, code, quantity,id_pd) VALUES ( '${name}', '${code}', '${quantity}','${id_pd}')`;
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
        const { name, code, quantity } = req.body;
        const sql = `UPDATE color SET name='${name}', code='${code}', quantity='${quantity}' WHERE id_color='${id_color}'`;
        await queryDB(sql);
        res.json({ success: "Sửa màu sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});
// cập nhật số lượng sản phẩm
router.put("/edit-quantity/:id", async (req, res) => {
    var id_color = parseInt(req.params.id);
    if (isNaN(id_color) || id_color < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        const { quantity } = req.body;
        const sql = `UPDATE color SET  quantity='${quantity}' WHERE id_color='${id_color}'`;
        await queryDB(sql);
        res.json({ success: "Cập nhật số lượng  sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Xóa màu sản phẩm
router.delete("/delete-color/:id", async (req, res) => {
    var id_color = parseInt(req.params.id);
    if (isNaN(id_color) || id_color < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        await queryDB(`DELETE FROM color WHERE id_color='${id_color}'`);
        res.json({ success: "Xóa màu sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;
