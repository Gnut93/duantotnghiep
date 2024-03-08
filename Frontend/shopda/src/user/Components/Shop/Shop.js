import React from 'react';
import './Shop.css';

const Shop = () => {
  return (
    <>
      <div className="container">
        {/* <div className="navbar">
          <Navbar></Navbar>
        </div> */}
        <div className="category">
          <div>
            {' '}
            <h2>Danh Mục Sản Phẩm</h2>
          </div>
          <div className="list-category">
            <div className="danhmuc">
              <div className="thumb">
                <img
                  src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"
                  alt=""></img>
              </div>
              <div className="title">
                <a href="/">TÚI XÁCH</a>
              </div>
            </div>
            <div className="danhmuc">
              <div className="thumb">
                <img
                  src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"
                  alt=""></img>
              </div>
              <div className="title">
                <a href="/">TÚI DU LỊCH</a>
              </div>
            </div>
            <div className="danhmuc">
              <div className="thumb">
                <img
                  src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"
                  alt=""></img>
              </div>
              <div className="title">
                <a href="/">BALO</a>
              </div>
            </div>
            <div className="danhmuc">
              <div className="thumb">
                <img
                  src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"
                  alt=""></img>
              </div>
              <div className="title">
                <a href="/">BÓP - VÍ</a>
              </div>
            </div>
            <div className="danhmuc">
              <div className="thumb">
                <img
                  src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"
                  alt=""></img>
              </div>
              <div className="title">
                <a href="/">THẮT LƯNG</a>
              </div>
            </div>
            <div className="danhmuc">
              <div className="thumb">
                <img
                  src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"
                  alt=""></img>
              </div>
              <div className="title">
                <a href="/">PHỤ KIỆN KHÁC</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
