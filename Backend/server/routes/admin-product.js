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

// Thêm sản phẩm
router.post("/add-product", async (req, res) => {
    try {
        var data = req.body;
        var sql = `INSERT into product (name, description,  price, price_sale, image, id_cate) VALUES (?, ?, ?, ?, ?, ?)`;
        var values = [data.name, data.description, data.price, data.price_sale, data.image, data.id_cate];

        // Lưu kết quả trả về từ hàm queryDB vào biến result
        var result = await queryDB(sql, values);
        res.json({ success: "Thêm sản phẩm thành công", id_pd: result.insertId });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Thêm sản phẩm chi tiết
router.post("/add-product-detail", async (req, res) => {
    try {
        var data = req.body;
        var sql = `INSERT into product_detail (image, color, color_code, quantity, id_pd) VALUES (?, ?, ?, ?, ?)`;
        var values = [data.image, data.color, data.color_code, data.quantity, data.id_pd];

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
        await queryDB(`DELETE FROM product WHERE id_pd='${id_pd}'`);
        await queryDB(`DELETE FROM product_detail WHERE id_pd='${id_pd}'`);
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

    const updateTasks = []; // Mảng chứa các promise update

    try {
        const updates = req.body; // Dữ liệu cập nhật [{ id_color: 50, quantity: 50 }, { id_color: 51, quantity: 50 }]

        updates.forEach(async (update) => {
            const { id_color, quantity } = update;
            const sql = `UPDATE color SET quantity='${quantity}' WHERE id_color='${id_color}'`;
            updateTasks.push(queryDB(sql));
        });

        await Promise.all(updateTasks); // Chờ tất cả các promise update hoàn thành

        res.json({ success: "Cập nhật số lượng sản phẩm thành công" });
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
