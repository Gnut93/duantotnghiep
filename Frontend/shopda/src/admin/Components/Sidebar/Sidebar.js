import React, { useEffect } from 'react';
import './Sildebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  useEffect(() => {
    const allSideMenu = document.querySelectorAll('.toggle-nav ');

    allSideMenu.forEach((item) => {
      const li = item;

      item.addEventListener('click', function () {
        allSideMenu.forEach((i) => {
          i.classList.remove('active');
        });
        li.classList.add('active');
      });
    });
  }, []);
  return (
    <section className="sidebar">
      <Link to={'/admin'}>
        <h4 className="brand">D/A</h4>
      </Link>
      <ul className="side-menu top">
        <li className="toggle-nav active">
          <Link to={'/admin'}>
            <span>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Tổng Quan</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/khohang'}>
            <span>
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Kho Hàng</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/loaihang'}>
            <span>
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Loại Hàng</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/donhang'}>
            <span>
              <i className="bx bxs-add-to-queue"></i>
              <span className="text">Đơn Hàng</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/nguoidung'}>
            <span>
              <i className="bx bxs-add-to-queue"></i>
              <span className="text">Người Dùng</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/nhaplieu'}>
            <span>
              <i class="bx bxs-cylinder"></i>
              <span className="text">Nhập Liệu</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/color'}>
            <span>
              <i class="bx bxs-cylinder"></i>
              <span className="text">Màu Sản Phẩm</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/image'}>
            <span>
              <i class="bx bxs-cylinder"></i>
              <span className="text">Hình Ảnh Sản Phẩm</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={'/admin/discout'}>
            <span>
              <i class="bx bxs-cylinder"></i>
              <span className="text">Mã Giảm Giá</span>
            </span>
          </Link>
        </li>
      </ul>
      <span className="profile"></span>
      <ul className="side-menu">
        <li className="toggle-nav">
          <span className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Đăng xuất</span>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
