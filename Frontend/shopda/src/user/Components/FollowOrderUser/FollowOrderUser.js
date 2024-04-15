import React from 'react';
import Navbar from '../Navbar/Navbar';

const FollowOrderUser = () => {
  return (
    <screen className="followOrder">
      <Navbar></Navbar>
      <div className="container">
        <h3 className="followOrder-heading">Theo dõi đơn hàng</h3>
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
              {/* {listBill.map((bill, i) => (
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
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </screen>
  );
};

export default FollowOrderUser;
