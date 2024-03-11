import React from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <section className="checkout">
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
                <textarea
                  className="checkout-address-note"
                  type="text"
                  name=""
                  id=""
                  placeholder="Ghi chú"
                  rows="7"></textarea>
              </div>
            </div>
            <div className="checkout-right">
              <h3 className="cart-pay-title">Đơn hàng</h3>
              <div className="cart-pay-total">
                <p className="cart-pay-info">Tổng cộng</p>
                <p className="cart-pay-price">0</p>
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
                <p className="cart-pay-price">0</p>
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
