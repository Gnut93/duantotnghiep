import React, { useEffect, useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [listsp, setListSP] = useState([]);
  const [listLoai, setListLoai] = useState([]);

  const [selectedLoai, setSelectedLoai] = useState('');
  // const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/category/list')
      .then((res) => res.json())
      .then(setListLoai);
    fetch('http://localhost:4000/products/list')
      .then((res) => res.json())
      .then(setListSP);
  }, []);
  const xoaSP = (id) => {
    if (window.confirm('Xóa sản phẩm không?')) {
      fetch(`http://localhost:4000/admin-products/delete/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          alert('Đã xóa Màu thành công');
          fetch('http://localhost:4000/products/list')
            .then((res) => res.json())
            .then((data) => setListSP(data))
            .catch((error) =>
              console.error('Lỗi cập nhật danh sách sản phẩm:', error)
            );
        })
        .catch((error) => console.error('Lỗi xóa sản phẩm:', error));
    }
  };

  const handleLoaiChange = useCallback((event) => {
    setSelectedLoai(event.target.value);
  }, []);

  // Lọc danh sách sản phẩm theo loại sản phẩm đã chọn
  const filteredProducts =
    selectedLoai === ''
      ? listsp
      : // eslint-disable-next-line eqeqeq
        listsp.filter((item) => item.id_cate == selectedLoai);

  function HienSPTrongMotTrang({ spTrongTrang }) {
    return (
      <table className="tab-content active">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình</th>
            <th>Tên</th>
            <th>Ngày nhập</th>
            <th>Giá gốc</th>
            <th>Giá KM</th>
            <th>Xem</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {spTrongTrang.map((sp, i) => (
            <tr key={i}>
              <td>
                <p>{sp.id_pd}</p>
              </td>
              <td>
                <img
                  src={sp.image}
                  alt="#"
                />
              </td>
              <td>
                <p>{sp.name}</p>
              </td>
              <td>{new Date(sp.update_date).toLocaleDateString('vi')}</td>
              <td>
                {parseInt(sp.price).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </td>
              <td>
                {parseInt(sp.price_sale).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </td>
              <td>{sp.view}</td>
              <td>
                <Link to={`/admin/EditSP/${sp.id_pd}`}>
                  <span className="btn--show-modal">
                    <i className="fas fa-tools"></i>
                  </span>
                </Link>
              </td>
              <td>
                <span
                  className="delete-cate"
                  onClick={() => xoaSP(sp.id_pd)}>
                  <i className="fas fa-trash-alt"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  function PhanTrang({ pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = filteredProducts.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(filteredProducts.length / pageSize);
    const chuyenTrang = (event) => {
      const newIndex = (event.selected * pageSize) % filteredProducts.length;
      setfromIndex(newIndex);
    };
    return (
      <>
        <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
        <ReactPaginate
          nextLabel=">"
          previousLabel="<"
          pageCount={tongSoTrang}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={chuyenTrang}
          renderOnZeroPageCount={null}
          className="thanhphantrang1"
          activeClassName="active"
        />
      </>
    );
  }

  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Kho hàng</h1>
          </div>
          <div className="checkout-address-input">
            <select
              name="cate"
              className="option-cate"
              onChange={handleLoaiChange}>
              <option value="">Tất cả</option>
              {listLoai.map((loai, i) => (
                <option
                  key={i}
                  value={loai.id_cate}>
                  {loai.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Sản phẩm</h3>
            </div>
            <PhanTrang pageSize={16} />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Shop;
