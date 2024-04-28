import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { debounce } from 'lodash';
import './RegisterPage.css';

const RegisterPage = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isExistingEmail, setIsExistingEmail] = useState(false);
  const [isCheckName, setIsCheckName] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [isCheckPassword, setIsCheckPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const checkEmail = debounce(async () => {
    setIsCheckingEmail(true);
    const emailValue = email.current?.value;
    if (emailValue) {
      const response = await fetch(
        `http://localhost:4000/users/check-email/${emailValue}`
      );
      const data = await response.json();
      setIsExistingEmail(data);
      setIsCheckingEmail(false);
    }
  }, 1000);

  useEffect(() => {
    checkEmail();
  }, [email.current?.value, checkEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (data.name === '') {
      setIsCheckName(true);
      return;
    }
    if (data.email === '') {
      setIsCheckEmail(true);
      return;
    }
    if (isCheckingEmail) {
      alert('Đang kiểm tra email. Vui lòng đợi!');
      return;
    }
    if (isExistingEmail) {
      alert('Email đã tồn tại. Vui lòng sử dụng email khác!');
      return;
    }
    if (data.password === '') {
      setIsCheckPassword(true);
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.success);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (ref) => {
    if (ref.current.value) {
      // Clear error message when user starts typing
      setIsCheckName(false);
      setIsCheckEmail(false);
      setIsCheckPassword(false);
      // setIsExistingEmail(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <p className="title">Xin chào</p>
        <form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data">
          <input
            ref={name}
            type="text"
            className="input"
            placeholder="Họ tên"
            onChange={() => handleInputChange(name)}
          />
          {isCheckName && (
            <p className="error-message">Họ tên không được bỏ trống!</p>
          )}
          <input
            ref={email}
            type="email"
            className="input"
            placeholder="Email"
            onChange={() => handleInputChange(email)}
          />
          {isExistingEmail && (
            <p className="error-message">Email đã tồn tại!</p>
          )}
          {isCheckEmail && (
            <p className="error-message">Email không được bỏ trống!!</p>
          )}
          <input
            ref={password}
            type="password"
            className="input"
            placeholder="Password"
            onChange={() => handleInputChange(password)}
          />
          {isCheckPassword && (
            <p className="error-message">Mật khẩu không được bỏ trống!</p>
          )}
          <button className="form-btn">Đăng ký</button>
        </form>
        <Link to="/login">
          <p className="sign-up-label">
            Bạn đã có tài khoản? <span className="sign-up-link">Đăng nhập</span>
          </p>
        </Link>
        <div className="buttons-container"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
