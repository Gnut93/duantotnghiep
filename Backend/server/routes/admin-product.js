var express = require("express");
var router = express.Router();
var db = require("../models/database");

function queryDB(sql, values = null) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
router.post("/add-product", async (req, res) => {
    try {
        var data = req.body;
        var sql = `INSERT into product (name, description,  price, price_sale, image, id_cate) VALUES (?, ?, ?, ?, ?, ?)`;
        var values = [
            data.name,
            data.description,
            data.price,
            data.price_sale,
            data.image,
            data.id_cate,
        ];

        // Lưu kết quả trả về từ hàm queryDB vào biến result
        var result = await queryDB(sql, values);
        res.json({
            success: "Thêm sản phẩm thành công",
            id_pd: result.insertId,
        });
    } catch (err) {
        res.json({ error: err.message });
    }
});
//Thêm sản phẩm chi tiết
router.post("/add-product-detail", async (req, res) => {
    try {
        var data = req.body;
        var sql = `INSERT into product_detail (image, color, color_code, quantity, id_pd) VALUES (?, ?, ?, ?, ?)`;
        var values = [
            data.image,
            data.color,
            data.color_code,
            data.quantity,
            data.id_pd,
        ];

        await queryDB(sql, values);
        res.json({ success: "Thêm sản phẩm chi tiết thành công" });
    } catch (err) {
        res.json({ error: "Loi them san pham chi tiet" });
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
        var data = req.body;
        console.log(data);
        var sql = `UPDATE product SET name='${data.name}', description='${data.description}', price='${data.price}', price_sale='${data.price_sale}', image='${data.image}', id_cate='${data.id_cate}' WHERE id_pd='${id_pd}'`;
        await queryDB(sql);
        res.json({ success: "Sửa sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Sửa thông tin sản phẩm chi tiết
router.put("/edit-detail/:id", async (req, res) => {
    var id_pd = parseInt(req.params.id);
    if (isNaN(id_pd) || id_pd < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    try {
        var data = req.body;
        console.log(data);
        var sql = `UPDATE product_detail SET image='${data.image}', color='${data.color}', color_code='${data.color_code}', quantity='${data.quantity}' WHERE id_pd='${id_pd}'`;
        await queryDB(sql);
        res.json({ success: "Sửa sản phẩm chi tiết thành công" });
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
        await queryDB(`DELETE FROM product_detail WHERE id_pd='${id_pd}'`);
        await queryDB(`DELETE FROM product WHERE id_pd='${id_pd}'`);
        res.json({ success: "Xóa sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});
module.exports = router;
