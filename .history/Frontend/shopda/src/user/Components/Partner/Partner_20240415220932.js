import React from "react";
import "./Partner.css";
import

const Partner = () => {
  return (
    <>
      <hr style={{ color: "gray", margin: "0px 220px" }} />
      <div className="partner-container">
        <div className="icon-logo">
          <i class="ri-truck-line"></i>
          <h6 style={{ textAlign: "center" }}>FreeShip </h6>
          <p style={{ textAlign: "center" }}>
            In ac hendrerit turpis. Aliquam ultrices dolor dolor, at commodo
            diam
          </p>
        </div>
        <div className="icon-logo">
          <i class="ri-gift-line"></i>
          <h6 style={{ textAlign: "center" }}>Special Offers</h6>
          <p style={{ textAlign: "center" }}>
            In ac hendrerit turpis. Aliquam ultrices dolor dolor, at commodo
            diam
          </p>
        </div>
        <div className="icon-logo">
          <i class="ri-shield-check-line"></i>
          <h6 style={{ textAlign: "center" }}>Order Protection</h6>
          <p style={{ textAlign: "center" }}>
            In ac hendrerit turpis. Aliquam ultrices dolor dolor, at commodo
            diam
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
