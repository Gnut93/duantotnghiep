import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './FollowOrder.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
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
  return (
    <screen className="followOrder">
      <Navbar></Navbar>
      <div className="container">
        <h3 className="followOrder-heading">Theo dõi đơn hàng</h3>
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
        <h3 className="followOrder-title">Thông tin đơn hàng</h3>
        <div className="followOrder-table">
          <table>
            <tr>
              <td>TT</td>
              <td>Tên</td>
              <td>Địa chỉ</td>
              <td>Số điện thoại</td>
              <td>email</td>
              <td>Tổng tiền</td>
              <td>Trạng thái</td>
              <td>Thanh toán</td>
              <td>Ngày đặt hàng</td>
              <td>Chi tiết</td>
            </tr>
            <tbody>
              {listBill.map((bill, i) => (
                <tr key={i}>
                  <td>
                    <p>{bill.id_bill}</p>
                  </td>
                  <td>
                    <p>{bill.name}</p>
                  </td>
                  <td>
                    <p>{bill.address}</p>
                  </td>
                  <td>
                    <p>{bill.phone}</p>
                  </td>
                  <td>
                    <p>{bill.email}</p>
                  </td>
                  <td>
                    {parseInt(bill.total_price).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td>
                    <p>{bill.status}</p>
                  </td>
                  <td>
                    <p>{bill.payment_type}</p>
                  </td>
                  <td>
                    {new Date(bill.created_date).toLocaleDateString('vi')}
                  </td>
                  <td>
                    <a href={`/order-detail/${bill.id_bill}`}>Xem</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </screen>
  );
};

export default FollowOrder;
