var express = require("express");
var router = express.Router();
var db = require("../models/database");

//Favorite
router.get("/list/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }

    // var sql = `SELECT * FROM favorite where id_user = '${id}'`;
    var sql = `SELECT product.id_pd, product.name, product.price,product.price_sale, product.image, product.id_cate FROM product INNER JOIN favorite ON product.id_pd = favorite.id_pd WHERE favorite.id_user = '${id}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong tim thay favorite" });
        } else {
            res.json(result);
        }
    });
});

router.post("/add", (req, res) => {
    var id_user = req.body.id_user;
    var id_pd = req.body.id_pd;
    var sql = `INSERT INTO favorite (id_user, id_pd) VALUES ('${id_user}', '${id_pd}')`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong them duoc favorite" });
        } else {
            res.json({ success: "Them favorite thanh cong" });
        }
    });
});

router.delete("/delete/:id_user/:id_pd", (req, res) => {
    var id_user = parseInt(req.params.id_user);
    var id_pd = parseInt(req.params.id_pd);
    if (isNaN(id_user) || id_user < 1 || isNaN(id_pd) || id_pd < 1) {
        res.json({ error: "ID không hợp lệ" });
        return;
    }
    var sql = `DELETE FROM favorite WHERE id_user = '${id_user}' AND id_pd = '${id_pd}'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.json({ error: "Khong xoa duoc favorite" });
        } else {
            res.json({ success: "Xoa favorite thanh cong" });
        }
    });
});

router.post("/check-favorite", (req, res) => {
    const { id_pd, id_user } = req.body;
    const sql = `SELECT id_pd FROM favorite WHERE id_pd = ? AND id_user = ?`;
    db.query(sql, [id_pd, id_user], (err, result) => {
        if (err) {
            console.error("Lỗi khi kiểm tra sản phẩm yêu thích: ", err);
            res.status(500).send({
                error: "Đã xảy ra lỗi khi kiểm tra sản phẩm yêu thích.",
            });
            return;
        }

        if (result.length > 0) {
            res.send({ exists: true });
        } else {
            res.send({ exists: false });
        }
    });
});

module.exports = router;
