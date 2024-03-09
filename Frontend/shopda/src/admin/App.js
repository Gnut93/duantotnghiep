import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import LoaiHang from './Components/LoaiHang/LoaiHang';
import Shop from './Components/Shop/Shop';
import NhapLieu from './Components/NhapLieu/NhapLieu';
import User from './Components/User/User';
function AppAdmin() {
  return (
    <div className="wapper">
      <Sidebar />
      <Navbar />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/loaihang"
            element={<LoaiHang />}
          />
          <Route
            path="/donhang"
            element={<Home />}
          />
          <Route
            path="/nguoidung"
            element={<User />}
          />
          <Route
            path="/khohang"
            element={<Shop />}
          />
          <Route
            path="/nhaplieu"
            element={<NhapLieu />}
          />
          {/* Thêm các Route khác dành riêng cho phần quản trị ở đây */}
        </Routes>
      </main>
    </div>
  );
}

export default AppAdmin;
