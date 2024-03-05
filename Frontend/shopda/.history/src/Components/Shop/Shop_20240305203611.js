import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Shop.css";

const Shop = () => {
  return (
    <>
      <div className="container">
        <div className="navbar">
          <Navbar></Navbar>
        </div>
        <div className="category">
        
          <h3>Danh Mục Sản Phẩm</h3>
        </div>
      </div>
    </>
  );
};

export default Shop;
