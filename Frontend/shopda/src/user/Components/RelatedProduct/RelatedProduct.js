import React, { useCallback, useEffect, useState } from 'react';
import './RelatedProduct.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { themSP } from '../cartSlice';

const RelatedProduct = ({ id = '' }) => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState({});
  const [selectedColorIds, setSelectedColorIds] = useState({});
  const cart = useSelector((state) => state.cart.listSP);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:4000/products/list/category/${id}`)
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
                  maxQuantity: color.quantity, // Lưu trữ số lượng tối đa cho mỗi màu
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
  }, [id]);

  const selectColor = useCallback((productId, colorId) => {
    setSelectedColorIds((prev) => ({
      ...prev,
      [productId]: colorId,
    }));
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
    if (
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

  return (
    <section className="related">
      <div className="container">
        <h3 className="related-heading">Sản Phẩm Liên Quan</h3>
        <div className="related-product">
          {products.slice(0, 4).map((item, i) => (
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
                          className="products-social-link">
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
                        <span className="products-social-link">
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
                        style={{ backgroundColor: color.code }}
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
    </section>
  );
};

export default RelatedProduct;
