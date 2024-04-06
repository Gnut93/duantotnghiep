import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { thoat } from '../../../authSlice';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('result');
    // Cập nhật Redux store
    dispatch(thoat());
    navigate('/');
  };

  return (
    <section className="infoUser">
      <Navbar />
      <div className="container">
        <h1 className="infoUer-heading">Thông tin cá nhân</h1>
        <div className="infoUser-wrapper">
          <div className="infoUser-image">
            <img
              src={user.avatar}
              alt="avatar-user"
            />
            <p className="infoUser-name">{user.name}</p>
            <p className="infoUser-info">{user.phone}</p>
            <p className="infoUser-info">{user.email}</p>
          </div>
          <div className="infoUser-content">
            <from>
              <h3 className="infoUser-title">Thay đổi mật khẩu</h3>
              <div className="infoUser-list">
                <div className="infoUser-item">
                  <label className="infoUser-text">Mật khẩu củ</label>
                  <input
                    placeholder="Tên"
                    type="text"
                    defaultValue={user.name}
                  />
                  <p className="err"></p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">Mật khẩu mới</label>
                  <input
                    placeholder="Số điện thoại"
                    defaultValue={user.phone}
                    type="text"
                  />
                  <p className="err"></p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">Nhặp lại mật khẩu mới</label>
                  <input
                    placeholder="Email"
                    defaultValue={user.email}
                    type="email"
                  />
                  <p className="err"></p>
                </div>
              </div>
              <button className="infoUser-button">Thay đổi</button>
            </from>
          </div>
          <div className="infoUser-packlink">
            <Link to="/info-user">
              <p className="infoUser-link">Thông tin</p>
            </Link>
            <Link to="/favorite">
              <p className="infoUser-link">Sản phẩm yêu thích</p>
            </Link>
            <Link
              to="/"
              onClick={handleLogout}>
              <p className="infoUser-link">Đăng xuất</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPass;
