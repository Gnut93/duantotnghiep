import React from "react";
import "./Deal.css";
import img7 from "../../../assets/images/deal.png";
import { Link } from "react-router-dom";

const Deal = () => {
  return (
    <>
      <div className="deal-container">
        <div className="deal-img">
          <img src={img7} alt="img-deal" />
        </div>
        <div className="deal-button">
          <Link to="/cate/1" className="btn-deal">SHOP NOW</Link>
        </div>
      </div>
    </>
  );
};

export default Deal;
