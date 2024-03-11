import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <h2 className="contact-heading">Dịch vụ theo yêu cầu</h2>
        <p className="contact-desc">
          Dịch vụ thiết kế đồ da theo yêu cầu của chúng tôi cung cấp trải nghiệm
          cá nhân hóa tối ưu cho khách hàng, mang lại cơ hội sở hữu những sản
          phẩm da độc đáo, phản ánh đúng phong cách và nhu cầu cá nhân. Từ ví
          da, túi xách, đến các sản phẩm phụ kiện khác, mỗi món đồ được tạo ra
          với sự tỉ mỉ và chăm chút đến từng chi tiết. Khách hàng có thể tham
          gia trực tiếp vào quá trình thiết kế: lựa chọn loại da, màu sắc, kiểu
          dáng, cũng như thêm các chi tiết cá nhân hóa như khắc tên hoặc thông
          điệp ý nghĩa. Đội ngũ thiết kế và thợ thủ công của chúng tôi, với bề
          dày kinh nghiệm và tay nghề cao, cam kết mang lại sản phẩm tinh tế,
          chất lượng, đảm bảo sự hài lòng tuyệt đối cho khách hàng. Hãy để chúng
          tôi giúp bạn tạo nên những tác phẩm đồ da riêng biệt, phản ánh đẳng
          cấp và cá tính của bạn.
        </p>
        <div className="contact-center">
          <form
            method="post"
            action=""
            class="contact-form">
            <input
              class="name"
              type="text"
              name=""
              id=""
              placeholder="Tên"
            />
            <input
              class="email"
              type="text"
              name=""
              id=""
              placeholder="Size"
            />
            <input
              class="name"
              type="text"
              name=""
              id=""
              placeholder="Màu da"
            />
            <input
              class="email"
              type="text"
              name=""
              id=""
              placeholder="Hình mẫu"
            />
            <input
              class="subject"
              type="text"
              name=""
              id=""
              placeholder="Loại da"
            />
            <input
              class="phone"
              type="text"
              name=""
              id=""
              placeholder="Số điện thoại"
            />
            <textarea
              class="message"
              type="text"
              name=""
              id=""
              placeholder="mỗ tả chi tiết"
              rows="7"></textarea>
            <button type="submit">Send message</button>
          </form>
          <div className="contact-detail">
            <div class="contact-item">
              <i class="fa-solid fa-location-dot fa-xl"></i>
              <div class="contact-text">
                <h4>Address</h4>
                <p>
                  Quang Trung Software Park QTSC Building 1, Quang Trung, Ward
                  12, HCMC
                </p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fa-solid fa-phone fa-xl"></i>
              <div class="contact-text">
                <h4>Phone</h4>
                <p>(+84) 901.379.586</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fa-solid fa-envelope fa-xl"></i>
              <div class="contact-text">
                <h4>Email</h4>
                <p>dashop2024@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
