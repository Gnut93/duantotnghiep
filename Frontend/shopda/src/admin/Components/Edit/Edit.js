import React, { useEffect, useState } from "react";
import "./Edit.css";
import { useParams } from "react-router-dom";

const Edit = () => {
  let { id } = useParams();
  const [sp, setSP] = useState({ sanpham: {}, sanphamchitiet: {} });
  const [listLoai, ganListLoai] = useState([]);
  let editSP = {};
  let editSPCT = {};
  const submitSanPham = async () => {
    try {
      const url = `http://localhost:4000/adminsp/${id}`;
      const opt = {
        method: "put",
        body: JSON.stringify(editSP),
        headers: { "Content-Type": "application/json" },
      };
      const res = await fetch(url, opt);
      const data = await res.json();
      const id_sp = id;
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
      console.log("Đã thêm ", data);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm: ", error);
    }
  };
  const luuChiTietSanPham = async (id_sp) => {
    try {
      const url = `http://localhost:4000/adminsp/spct/${id}`;
      const t = { id_sp: id_sp };
      const chiTiet = { ...t, ...editSPCT };
      console.log(chiTiet);
      const res = await fetch(url, {
        method: "put",
        body: JSON.stringify(chiTiet),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi lưu chi tiết sản phẩm: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spResponse, loaiResponse] = await Promise.all([
          fetch(`http://localhost:4000/adminsp/edit/${id}`),
          fetch("http://localhost:4000/adminsp/loai/sp"),
        ]);

        const [spData, loaiData] = await Promise.all([
          spResponse.json(),
          loaiResponse.json(),
        ]);

        setSP({
          sanpham: spData.sanpham,
          sanphamchitiet: spData.sanphamchitiet,
        });

        ganListLoai(loaiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Kho hàng</h1>
          </div>
        </div>
        <div className="tab-additional active" data-tab="1">
          <div className="checkout-address">
            <h3 className="checkout-address-title">
              <span>Sửa sản phẩm</span>
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
                        defaultValue={sp.sanpham.ten_sp}
                        onChange={(e) => (editSP.ten_sp = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <label>Giá gốc</label> <br />
                      <input
                        type="number"
                        placeholder="VNĐ"
                        name="sale"
                        id="laptop-gia"
                        defaultValue={sp.sanpham.gia}
                        onChange={(e) => (editSP.gia = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <label>Giá khuyến mãi</label> <br />
                      <input
                        type="number"
                        placeholder="VNĐ"
                        name="price"
                        id="laptop-km"
                        defaultValue={sp.sanpham.gia_km}
                        onChange={(e) => (editSP.gia_km = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <label>Loại máy</label> <br />
                      <select
                        name="cate"
                        className="option-cate"
                        defaultValue={sp.sanpham.id_loai}
                        onChange={(e) => (editSP.id_loai = e.target.value)}>
                        {listLoai.map((loai, i) => (
                          <option key={i} value={loai.id_loai}>
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
                        defaultValue={sp.sanpham.hinh}
                        onChange={(e) => (editSP.hinh = e.target.value)}
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
                          onChange={(e) => (editSP.hot = e.target.value)}
                        />
                        <label
                          htmlFor="switch-hot"
                          className="switch-form"></label>
                      </div>
                      <div>
                        <label>Ẩn/Hiện</label> <br />
                        <input
                          type="checkbox"
                          id="switch-an"
                          hidden
                          defaultChecked
                          onChange={(e) => (editSP.anhien = e.target.value)}
                        />
                        <label
                          htmlFor="switch-an"
                          className="switch-form"></label>
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
                        defaultValue={sp.sanphamchitiet.RAM}
                        onChange={(e) => (editSPCT.RAM = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <label>CPU</label> <br />
                      <input
                        type="text"
                        placeholder="i5,i7,i9"
                        name="cpu"
                        id="laptop-cpu"
                        defaultValue={sp.sanphamchitiet.CPU}
                        onChange={(e) => (editSPCT.CPU = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <label>ROM</label> <br />
                      <input
                        type="text"
                        placeholder="256G"
                        name="rom"
                        id="laptop-rom"
                        defaultValue={sp.sanphamchitiet.Dia}
                        onChange={(e) => (editSPCT.Dia = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <label>Cân nặng</label> <br />
                      <input
                        type="text"
                        name="cannang"
                        placeholder="KG"
                        id="laptop-kg"
                        defaultValue={sp.sanphamchitiet.Cannang}
                        onChange={(e) => (editSPCT.Cannang = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <label>Màu sắc</label> <br />
                      <input
                        type="Text"
                        name="mausac"
                        placeholder="Xám"
                        id="laptop-mau"
                        defaultValue={sp.sanphamchitiet.Mausac}
                        onChange={(e) => (editSPCT.Mausac = e.target.value)}
                      />
                    </div>
                    <div className="checkout-address-input">
                      <input
                        type="button"
                        value="Thêm"
                        className="submit"
                        name="insert"
                        onClick={submitSanPham}
                      />
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

export default Edit;
