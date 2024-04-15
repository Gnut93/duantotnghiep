import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import UserApp from './user/App';
import AdminApp from './admin/App';
import LoginPage from './LoginPage'; // Giả sử bạn có một trang đăng nhập chung
import RegisterPage from './RegisterPage'; // Giả sử bạn có một trang đăng ký chung
import ForgotPassword from './ForgotPassword';
import { useSelector } from 'react-redux';
import { ProtectedRoute } from './ProtectedRoute';
import { useDispatch } from 'react-redux';
import { dalogin } from './authSlice';
import { thoat } from './authSlice';
import {jwtDecode} from 'jwt-decode';

// Giả sử bạn có một hàm để kiểm tra trạng thái đăng nhập và vai trò của người dùng
// function isAuthenticated() {}
// function getUserRole() {}

const App = () => {
  const userIsAuthenticated = useSelector(state => state.auth.daDangNhap);// Kiểm tra xem người dùng có đăng nhập không
  const user = useSelector(state => state.auth.user) // Lấy vai trò người dùng ('user' hoặc 'admin')
  const userRole = parseInt(user?.role);
  const dispatch = useDispatch();

  const checkToken = async () => {
    const result = JSON.parse(localStorage.getItem('result'));
    const token = result?.idToken;
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      // Tính thời điểm hết hạn thực sự của token
      const expirationTime = decoded.exp;
      const expires_time = expirationTime - currentTime;
      if (expires_time < 0) {
        localStorage.removeItem('result');
        dispatch(thoat());
      } else {
        dispatch(dalogin(result));
      }
    }
  }
  
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route element= {<ProtectedRoute />}>
          <Route
            path="/admin/*"
            element={
              userIsAuthenticated && userRole === 1 ? (
                <AdminApp />
              ) : (
                <Navigate
                  replace
                  to="/login"
                />
              )
            }
          />
        </Route>
        <Route
          path="/*"
          element={<UserApp />}
        />
      </Routes>
    </Router>
  );
};

export default App;
