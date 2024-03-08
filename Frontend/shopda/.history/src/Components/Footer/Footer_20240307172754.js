import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>Về chúng tôi</h4>
  	 			<ul>
  	 				<li><a href="#">Giới thiệu</a></li>
  	 				<li><a href="#">Dịch vụ</a></li>
  	 				<li><a href="#">Liên hệ</a></li>
  	 				<li><a href="#">Tuyển dụng</a></li>
           
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Dịch vụ khách hàng</h4>
  	 			<ul>
  	 				<li><a href="#">Hướng dẫn mua hàng</a></li>
  	 				<li><a href="#">Hướng dẫn đổi trả hàng</a></li>
  	 				<li><a href="#">Chính sách đổi hàng và đổi </a></li>
  	 				<li><a href="#">Chính sách vận chuyển</a></li>
  	 				<li><a href="#">Câu hỏi thường gặp</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>online shop</h4>
  	 			<ul>
  	 				<li><a href="#">Túi xách</a></li>
  	 				<li><a href="#">Túi du lịch</a></li>
  	 				<li><a href="#">Balo</a></li>
  	 				<li><a href="#">Bóp-Ví</a></li>
             <li><a href="#">Dây nịch</a></li>
             <li><a href="#">Phụ kiện khác</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Theo dõi chúng tôi</h4>
				<div>
					<img src="/src/" alt=""></img>
				</div>
  	 			<div className="social-links">
  	 				<a href="#"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i className="fab fa-twitter"></i></a>
  	 				<a href="#"><i className="fab fa-instagram"></i></a>
  	 				<a href="#"><i className="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
  );
};

export default Footer;
