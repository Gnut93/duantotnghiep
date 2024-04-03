import React from "react";
import Navbar from '../Navbar/Navbar';
import { Link } from "react-router-dom";
import "./Policy-trans.css"
const Trans = () => {
    return (
        <section className="trans">
          <Navbar></Navbar>
          <div className="container">
            <h2 className="trans-heading">Chính sách vận chuyển</h2>
            <div className="trans-list">
              <div className="trans-item">
                <div className="trans-content">
                    <p className="trans-desc-strong">
                    {' '}
                    Để thuận tiện cho việc giao hàng nhanh chóng và đảm bảo chuyên nghiệp. DA hợp tác với các đối tác vận chuyển sau : 
                  </p>
                    <h5 className='trans-font-18'><strong> 1. Giao nhận hàng TRONG NGÀY với nội thành Hồ Chí Minh</strong></h5>
                    <p className="trans-desc">
                    <img className="trans-a" alt="ahamove" src="https://leeandtee.vn/uploads/images/hoptac/ahamove.png" height="50px"></img> <a className="trans-a" href="https://www.ahamove.com/pages/price">Bảng giá tham khảo</a>
                    </p>
                    <p className="trans-desc">
                    <img className="trans-a" alt="grab" src="https://leeandtee.vn/uploads/images/hoptac/Grab-express.png" height="50px"></img> <a className="trans-a" href="https://www.grab.com/vn/express/">Bảng giá tham khảo</a><br/>
                    DA sử dụng dịch vụ của AHAMOVE hoặc GRAB. Cước phí giao nhanh trong ngày sẽ cao hơn cước phí thông thường khi giao qua ngày, quý khách hàng có nhu cầu nhận hàng trong ngày, vui lòng ghi chú hoặc thông báo với nhân viên khi xác nhận đơn hàng.
                    </p>
                  <h5 className='trans-font-18'><strong> 2. Giao hàng trên toàn quốc</strong></h5>
                  <p className="trans-desc">
                  <img className="trans-a" alt="ghtk" src="https://leeandtee.vn/uploads/images/hoptac/ghtk.png" height="50px"></img> <a className="trans-a" href="https://giaohangtietkiem.vn/dich-vu-giao-hang-ghtk/">Bảng giá tham khảo</a><br/>
                 DA sử dụng dịch vụ của giaohangtietkiem.vn. Bạn có thể kiểm tra chi tiết phí vận chuyển khi đặt hàng tại website ...
                  </p>
                  <h5 className='trans-font-18'><strong> 3. Ngoài ra một số địa chỉ ở vùng sâu vùng xa</strong></h5>
                  <p className="trans-desc">
                  - không nằm trong khu vực hỗ trợ giao hàng của giaohangtietkiem.vn, DA sẽ sử dụng dịch vụ của Bưu Điện để gửi hàng, tính theo cước phí của Bưu Điện. Bạn vui lòng thanh toán trước thông qua hình thức chuyển khoản ngân hàng. <br/>
                  <img className="trans-a" alt="vnpost" src="https://leeandtee.vn/uploads/images/hoptac/vnpost.png" height="50px"></img> <a className="trans-a" href="http://www.vnpost.vn/vi-vn/tra-cuu-gia-cuoc">Bảng giá tham khảo</a><br/>
                
                  </p>
                </div>
                
                  <hr></hr>
                  <h5 className='trans-font-18'>Bài viết xem thêm</h5>
                  <ul className='trans-ul'>
                    <li><Link to="/shopguide" className='trans-color-black'>● Hướng dẫn mua hàng</Link></li>
                    <li><Link to="/changegoods" className='trans-color-black'>● Hướng dẫn đổi trả hàng</Link></li>
                    <li><Link to="/policy" className='trans-color-black'>● Chính Sách Đổi Hàng Và Đổi</Link></li>
                    <li><Link to="/quest" className='trans-color-black'>● Câu hỏi thường gặp</Link></li>
                  </ul>
                </div>
              </div>
            </div>
        </section>
      );
}
export default Trans