import React, { useRef } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        if (data.name === "") {
            alert("Vui lòng nhập họ và tên");
            return;
        }
        if (data.email === "") {
            alert("Vui lòng nhập email");
            return;
        }
        if (data.password === "") {
            alert("Vui lòng nhập password");
            return;
        }
        console.log(data);
        try {
            const response = await fetch(
                "http://localhost:4000/users/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            console.log(result);
            alert(result.success);
            navigate("/login");
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
                    enctype="multipart/form-data"
                >
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
                    />
                    <input
                        ref={password}
                        type="password"
                        className="input"
                        placeholder="Password"
                    />
                    <button className="form-btn">Đăng ký</button>
                </form>
                <p className="sign-up-label">
                    Bạn đã có tài khoản?{" "}
                    <span className="sign-up-link">Đăng nhập</span>
                </p>
                <div className="buttons-container"></div>
            </div>
        </div>
    );
};

export default RegisterPage;
