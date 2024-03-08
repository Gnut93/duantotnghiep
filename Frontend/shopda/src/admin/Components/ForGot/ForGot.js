import React, { useState } from "react";
import "./ForGot.css";
import { useParams } from "react-router-dom";

const ForGot = () => {
  let { id } = useParams();
  console.log(id);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const submitPasword = async (e) => {
    console.log(password);
    console.log(rePassword);
    if (!isFormValid()) {
      return; // Exit if form is not valid
    }
    try {
      const response = await fetch(`http://localhost:4000/users/forgot/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newpw: password,
        }),
      });

      if (response.ok) {
        // Handle successful registration
        alert("Đổi mật khẩu thành công");
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
    if (password === "") {
      alert("Vui lòng nhập mật khẩu");
      return false;
    }
    if (rePassword !== password) {
      alert("Xác nhận mật khẩu không đúng");
      return false;
    }
    // Add other validations as needed
    return true;
  };

  return (
    <div>
      <section className="content">
        <main>
          <div className="containers reight-panel-active" id="container">
            <div className="form-container register-container">
              <form className="register">
                <h1 className="title">Đổi mật khẩu</h1>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  name="phone"
                  id="phone"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="err-phone"></p>
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  name="pass"
                  id="pass"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                <p className="err-pass"></p>
                <button
                  type="button"
                  name="register"
                  id="registers"
                  className="button"
                  onClick={submitPasword}>
                  Đổi mật khẩu
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
                  <button className="button ghost" id="login">
                    Đăng nhặp{" "}
                    <i className="fas fa-long-arrow-alt-left login"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ForGot;
