import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Discout = () => {
  const [listDis, setListDis] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/admin-giftcode/list')
      .then((res) => res.json())
      .then(setListDis);
  }, []);
  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Mã Giảm Giá</h1>
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
                  <th>Code</th>
                  <th>Quantity</th>
                  <th>Giá Trị</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày Hết Hạng</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody class="categories">
                {listDis.map((dis, i) => (
                  <tr key={i}>
                    <td>
                      <p>{dis.id_gc}</p>
                    </td>
                    <td>
                      <p>{dis.code}</p>
                    </td>
                    <td>
                      <p>{dis.quantity}</p>
                    </td>
                    <td>
                      <p>{dis.price}</p>
                    </td>
                    <td>
                      <p>
                        {new Date(dis.created_date).toLocaleDateString('vi')}
                      </p>
                    </td>
                    <td>
                      <p>
                        {new Date(dis.expiration_date).toLocaleDateString('vi')}
                      </p>
                    </td>
                    <td>
                      <Link to={`/admin/EditLoai/${dis.id_gc}`}>
                        <span className="btn--show-modal">
                          <i className="fas fa-tools"></i>
                        </span>
                      </Link>
                    </td>
                    <td>
                      <span class="delete-cate">
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

export default Discout;
