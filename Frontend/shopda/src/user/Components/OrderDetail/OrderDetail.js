import React from 'react';
import Navbar from '../Navbar/Navbar';
import './OrderDetail.css';

const OrderDetail = () => {
  return (
    <section className="orderDetail">
      <Navbar></Navbar>
      <div className="container">
        <div className="orderDetail-content">
          <h3 className="orderDetail-heading">Chi tiết đơn hàng</h3>
          <div className="followOrder-table">
            <table>
              <thead>
                <tr>
                  <td>TT</td>
                  <td>Tên</td>
                  <td>hình ảnh</td>
                  <td>Số lượng</td>
                  <td>Màu sắc</td>
                  <td>Giá</td>
                  <td>Tổng tiền</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src="https://leeandtee.vn/image/400/480/1/0/product/images/women/vi-nu-mila-mau-nau-1.png"
                      alt=""
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
