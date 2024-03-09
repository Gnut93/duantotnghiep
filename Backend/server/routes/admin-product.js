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
router.post("/add", async (req, res) => {
    try {
        var { name, description, price, price_sale, image1, image2, image3, quantity, id_cate } = req.body;
        var sql = `INSERT INTO product (name, description, price, price_sale, image, quantity, id_cate) VALUES ('${name}', '${description}', '${price}', '${price_sale}', '${image1}', '${quantity}', '${id_cate}')`;
        var result = await queryDB(sql);
        var id_pd = result.insertId;
        await queryDB(`INSERT INTO image (id_pd, name) VALUES ('${id_pd}', '${image1}')`);
        await queryDB(`INSERT INTO image (id_pd, name) VALUES ('${id_pd}', '${image2}')`);
        await queryDB(`INSERT INTO image (id_pd, name) VALUES ('${id_pd}', '${image3}')`);
        res.json({ success: "Thêm sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Sửa thông tin sản phẩm
router.post("/edit", async (req, res) => {
    try {
        var { id_pd, name, description, price, price_sale, image1, image2, image3, quantity, id_cate } = req.body;
        var sql = `UPDATE product SET name='${name}', description='${description}', price='${price}', price_sale='${price_sale}', image='${image1}', quantity='${quantity}', id_cate='${id_cate}' WHERE id_pd='${id_pd}'`;
        await queryDB(sql);
        await queryDB(`DELETE FROM image WHERE id_pd='${id_pd}'`);
        await queryDB(`INSERT INTO image (id_pd, name) VALUES ('${id_pd}', '${image1}')`);
        await queryDB(`INSERT INTO image (id_pd, name) VALUES ('${id_pd}', '${image2}')`);
        await queryDB(`INSERT INTO image (id_pd, name) VALUES ('${id_pd}', '${image3}')`);
        res.json({ success: "Sửa sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Xóa sản phẩm
router.post("/delete", async (req, res) => {
    try {
        var id_pd = req.body.id_pd;
        await queryDB(`DELETE FROM product WHERE id_pd='${id_pd}'`);
        await queryDB(`DELETE FROM image WHERE id_pd='${id_pd}'`);
        res.json({ success: "Xóa sản phẩm thành công" });
    } catch (err) {
        res.json({ error: err.message });
    }
});


module.exports = router;