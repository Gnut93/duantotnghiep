import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";

function AppAdmin() {
    return (
        <div className="wapper">
            <Sidebar />
            <Navbar />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/loaihang" element={<Home />} />
                    <Route path="/admin/donhang" element={<Home />} />
                    <Route path="/admin/nguoidung" element={<Home />} />
                    <Route path="/admin/khohang" element={<Home />} />
                    <Route path="/admin/nhaplieu" element={<Home />} />
                    {/* Thêm các Route khác dành riêng cho phần quản trị ở đây */}
                </Routes>
            </main>
        </div>
    );
}

export default AppAdmin;
