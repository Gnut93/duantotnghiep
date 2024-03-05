import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="community">
        <div className="b-title">Tham gia cộng đồng #DACommunity</div>
        {/* Phần cộng đồng */}
        <input
          type="email"
          placeholder="Email của bạn..."
        />
        <button>→</button>
        <div className="title">Đồng hành cùng chúng tôi</div>
        {/* Các biểu tượng mạng xã hội */}
        <ul className="social-icons">
          <li>
            <a href="/">
              <i className="fas fa-facebook"></i>
            </a>
          </li>
        </ul>
        {/* ... */}
      </div>

      <div className="contact">
        {/* Thông tin liên hệ */}
        <p>CÔNG TY TNHH DA VIỆT NAM</p>
        {/* ... */}
      </div>

      <div className="about">
        {/* Các liên kết về chúng tôi */}
        {/* ... */}
      </div>

      <div className="customerService">
        {/* Các liên kết dịch vụ khách hàng */}
        {/* ... */}
      </div>

      <div className="paymentAndShipping">
        {/* Biểu tượng phương thức thanh toán và vận chuyển */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Footer;
