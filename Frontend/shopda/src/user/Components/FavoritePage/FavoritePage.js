import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { themSP } from '../cartSlice';
import Navbar from '../Navbar/Navbar';
import './Favorite.css';

const FavoritePage = () => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState({});
  const [selectedColorIds, setSelectedColorIds] = useState({});
  const cart = useSelector((state) => state.cart.listSP);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`http://localhost:4000/products/list/view/8`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialColorIds = {};
        const colorPromises = data.map((product) =>
          fetch(`http://localhost:4000/products/color/${product.id_pd}`)
            .then((res) => res.json())
            .then((colorData) => {
              setColors((prevColors) => ({
                ...prevColors,
                [product.id_pd]: colorData.map((color) => ({
                  ...color,
                  maxQuantity: color.quantity,
                })),
              }));
              if (colorData.length > 0) {
                initialColorIds[product.id_pd] = colorData[0].id_color;
              }
            })
        );

        Promise.all(colorPromises).then(() => {
          setSelectedColorIds(initialColorIds);
        });
      });
  }, []);

  const handleAddToCart = (product) => {
    const id_color = selectedColorIds[product.id_pd];
    const nameColor = colors[product.id_pd].find(
      (color) => color.id_color === id_color
    ).name;
    const maxQuantity = colors[product.id_pd].find(
      (color) => color.id_color === id_color
    ).quantity;
    const colorInfo = colors[product.id_pd].find(
      (color) => color.id_color === id_color
    );

    if (!colorInfo) {
      alert('Màu sắc không hợp lệ.');
      return;
    }

    const currentProductInCart = cart.find(
      (p) => p.id_pd === product.id_pd && p.id_color === id_color
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
          id_color,
          nameColor,
          maxQuantity,
          soluong: currentProductInCart ? currentProductInCart.soluong + 1 : 1,
        })
      );
    }
  };
  const selectColor = useCallback((productId, colorId) => {
    setSelectedColorIds((prev) => ({
      ...prev,
      [productId]: colorId,
    }));
  }, []);

  const user = useSelector((state) => state.auth.user);
  const checkLogin = useSelector((state) => state.auth.daDangNhap);
  const idUser = user ? user.id_user : null;
  const HandleOnClickFavorite = async (item) => {
    if (checkLogin === true) {
      const id_pd = item.id_pd;
      const id_user = idUser;
      console.log(id_pd, id_user);
      try {
        const url = 'http://localhost:4000/favorite/add';
        const opt = {
          method: 'post',
          body: JSON.stringify({ id_pd: id_pd, id_user: id_user }),
          headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(url, opt);
        const responseData = await res.json();
        alert('Đã thêm vào danh sách yêu thích', responseData);
      } catch (error) {
        console.error('Lỗi khi thêm yêu thích sản phẩm: ', error);
      }
    } else {
      alert('Vui lòng đăng nhập để thực hiện thao tác này');
    }
  };
  const HandleOnCLickView = async (item) => {
    const id_pd = item.id_pd;
    try {
      const url = `http://localhost:4000/products/view/${id_pd}`;
      const opt = {
        method: 'put',
        body: JSON.stringify({ id_pd: id_pd }),
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await fetch(url, opt);
      const responseData = await res.json();
      console.log(responseData);
    } catch (error) {
      console.error('Lỗi khi thêm yêu thích sản phẩm: ', error);
    }
  };
  return (
    <section className="favorite">
      <Navbar />
      <div className="container">
        <div className="favorite-main">
          <h3 className="related-heading">Sản phẩm bạn đã thích</h3>
          <div className="related-product">
            {products.map((item, i) => (
              <div
                className="products-item"
                key={i}>
                <div className="products-main">
                  <div className="products-main-content">
                    <img
                      className="products-image"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="products-content">
                      <ul className="products-social">
                        <li className="products-social-item">
                          <Link
                            to={`/product/${item.id_pd}`}
                            className="products-social-link"
                            onClick={() => HandleOnCLickView(item)}>
                            <i className="fas fa-search"></i>
                          </Link>
                        </li>
                        <li className="products-social-item">
                          <span
                            className="products-social-link cart"
                            onClick={() => handleAddToCart(item)}>
                            <i className="fas fa-cart-plus"></i>
                          </span>
                        </li>
                        <li className="products-social-item">
                          <span
                            className="products-social-link"
                            onClick={() => HandleOnClickFavorite(item)}>
                            <i className="fas fa-heart"></i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="products-info">
                    <h4 className="products-name">{item.name}</h4>
                    <div className="products-color-list">
                      {colors[item.id_pd]?.map((color) => (
                        <div
                          key={color.id_color}
                          className={`products-color-item ${
                            selectedColorIds[item.id_pd] === color.id_color
                              ? 'active'
                              : ''
                          }`}
                          style={{
                            backgroundColor: color.code,
                          }}
                          onClick={() =>
                            selectColor(item.id_pd, color.id_color)
                          }></div>
                      ))}
                    </div>
                    <div className="products-price">
                      <span>
                        {parseInt(item.price_sale).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                      <del>
                        {parseInt(item.price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </del>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoritePage;
