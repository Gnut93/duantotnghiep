import React from "react";
import "./Partner.css";

const Partner = () => {
  return (
    <>
      <hr style={{ color: "gray", margin: "0px 20px" }} />
      <div className="partner-container">
        <div className="icon-logo">
          <i class="ri-truck-line"></i>
          <h6 style={{ textAlign: "center" }}>FreeShip </h6>
          <p
        </div>
        <div className="icon-logo">
          <i class="ri-gift-line"></i>
          <h6 style={{ textAlign: "center" }}>Special Offers</h6>
        </div>
        <div className="icon-logo">
          <i class="ri-shield-check-line"></i>
          <h6 style={{ textAlign: "center" }}>Order Protection</h6>
        </div>
        <div className="icon-logo">
          <i class="ri-customer-service-2-line"></i>
          <h6 style={{ textAlign: "center" }}>Support</h6>
        </div>
      </div>
    </>
  );
};

export default Partner;
