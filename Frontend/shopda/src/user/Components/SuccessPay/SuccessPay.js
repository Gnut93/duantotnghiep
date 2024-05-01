import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./SuccessPay.css";
import { Link, useSearchParams } from "react-router-dom";
const SuccessPay = () => {
    let [searchParams] = useSearchParams();
    const resultCode = searchParams.get("resultCode");
    const orderId = searchParams.get("orderId");
    useEffect(() => {
        if (parseInt(resultCode) === 1006 || parseInt(resultCode) === 1005) {
            const url = `http://localhost:4000/bill/set-status/${orderId}`;
            const opt = {
                method: "PUT",
                body: JSON.stringify({ status: "thanh toán thất bại" }),
                headers: { "Content-Type": "application/json" },
            };
            fetch(url, opt);
        }

        if (parseInt(resultCode) === 0) {
            const url = `http://localhost:4000/bill/set-status/${orderId}`;
            const opt = {
                method: "PUT",
                body: JSON.stringify({ status: "thanh toán thành công" }),
                headers: { "Content-Type": "application/json" },
            };
            fetch(url, opt);
        }
    }, [resultCode, orderId]);

    return (
        <div>
            <Navbar />
            <div className="container">
                {parseInt(resultCode) === 1006 ||
                parseInt(resultCode) === 1005 ? (
                    <div className="successPay">
                        <h3 className="successPay-heading-err">
                            Thanh toán không thành công
                        </h3>
                        <p className="successPay-text">
                            Vui lòng kiểm tra lại!
                        </p>
                        <Link to="/">
                            <span className="infoUser-button">Trang Chủ</span>
                        </Link>
                    </div>
                ) : (
                    <div className="successPay">
                        <h3 className="successPay-heading">
                            Thanh toán thành công
                        </h3>
                        <p className="successPay-text">
                            Cảm ơn bạn đã mua hàng tại shop của chúng tôi!
                        </p>
                        <Link to="/">
                            <span className="infoUser-button">Trang Chủ</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessPay;
