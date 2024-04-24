import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FollowOrderUser = () => {
  const [listBill, setListBill] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const idUser = user ? user.id_user : null;
  useEffect(() => {
    fetch(`http://localhost:4000/bill/list/${idUser}`)
      .then((res) => res.json())
      .then(setListBill);
  }, [idUser]);

  const HandleCancelOrder = async (id_bill, status) => {
    try {
      if (status !== 'Chờ') {
        alert(`Đơn hàng đang ở trạng thái ${status}  , không thể hủy.`);
        return;
      }

      const confirmation = window.confirm(
        'Bạn có chắc chắn muốn hủy đơn hàng này không ?'
      );
      if (!confirmation) {
        return;
      }

      const cancelOrderUrl = `http://localhost:4000/bill/set-statusCancelOrder`;
      const cancelOrderOpt = {
        method: 'PUT',
        body: JSON.stringify({ id: id_bill }),
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(cancelOrderUrl, cancelOrderOpt);

      const response = await fetch(
        `http://localhost:4000/bill/detailbill/${id_bill}`
      );
      const billDetailData = await response.json();
      console.log(billDetailData);
      const quantityArray = billDetailData.map((item) => ({
        id_pd_detail: item.id_pd_detail,
        quantity: item.quantity,
      }));
      const updateQuantityUrl = `http://localhost:4000/admin-products/update-quantity`;
      const updateQuantityOpt = {
        method: 'put',
        body: JSON.stringify(quantityArray),
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(updateQuantityUrl, updateQuantityOpt);

      alert('Đã Hủy Đơn Hàng Thành Công');

      fetch(`http://localhost:4000/bill/list/${idUser}`)
        .then((res) => res.json())
        .then(setListBill);
    } catch (error) {
      console.error(
        'Lỗi khi thực hiện hủy đơn hàng hoặc cập nhật số lượng: ',
        error
      );
    }
  };

  return (
    <screen className="followOrder">
      <Navbar></Navbar>
      <div className="container">
        <h3 className="followOrder-heading">Theo dõi đơn hàng</h3>
        <h3 className="followOrder-title">Lịch sử mua hàng</h3>
        <div className="followOrder-list">
          {listBill.map((bill, i) => (
            <div
              key={i}
              className="followOrder-item">
              <p>TT: {bill.id_bill}</p>
              <p>Tên: {bill.name}</p>
              <p>Địa chỉ: {bill.address}</p>
              <p>Số điện thoại: {bill.phone}</p>
              <p>Email: {bill.email}</p>
              <p>
                Tổng tiền:{' '}
                {parseInt(bill.total_price).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
              <p>Trạng thái: {bill.status}</p>
              <p>Thanh toán: {bill.payment_type}</p>
              <p>
                Ngày đặt hàng:{' '}
                {new Date(bill.created_date).toLocaleDateString('vi')}
              </p>
              <Link to={`/order-detail/${bill.id_bill}`}>
                <span className="btn--show-modal">
                  <i className="fas fa-search"></i>
                </span>
              </Link>
              {bill.status === 'Chờ' && (
                <Link to={`/changetheaddress/${bill.id_bill}`}>
                  <span className="btn--show-modal">
                    <i className="fas fa-tools"></i>
                  </span>
                </Link>
              )}
              <span
                className="btn--show-modal"
                onClick={() => HandleCancelOrder(bill.id_bill, bill.status)}>
                <i className="fa-regular fa-rectangle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </screen>
  );
};

export default FollowOrderUser;
