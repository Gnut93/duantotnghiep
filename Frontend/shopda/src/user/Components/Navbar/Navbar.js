import React from 'react';
import './Navbar.css';
import logo from '../../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const cart = useSelector((state) => state.cart.listSP);
  let quantity = 0;
  cart.forEach((element) => {
    quantity += element.soluong;
  });
  return (
    <div className="navbar">
      <div className="container">
        <nav className="menu">
          <a
            href="/"
            className="menu-logo">
            <img
              src={logo}
              alt=""></img>
          </a>
          <ul className="menu-list">
            <li className="menu-item">
              <a
                href="/"
                className="menu-link">
                Trang chủ
              </a>
            </li>
            <li className="menu-item">
              <a
                href="/shop"
                className="menu-link">
                Sản phẩm
              </a>
            </li>
            <li className="menu-item">
              <a
                href="/collection"
                className="menu-link">
                Bộ sưu tập
              </a>
            </li>
            <li className="menu-item">
              <a
                href="/"
                className="menu-link">
                Blogs
              </a>
            </li>
            <li className="menu-item">
              <a
                href="/"
                className="menu-link">
                Order theo sở thích
              </a>
            </li>
            <li className="menu-item">
              <a
                href="/"
                className="menu-link">
                Tin tức
              </a>
            </li>
          </ul>
          <ul className="menu-list icon">
            <li className="menu-item">
              <a
                href="/"
                className="menu-link">
                <i className="fas fa-user"></i>
              </a>
            </li>
            <li className="menu-item">
              <a
                href="/"
                className="menu-link">
                <i className="fas fa-search"></i>
              </a>
            </li>
            <li className="menu-item">
              <Link
                to="/showCart"
                className="menu-link">
                <i className="fas fa-shopping-cart"></i>
                <sup>({quantity})</sup>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
