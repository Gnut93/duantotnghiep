import React from 'react';
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
// import { ProtectedRoute } from './ProtectedRoute';

// Giả sử bạn có một hàm để kiểm tra trạng thái đăng nhập và vai trò của người dùng
// function isAuthenticated() {}
// function getUserRole() {}

const App = () => {
  const userIsAuthenticated = true; // Kiểm tra xem người dùng có đăng nhập không
  const userRole = '1'; // Lấy vai trò người dùng ('user' hoặc 'admin')

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
          path="/admin/*"
          element={
            userIsAuthenticated && userRole === '1' ? (
              <AdminApp />
            ) : (
              <Navigate
                replace
                to="/login"
              />
            )
          }
        />
        <Route
          path="/*"
          element={<UserApp />}
        />
      </Routes>
    </Router>
  );
};

export default App;
