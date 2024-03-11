import React from 'react';

const NhapHinh = () => {
  return (
    <div className="checkout-address">
      <h3 className="checkout-address-title">
        <span>Thêm Hình Ảnh Chi Tiết</span>
      </h3>
      <div className="checkout-address-box">
        <form
          className="category"
          autocomplete="off">
          <div className="checkout-address-list">
            <div className="checkout-address-item">
              <div className="checkout-address-input">
                <label>Link Hình</label> <br />
                <input
                  type="text"
                  name="image"
                  id="avatar"
                  accept="image/*"
                />
                <p className="err"></p>
              </div>
              <div className="checkout-address-input">
                <label>Mã Sản phẩm</label> <br />
                <select
                  name="cate"
                  className="option-cate"></select>
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

export default NhapHinh;
