import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";

const DonHangCustom = () => {
    const [listBillCustom, setListBillCustom] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/custom/list")
            .then((res) => res.json())
            .then(setListBillCustom);
    }, []);
    // const BillStatus = ({ status }) => {
    //     switch (status) {
    //         case "chờ":
    //             return <span className="status waiting">Chờ</span>;
    //         case "hoàn thành":
    //             return <span className="status success">Hoàn Thành</span>;
    //         case "chuẩn bị":
    //             return <span className="status preparing">Chuẩn Bị</span>;
    //         case "đang giao":
    //             return <span className="status delivering">Đang giao</span>;
    //         case "đã hủy":
    //             return <span className="status cancelled">Đã Hủy</span>;
    //         default:
    //             return <span className="status">Không xác định</span>;
    //     }
    // };

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
                        <h1>Đơn Hàng</h1>
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
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Những Đơn Đặt Hàng Gần Đây</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>tên Sản Phẩm</th>
                                    <th>Size</th>
                                    <th>Email</th>
                                    <th>Màu Sản Phẩm</th>
                                    <th>Hình</th>
                                    <th>SĐT</th>
                                    <th>Mô Tả</th>
                                    <th>Ngày Tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBillCustom.map((bill, i) => (
                                    <tr key={i}>
                                        <td>
                                            <p>{bill.name}</p>
                                        </td>
                                        <td>
                                            <p>{bill.size}</p>
                                        </td>
                                        <td>
                                            <p>{bill.email}</p>
                                        </td>
                                        <td>
                                            <p>{bill.color}</p>
                                        </td>
                                        <td>
                                            <img src={bill.image} alt="#" />
                                        </td>
                                        <td>
                                            <p>{bill.phone}</p>
                                        </td>
                                        <td>
                                            <p>{bill.description}</p>
                                        </td>
                                        <td>
                                            <p>
                                                {new Date(
                                                    bill.created_date
                                                ).toLocaleDateString("vi")}
                                            </p>
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

export default DonHangCustom;
