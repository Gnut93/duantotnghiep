import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ChiTietDonHang = () => {
    let { id } = useParams();
    const [listBillDetail, setListBillDetail] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/bill/detailbill/${id}`)
            .then((res) => res.json())
            .then(setListBillDetail);
    }, [id]);
    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Chi tiết đơn hàng</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Đơn Hàng </h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá sản phẩm</th>
                                    <th>Màu Sản Phẩm</th>
                                    <th>Hình Sản Phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBillDetail.map((billDetail, i) => (
                                    <tr key={i}>
                                        <td>{billDetail.id_pd}</td>
                                        <td>{billDetail.name}</td>
                                        <td>{billDetail.price}</td>
                                        <td>{billDetail.color}</td>
                                        <td>
                                            <img
                                                src={billDetail.image}
                                                alt="#"
                                            />
                                        </td>
                                        <td>{billDetail.quantity}</td>
                                        <td>{billDetail.total_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default ChiTietDonHang;
