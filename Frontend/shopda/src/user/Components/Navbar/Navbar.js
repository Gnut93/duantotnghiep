import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="menu">
        <a href="/" className="menu-logo">
          <img src="https://cdn.discordapp.com/attachments/1127927838201368678/1215668041744908378/image_2-removebg-preview.png?ex=65fd9617&is=65eb2117&hm=fc619dbd537162f9634ebd036f42a1a572cbb838c7b0f3ec3802619a15c5884b&" height="50px" width="71px" alt="logo"></img>
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
            <a href="/collection" className="menu-link">
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
              <sup>(0)</sup>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
