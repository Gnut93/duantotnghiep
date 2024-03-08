import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="menu">
        <a href="/" className="menu-logo">
          LOGO
        </a>
        <ul className="menu-list">
          <li className="menu-item">
            <a href="/" className="menu-link">
              Trang chủ
            </a>
          </li>
          <li className="menu-item">
            <a href="/shop" className="menu-link">
              Sản phẩm
            </a>
          </li>
          <li className="menu-item">
            <a href="/shop" className="menu-link">
              Bộ sưu tập
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-link">
              Blogs
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-link">
              Order theo sở thích
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-link">
              Tin tức
            </a>
          </li>
        </ul>
        <ul className="menu-list icon">
          <li className="menu-item">
            <a href="/" className="menu-link">
              <i className="fas fa-user"></i>
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-link">
              <i className="fas fa-search"></i>
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-link">
              <i className="fas fa-shopping-cart"></i>
              (0)
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
