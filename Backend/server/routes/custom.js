var express = require('express');
var router = express.Router();
var db = require('../models/database');

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
router.post('/add', async (req, res) => {
    try {
        var { name, size, description, color, image, phone, email } = req.body;
        var sql = `INSERT INTO custom (name, size, description, color, image, phone, email) VALUES (?, ?, ?, ?, ?, ?)`;
        await queryDB(sql, [name, size, description, color, image, phone, email]);
        res.json({ success: 'Thêm custom thành công' });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;