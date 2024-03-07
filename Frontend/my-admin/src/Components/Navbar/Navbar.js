import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <section className="content">
        <nav>
          <i className="bx bx-menu"></i>
          <span
            href="#"
            className="nav-link">
            Categories
          </span>
          <form action="#">
            <div className="form-input">
              <input
                type="search"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <span
            href="#"
            className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">8</span>
          </span>
          <Link to={'/login'}>
            <span className="profile">Đăng nhập</span>
          </Link>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
