import React from 'react';
import Navbar from '../Navbar/Navbar';
import './About.css';
import aboutImg from './about-img.webp';

const About = () => {
  return (
    <section className="about">
      <Navbar></Navbar>
      <div className="container">
      <h3
        data-aos="fade-up"
        className="related-heading"
        style={{ marginBottom: "60px", marginTop: "70px" }}
      >
        Follow us on Instagram <i class="ri-instagram-fill"></i>
      </h3>
        <div className="about-list">
          <div className="about-item">
            <div className="about-content">
              <h3 className="about-title">Lịch Sử Của Chúng Tôi</h3>
              <p className="about-desc">
                {' '}
                Cách đây hơn 40 năm, vào đầu những năm 1980, tổ tiên chúng tôi
                đã bắt đầu sự nghiệp với chỉ một bàn tay trắng và lòng đam mê
                bất tận với da. Khởi nghiệp trong một góc nhỏ của thị trấn, họ
                dùng kỹ năng của mình để tạo ra những sản phẩm da đầu tiên, mà
                vẻ đẹp và chất lượng đã nhanh chóng được mọi người công nhận.
              </p>
              <p className="about-desc">
                {' '}
                Dùng những công cụ đơn giản và kỹ thuật truyền thống, cửa hàng
                của chúng tôi đã chăm chỉ tạo ra các sản phẩm từ da với sự tỉ mỉ
                và yêu thương. Từ những chiếc ví, dây nịt cho đến túi xách và
                giày, mỗi sản phẩm đều mang trong mình câu chuyện riêng, sự cố
                gắng và tâm huyết của người thợ làm.
              </p>
            </div>
            <div className="about-content">
              <h3 className="about-title">Sứ Mệnh Và Tầm Nhìn</h3>
              <p className="about-desc">
                {' '}
                Sứ mệnh của chúng tôi không chỉ dừng lại ở việc sản xuất các sản
                phẩm da chất lượng cao, mà còn là bảo tồn và phát triển nghề thủ
                công truyền thống, góp phần vào việc tạo ra công ăn việc làm cho
                cộng đồng địa phương và nâng cao giá trị văn hóa qua từng sản
                phẩm.
              </p>
              <p className="about-desc">
                {' '}
                Về tầm nhìn, chúng tôi không ngừng hướng tới việc trở thành
                thương hiệu đồ da thủ công hàng đầu, được biết đến không chỉ với
                chất lượng sản phẩm xuất sắc mà còn là một biểu tượng của sự
                sáng tạo, đổi mới và bền vững. Chúng tôi cam kết tiếp tục khám
                phá, sáng tạo và cải tiến không ngừng, đồng thời duy trì sự tôn
                trọng đối với phương pháp thủ công truyền thống, để mỗi sản phẩm
                không chỉ là một vật dùng mà còn là một tác phẩm nghệ thuật độc
                đáo.
              </p>
            </div>
          </div>
          <div className="about-image">
            <div className="about-image-item">
              <img
                src={aboutImg}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
