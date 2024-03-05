import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";

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
