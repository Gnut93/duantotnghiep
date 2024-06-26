import React from "react";
import "./Partner.css";

const Partner = () => {
  return (
    <>
      <hr style={{ color: "gray" }} />
      <div className="partner-container">
        <div className="icon-logo">
          <i class="ri-truck-line"></i>
          <h4 style={{ textAlign: "center" }}>FreeShip </h4>
        </div>
        <div className="icon-logo">
          <i class="ri-gift-line"></i>
          <h style={{ textAlign: "center" }}>Special Offers</h>
        </div>
        <div className="icon-logo">
          <i class="ri-shield-check-line"></i>
        </div>
        <div className="icon-logo">
          <i class="ri-customer-service-2-line"></i>
        </div>
      </div>
    </>
  );
};

export default Partner;
