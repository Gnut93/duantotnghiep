import React, { useEffect } from "react";
import "./Recommend.css";
import user1 from "../../../assets/images/user1.jpg";
import user2 from "../../../assets/images/user2.jpg";
import user3 from "../../../assets/images/user3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
const Recommend = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  return (
    <div className="container">
      <h3
        className="related-heading"
        data-aos="fade-up"
        style={{ marginBottom: "30px", marginTop: "70px" }}
      >
        Khách Hàng Nói Gì Về Chúng Tôi?
      </h3>
      <div className="testimonial" data-aos="fade-up">
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <i className="ri-chat-quote-fill"></i>
              <p>
                "Sản phẩm đồ da của shop này thật sự tuyệt vời! Tôi đã mua một
                chiếc ví da và tôi rất ấn tượng với chất lượng và độ bền của nó.
                Da mềm mại và có mùi thơm tự nhiên, đồng thời các đường may rất
                tinh tế. Tôi hoàn toàn hài lòng với sản phẩm và chắc chắn sẽ mua
                thêm từ shop trong tương lai."
              </p>
              <img src={user1} alt="User 1" />
              <h3>Andree right hand</h3>
            </div>
            <div className="col-3">
              <i className="ri-chat-quote-fill"></i>
              <p>
                "Tôi đã mua một chiếc túi xách da từ shop và rất hài lòng với
                chất lượng. Túi xách được làm thủ công tinh xảo và thiết kế rất
                hiện đại. Da có màu sắc đẹp và rất chắc chắn. Dịch vụ khách hàng
                của shop cũng rất tốt, họ hỗ trợ tôi nhiệt tình. Tôi sẽ giới
                thiệu shop này cho bạn bè và người thân."
              </p>
              <img src={user2} alt="User 2" />
              <h3>C. Ronaldo</h3>
            </div>
            <div className="col-3">
              <i className="ri-chat-quote-fill"></i>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                modi rerum nam esse ipsam illum incidunt, optio provident dicta
                iusto laboriosam eos maiores enim sit corrupti ipsa omnis
                officiis quo!
              </p>
              <img src={user3} alt="User 3" />
              <h3>Lionel Messi</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
