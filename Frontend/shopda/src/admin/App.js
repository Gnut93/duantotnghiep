import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import LoaiHang from "./Components/LoaiHang/LoaiHang";
import Shop from "./Components/Shop/Shop";
import NhapLieu from "./Components/NhapLieu/NhapLieu";
import User from "./Components/User/User";
import DonHang from "./Components/DonHang/DonHang";
import EditSP from "./Components/Edit/EditSP/EditSP";
import EditMau from "./Components/Edit/EditMau/EditMau";
import EditLoai from "./Components/Edit/EditLoai/EditLoai";
import EditHinh from "./Components/Edit/EditHinh/EditHinh";
import EditDiscout from "./Components/Edit/EditDiscout/EditDiscout";
import Discout from "./Components/DisCout/Discout";
import ImgDetail from "./Components/ImgDetail/ImgDetail";
import ColorDetail from "./Components/ColorDetail/ColorDetail";
import EditStatus from "./Components/Edit/EditStatus/EditStatus";
import ChiTietDonHang from "./Components/ChiTietDonHang/ChiTietDonHang";
import EditRole from "./Components/Edit/EditRole/EditRole";
import DonHangCustom from "./Components/DonHangCustom/DonHangCustom";

function AppAdmin() {
    return (
        <div className="wrapper">
            <Sidebar />
            <Navbar />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/loaihang" element={<LoaiHang />} />
                    <Route path="/donhang" element={<DonHang />} />
                    <Route path="/donhangcustom" element={<DonHangCustom />} />
                    <Route
                        path="/donhangchitiet/:id"
                        element={<ChiTietDonHang />}
                    />
                    <Route path="/nguoidung" element={<User />} />
                    <Route path="/khohang" element={<Shop />} />
                    <Route path="/nhaplieu" element={<NhapLieu />} />
                    <Route path="/discout" element={<Discout />} />
                    <Route path="/color" element={<ColorDetail />} />
                    <Route path="/image" element={<ImgDetail />} />
                    <Route path="/editSP/:id" element={<EditSP />} />
                    <Route path="/editMau/:id" element={<EditMau />} />
                    <Route path="/editLoai/:id" element={<EditLoai />} />
                    <Route path="/editHinh/:id" element={<EditHinh />} />
                    <Route path="/editDiscout/:id" element={<EditDiscout />} />
                    <Route path="/editStatus/:id" element={<EditStatus />} />
                    <Route path="/editRole/:id" element={<EditRole />} />
                    {/* Thêm các Route khác dành riêng cho phần quản trị ở đây */}
                </Routes>
            </main>
        </div>
    );
}

export default AppAdmin;
