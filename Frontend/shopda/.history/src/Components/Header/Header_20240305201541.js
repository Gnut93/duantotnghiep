import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Routes from "./Routes"; // Đây là nơi bạn định nghĩa các Routes cho ứng dụng của bạn

const Header = () => {
  return (
    <header className="header is-fixed">
      <div className="header-contact">
        <p className="header-phone">HOTLINE : 0901.379.586</p>
      </div>
      <div className="container-fixed">
        <Navbar></Navbar>
      </div>
    </header>
  );
};

export default Header;
