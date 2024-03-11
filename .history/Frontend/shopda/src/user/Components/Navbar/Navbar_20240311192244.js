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
          <Link
            to="/"
            className="menu-logo">
            <img
              src={logo}
              alt=""></img>
          </Link>
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/"
                className="menu-link">
                Trang chủ
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/shop"
                className="menu-link">
                Sản phẩm
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/collection"
                className="menu-link">
                Bộ sưu tập
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/bogs"
                className="menu-link">
                Blogs
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/contact"
                className="menu-link">
                Order theo sở thích
              </Link>
            </li>
          </ul>
          <ul className="menu-list icon">
            <li className="menu-item">
              <Link
                to="/login"
                className="menu-link">
                <i className="fas fa-user"></i>
              </Link>
            </li>
            <li className="menu-item">
              <a
                href="/search"
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
