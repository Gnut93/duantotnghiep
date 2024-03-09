import React, { useEffect, useState } from "react";
import "./NhapLieu.css";

const NhapLieu = () => {
    let sp = {};
    let spct = {};
    let loai = {};
    const submitSanPham = async () => {
        try {
            const url = "http://localhost:4000/adminsp";
            const opt = {
                method: "post",
                body: JSON.stringify(sp),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const data = await res.json();
            const id_sp = data.id_sp;
            await luuChiTietSanPham(id_sp);
            document.getElementById("laptop-name").value = "";
            document.getElementById("laptop-gia").value = "";
            document.getElementById("laptop-km").value = "";
            document.getElementById("avatar").value = "";
            document.getElementById("laptop-ram").value = "";
            document.getElementById("laptop-cpu").value = "";
            document.getElementById("laptop-rom").value = "";
            document.getElementById("laptop-kg").value = "";
            document.getElementById("laptop-mau").value = "";
            alert("Đã thêm sản phẩm");
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm: ", error);
        }
    };
    const luuChiTietSanPham = async (id_sp) => {
        try {
            const url = "http://localhost:4000/adminsp/spct";
            const t = { id_sp: id_sp };
            const chiTiet = { ...t, ...spct };
            console.log(chiTiet);
            const res = await fetch(url, {
                method: "post",
                body: JSON.stringify(chiTiet),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Lỗi khi lưu chi tiết sản phẩm: ", error);
        }
    };
    const themLoai = async () => {
        try {
            const url = "http://localhost:4000/adminsp/loai";
            const opt = {
                method: "post",
                body: JSON.stringify(loai),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const data = await res.json();
            alert("Đã thêm Loại", data);
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm: ", error);
        }
    };
    const [listLoai, ganListLoai] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/adminsp/loai/sp")
            .then((res) => res.json())
            .then((data) => ganListLoai(data));
    }, []);
    useEffect(() => {
        const tabBlock = document.querySelectorAll(".tab-block");
        const handleTabClick = (e) => {
            tabBlock.forEach((item) => item.classList.remove("active"));
            e.target.classList.add("active");

            const tabNumber = e.target.dataset.tab;
            const tabAdditional = document.querySelectorAll(".tab-additional");
            tabAdditional.forEach((item) => {
                item.classList.remove("active");
                if (item.getAttribute("data-tab") === tabNumber) {
                    item.classList.add("active");
                }
            });
        };

        tabBlock.forEach((item) =>
            item.addEventListener("click", handleTabClick)
        );

        return () => {
            tabBlock.forEach((item) =>
                item.removeEventListener("click", handleTabClick)
            );
        };
    }, []);
    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Nhập Liệu</h1>
                    </div>
                    <div className="tabs">
                        <div className="tab-list">
                            <div className="tab-block active" data-tab="1">
                                Thêm sản phẩm
                            </div>
                            <div className="tab-block" data-tab="2">
                                Thêm loại hàng
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-additional active" data-tab="1">
                    <div className="checkout-address">
                        <h3 className="checkout-address-title">
                            <span>Thêm sản phẩm</span>
                        </h3>
                        <div className="checkout-address-box">
                            <form className="product">
                                <div className="checkout-address-list">
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Tên sản phẩm</label> <br />
                                            <input
                                                type="text"
                                                placeholder="Tên laptop"
                                                name="name"
                                                id="laptop-name"
                                                onChange={(e) =>
                                                    (sp.ten_sp = e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Giá gốc</label> <br />
                                            <input
                                                type="number"
                                                placeholder="VNĐ"
                                                name="sale"
                                                id="laptop-gia"
                                                onChange={(e) =>
                                                    (sp.gia = e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Giá khuyến mãi</label> <br />
                                            <input
                                                type="number"
                                                placeholder="VNĐ"
                                                name="price"
                                                id="laptop-km"
                                                onChange={(e) =>
                                                    (sp.gia_km = e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Loại máy</label> <br />
                                            <select
                                                name="cate"
                                                className="option-cate"
                                                onChange={(e) =>
                                                    (sp.id_loai =
                                                        e.target.value)
                                                }
                                            >
                                                {listLoai.map((loai, i) => (
                                                    <option
                                                        key={i}
                                                        value={loai.id_loai}
                                                    >
                                                        {loai.ten_loai}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Images</label> <br />
                                            <input
                                                type="text"
                                                name="image"
                                                id="avatar"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    (sp.hinh = e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input checkbox">
                                            <div>
                                                <label>Hot</label> <br />
                                                <input
                                                    type="checkbox"
                                                    id="switch-hot"
                                                    hidden
                                                    defaultChecked
                                                    onChange={(e = 1) =>
                                                        (sp.hot = e.target
                                                            .checked
                                                            ? 1
                                                            : 0)
                                                    }
                                                />
                                                <label
                                                    for="switch-hot"
                                                    className="switch-form"
                                                ></label>
                                            </div>
                                            <div>
                                                <label>Ẩn/Hiện</label> <br />
                                                <input
                                                    type="checkbox"
                                                    id="switch-an"
                                                    hidden
                                                    defaultChecked
                                                    onChange={(e) =>
                                                        (sp.anhien = e.target
                                                            .checked
                                                            ? 1
                                                            : 0)
                                                    }
                                                />
                                                <label
                                                    for="switch-an"
                                                    className="switch-form"
                                                ></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Dung lượng Ram</label> <br />
                                            <input
                                                type="text"
                                                placeholder="Ram"
                                                name="ram"
                                                id="laptop-ram"
                                                onChange={(e) =>
                                                    (spct.RAM = e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>CPU</label> <br />
                                            <input
                                                type="text"
                                                placeholder="i5,i7,i9"
                                                name="cpu"
                                                id="laptop-cpu"
                                                onChange={(e) =>
                                                    (spct.CPU = e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>ROM</label> <br />
                                            <input
                                                type="text"
                                                placeholder="256G"
                                                name="rom"
                                                id="laptop-rom"
                                                onChange={(e) =>
                                                    (spct.Dia = e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Cân nặng</label> <br />
                                            <input
                                                type="text"
                                                name="cannang"
                                                placeholder="KG"
                                                id="laptop-kg"
                                                onChange={(e) =>
                                                    (spct.Mausac =
                                                        e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Màu sắc</label> <br />
                                            <input
                                                type="Text"
                                                name="mausac"
                                                placeholder="Xám"
                                                id="laptop-mau"
                                                onChange={(e) =>
                                                    (spct.Cannang =
                                                        e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="checkout-address-input">
                                            <input
                                                type="button"
                                                value="Thêm"
                                                className="submit"
                                                name="insert"
                                                onClick={() => submitSanPham()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="tab-additional" data-tab="2">
                    <div className="checkout-address">
                        <h3 className="checkout-address-title">
                            <span>Thêm loại</span>
                        </h3>
                        <div className="checkout-address-box">
                            <form className="category" autocomplete="off">
                                <div className="checkout-address-list">
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Tên loại</label> <br />
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                name="name_cate"
                                                onChange={(e) =>
                                                    (loai.ten_loai =
                                                        e.target.value)
                                                }
                                            />
                                            <p className="err"></p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Ẩn/Hiện</label> <br />
                                            <input
                                                type="checkbox"
                                                id="switch-loai"
                                                hidden
                                                onChange={(e) =>
                                                    (loai.anhien = e.target
                                                        .checked
                                                        ? 1
                                                        : 0)
                                                }
                                            />
                                            <label
                                                for="switch-loai"
                                                className="switch-form"
                                            ></label>
                                        </div>
                                        <div className="checkout-address-input">
                                            <button
                                                type="button"
                                                className="submit"
                                                onClick={() => themLoai()}
                                            >
                                                Thêm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default NhapLieu;
