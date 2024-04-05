import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const Navbar = (props) => {
  const { backgroundColor = '#4A1F18' } = props;
  const cart = useSelector((state) => state.cart.listSP);
  const user = useSelector((state) => state.auth.user);
  const daDangNhap = useSelector((state) => state.auth.daDangNhap);
  let quantity = 0;
  cart.forEach((element) => {
    quantity += element.soluong;
  });
  return (
    <div
      className="navbar"
      style={{ backgroundColor }}>
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
                to="/about"
                className="menu-link">
                Về Chúng Tôi
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/blogs"
                className="menu-link">
                Bài Viết
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/contact"
                className="menu-link">
                Order theo sở thích
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/follow-order"
                className="menu-link">
                Theo dõi đơn hàng
              </Link>
            </li>
          </ul>
          <ul className="menu-list icon">
            <li className="menu-item">
              {daDangNhap === true ? <span className="menu-link">{user.name}</span> : <Link
                to="/login"
                className="menu-link">
                <i className="fas fa-user"></i>
              </Link>}
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
