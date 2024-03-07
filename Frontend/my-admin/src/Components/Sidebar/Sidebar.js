import React from 'react';
import './Sildebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <section className="sidebar">
      <Link to={'/'}>
        <h4 className="brand">D/A Admin</h4>
      </Link>
      <ul className="side-menu top">
        <li className="toggle-nav active">
          <Link to={'/'}>
            <span>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Tổng quan</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/shop'}>
            <span>
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Kho hàng</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/loai'}>
            <span>
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Loại hàng</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <span>
            <i className="bx bxs-add-to-queue"></i>
            <span className="text">Đơn hàng</span>
          </span>
        </li>
        <li className="toggle-nav">
          <span>
            <i className="bx bxs-group"></i>
            <span className="text">Người dùng</span>
          </span>
        </li>
        <li className="toggle-nav">
          <Link to={'/nhaplieu'}>
            <span>
              <i class="bx bxs-cylinder"></i>
              <span className="text">Nhập liệu</span>
            </span>
          </Link>
        </li>
      </ul>
      <span className="profile"></span>
      <ul className="side-menu">
        <li className="toggle-nav">
          <span className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
