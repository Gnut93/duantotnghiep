import React, { useEffect, useState } from "react";
import "./LoaiHang.css";
import { Link } from "react-router-dom";
const LoaiHang = () => {
    const [listLoai, setListLoai] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/category/list")
            .then((res) => res.json())
            .then(setListLoai);
    }, []);

    const xoaLoai = (id) => {
        if (window.confirm("Xóa Loại không?")) {
            fetch(`http://localhost:4000/admin-category/delete/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => {
                    alert("Đã xóa Loại thành công");
                    fetch("http://localhost:4000/category/list")
                        .then((res) => res.json())
                        .then((data) => setListLoai(data))
                        .catch((error) =>
                            console.error("Lỗi cập nhật danh sách Loại:", error)
                        );
                })
                .catch((error) => console.error("Lỗi xóa loại:", error));
        }
    };

    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Loại hàng</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Loại</h3>
                        </div>
                        <table class="tab-content active">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody class="categories">
                                {listLoai.map((loai, i) => (
                                    <tr key={i}>
                                        <td>
                                            <p>{loai.id_cate}</p>
                                        </td>
                                        <td>
                                            <p>{loai.name}</p>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/EditLoai/${loai.id_cate}`}
                                            >
                                                <span className="btn--show-modal">
                                                    <i className="fas fa-tools"></i>
                                                </span>
                                            </Link>
                                        </td>
                                        <td>
                                            <span
                                                class="delete-cate"
                                                onClick={() =>
                                                    xoaLoai(loai.id_cate)
                                                }
                                            >
                                                <i class="fas fa-trash-alt"></i>
                                            </span>
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

export default LoaiHang;
