import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './FollowOrder.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const schema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
    .required('Không được bỏ trống'),
});
const FollowOrder = () => {
  const [listBill, setBill] = useState([]);

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, reset, formState, control } = form;
  const { errors, isSubmitSuccessful } = formState;
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const handCheckPhone = async (data) => {
    try {
      const url = 'http://localhost:4000/bill/check-bill';
      const opt = {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await fetch(url, opt);
      const responseData = await res.json();
      if (responseData.validDiscount) {
        setBill(responseData.bills);
      } else {
        alert('Đơn hàng không tồn tại');
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra mã giảm giá:', error);
    }
  };
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

      fetch(`http://localhost:4000/bill/list`)
        .then((res) => res.json())
        .then(setBill);
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
        <h3 className="followOrder-heading">Tra cứu đơn hàng</h3>
        <form
          className="followOrder-form"
          onSubmit={handleSubmit(handCheckPhone)}
          noValidate>
          <input
            type="text"
            placeholder="Số điện thoại"
            {...register('phone')}
          />
          <button
            type="submit"
            className="followOrder-button">
            <i className="fa fa-search"></i>
          </button>
          <p className="err">{errors.phone?.message}</p>
        </form>
        <DevTool control={control} />
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

export default FollowOrder;
