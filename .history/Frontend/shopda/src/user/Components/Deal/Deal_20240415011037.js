import React, { useEffect } from "react";
import "./Deal.css";
import img7 from "../../../assets/images/deal.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Deal = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    
    // Trả về một hàm dọn dẹp để thực hiện bất kỳ cập nhật nào khác nếu cần
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
