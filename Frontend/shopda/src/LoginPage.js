import React, {useRef} from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import ImageUploading from 'react-images-uploading';
import './LoginPage.css';

const LoginPage = () => { 
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
    const email = useRef();
    const password = useRef();
    const image = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email.current.value,
            password: password.current.value,
        };
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
            const response = await fetch('http://localhost:4000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                // The login request was successful
                dispatch(dalogin(result));
                // alert(result.userInfo.role)
                // navigate("/");
                if (parseInt(result.userInfo.role) === 1) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                // The login request failed
                alert(result.thongbao);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

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
          />
          <input
            ref={password}
            type="password"
            className="input"
            placeholder="Password"
          />
          <input type='file'
            ref={image} className="input" placeholder="Ảnh đại diện" />
          <p className="page-link">
            <span className="page-link-label">Quên mật khẩu?</span>
          </p>
          <button className="form-btn">Đăng nhặp</button>
        </form>
        <p className="sign-up-label">
          Bạn không có tài khoản? <Link to="/register" className="sign-up-link">Đăng ký</Link>
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
        <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
      </div>
    </div>
  );
};

export default LoginPage;
