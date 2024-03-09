import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import { thoat } from "../../authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(thoat());
    navigate("/dangnhap");
  };
  useEffect(() => {
    const allSideMenu = document.querySelectorAll(".toggle-nav ");

    allSideMenu.forEach((item) => {
      const li = item;

      item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
          i.classList.remove("active");
        });
        li.classList.add("active");
      });
    });
  }, []);
  return (
    <section className="sidebar">
      <Link to={"/"}>
        <h4 className="brand">Vua laptop</h4>
      </Link>
      <ul className="side-menu top">
        <li className="toggle-nav active">
          <Link to={"/"}>
            <span>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Tổng quan</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={"/shop"}>
            <span>
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Kho hàng</span>
            </span>
          </Link>
        </li>
        <li className="toggle-nav">
          <Link to={"/loai"}>
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
          <Link to={"/nhaplieu"}>
            <span>
              <i class="bx bxs-cylinder"></i>
              <span className="text">Nhập liệu</span>
            </span>
          </Link>
        </li>
      </ul>
      {user === null || user === undefined ? (
        <span className="profile"></span>
      ) : (
        <ul className="side-menu" style={{ cursor: "pointer" }}>
          <li className="toggle-nav" onClick={logout}>
            <span className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </span>
          </li>
        </ul>
      )}
    </section>
  );
};

export default Header;
