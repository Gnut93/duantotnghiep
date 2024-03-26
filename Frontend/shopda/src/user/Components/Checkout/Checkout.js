import React, { useMemo } from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import momo from '../../../assets/images/logo-momo-png-1.png';
import zalo from '../../../assets/images/zalo-pay-logo-png-2.png';
import cod from '../../../assets/images/cod.png';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.listSP);

  const subTotal = useMemo(() => {
    return cart.reduce((total, sp) => total + sp.price_sale * sp.soluong, 0);
  }, [cart]);
  let shipping = 50000;
  let TotalPrice = subTotal ? subTotal + shipping : 0;
  return (
    <section className="checkout">
      <Navbar></Navbar>
      <div className="container">
        <h2 className="checkout-headng">Thông tinh đơn hàng và thanh toán</h2>
        <form>
          <div className="checkout-list">
            <div className="checkout-left">
              <div className="checkout-address">
                <h3 className="checkout-address-heding">
                  Thông tin đăng ký mua hàng
                </h3>
                <div className="checkout-address-form">
                  <input
                    type="text"
                    placeholder="Tên của bạn"
                  />
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    placeholder="Thành Phố"
                  />
                  <input
                    type="text"
                    placeholder="Quận huyện"
                  />
                  <input
                    type="text"
                    placeholder="Địa chỉ giao hàng"
                  />
                </div>
                <div className="checkout-pay">
                  <textarea
                    className="checkout-pay-note"
                    placeholder="Ghi chú"
                    rows="8"></textarea>
                  <div className="checkout-pay-list">
                    <h3 className="checkout-pay-heading">
                      Hình thức thanh toán
                    </h3>
                    <label className="checkout-pay-item">
                      <img
                        src={momo}
                        alt="Momo Payment"
                        className="checkout-pay-icon"
                      />
                      <input
                        name="pay"
                        type="radio"
                        value="momo"
                      />
                    </label>
                    <label className="checkout-pay-item">
                      <img
                        src={zalo}
                        alt="Zalo Pay Payment"
                        className="checkout-pay-icon"
                      />
                      <input
                        name="pay"
                        type="radio"
                        value="zalo"
                      />
                    </label>
                    <label className="checkout-pay-item">
                      <img
                        src={cod}
                        alt="Cash on Delivery"
                        className="checkout-pay-icon"
                      />
                      <input
                        name="pay"
                        type="radio"
                        value="cod"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="checkout-right">
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
                <p className="cart-pay-price">
                  {shipping.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <div className="cart-pay-sub">
                <p className="cart-pay-info">Thành tiền</p>
                <p className="cart-pay-price">
                  {TotalPrice.toLocaleString('vi-VN', {
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
                Đặt hàng
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
