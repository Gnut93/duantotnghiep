import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import "./Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
    const [listsp, setListSP] = useState([]);
    const [listLoai, setListLoai] = useState([]);
    const [selectedLoai, setSelectedLoai] = useState("");
    // const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/product/list")
            .then((res) => res.json())
            .then(setListSP);
        fetch("http://localhost:4000/category/list")
            .then((res) => res.json())
            .then(setListLoai);
    }, []);

    const xoaSP = (id) => {
        if (window.confirm("Xóa sản phẩm không?")) {
            fetch(`http://localhost:4000/adminsp/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => {
                    alert("Đã xóa sản phẩm thành công");
                    fetch("http://localhost:4000/list")
                        .then((res) => res.json())
                        .then((data) => setListSP(data))
                        .catch((error) =>
                            console.error(
                                "Lỗi cập nhật danh sách sản phẩm:",
                                error
                            )
                        );
                })
                .catch((error) => console.error("Lỗi xóa sản phẩm:", error));
        }
    };

    const handleLoaiChange = useCallback((event) => {
        setSelectedLoai(event.target.value);
    }, []);

    // Lọc danh sách sản phẩm theo loại sản phẩm đã chọn
    const filteredProducts =
        selectedLoai === ""
            ? listsp
            : // eslint-disable-next-line eqeqeq
              listsp.filter((item) => item.id_loai == selectedLoai);

    function HienSPTrongMotTrang({ spTrongTrang }) {
        return (
            <table className="tab-content active">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình</th>
                        <th className="name">
                            <p>Tên</p>
                        </th>
                        <th>Ngày nhập</th>
                        <th>Giá gốc</th>
                        <th>Giá KM</th>
                        <th>Xem</th>
                        <th>Hot</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {spTrongTrang.map((sp, i) => (
                        <tr key={i}>
                            <td>
                                <p>{sp.id_sp}</p>
                            </td>
                            <td>
                                <img src={sp.hinh} alt="#" />
                            </td>
                            <td>
                                <p>{sp.ten_sp}</p>
                            </td>
                            <td>
                                {new Date(sp.ngay).toLocaleDateString("vi")}
                            </td>
                            <td>
                                {parseInt(sp.gia).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </td>
                            <td>
                                {parseInt(sp.gia_km).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </td>
                            <td>{sp.soluotxem}</td>
                            <td>{sp.anhien}</td>
                            <td>{sp.hot}</td>
                            <td>
                                <Link to={`/edit/${sp.id_sp}`}>
                                    <span className="btn--show-modal">
                                        <i className="fas fa-tools"></i>
                                    </span>
                                </Link>
                            </td>
                            <td>
                                <span
                                    className="edit delete-living"
                                    onClick={() => xoaSP(sp.id_sp)}
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
                        <h1>Kho hàng</h1>
                    </div>
                    <div className="checkout-address-input">
                        <select
                            name="cate"
                            className="option-cate"
                            onChange={handleLoaiChange}
                        >
                            <option value="">Tất cả</option>
                            {listLoai.map((loai, i) => (
                                <option key={i} value={loai.id_loai}>
                                    {loai.ten_loai}
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

export default Shop;
