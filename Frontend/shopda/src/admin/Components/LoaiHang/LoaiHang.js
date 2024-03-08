import React, { useEffect, useState } from "react";
import "./LoaiHang.css";

const LoaiHang = () => {
  const [listLoai, setListLoai] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/adminsp/loai/sp")
      .then((res) => res.json())
      .then(setListLoai);
  }, []);
  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Loai hàng</h1>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Loại</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table class="tab-content active">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Ẩn/Hiện</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody class="categories">
                {listLoai.map((loai, i) => (
                  <tr key={i}>
                    <td>
                      <p>{loai.id_loai}</p>
                    </td>
                    <td>
                      <p>{loai.ten_loai}</p>
                    </td>
                    <td>
                      <p>{loai.anhien}</p>
                    </td>
                    <td>
                      <span class="btn--show-modal">
                        <i class="fas fa-tools"></i>
                      </span>
                    </td>
                    <td>
                      <span class="edit delete-cate">
                        <i class="fas fa-trash-alt"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
};

export default LoaiHang;
