import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
    const [listSp, setListSP] = useState([]);
    const [listColor, setListColor] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/products/col/list")
            .then((res) => res.json())
            .then(setListColor);
        fetch("http://localhost:4000/products/list")
            .then((res) => res.json())
            .then(setListSP);
    }, []);

    const newListColor = listColor.map((color) => {
        const { name, ...rest } = color;
        return { name_color: name, ...rest };
    });
    const listProduct = newListColor.map((color) => {
        const sp = listSp.find((sp) => sp.id_pd === color.id_pd);
        return { ...color, ...sp };
    });

    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Tổng quan</h1>
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
                <ul className="box-info">
                    <li>
                        <i className="bx bxs-calendar-check"></i>
                        <span className="text">
                            <h3>0</h3>
                            <p>Đơn hàng</p>
                        </span>
                    </li>
                    <li>
                        <i className="bx bxs-group"></i>
                        <span className="text">
                            <h3>0</h3>
                            <p>Người dùng</p>
                        </span>
                    </li>
                    <li>
                        <i className="bx bxs-dollar-circle"></i>
                        <span className="text">
                            <h3>0</h3>
                            <p>Doanh thu</p>
                        </span>
                    </li>
                </ul>
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
                                    <th></th>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Những Mặt Hàng Đã Và Sắp Hết</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên Hàng</th>
                                    <th>Màu</th>
                                    <th>Số Lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProduct
                                    .sort(
                                        (product, sp) =>
                                            product.quantity - sp.quantity
                                    )
                                    .slice(0, 10)

                                    .map((product, i) => (
                                        <tr key={i}>
                                            <td>
                                                <p>{i + 1}</p>
                                            </td>
                                            <td>
                                                <p>{product.name}</p>
                                            </td>
                                            <td>
                                                <p>{product.name_color}</p>
                                            </td>
                                            <td>
                                                <p>{product.quantity}</p>
                                            </td>
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

export default Home;
