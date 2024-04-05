import React from 'react';
import Navbar from '../Navbar/Navbar';
import './InforUser.css';
import { Link } from 'react-router-dom';

const InfoUser = () => {
  return (
    <section className="infoUser">
      <Navbar />
      <div className="container">
        <h1 className="infoUer-heading">Thông tin cá nhân</h1>
        <div className="infoUser-wrapper">
          <div className="infoUser-image">
            <img
              src=""
              alt="avatar-user"
            />
            <p className="infoUser-name">Trần Tạ Toàn</p>
            <p className="infoUser-info">0393511801</p>
            <p className="infoUser-info">email@gmail.com</p>
          </div>
          <div className="infoUser-content">
            <from>
              <h3 className="infoUser-title">Thay đổi thông tin cá nhân</h3>
              <div className="infoUser-list">
                <div className="infoUser-item">
                  <label className="infoUser-text">Tên người dùng</label>
                  <input
                    placeholder="Tên"
                    type="text"
                  />
                  <p className="err"></p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">Số điện thoại</label>
                  <input
                    placeholder="Tên"
                    type="text"
                  />
                  <p className="err"></p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">Email</label>
                  <input
                    placeholder="Tên"
                    type="email"
                  />
                  <p className="err"></p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">avatar</label>
                  <input
                    placeholder="Tên"
                    type="file"
                  />
                  <p className="err"></p>
                </div>
              </div>
              <button className="infoUser-button">Thay đổi</button>
            </from>
          </div>
          <div className="infoUser-packlink">
            <Link to="">
              <p className="infoUser-link">Đổi mật khẩu</p>
            </Link>
            <Link to="/favorite">
              <p className="infoUser-link">Sản phẩm yêu thích</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoUser;
