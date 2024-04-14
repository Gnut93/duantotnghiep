import React, { useEffect } from "react";
import "./Deal.css";
import img7 from "../../../assets/images/deal.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Deal = () => {
  useEffect(() => {
    // Khởi tạo AOS mỗi khi trang được tải lại
    AOS.init({ duration: 1000 });

    // Làm mới AOS sau mỗi lần render
    AOS.refresh();

    // Trả về hàm dọn dẹp (clean-up) để ngăn ngừa rò rỉ bộ nhớ
    return () => {
        AOS.refresh();
    };
  }, []);

  return (
    <>
      <div className="deal-container" data-aos="fade-up">
        <div className="deal-img">
          <img src={img7} alt="img-deal" />
        </div>
        <div className="deal-button">
          <Link to="/shop" className="btn-deal">
            SHOP NOW
          </Link>
        </div>
      </div>
    </>
  );
};

export default Deal;
