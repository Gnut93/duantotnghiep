import React from "react";
import "./Navbar.css";
import { BrowserRouter as Router, Link } from "react-router-dom"; // Import Link từ react-router-dom

const Navbar = () => {
  return (
    <Router>
      <div className="navbar">
        <div className="container">
          <nav className="menu">
            <Link to="/" className="menu-logo">
              {" "}
              {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/" */}
              LOGO
            </Link>
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  {" "}
                  {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/" */}
                  Trang chủ
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/shop" className="menu-link">
                  {" "}
                  {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/shop" */}
                  Sản phẩm
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  {" "}
                  {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/" */}
                  Blogs
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  {" "}
                  {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/" */}
                  Order theo sở thích
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  {" "}
                  {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/" */}
                  Tin tức
                </Link>
              </li>
            </ul>
            <ul className="menu-list icon">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  {" "}
                  {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/" */}
                  <i className="fas fa-search"></i>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  {" "}
                  {/* Thay thế thẻ a bằng Link và đặt đường dẫn "/" */}
                  <i className="fas fa-shopping-cart"></i>
                  (0)
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Router>
  );
};

export default Navbar;
