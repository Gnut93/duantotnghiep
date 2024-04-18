import React from "react";
import Navbar from '../Navbar/Navbar';
import { Link } from "react-router-dom";
import "./Change-goods.css"
const ChangeGoods = () => {
    return (
        <section className="cg">
          <Navbar></Navbar>
          <div className="container">
            <h2 className="cg-heading">Hướng dẫn đổi hàng</h2>
            <div className="cg-list">
              <div className="cg-item">
                <div className="cg-content">
                    <p className="cg-desc-strong">
                    {' '}
                     DA hỗ trợ dịch vụ đổi trả hàng trong vòng 7 ngày
                     kể từ ngày mua/nhận hàng. Vui lòng đọc kỹ Điều kiện đổi
                      và trả hàng. Sản phẩm gửi trả sẽ không được DA 
                      chấp nhận nếu không đáp ứng một trong những điều kiện 
                      bên dưới. Bạn sẽ phải thanh toán số tiền cho 2 lần 
                      vận chuyển (hoàn trả và đổi mới)   
                  </p>
                  <h4 className='cg-title-24'>ĐIỀU KIỆN ĐỔI TRẢ SẢN PHẨM</h4>
                  <p className='cg-desc-min'>
                        ● Còn hoá đơn mua hàng hoặc vận đơn vận chuyển. <br/>
                        ● Trong vòng 7 ngày kể từ ngày nhận hàng.<br/>
                        ● Chưa sử dụng, giặt ủi, không bị dơ bẩn, có mùi hôi…<br/>
                    </p>
                    <h4 className='cg-title-24'>CÁC BƯỚC ĐỔI TRẢ SẢN PHẨM</h4>
                    <h5 className='cg-font-18'><strong> 1. Mua tại cửa hàng</strong></h5>
                  <p className="cg-desc">
                    {' '}
                    Bạn mang đến chi nhánh đã mua để đổi sản phẩm khác
                  </p>
                  <h5 className='cg-font-18'><strong> 2. Mua hàng online</strong></h5>
                  <p className="cg-desc">
                    {' '}
                    Trường hợp hàng của bạn được đặt online và 
                    vận chuyển từ các cửa hàng DA, 
                    Bạn vui lòng liên hệ đến hotline chi nhánh đã gửi hàng hoặc 
                    (+84) 901.379.586 thông báo về việc muốn đổi/trả sản phẩm.
                    Danh sách các cửa hàng: <a href='https://by.tn/cuhk'>https://by.tn/cuhk</a>
                  </p>
                  <h4 className='cg-title-24'>LƯU Ý</h4>
                  <p className='cg-desc-min'>
                        ● Khách hàng có thể đổi mẫu bất kì theo ý thích, <br/>
                        ● Đổi sản phẩm tương đương hoặc giá trị cao hơn<br/>
                        ● Sản phẩm được đổi vì lý do chủ quan của khách hàng ( theo ý thích ), không được phép trả hoàn tiền.<br/>
                        ● Sản phẩm được đổi hoặc trả ( hoàn tiền ) nếu KHÔNG vì lý do chủ quan từ khách hàng mà lỗi kĩ thuật từ sản xuất.<br/>
                        ● Khách hàng chịu mọi chi phí vận chuyển ( hoàn trả và đổi mới ) nếu vì lý do chủ quan từ khách hàng.<br/>
                        ● DA sẽ hỗ trợ phí vận chuyển để khách hàng đổi sản phẩm mới nếu vì lý do lỗi kĩ thuật, không hỗ trợ chi phí trả hàng.<br/>
                        ● Sản phẩm được xác nhận là lỗi khi thuật, trước khi hoàn trả phải được gửi thông tin hình ảnh xác nhận qua<br/>
                    </p>
                  <h4 className='cg-title-24'>LIÊN HỆ CHĂM SÓC KHÁCH HÀNG</h4>
                  <p className='cg-desc-min'>
                        ● Email: daleather.2024@gmail.com <br/>
                        ● Phone: (+84) 901.379.586<br/>
                        ● Hỗ trợ online : m.me/dashop<br/>
                        ● Giờ làm việc:<br/>
                        + Thứ 2 - thứ 7: 9h - 18h<br/>
                        + Chủ nhật: 9h - 16h<br/>
                    </p>
                </div>
                
                  <hr></hr>
                  <h5 className='cg-font-18'>Bài viết xem thêm</h5>
                  <ul className='cg-ul'>
                    <li><Link to="/shopguide" className='cg-color-black'>● Hướng dẫn mua hàng</Link></li>
                    <li><Link to="/policy" className='trans-color-black'>● Chính Sách Đổi Hàng Và Đổi</Link></li>
                    <li><Link to="/trans" className='cg-color-black'>● Chính sách vận chuyển</Link></li>
                    <li><Link to="/quest" className='cg-color-black'>● Câu hỏi thường gặp</Link></li>
                  </ul>
                </div>
              </div>
            </div>
        </section>
      );
}
export default ChangeGoods