import React from 'react';
import Navbar from '../Navbar/Navbar';
import './FollowOrder.css';

const FollowOrder = () => {
  return (
    <screen className="followOrder">
      <Navbar></Navbar>
      <div className="container">
        <h3 className="followOrder-heading">Theo dõi đơn hàng</h3>
        <form className="followOrder-form">
          <input
            type="text"
            placeholder="Số điện thoại"
          />
          <button
            type="submit"
            className="followOrder-button">
            <i className="fa fa-search"></i>
          </button>
        </form>
        <h3 className="followOrder-title">Thông tin đơn hàng</h3>
        <div className="followOrder-table">
          <table>
            <th>
              <td>Tên</td>
              <td>Địa chỉ</td>
              <td>Số điện thoại</td>
              <td>Số điện thoại</td>
              <td>Tổng tiền</td>
              <td>Trạng thái</td>
              <td>Thanh toán</td>
              <td>Ngày đặt hàng</td>
            </th>
          </table>
          <tb></tb>
        </div>
      </div>
    </screen>
  );
};

export default FollowOrder;
