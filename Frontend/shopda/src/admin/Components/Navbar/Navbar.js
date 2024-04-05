import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const user = useSelector((state) => state.auth.user);
  const daDangNhap = useSelector((state) => state.auth.daDangNhap);

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
          {daDangNhap === true ? <span className="profile">{user.name}</span> : <span className="profile">Login</span>}
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
