import React from "react";
import "./Partner.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Partner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);
  return (
    <>
      <hr style={{ color: "gray", margin: "0px 220px" }} />
      <div className="partner-container" data-aos="fade-up">
        <div className="icon-logo">
          <i class="ri-truck-line"></i>
          <h6 style={{ textAlign: "center" }}>FreeShip </h6>
          <p style={{ textAlign: "center" }}>
            Chúng tôi miễn phí vận chuyển cho đơn hàng có giá trị cao
          </p>
        </div>
        <div className="icon-logo">
          <i class="ri-gift-line"></i>
          <h6 style={{ textAlign: "center" }}>Special Offers</h6>
          <p style={{ textAlign: "center" }}>
            Nhiều ưu đãi và quà tặng đặc biệt từ chúng tôi
          </p>
        </div>
        <div className="icon-logo">
          <i class="ri-shield-check-line"></i>
          <h6 style={{ textAlign: "center" }}>Order Protection</h6>
          <p style={{ textAlign: "center" }}>
            Đơn hàng được đảm bảo và uy tín
          </p>
        </div>
        <div className="icon-logo">
          <i class="ri-customer-service-2-line"></i>
          <h6 style={{ textAlign: "center" }}>Support</h6>
          <p style={{ textAlign: "center" }}>
            In ac hendrerit turpis. Aliquam ultrices dolor dolor, at commodo
            diam
          </p>
        </div>
      </div>
    </>
  );
};

export default Partner;
