import React from "react";

const ChiTietDonHang = () => {
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
                                    <th>Tiền sản phẩm</th>
                                    <th>Màu Sản Phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>19</td>
                                    <td>TÚI ĐEO NGỰC JEA</td>
                                    <td>300</td>
                                    <td>10</td>
                                    <td>3000000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default ChiTietDonHang;
