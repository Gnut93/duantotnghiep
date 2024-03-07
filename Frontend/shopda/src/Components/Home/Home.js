import React from 'react';
import Banner from '../Banner/Banner';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="container">
        {/* <div className="navbar">
          <Navbar></Navbar>
        </div> */}
        <div className="category">
          <div>
            {' '}
            <h2>SẢN PHẨM MỚI RA MẮT</h2>
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
    </div>
  );
};

export default Home;
