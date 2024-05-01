var express = require("express");
const axios = require("axios");
const moment = require("moment");
const qs = require("qs");
var dayjs = require("dayjs");
var crypto = require("crypto");
const CryptoJS = require("crypto-js"); // npm install crypto-js
var router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { price, billId } = req.query;
        const amount = parseInt(price);
        console.log(req.query);
        const partnerCode = "MOMO";
        const accessKey = "F8BBA842ECF85";
        const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        const requestId = partnerCode + new Date().getTime();
        const orderId = billId;
        const orderInfo = `Pay for product #${orderId}`;

        const redirectUrl = `http://localhost:3000/payment-info`;
        const ipnUrl = "http://localhost:4000/momo/notify";

        const requestType = "captureWallet";
        const extraData = "";

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        const signature = crypto
            .createHmac("sha256", secretkey)
            .update(rawSignature)
            .digest("hex");

        const requestBody = {
            partnerCode,
            accessKey,
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType,
            signature,
            lang: "vi",
        };
        const { data: momoResponse } = await axios.post(
            "https://test-payment.momo.vn/v2/gateway/api/create",
            requestBody
        );
        return res.json(momoResponse);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

router.post("/notify", async (req, res, next) => {
    try {
        const { orderId, resultCode } = req.body;
        let status = "thanh toán thành công";

        if (resultCode === 0) {
            status = "thanh toán thành công";
        } else {
            status = "thanh toán thất bại";
        }
        const sql = `UPDATE bill SET status = '${status}' WHERE id_bill = '${orderId}'`;
        db.query(sql, (err, result) => {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json({ success: "Set trạng thái đơn hàng thành công" });
            }
        });
        return res.json({ status: 204 });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

module.exports = router;
