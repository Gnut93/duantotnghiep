import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import "./Products.css";
import { themSP } from "../cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

const Products = () => {
    let { id_cate } = useParams();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.listSP);
    const [sp, setSP] = useState([]);
    const [sortedSP, setSortedSP] = useState([]);
    const [loai, setLoai] = useState([]);
    const [colors, setColors] = useState({});
    const [selectedColorIds, setSelectedColorIds] = useState({});
    const [sortOption, setSortOption] = useState("default");
    const [favorites, setFavorites] = useState(new Set());
    const user = useSelector((state) => state.auth.user);
    const checkLogin = useSelector((state) => state.auth.daDangNhap);
    const idUser = user ? user.id_user : null;

    const selectColor = useCallback((productId, colorId) => {
        setSelectedColorIds((prev) => ({
            ...prev,
            [productId]: colorId,
        }));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:4000/products/list/category/${id_cate}`)
            .then((res) => res.json())
            .then((data) => {
                setSP(data);
                data.forEach((product) => {
                    checkFavorite(product.id_pd, idUser);
                });
                const initialColorIds = {};
                const colorPromises = data.map((product) =>
                    fetch(
                        `http://localhost:4000/products/product-detail/${product.id_pd}`
                    )
                        .then((res) => res.json())
                        .then((colorData) => {
                            setColors((prevColors) => ({
                                ...prevColors,
                                [product.id_pd]: colorData.map((color) => ({
                                    ...color,
                                    maxQuantity: color.quantity, // Lưu trữ số lượng tối đa cho mỗi màu
                                })),
                            }));
                            if (colorData.length > 0) {
                                initialColorIds[product.id_pd] =
                                    colorData[0].id_pd_detail;
                            }
                        })
                );

                Promise.all(colorPromises).then(() => {
                    setSelectedColorIds(initialColorIds);
                });
            });
        fetch(`http://localhost:4000/category/${id_cate}`)
            .then((res) => res.json())
            .then((data) => setLoai(data));
    }, [id_cate, idUser]);

    useEffect(() => {
        let sortedProducts = [...sp];
        if (sortOption === "date") {
            sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortOption === "price") {
            sortedProducts.sort((a, b) => a.price_sale - b.price_sale);
        } else if (sortOption === "views") {
            sortedProducts.sort((a, b) => b.views - a.views);
        }
        setSortedSP(sortedProducts);
    }, [sortOption, sp]);

    const handleAddToCart = (product) => {
        const id_pd_detail = selectedColorIds[product.id_pd];
        const nameColor = colors[product.id_pd].find(
            (color) => color.id_pd_detail === id_pd_detail
        ).color;
        const maxQuantity = colors[product.id_pd].find(
            (color) => color.id_pd_detail === id_pd_detail
        ).quantity;
        const colorInfo = colors[product.id_pd].find(
            (color) => color.id_pd_detail === id_pd_detail
        );

        if (!colorInfo) {
            alert("Màu sắc không hợp lệ.");
            return;
        }

        const currentProductInCart = cart.find(
            (p) => p.id_pd === product.id_pd && p.id_pd_detail === id_pd_detail
        );
        if (colorInfo.maxQuantity <= 0) {
            alert(`Sản phẩm đã hết hàng.`);
        } else if (
            currentProductInCart &&
            currentProductInCart.soluong + 1 > colorInfo.maxQuantity
        ) {
            alert(`Số lượng tối đa cho màu này là ${colorInfo.maxQuantity}.`);
        } else {
            // Logic để thêm sản phẩm vào giỏ hàng hoặc tăng số lượng
            dispatch(
                themSP({
                    ...product,
                    id_pd_detail,
                    nameColor,
                    maxQuantity,
                    soluong: currentProductInCart
                        ? currentProductInCart.soluong + 1
                        : 1,
                })
            );
        }
    };

    const checkFavorite = async (id_pd, id_user) => {
        try {
            const url = "http://localhost:4000/favorite/check-favorite";
            const opt = {
                method: "post",
                body: JSON.stringify({ id_pd: id_pd, id_user: id_user }),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            if (responseData.exists) {
                setFavorites((prev) => new Set(prev.add(id_pd)));
            }
            return responseData.exists; // Trả về true nếu sản phẩm đã được yêu thích, ngược lại trả về false
        } catch (error) {
            console.error("Lỗi khi kiểm tra sản phẩm yêu thích: ", error);
            return false;
        }
    };

    const HandleOnClickFavorite = async (item) => {
        if (checkLogin === true) {
            const id_pd = item.id_pd;
            const id_user = idUser;
            try {
                // Kiểm tra xem sản phẩm đã được yêu thích hay chưa
                const isFavorite = await checkFavorite(id_pd, id_user);
                if (isFavorite) {
                    // Nếu sản phẩm đã có trong danh sách yêu thích, gọi endpoint xóa
                    const url = `http://localhost:4000/favorite/delete/${id_user}/${id_pd}`;
                    const opt = {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    };
                    const res = await fetch(url, opt);
                    if (!res.ok) {
                        throw new Error(
                            "Xóa sản phẩm khỏi danh sách yêu thích không thành công"
                        );
                    }
                    return;
                }
                // Nếu sản phẩm chưa được yêu thích, thêm vào danh sách yêu thích
                const addUrl = "http://localhost:4000/favorite/add";
                const addOpt = {
                    method: "post",
                    body: JSON.stringify({ id_pd: id_pd, id_user: id_user }),
                    headers: { "Content-Type": "application/json" },
                };
                const addRes = await fetch(addUrl, addOpt);
                if (!addRes.ok) {
                    throw new Error(
                        "Thêm sản phẩm vào danh sách yêu thích không thành công"
                    );
                }
            } catch (error) {
                console.error(
                    "Lỗi khi thao tác với danh sách yêu thích sản phẩm: ",
                    error
                );
            }
        } else {
            alert("Vui lòng đăng nhập để thực hiện thao tác này");
        }
    };

    const HandleOnCLickView = async (sp) => {
        const id = sp.id_pd;
        try {
            const url = `http://localhost:4000/products/view/${id}`;
            const opt = {
                method: "put",
                body: JSON.stringify({ id: id }),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            console.log(responseData);
        } catch (error) {
            console.error("Lỗi khi tăng view: ", error);
        }
    };
    // Handle sorting option change
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };
    function HienSPTrongMotTrang({ spTrongTrang }) {
        return (
            <>
                <div className="filter">
                    <div className="filter-size">
                        Tìm kiếm sản phẩm theo : &nbsp;
                        <select value={sortOption} onChange={handleSortChange}>
                            <option value="default">Mặc định</option>
                            <option value="date">Ngày tháng</option>
                            <option value="price">Giá</option>
                            <option value="views">Lượt xem</option>
                        </select>
                    </div>
                </div>
                <div className="home-product">
                    {spTrongTrang.slice(0, 12).map((sp, i) => (
                        <div className="products-item" key={i}>
                            <div className="products-main">
                                <div className="products-main-content">
                                    {colors[sp.id_pd]?.map((color) =>
                                        selectedColorIds[sp.id_pd] ===
                                        color.id_pd_detail ? (
                                            <img
                                                key={color.id_pd_detail}
                                                src={color.image}
                                                alt={color.name}
                                                className="products-image"
                                            />
                                        ) : (
                                            ""
                                        )
                                    )}
                                    <div className="products-content">
                                        <ul className="products-social">
                                            <li className="products-social-item">
                                                <Link
                                                    to={`/product/${sp["id_pd"]}`}
                                                    className="products-social-link"
                                                    onClick={() =>
                                                        HandleOnCLickView(sp)
                                                    }
                                                >
                                                    <i className="fas fa-search"></i>
                                                </Link>
                                            </li>
                                            <li className="products-social-item">
                                                <span
                                                    className="products-social-link cart"
                                                    onClick={() =>
                                                        handleAddToCart(sp)
                                                    }
                                                >
                                                    <i className="fas fa-cart-plus"></i>
                                                </span>
                                            </li>
                                            <li className="products-social-item">
                                                <span
                                                    className={`products-social-link cart ${
                                                        favorites.has(sp.id_pd)
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        HandleOnClickFavorite(
                                                            sp
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="products-info">
                                    <h4 className="products-name">
                                        {sp["name"]}
                                    </h4>
                                    <div className="products-color-list">
                                        {colors[sp.id_pd]?.map((color) => (
                                            <div
                                                key={color.id_pd_detail}
                                                className={`products-color-item ${
                                                    selectedColorIds[
                                                        sp.id_pd
                                                    ] === color.id_pd_detail
                                                        ? "active"
                                                        : ""
                                                }`}
                                                style={{
                                                    backgroundColor:
                                                        color.color_code,
                                                }}
                                                onClick={() =>
                                                    selectColor(
                                                        sp.id_pd,
                                                        color.id_pd_detail
                                                    )
                                                }
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="products-price">
                                        <span>
                                            {parseInt(
                                                sp["price_sale"]
                                            ).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                        <del>
                                            {parseInt(
                                                sp["price"]
                                            ).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </del>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    function PhanTrang({ pageSize }) {
        const [fromIndex, setfromIndex] = useState(0);
        const toIndex = fromIndex + pageSize;
        const spTrong1Trang = sortedSP.slice(fromIndex, toIndex);
        const tongSoTrang = Math.ceil(sortedSP.length / pageSize);
        const chuyenTrang = (event) => {
            const newIndex = (event.selected * pageSize) % sortedSP.length;
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
                    className="phantrang1"
                    activeClassName="active"
                />
            </>
        );
    }
    return (
        <section className="product">
            <Navbar></Navbar>
            <div className="container">
                <h2 className="product-heading">{loai.name}</h2>
                <PhanTrang pageSize={9} />
            </div>
        </section>
    );
};

export default Products;
