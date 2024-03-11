import React from "react";
import "./Offer.css";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <div className="wrapper">
      <div className="left">
        <img src="https://leeandtee.vn/image/600/650/1/0/banners/home2/balo-da-leeandtee-banner-homepage-1.png"></img>
      </div>
      <div className="right">
        <p>
          "Thương hiệu DA Shop được khách hàng yêu mến vì sự đơn giản, chắc chắn
          và chất lượng, chấm phá thêm nét cổ điển trong từng sản phẩm cùng đội
          ngũ nhân viên thân thiện, tận tình sẽ giúp khách hàng có những sự lựa
          chọn sản phẩm phù hợp nhất cho mình."
        </p>
        <h3>See You In Me</h3>
        <button>
          <Link to="/shop" className="menu-link">
            Sản phẩm
          </Link>
        </button>
      </div>
    </div>
    
  );
};

export default Offer;
