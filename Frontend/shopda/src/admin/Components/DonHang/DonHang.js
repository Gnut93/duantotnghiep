import React from "react";

const DonHang = () => {
    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Đơn hàng</h1>
                    </div>
                    <div className="dropdown">
                        <div className="dropdown__select">
                            <span className="dropdown__selected">Date</span>
                            <i className="fa fa-caret-down dropdown__caret"></i>
                        </div>
                        <ul className="dropdown__list">
                            <a
                                href="/"
                                className="dropdown__item dropdown__text"
                            >
                                Item1
                            </a>
                            <a
                                href="/"
                                className="dropdown__item dropdown__text"
                            >
                                Item2
                            </a>
                            <a
                                href="/"
                                className="dropdown__item dropdown__text"
                            >
                                Item3
                            </a>
                            <a
                                href="/"
                                className="dropdown__item dropdown__text"
                            >
                                Item4
                            </a>
                            <a
                                href="/"
                                className="dropdown__item dropdown__text"
                            >
                                Item5
                            </a>
                            <a
                                href="/"
                                className="dropdown__item dropdown__text"
                            >
                                Item6
                            </a>
                        </ul>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Những Đơn Đặt Hàng Gần Đây</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Người Dùng</th>
                                    <th>Ngày Đặt</th>
                                    <th>Trạng Thái</th>
                                    <th>Tổng tiền</th>
                                    <th>Thanh toán</th>
                                    <th>Xem</th>
                                    <th>Set trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Name1</p>
                                    </td>
                                    <td>12/05/2023</td>
                                    <td>
                                        <span className="status waiting">
                                            Chờ
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {(10000).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status waiting">
                                            Khi nhận hàng
                                        </span>
                                    </td>
                                    <td>
                                        <span class="btn--show-modal">Xem</span>
                                    </td>
                                    <td>
                                        <span class="edit delete-cate">
                                            <i class="fas fa-tools"></i>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Name2</p>
                                    </td>
                                    <td>12/05/2023</td>
                                    <td>
                                        <span className="status success">
                                            Hoàn Thành
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {(10000).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status waiting">
                                            Khi nhận hàng
                                        </span>
                                    </td>
                                    <td>
                                        <span class="btn--show-modal">Xem</span>
                                    </td>
                                    <td>
                                        <span class="edit delete-cate">
                                            <i class="fas fa-tools"></i>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Name3</p>
                                    </td>
                                    <td>12/05/2023</td>
                                    <td>
                                        <span className="status preparing">
                                            Chuẩn Bị
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {(10000).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status waiting">
                                            Khi nhận hàng
                                        </span>
                                    </td>
                                    <td>
                                        <span class="btn--show-modal">Xem</span>
                                    </td>
                                    <td>
                                        <span class="edit delete-cate">
                                            <i class="fas fa-tools"></i>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Name4</p>
                                    </td>
                                    <td>12/05/2023</td>
                                    <td>
                                        <span className="status delivering">
                                            Đang giao
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {(10000).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status waiting">
                                            Khi nhận hàng
                                        </span>
                                    </td>
                                    <td>
                                        <span class="btn--show-modal">Xem</span>
                                    </td>
                                    <td>
                                        <span class="edit delete-cate">
                                            <i class="fas fa-tools"></i>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Name5</p>
                                    </td>
                                    <td>12/05/2023</td>
                                    <td>
                                        <span className="status cancelled">
                                            Đã Hủy
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {(10000).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="status waiting">
                                            Khi nhận hàng
                                        </span>
                                    </td>
                                    <td>
                                        <span class="btn--show-modal">Xem</span>
                                    </td>
                                    <td>
                                        <span class="edit delete-cate">
                                            <i class="fas fa-tools"></i>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default DonHang;
