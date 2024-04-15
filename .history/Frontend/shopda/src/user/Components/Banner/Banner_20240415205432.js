import React from "react";
import "./Banner.css";

import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <Navbar backgroundColor="transparent"></Navbar>
      <video autoPlay muted loop plays-inline className="bgvideo">
        <source src="video.mp4" type="video/mp4"></source>
      </video>
      <div className="banner-content">
        <div className="">
          <h1 className="banner-heading">Đam Mê Của Bạn Là Gì?</h1>
          <p className="banner-desc">
            Đam mê của chúng tôi là tạo ra nhiều sản phẩm độc đáo từ da thủ công
            để phục vụ những nhu cầu đặc biệt của các bạn. Chúng tôi không chỉ
            xem việc làm ra các sản phẩm từ da như một nhiệm vụ kỹ thuật, mà còn
            là một cơ hội để thể hiện sự tinh tế. Chúng tôi tin rằng mỗi món đồ
            là một tác phẩm nghệ thuật, mang trong đó sự chăm sóc tỉ mỉ và đam
            mê sáng tạo.
          </p>
          <Link to="/shop" className="banner-button">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
