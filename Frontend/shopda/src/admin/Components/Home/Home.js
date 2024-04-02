import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, registerables } from "chart.js";
import { Link } from "react-router-dom";
Chart.register(CategoryScale);
Chart.register(...registerables);

const Home = () => {
    const [listSp, setListSP] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [listBill, setListBill] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/products/col/list")
            .then((res) => res.json())
            .then(setListColor);
        fetch("http://localhost:4000/products/list")
            .then((res) => res.json())
            .then(setListSP);
        fetch("http://localhost:4000/bill/list")
            .then((res) => res.json())
            .then(setListBill);
    }, []);

    const newListColor = listColor.map((color) => {
        const { name, ...rest } = color;
        return { name_color: name, ...rest };
    });
    const listProduct = newListColor.map((color) => {
        const sp = listSp.find((sp) => sp.id_pd === color.id_pd);
        return { ...color, ...sp };
    });
    const BillStatus = ({ status }) => {
        switch (status) {
            case "chờ":
                return <span className="status waiting">Chờ</span>;
            case "hoàn thành":
                return <span className="status success">Hoàn Thành</span>;
            case "chuẩn bị":
                return <span className="status preparing">Chuẩn Bị</span>;
            case "đang giao":
                return <span className="status delivering">Đang giao</span>;
            case "đã hủy":
                return <span className="status cancelled">Đã Hủy</span>;
            default:
                return <span className="status">Không xác định</span>;
        }
    };
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Chọn Tháng");
    const dropdownRef = useRef(null);

    // Cập nhật mảng này để chứa tên của 12 tháng.
    const months = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (value) => {
        setSelected(value);
        setIsOpen(false);
    };

    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Tổng quan</h1>
                    </div>
                    <div className="dropdown" ref={dropdownRef}>
                        <div
                            className="dropdown__select"
                            onClick={toggleDropdown}
                        >
                            <span className="dropdown__selected">
                                {selected}
                            </span>
                            <i
                                className={`fa fa-caret-down dropdown__caret ${
                                    isOpen ? "fa-caret-up" : ""
                                }`}
                            ></i>
                        </div>
                        {isOpen && (
                            <ul
                                className={`dropdown__list ${
                                    isOpen ? "show" : ""
                                }`}
                            >
                                {months.map((month) => (
                                    <li
                                        key={month}
                                        className="dropdown__item"
                                        onClick={() => handleSelect(month)}
                                    >
                                        {month}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="box-info">
                    <Link to={"/admin/donhang"}>
                        <div className="box-info-item">
                            <i className="bx bxs-calendar-check"></i>
                            <span className="text">
                                <h3>{listBill.length}</h3>
                                <p>Đơn hàng</p>
                            </span>
                        </div>
                    </Link>
                    <Link to={"/admin/nguoidung"}>
                        <div className="box-info-item">
                            <i className="bx bxs-group"></i>
                            <span className="text">
                                <h3>0</h3>
                                <p>Người dùng</p>
                            </span>
                        </div>
                    </Link>
                    <Link to={"/admin/donhang"}>
                        <div className="box-info-item">
                            <i className="bx bxs-dollar-circle"></i>
                            <span className="text">
                                <h3>0</h3>
                                <p>Doanh thu</p>
                            </span>
                        </div>
                    </Link>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Đơn Hàng Mới</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Người Dùng</th>
                                        <th>Trạng Thái</th>
                                        <th>Tổng tiền</th>
                                        <th>Thanh toán</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listBill.map((bill, i) => (
                                        <tr key={i}>
                                            <td>
                                                <p>{bill.name}</p>
                                            </td>
                                            <td>
                                                <BillStatus
                                                    status={bill.status.toLowerCase()}
                                                />
                                            </td>
                                            <td>
                                                <span>
                                                    {parseInt(
                                                        bill.total_price
                                                    ).toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="status waiting">
                                                    {bill.payment_type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="table-data">
                        <div className="order order-product">
                            <div className="head">
                                <h3> Hàng Đã Và Sắp Hết</h3>
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
                        <div className="order order-product">
                            <div className="head">
                                <h3> Hàng Bán Chạy</h3>
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

                    <div className="chart__box">
                        <Bar
                            className="box1"
                            data={{
                                labels: [
                                    "Tháng 1",
                                    "Tháng 2",
                                    "Tháng 3",
                                    "Tháng 4",
                                    "Tháng 5",
                                    "Tháng 6",
                                    "Tháng 7",
                                    "Tháng 8",
                                    "Tháng 9",
                                    "Tháng 10",
                                    "Tháng 11",
                                    "Tháng 12",
                                ],
                                datasets: [
                                    {
                                        label: "Doanh Thu (Triệu VND)",
                                        backgroundColor: [
                                            "#3e95cd",
                                            "#8e5ea2",
                                            "#3cba9f",
                                            "#e8c3b9",
                                            "#c45850",
                                            "#3e95cd",
                                            "#8e5ea2",
                                            "#3cba9f",
                                            "#e8c3b9",
                                            "#c45850",
                                            "#3e95cd",
                                            "#8e5ea2",
                                        ],
                                        data: [
                                            2478, 5267, 734, 784, 433, 10000,
                                            5000, 4000, 3000, 2500, 50, 500,
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "Predicted world population (millions) in 2050",
                                },
                            }}
                        />
                        <Bar
                            className="box2"
                            data={{
                                labels: [
                                    "Tháng 1",
                                    "Tháng 2",
                                    "Tháng 3",
                                    "Tháng 4",
                                    "Tháng 5",
                                    "Tháng 6",
                                    "Tháng 7",
                                    "Tháng 8",
                                    "Tháng 9",
                                    "Tháng 10",
                                    "Tháng 11",
                                    "Tháng 12",
                                ],
                                datasets: [
                                    {
                                        label: " Nguời Dùng ",
                                        backgroundColor: [
                                            "#3e95cd",
                                            "#8e5ea2",
                                            "#3cba9f",
                                            "#e8c3b9",
                                            "#c45850",
                                            "#3e95cd",
                                            "#8e5ea2",
                                            "#3cba9f",
                                            "#e8c3b9",
                                            "#c45850",
                                            "#3e95cd",
                                            "#8e5ea2",
                                        ],
                                        data: [
                                            50, 10, 100, 1, 5, 25, 100, 125, 30,
                                            80, 90, 100,
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "Predicted world population (millions) in 2050",
                                },
                            }}
                        />
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Home;
