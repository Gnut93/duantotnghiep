import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Shop.css";

const Shop = () => {
  return (
    <>
      <div className="container">
        <div className="navbar">
          <Navbar></Navbar>
        </div>
        <div className="category">
          <div>
            {" "}
            <h3>Danh Mục Sản Phẩm</h3>
          </div>
          <div className="list-category">
            <div className="danhmuc">
            <div>
              <img src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"></img>
              
              <a href="/">Túi xách</a>
            </div>
            <div>
              <img src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"></img>
              <a href="/">Túi xách</a>
            </div>
            <div>
              <img src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"></img>
              <a href="/">Túi xách</a>
            </div>
            <div>
              <img src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"></img>
              <a href="/">Túi xách</a>
            </div>
            <div>
              <img src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"></img>
              <a href="/">Túi xách</a>
            </div>
            <div>
              <img src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"></img>
              <a href="/">Túi xách</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
