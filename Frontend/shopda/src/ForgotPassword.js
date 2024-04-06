import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const ForgotPassword = () => {
    const email = useRef();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Thêm biến trạng thái isLoading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Đặt isLoading thành true khi yêu cầu bắt đầu
        const data = {
            email: email.current.value
        };
        if (data.email === "") {
            alert("Vui lòng nhập email");
            setIsLoading(false); // Đặt isLoading thành false nếu có lỗi
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
        } finally {
            setIsLoading(false); // Đặt isLoading thành false khi yêu cầu hoàn tất
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
                    <button className="form-btn" disabled={isLoading}>Nhận email khôi phục</button>
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
