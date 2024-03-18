import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const ColorDetail = () => {
    const [listsp, setListSP] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [selectedSP, setSelectedSP] = useState("");
    useEffect(() => {
        fetch("http://localhost:4000/products/list")
            .then((res) => res.json())
            .then(setListSP);
        fetch("http://localhost:4000/products/col/list")
            .then((res) => res.json())
            .then(setListColor);
    }, []);

    const xoaMau = (id) => {
        if (window.confirm("Xóa sản phẩm không?")) {
            fetch(`http://localhost:4000/admin-products/delete-color/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Đã xóa Màu thành công");

                    fetch("http://localhost:4000/products/col/list")
                        .then((res) => res.json())
                        .then((data) => setListColor(data))
                        .catch((error) =>
                            console.error("Lỗi cập nhật danh sách Màu:", error)
                        );
                })
                .catch((error) => console.error("Lỗi xóa Màu:", error));
        }
    };

    const handleLoaiChange = useCallback((event) => {
        setSelectedSP(event.target.value);
    }, []);

    // Lọc danh sách sản phẩm theo loại sản phẩm đã chọn
    const filteredProducts =
        selectedSP === ""
            ? listColor
            : // eslint-disable-next-line eqeqeq
              listColor.filter((item) => item.id_pd == selectedSP);

    function HienSPTrongMotTrang({ spTrongTrang }) {
        return (
            <table className="tab-content active">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Màu</th>
                        <th>Id_pd</th>
                        <th>Quantity</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {spTrongTrang.map((sp, i) => (
                        <tr key={i}>
                            <td>
                                <p>{sp.id_color}</p>
                            </td>
                            <td>
                                <p>{sp.name}</p>
                            </td>
                            <td>{sp.id_pd}</td>
                            <td>{sp.Quantity}</td>
                            <td>
                                <Link to={`/admin/EditMau/${sp.id_color}`}>
                                    <span className="btn--show-modal">
                                        <i className="fas fa-tools"></i>
                                    </span>
                                </Link>
                            </td>
                            <td>
                                <span
                                    className="delete-cate"
                                    onClick={() => xoaMau(sp.id_color)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
    function PhanTrang({ pageSize }) {
        const [fromIndex, setfromIndex] = useState(0);
        const toIndex = fromIndex + pageSize;
        const spTrong1Trang = filteredProducts.slice(fromIndex, toIndex);
        const tongSoTrang = Math.ceil(filteredProducts.length / pageSize);
        const chuyenTrang = (event) => {
            const newIndex =
                (event.selected * pageSize) % filteredProducts.length;
            setfromIndex(newIndex);
        };
        return (
            <>
                <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
                <ReactPaginate
                    nextLabel=">"
                    previousLabel="<"
                    pageCount={tongSoTrang}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    onPageChange={chuyenTrang}
                    renderOnZeroPageCount={null}
                    className="thanhphantrang1"
                    activeClassName="active"
                />
            </>
        );
    }

    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Màu Sản Phẩm</h1>
                    </div>
                    <div className="checkout-address-input">
                        <select
                            name="cate"
                            className="option-cate"
                            onChange={handleLoaiChange}
                        >
                            <option value="">Tất cả</option>
                            {listsp.map((products, i) => (
                                <option key={i} value={products.id_pd}>
                                    {products.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Sản phẩm</h3>
                            <i className="bx bx-search"></i>
                            <i className="bx bx-filter"></i>
                        </div>
                        <PhanTrang pageSize={16} />
                    </div>
                </div>
            </main>
        </section>
    );
};

export default ColorDetail;
