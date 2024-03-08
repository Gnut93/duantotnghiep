import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newRePass, setNewRePass] = useState("");

  const submitMember = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!isFormValid()) {
      return; // Exit if form is not valid
    }

    try {
      const response = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: newName,
          email: newEmail,
          phone: newPhone,
          pw: newPass,
        }),
      });

      if (response.ok) {
        // Handle successful registration
        alert("Đăng ký thành công");
      } else {
        // Handle server errors
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      console.error("Error:", error);
    }
  };

  // Form validation function
  const isFormValid = () => {
    if (newName === "") {
      alert("Vui lòng nhập username");
      return false;
    }
    if (newEmail === "") {
      alert("Vui lòng nhập email");
      return false;
    }
    if (newPass === "") {
      alert("Vui lòng nhập mật khẩu");
      return false;
    }
    if (newRePass !== newPass) {
      alert("Xác nhận mật khẩu không đúng");
      return false;
    }
    // Add other validations as needed
    return true;
  };

  return (
    <section className="content">
      <main>
        <div className="containers reight-panel-active" id="container">
          <div className="form-container register-container">
            <form className="register">
              <h1 className="title">Đăng ký ở đây</h1>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <p className="err-name"></p>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <p className="err-email"></p>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                id="phone"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <p className="err-phone"></p>
              <input
                type="password"
                placeholder="Password"
                name="pass"
                id="pass"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re password"
                name="re_pass"
                id="re_pass"
                value={newRePass}
                onChange={(e) => setNewRePass(e.target.value)}
              />
              <p className="err-pass"></p>
              <button
                type="button"
                name="register"
                id="registers"
                className="button"
                onClick={submitMember}>
                Đăng ký
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="title">
                  Xin chào <br />
                  Những người bạn
                </h1>
                <p>Quay lại và đăng nhập thôi</p>
                <Link to={"/login"}>
                  <button className="button ghost" id="login">
                    Đăng nhặp{" "}
                    <i className="fas fa-long-arrow-alt-left login"></i>
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

export default Register;
