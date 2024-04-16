import React from "react";
import "./Offer.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Offer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  });
  return (
    <section className="offer">
      <div className="container">
        <div className="offer-content">
          <div className="offer-item" data-aos="fade-right">
            <img src="LEARNMORE.png" alt="" />
          </div>
          <div className="offer-info" data>
            <h1 className="offer-heading">
              Được làm thủ công chỉ dành cho bạn.
            </h1>
            <p className="offer-desc">
              Với đội ngủ nhiều năm kinh kinh nghiệm về làm đồ da thủ công vô
              cùng tỉ mỹ có thể tạo ra sản phẩm theo yêu cầu của bạn, hãy cho
              chúng tôi ý tưởng chúng tôi sẽ biến ướt mơ của bạn thành hiện thực
            </p>
            <Link to="/contact" className="offer-button">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
