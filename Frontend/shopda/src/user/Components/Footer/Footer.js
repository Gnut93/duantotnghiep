import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logoSaleNoti from '../../../assets/images/logoSaleNoti.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Về chúng tôi</h4>
            <ul>
              <li>
                <Link to="#">Giới thiệu</Link>
              </li>
              <li>
                <Link to="#">Dịch vụ</Link>
              </li>
              <li>
                <Link to="#">Liên hệ</Link>
              </li>
              <li>
                <Link to="#">Tuyển dụng</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Dịch vụ khách hàng</h4>
            <ul>
              <li>
                <Link to="#">Hướng dẫn mua hàng</Link>
              </li>
              <li>
                <Link to="#">Hướng dẫn đổi trả hàng</Link>
              </li>
              <li>
                <Link to="#">Chính sách đổi hàng và đổi </Link>
              </li>
              <li>
                <Link to="#">Chính sách vận chuyển</Link>
              </li>
              <li>
                <Link to="#">Câu hỏi thường gặp</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>online shop</h4>
            <ul>
              <li>
                <Link to="/cate/2">Túi xách</Link>
              </li>
              <li>
                <Link to="/cate/3">Túi du lịch</Link>
              </li>
              <li>
                <Link to="/cate/5">Balo</Link>
              </li>
              <li>
                <Link to="/cate/1">Bóp-Ví</Link>
              </li>
              <li>
                <Link to="/cate/4">Dây nịt / Thắt lưng</Link>
              </li>
              <li>
                <Link to="/cate/6">Phụ kiện khác</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Theo dõi chúng tôi</h4>
            <div className="social-links">
              <Link to="#">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
            <div>
              <img
                src={logoSaleNoti}
                alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
