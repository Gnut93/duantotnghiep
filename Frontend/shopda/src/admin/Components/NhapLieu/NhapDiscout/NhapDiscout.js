import React from 'react';

const NhapDiscout = () => {
  return (
    <div className="checkout-address">
      <h3 className="checkout-address-title">
        <span>Thêm Mã giảm giá</span>
      </h3>
      <div className="checkout-address-box">
        <form
          className="category"
          autocomplete="off">
          <div className="checkout-address-list">
            <div className="checkout-address-item">
              <div className="checkout-address-input">
                <label>Mã Code</label> <br />
                <input
                  type="text"
                  name="image"
                  id="avatar"
                  accept="image/*"
                />
                <p className="err"></p>
              </div>
              <div className="checkout-address-input">
                <label>Số lượng</label> <br />
                <input
                  type="text"
                  name="image"
                  id="avatar"
                  accept="image/*"
                />
                <p className="err"></p>
              </div>
              <div className="checkout-address-input">
                <label>Giá</label> <br />
                <input
                  type="text"
                  name="image"
                  id="avatar"
                  accept="image/*"
                />
                <p className="err"></p>
              </div>
              <div className="checkout-address-input">
                <label>Ngày hết hạng</label> <br />
                <input
                  type="text"
                  name="image"
                  id="avatar"
                  accept="image/*"
                />
                <p className="err"></p>
              </div>
              <div className="checkout-address-input">
                <button
                  type="button"
                  className="submit">
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NhapDiscout;
