import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const FollowOrderUser = () => {
    const [listBill, setListBill] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const idUser = user ? user.id_user : null;
    useEffect(() => {
        fetch(`http://localhost:4000/bill/list/${idUser}`)
            .then((res) => res.json())
            .then(setListBill);
    }, [idUser]);

    return (
        <screen className="followOrder">
            <Navbar></Navbar>
            <div className="container">
                <h3 className="followOrder-heading">Theo dõi đơn hàng</h3>
                <h3 className="followOrder-title">Thông tin đơn hàng</h3>
                <div className="followOrder-table">
                    <table>
                        <tr>
                            <td>TT</td>
                            <td>Tên</td>
                            <td>Địa chỉ</td>
                            <td>Số điện thoại</td>
                            <td>email</td>
                            <td>Tổng tiền</td>
                            <td>Trạng thái</td>
                            <td>Thanh toán</td>
                            <td>Ngày đặt hàng</td>
                            <td>Chi tiết</td>
                            <td>Thao Tác</td>
                        </tr>
                        <tbody>
                            {listBill.map((bill, i) => (
                                <tr key={i}>
                                    <td>
                                        <p>{bill.id_bill}</p>
                                    </td>
                                    <td>
                                        <p>{bill.name}</p>
                                    </td>
                                    <td>
                                        <p>{bill.address}</p>
                                    </td>
                                    <td>
                                        <p>{bill.phone}</p>
                                    </td>
                                    <td>
                                        <p>{bill.email}</p>
                                    </td>
                                    <td>
                                        {parseInt(
                                            bill.total_price
                                        ).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </td>
                                    <td>
                                        <p>{bill.status}</p>
                                    </td>
                                    <td>
                                        <p>{bill.payment_type}</p>
                                    </td>
                                    <td>
                                        {new Date(
                                            bill.created_date
                                        ).toLocaleDateString("vi")}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/order-detail/${bill.id_bill}`}
                                        >
                                            <span className="btn--show-modal">
                                                <i className="fas fa-search"></i>
                                            </span>
                                        </Link>
                                    </td>
                                    <td>
                                        <p>Hủy Đơn Hàng</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </screen>
    );
};

export default FollowOrderUser;
