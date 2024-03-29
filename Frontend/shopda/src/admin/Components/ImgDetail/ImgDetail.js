import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const ImgDetail = () => {
    const [listsp, setListSP] = useState([]);
    const [listImg, setListImg] = useState([]);
    const [selectedSP, setSelectedSP] = useState("");
    // const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/products/list")
            .then((res) => res.json())
            .then(setListSP);
        fetch("http://localhost:4000/products/img/list")
            .then((res) => res.json())
            .then(setListImg);
    }, []);

    const xoaHinh = (id) => {
        if (window.confirm("Xóa hình sản phẩm không?")) {
            fetch(`http://localhost:4000/admin-products/delete-image/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Đã xóa  hình thành công");
                    fetch("http://localhost:4000/products/img/list")
                        .then((res) => res.json())
                        .then((data) => setListImg(data))
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
            ? listImg
            : // eslint-disable-next-line eqeqeq
              listImg.filter((item) => item.id_pd == selectedSP);

    function HienSPTrongMotTrang({ spTrongTrang }) {
        return (
            <table className="tab-content active">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình</th>
                        <th>Id_pd</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {spTrongTrang.map((sp, i) => (
                        <tr key={i}>
                            <td>
                                <p>{sp.id_img}</p>
                            </td>
                            <td>
                                <img src={sp.name} alt="#" />
                            </td>
                            <td>{sp.id_pd}</td>
                            <td>
                                <Link to={`/admin/EditHinh/${sp.id_img}`}>
                                    <span className="btn--show-modal">
                                        <i className="fas fa-tools"></i>
                                    </span>
                                </Link>
                            </td>
                            <td>
                                <span
                                    className="delete-cate"
                                    onClick={() => xoaHinh(sp.id_img)}
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
                        <h1>Hình ảnh sản phẩm</h1>
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
                            <h3>Hình Ảnh</h3>
                        </div>
                        <PhanTrang pageSize={16} />
                    </div>
                </div>
            </main>
        </section>
    );
};

export default ImgDetail;
