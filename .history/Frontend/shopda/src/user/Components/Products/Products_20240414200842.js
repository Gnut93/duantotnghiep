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
  const [loai, setLoai] = useState([]);
  const [colors, setColors] = useState({});
  const [selectedColorIds, setSelectedColorIds] = useState({});
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
                initialColorIds[product.id_pd] = colorData[0].id_pd_detail;
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
  }, [id_cate]);
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
          soluong: currentProductInCart ? currentProductInCart.soluong + 1 : 1,
        })
      );
    }
  };

  const user = useSelector((state) => state.auth.user);
  const checkLogin = useSelector((state) => state.auth.daDangNhap);
  const idUser = user ? user.id_user : null;
  const HandleOnClickFavorite = async (sp) => {
    if (checkLogin === true) {
      const id_pd = sp.id_pd;
      const id_user = idUser;
      console.log(id_pd, id_user);
      try {
        const url = "http://localhost:4000/favorite/add";
        const opt = {
          method: "post",
          body: JSON.stringify({ id_pd: id_pd, id_user: id_user }),
          headers: { "Content-Type": "application/json" },
        };
        const res = await fetch(url, opt);
        const responseData = await res.json();
        alert("Đã thêm vào danh sách yêu thích", responseData);
      } catch (error) {
        console.error("Lỗi khi thêm yêu thích sản phẩm: ", error);
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
  function HienSPTrongMotTrang({ spTrongTrang }) {
    return (
      <div className="home-wrapper">
        <div>Tìm kiếm theo</div><select>
          <option>
            
          </option>
        </select>
        <div className="home-product">
          {spTrongTrang.slice(0, 12).map((sp, i) => (
            <div className="products-item" key={i}>
              <div className="products-main">
                <div className="products-main-content">
                  {colors[sp.id_pd]?.map((color) =>
                    selectedColorIds[sp.id_pd] === color.id_pd_detail ? (
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
                          onClick={() => HandleOnCLickView(sp)}
                        >
                          <i className="fas fa-search"></i>
                        </Link>
                      </li>
                      <li className="products-social-item">
                        <span
                          className="products-social-link cart"
                          onClick={() => handleAddToCart(sp)}
                        >
                          <i className="fas fa-cart-plus"></i>
                        </span>
                      </li>
                      <li className="products-social-item">
                        <span
                          className="products-social-link cart"
                          onClick={() => HandleOnClickFavorite(sp)}
                        >
                          <i className="fas fa-heart"></i>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="products-info">
                  <h4 className="products-name">{sp["name"]}</h4>
                  <div className="products-color-list">
                    {colors[sp.id_pd]?.map((color) => (
                      <div
                        key={color.id_pd_detail}
                        className={`products-color-item ${
                          selectedColorIds[sp.id_pd] === color.id_pd_detail
                            ? "active"
                            : ""
                        }`}
                        style={{
                          backgroundColor: color.color_code,
                        }}
                        onClick={() =>
                          selectColor(sp.id_pd, color.id_pd_detail)
                        }
                      ></div>
                    ))}
                  </div>
                  <div className="products-price">
                    <span>
                      {parseInt(sp["price_sale"]).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <del>
                      {parseInt(sp["price"]).toLocaleString("vi-VN", {
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
      </div>
    );
  }

  function PhanTrang({ pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = sp.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(sp.length / pageSize);
    const chuyenTrang = (event) => {
      const newIndex = (event.selected * pageSize) % sp.length;
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
