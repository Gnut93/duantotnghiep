import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { dalogin } from "../../authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitDuLieu = async (e) => {
    e.preventDefault();

    if (username === "") {
      alert("Vui lòng nhập username");
      return;
    }
    if (password === "") {
      alert("Vui lòng nhập password");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        body: JSON.stringify({ un: username, pw: password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(dalogin(result));
        navigate("/");
      } else {
        const result = await response.json();
        alert(result.thongbao);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="content">
      <main>
        <div className="containers" id="container">
          <div className="form-container login-container">
            <form className="input-login" action="/login" method="POST">
              <h1 className="title">Đăng nhập ở đây</h1>
              <input
                id="login-email"
                type="email"
                placeholder="Email"
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                id="login-pass"
                type="password"
                placeholder="Password"
                name="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="err-login"></p>
              <div className="contents">
                <div className="checkbox">
                  <input type="checkbox" name="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">Lưu đăng nhập</label>
                </div>
                <div className="pass-link">
                  <a href="/forgot">Quên mật khẩu?</a>
                </div>
              </div>
              <button
                type="button"
                name="login"
                id="logins"
                className="button"
                onClick={submitDuLieu}>
                Đăng nhập
              </button>
              <span>Đăng nhập khác</span>
              <div className="social-container">
                <span className="social">
                  <i className="fab fa-facebook-f"></i>
                </span>
                <span href="#" className="social">
                  <i className="fab fa-google"></i>
                </span>
                <span href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </span>
              </div>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel">
                <h1 className="title">
                  Hãy bắt đầu hành trình của bạn <br />
                  Ngay bây giờ
                </h1>
                <p>
                  Nếu bạn chưa có tài khoản, hãy tham gia cùng chúng tôi và bắt
                  đầu hành trình của mình.
                </p>
                <Link to={"/register"}>
                  <button className="button ghost" id="register">
                    Đăng ký tài khoản
                    <i className="fas fa-long-arrow-alt-right register"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
