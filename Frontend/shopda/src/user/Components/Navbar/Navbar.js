import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thoat } from '../../../authSlice';

const Navbar = (props) => {
  const { backgroundColor = '#4A1F18' } = props;
  const cart = useSelector((state) => state.cart.listSP);
  const user = useSelector((state) => state.auth.user);
  const daDangNhap = useSelector((state) => state.auth.daDangNhap);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let quantity = 0;
  cart.forEach((element) => {
    quantity += element.soluong;
  });
  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('result');
    // Cập nhật Redux store
    dispatch(thoat());
    navigate('/');
  };
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
            {daDangNhap === true ? (
              ''
            ) : (
              <li className="menu-item">
                <Link
                  to="/follow-order"
                  className="menu-link">
                  Theo dõi đơn hàng
                </Link>
              </li>
            )}
          </ul>
          <ul className="menu-list icon">
            <li className="menu-item">
              {daDangNhap && daDangNhap === true ? (
                <>
                  <Link
                    to=""
                    className="menu-link">
                    <span className="menu-text">{user.name}</span>
                  </Link>
                  <div className="dropdown-content">
                    <Link
                      to="/info-user"
                      className="menu-link">
                      Hồ sơ
                    </Link>
                    <Link
                      to="/follow-order-user"
                      className="menu-link">
                      Theo dõi đơn hàng
                    </Link>
                    <Link
                      to="/favorite"
                      className="menu-link">
                      Sản phẩm yêu thích
                    </Link>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="menu-link">
                      Đăng xuất
                    </Link>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="menu-link">
                  <i className="fas fa-user"></i>
                </Link>
              )}
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
