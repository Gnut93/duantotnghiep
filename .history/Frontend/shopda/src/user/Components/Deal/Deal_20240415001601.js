import React from "react";
import "./Deal.css";
import img7 from "../../../assets/images/deal.png";

const Deal = () => {
  return (
    <>
      <div className="deal-container">
        <div className="deal-img">
          <img src={img7} alt="img-deal" />
        </div>
        <div className="deal-button">
          <button>Shop now</button>
        </div>
      </div>
    </>
  );
};

export default Deal;
