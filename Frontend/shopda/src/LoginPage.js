import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import './LoginPage.css';

const LoginPage = () => {
  // const hàmChạyKhiThànhCông = (response) => {};
  // const hàmChạyKhiThấtBại = (response) => {};

  // const [dangNhapChua, ganTrangThaiDangNhap] = useState(false);
  // const [userInfo, ganuserInfo] = useState({
  //   tokenId: '',
  //   hoten: '',
  //   email: '',
  // });

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <p className="title">Chào mừng</p>
        <form className="form">
          <input
            type="email"
            className="input"
            placeholder="Email"
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
          />
          <p className="page-link">
            <span className="page-link-label">Quên mật khẩu?</span>
          </p>
          <button className="form-btn">Đăng nhặp</button>
        </form>
        <p className="sign-up-label">
          Bạn không có tài khoản? <span className="sign-up-link">Đăng ký</span>
        </p>
        <div className="buttons-container">
          {/* <GoogleLogin
            clientId="CLIENT_ID_CỦA_BẠN"
            buttonText="Đăng nhặp với Google"
            isSignedIn={true}
            onSuccess={hàmChạyKhiThànhCông}
            onFailure={hàmChạyKhiThấtBại}
            cookiePolicy={'single_host_origin'}
            className="google-login-button"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
