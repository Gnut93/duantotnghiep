import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const ForgotPassword = () => {
    const email = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email.current.value
        };
        if (data.email === "") {
            alert("Vui lòng nhập email");
            return;
        }
        console.log(data);
        try {
            const response = await fetch("http://localhost:4000/users/forgot-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            alert(result.success);
            navigate("/login");
          } catch (error) {
            console.log(error);
          }
        };

    return (
        <div className="login-wrapper">
            <div className="form-container">
                <p className="title">Quên mật khẩu</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        ref={email}
                        type="email"
                        className="input"
                        placeholder="Nhập email của bạn"
                    />
                    <button className="form-btn">Nhận email khôi phục</button>
                </form>
                <p className="sign-up-label">
                    Bạn không có tài khoản?{" "}
                    <Link to="/register" className="sign-up-link">
                        Đăng ký
                    </Link>
                </p>
                <div className="buttons-container">
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
