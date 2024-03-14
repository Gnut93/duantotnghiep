import React from 'react';
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
          <span className="profile">Admin</span>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
