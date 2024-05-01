import React from 'react';
import Navbar from '../Navbar/Navbar';
import './SuccessPay.css';

const SuccessPay = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="successPay">
          <h3 className="successPay-heading">Thanh toán thành công</h3>
          <p className="successPay-text">
            Cảm ơn bạn đã mua hàng tại shop của chúng tôi!
          </p>
        </div>
        <div className="successPay">
          <h3 className="successPay-heading-err">
            Thanh toán không thành công
          </h3>
          <p className="successPay-text">Vui lòng kiểm tra lại!</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPay;
