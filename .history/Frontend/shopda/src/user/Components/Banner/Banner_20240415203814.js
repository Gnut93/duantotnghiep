// import React, { useState, useEffect } from "react";
// import "./Banner.css";

// const imageBanner = [
//   {
//     image:
//       "https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png",
//   },
//   {
//     image:
//       "https://leeandtee.vn/image/1920/884/1/0/banners/tui-deo-cheo-are-banner-02.png",
//   },
//   {
//     image:
//       "https://leeandtee.vn/image/1920/884/1/0/banners/chat-lieu%20cao-cap-banner-02.png",
//   },
//   {
//     image:
//       "https://leeandtee.vn/image/1920/884/1/0/banners/that-lung-saff-banner-04.png",
//   },
// ];

// const Banner = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((current + 1) % imageBanner.length);
//     }, 4000); // Thời gian chuyển đổi giữa các slide, ở đây là 4 giây

//     return () => clearInterval(interval);
//   }, [current]);

//   const nextBanner = () => {
//     setCurrent((current + 1) % imageBanner.length);
//   };

//   const prevBanner = () => {
//     setCurrent((current - 1 + imageBanner.length) % imageBanner.length);
//   };

//   const getTransformStyle = () => {
//     return {
//       transform: `translateX(-${current * 100}%)`,
//     };
//   };

//   return (
//     <div className="banner">
//       <i className="fas fa-chevron-left banner-prev" onClick={prevBanner}></i>
//       <div className="banner-wrapper">
//         <div className="banner-main" style={getTransformStyle()}>
//           {imageBanner.map((image, index) => (
//             <div className="banner-item" key={index}>
//               <img src={image.image} alt="" />
//             </div>
//           ))}
//         </div>
//       </div>
//       <i className="fas fa-chevron-right banner-next" onClick={nextBanner}></i>
//     </div>
//   );
// };

// export default Banner;

import React from "react";
import "./Banner.css";

import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  AOS.init();

  return (
    <div className="banner">
      <Navbar backgroundColor="transparent"></Navbar>
      <video autoPlay muted loop plays-inline className="bgvideo">
        <source src="video.mp4" type="video/mp4"></source>
      </video>
      <div className="banner-content" >
        <div>
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
