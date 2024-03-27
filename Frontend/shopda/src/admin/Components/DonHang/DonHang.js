import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DonHang = () => {
  const [listBill, setListBill] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/bill/list')
      .then((res) => res.json())
      .then(setListBill);
  }, []);
  const BillStatus = ({ status }) => {
    switch (status) {
      case 'chờ':
        return <span className="status waiting">Chờ</span>;
      case 'hoàn thành':
        return <span className="status success">Hoàn Thành</span>;
      case 'chuẩn bị':
        return <span className="status preparing">Chuẩn Bị</span>;
      case 'đang giao':
        return <span className="status delivering">Đang giao</span>;
      case 'đã hủy':
        return <span className="status cancelled">Đã Hủy</span>;
      default:
        return <span className="status">Không xác định</span>;
    }
  };
  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Đơn hàng</h1>
          </div>
          <div className="dropdown">
            <div className="dropdown__select">
              <span className="dropdown__selected">Date</span>
              <i className="fa fa-caret-down dropdown__caret"></i>
            </div>
            <ul className="dropdown__list">
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item1
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item2
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item3
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item4
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item5
              </a>
              <a
                href="/"
                className="dropdown__item dropdown__text">
                Item6
              </a>
            </ul>
          </div>
        </div>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Những Đơn Đặt Hàng Gần Đây</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Người Dùng</th>
                  <th>Ngày Đặt</th>
                  <th>Trạng Thái</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Xem</th>
                  <th>Set trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {listBill.map((bill, i) => (
                  <tr key={i}>
                    <td>
                      <p>{bill.name}</p>
                    </td>
                    <td>
                      <p>
                        {new Date(bill.created_date).toLocaleDateString('vi')}
                      </p>
                    </td>
                    <td>
                      <BillStatus status={bill.status.toLowerCase()} />
                    </td>
                    <td>
                      <span>
                        {parseInt(bill.total_price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </td>
                    <td>
                      <span className="status waiting">
                        {bill.payment_type}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/donhangchitiet/${bill.id_bill}`}>
                        <span className="btn--show-modal">
                          <i className="fas fa-search"></i>
                        </span>
                      </Link>
                    </td>

                    <td>
                      <Link to={`/admin/EditStatus/${bill.id_bill}`}>
                        <span className="btn--show-modal">
                          <i className="fas fa-tools"></i>
                        </span>
                      </Link>
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

export default DonHang;
