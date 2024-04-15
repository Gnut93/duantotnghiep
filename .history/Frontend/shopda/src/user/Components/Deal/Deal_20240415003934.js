import React, { useEffect } from "react";
import "./Deal.css";
import img7 from "../../../assets/images/deal.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Deal = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Khởi tạo AOS với thời gian hoạt ảnh là 1000ms
  }, []);

  return (
    <>
      <div className="deal-container" data-aos="fade-up">
        {" "}
        {/* Thêm data-aos="fade-up" cho hiệu ứng xuất hiện từ dưới lên */}
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
