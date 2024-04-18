import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { debounce } from 'lodash';

const RegisterPage = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isExistingEmail, setIsExistingEmail] = useState(false);
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
      alert('Họ tên không được để trống');
      return;
    }
    if (data.email === '') {
      alert('Email không được để trống');
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
      alert('Mật khẩu không được để trống');
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
          />
          <input
            ref={email}
            type="email"
            className="input"
            placeholder="Email"
            onChange={checkEmail}
          />
          {isExistingEmail && (
            <p className="error-message">Email đã tồn tại!</p>
          )}
          <input
            ref={password}
            type="password"
            className="input"
            placeholder="Password"
          />
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
