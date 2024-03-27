import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { suaSL, xoaSP } from '../cartSlice';
import './Showcart.css';
import Navbar from '../Navbar/Navbar';

const ShowCar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);
  const [productColors, setProductColors] = useState([]);

  useEffect(() => {
    cart.forEach((product) => {
      fetch(`http://localhost:4000/products/color/list/${product.id_pd}`)
        .then((res) => res.json())
        .then((colorData) => {
          setProductColors(colorData);
        });
    });
  }, [cart]);
  const handleRemoveItem = useCallback(
    (id_color) => () => {
      dispatch(xoaSP({ id_color }));
    },
    [dispatch]
  );

  const handleChangeQuantity = useCallback(
    (id, id_color, e) => {
      const newQuantity = parseInt(e.target.value, 10) || 0;
      const colorInfo = productColors.find(
        (color) => color.id_color === id_color && color.id_pd === id
      ).quantity;
      console.log(newQuantity);
      if (newQuantity < 1) {
        dispatch(xoaSP({ id_color }));
      } else if (colorInfo && newQuantity <= colorInfo) {
        dispatch(suaSL({ id_pd: id, id_color, soluong: newQuantity }));
      } else {
        alert(`Số lượng tối đa là ${colorInfo}`);
      }
    },
    [dispatch, productColors]
  );

  const subTotal = useMemo(() => {
    return cart.reduce((total, sp) => total + sp.price_sale * sp.soluong, 0);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <section className="cart">
        <Navbar></Navbar>
        <div className="container">
          <h3 className="cart-heading">Giỏ Hàng Trống</h3>
          <Link
            to="/shop"
            className="cart-comback">
            Mua hàng
          </Link>
        </div>
      </section>
    );
  }
  console.log(cart);
  return (
    <section className="cart">
      <Navbar></Navbar>
      <div className="container">
        <h3 className="cart-heading">Giỏ Hàng</h3>
        <Link
          to="/shop"
          className="cart-comback">
          Tiếp tục mua hàng
        </Link>
        <div className="cart-info">
          <table className="cart-table">
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td>Sản phẩm</td>
                <td>Màu</td>
                <td>Giá</td>
                <td>Số lượng</td>
                <td>Tổng tiền</td>
              </tr>
            </thead>
            <tbody className="cart-product">
              {cart.map((sp, index) => (
                <tr
                  className="item"
                  key={index}>
                  <td onClick={handleRemoveItem(sp.id_color)}>
                    <span className="cart-remove">
                      <i className="fas fa-times icon"></i>
                    </span>
                  </td>
                  <td>
                    <img
                      src={sp.image}
                      alt={sp.name}
                    />
                  </td>
                  <td>
                    <h5>{sp.name}</h5>
                  </td>
                  <td>
                    <p>{sp.nameColor}</p>
                  </td>
                  <td>
                    <h5>
                      <span>
                        {parseInt(sp.price_sale).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </h5>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input-number"
                      value={sp.soluong ? sp.soluong.toString() : '0'}
                      min="0"
                      max={sp.maxQuantity}
                      onChange={(e) =>
                        handleChangeQuantity(sp.id_pd, sp.id_color, e)
                      }
                    />
                  </td>
                  <td>
                    <h5>
                      <span>
                        {parseInt(sp.price_sale * sp.soluong).toLocaleString(
                          'vi-VN',
                          {
                            style: 'currency',
                            currency: 'VND',
                          }
                        )}
                      </span>
                    </h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-pay">
            <div className="cart-pay-item">
              <h3 className="cart-pay-title">Đơn hàng</h3>
              <div className="cart-pay-total">
                <p className="cart-pay-info">Tổng cộng</p>
                <p className="cart-pay-price">
                  {subTotal.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <div className="cart-pay-discout">
                <p className="cart-pay-info">Giảm giá</p>
                <p className="cart-pay-price">0</p>
              </div>
              <div className="cart-pay-ship">
                <p className="cart-pay-info">Phí vận chuyển</p>
                <p className="cart-pay-price">Chưa có</p>
              </div>
              <div className="cart-pay-sub">
                <p className="cart-pay-info">Thành tiền</p>
                <p className="cart-pay-price">
                  {subTotal.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <Link
                to="/checkout"
                className="cart-pay-next">
                Tiếp tục
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCar;
