import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themSP } from "../cartSlice";

import "./Search.css";
import "../Products/Products.css";
import Navbar from "../Navbar/Navbar";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.listSP);
    const [colors, setColors] = useState({});
    const [selectedColorIds, setSelectedColorIds] = useState({});
    const user = useSelector((state) => state.auth.user);
    const checkLogin = useSelector((state) => state.auth.daDangNhap);
    const idUser = user ? user.id_user : null;
    const [favorites, setFavorites] = useState(new Set());

    const selectColor = useCallback((productId, colorId) => {
        setSelectedColorIds((prev) => ({
            ...prev,
            [productId]: colorId,
        }));
    }, []);
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

    useEffect(() => {
        // Fetch danh sách sản phẩm từ API khi component được render
        fetch("http://localhost:4000/products/search/" + searchTerm)
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data);
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
    }, [searchTerm, idUser]);

    // Hàm xử lý khi người dùng thay đổi giá trị tìm kiếm
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        // Nếu giá trị tìm kiếm không rỗng, hiển thị kết quả tìm kiếm
        setShowResults(event.target.value !== "");
    };

    // Hàm xử lý khi người dùng nhấn nút tìm kiếm
    const handleSubmit = (event) => {
        event.preventDefault();
        // Lọc danh sách sản phẩm dựa trên giá trị tìm kiếm
        const filteredResults = searchResults.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Hiển thị danh sách sản phẩm phù hợp
        setSearchResults(filteredResults);
        setShowResults(true); // Hiển thị kết quả tìm kiếm
    };

    return (
        <div className="search">
            <Navbar />
            <h4>Tìm kiếm sản phẩm của bạn....</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </form>
            {/* Hiển thị kết quả tìm kiếm chỉ khi showResults là true */}
            {showResults && (
                <div className="search-results">
                    {searchResults.map((product, index) => (
                        <div className="products-item" key={index}>
                            <div className="products-main">
                                <div className="products-main-content">
                                    {colors[product.id_pd]?.map((color) =>
                                        selectedColorIds[product.id_pd] ===
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
                                                    to={`/product/${product["id_pd"]}`}
                                                    className="products-social-link"
                                                    onClick={() =>
                                                        HandleOnCLickView(
                                                            product
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-search"></i>
                                                </Link>
                                            </li>
                                            <li className="products-social-item">
                                                <span
                                                    className="products-social-link cart"
                                                    onClick={() =>
                                                        handleAddToCart(product)
                                                    }
                                                >
                                                    <i className="fas fa-cart-plus"></i>
                                                </span>
                                            </li>
                                            <li className="products-social-item">
                                                <span
                                                    className={`products-social-link cart ${
                                                        favorites.has(
                                                            product.id_pd
                                                        )
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        HandleOnClickFavorite(
                                                            product
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
                                        {product["name"]}
                                    </h4>
                                    <div className="products-color-list">
                                        {colors[product.id_pd]?.map((color) => (
                                            <div
                                                key={color.id_pd_detail}
                                                className={`products-color-item ${
                                                    selectedColorIds[
                                                        product.id_pd
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
                                                        product.id_pd,
                                                        color.id_pd_detail
                                                    )
                                                }
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="products-price">
                                        <span>
                                            {parseInt(
                                                product["price_sale"]
                                            ).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                        <del>
                                            {parseInt(
                                                product["price"]
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
            )}
        </div>
    );
}

export default Search;
