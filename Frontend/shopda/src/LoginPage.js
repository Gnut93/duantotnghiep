import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import "./LoginPage.css";

const LoginPage = () => {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isCheckEmail, setIsCheckEmail] = useState(false);
    const [isCheckPassword, setIsCheckPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email.current.value,
            password: password.current.value,
        };
        if (data.email === "") {
            setIsCheckEmail(true);
            return;
        }
        if (data.password === "") {
            setIsCheckPassword(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:4000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                // Chuyển đổi result thành chuỗi JSON và lưu vào localStorage
                dispatch(dalogin(result));
                localStorage.setItem("result", JSON.stringify(result));
                if (parseInt(result.userInfo.role) === 1) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                alert(result.thongbao);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };
    const handleInputChange = (ref) => {
        if (ref.current.value) {
          setIsCheckEmail(false);
          setIsCheckPassword(false);
        }
      };

    return (
        <div className="login-wrapper">
            <div className="form-container">
                <p className="title">Chào mừng</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        ref={email}
                        type="email"
                        className="input"
                        placeholder="Email"
                        onChange={() => handleInputChange(email)}
                    />
                    {isCheckEmail && (
                        <p className="error-message">Vui lòng nhập email</p>
                    )}
                    <input
                        ref={password}
                        type="password"
                        className="input"
                        placeholder="Password"
                        onChange={() => handleInputChange(password)}
                    />
                    {isCheckPassword && (
                        <p className="error-message">Vui lòng nhập mật khẩu</p>
                    )}
                    <p className="page-link">
                        <Link
                            to={"/forgot-password"}
                            className="forgot-password-link"
                        >
                            Quên mật khẩu?
                        </Link>
                    </p>
                    <button className="form-btn">Đăng nhập</button>
                </form>
                <p className="sign-up-label">
                    Bạn không có tài khoản?{" "}
                    <Link to="/register" className="sign-up-link">
                        Đăng ký
                    </Link>
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
