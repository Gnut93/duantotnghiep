import React from 'react';

const NhapSP = () => {
  return (
    <div className="checkout-address">
      <h3 className="checkout-address-title">
        <span>Thêm sản phẩm</span>
      </h3>
      <div className="checkout-address-box">
        <form className="product">
          <div className="checkout-address-list">
            <div className="checkout-address-item">
              <div className="checkout-address-input">
                <label>Tên sản phẩm</label> <br />
                <input
                  type="text"
                  placeholder="Tên Sản Phẩm"
                  name="name"
                  id="laptop-name"
                />
              </div>
              <div className="checkout-address-input">
                <label>Giá gốc</label> <br />
                <input
                  type="number"
                  placeholder="VNĐ"
                  name="sale"
                  id="laptop-gia"
                />
              </div>
              <div className="checkout-address-input">
                <label>Giá khuyến mãi</label> <br />
                <input
                  type="number"
                  placeholder="VNĐ"
                  name="price"
                  id="laptop-km"
                />
              </div>
              <div className="checkout-address-input">
                <label>Loại Hàng</label> <br />
                <select
                  name="cate"
                  className="option-cate"></select>
              </div>
            </div>
            <div className="checkout-address-item">
              <div className="checkout-address-input">
                <label>Số lượng</label> <br />
                <input
                  type="text"
                  placeholder="Ram"
                  name="ram"
                  id="laptop-ram"
                />
              </div>
              <div className="checkout-address-input">
                <label>Hình Ảnh</label> <br />
                <input
                  type="text"
                  name="image"
                  id="avatar"
                  accept="image/*"
                />
              </div>
              <div className="checkout-address-input">
                <label>Mô tả</label> <br />
                <textarea
                  class="message"
                  type="text"
                  name=""
                  id=""
                  placeholder="Message..."
                  rows="7"></textarea>
              </div>
              <div className="checkout-address-input">
                <input
                  type="button"
                  value="Thêm"
                  className="submit"
                  name="insert"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NhapSP;
