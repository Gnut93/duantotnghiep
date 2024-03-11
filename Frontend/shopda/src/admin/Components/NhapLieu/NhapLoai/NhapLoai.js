import React from 'react';

const NhapLoai = () => {
  return (
    <div className="checkout-address">
      <h3 className="checkout-address-title">
        <span>Thêm loại</span>
      </h3>
      <div className="checkout-address-box">
        <form
          className="category"
          autocomplete="off">
          <div className="checkout-address-list">
            <div className="checkout-address-item">
              <div className="checkout-address-input">
                <label>Tên loại</label> <br />
                <input
                  type="text"
                  placeholder="Name"
                  name="name_cate"
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

export default NhapLoai;
