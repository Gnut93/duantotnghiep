import React from 'react';
import { Link } from 'react-router-dom';
import { suaSL, xoaSP } from '../cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Showcart.css';

const ShowCar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);
  let subTotal = 0;
  return (
    <section className="cart">
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
                <td>Giá</td>
                <td>Số lượng</td>
                <td>Tổng tiền</td>
              </tr>
            </thead>
            <tbody className="cart-product">
              {cart.map((sp, index) => {
                subTotal += parseInt(sp.price_sale * sp.soluong);
                return (
                  <tr
                    className="item"
                    key={index}>
                    <td onClick={() => dispatch(xoaSP([sp.id_pd]))}>
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
                        name="total-item"
                        className="input-number"
                        defaultValue={sp.soluong}
                        onClick={(e) =>
                          dispatch(suaSL([sp.id_pd, e.target.value]))
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
                );
              })}
            </tbody>
          </table>
          <div className="cart-pay">
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
            <p className="cart-discout">Bạn có mã giảm giá?</p>
            <form>
              <input
                type="text"
                placeholder="Nhặp mã giảm giá tại đây"
                className="pay-code"
              />
              <button
                type="button"
                className="pay-add">
                Thêm
              </button>
            </form>
            <Link
              to="/checkout"
              className="cart-pay-next">
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCar;
