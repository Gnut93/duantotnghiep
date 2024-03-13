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
import logo from "../../../assets/images/logo.png"; // Thay đổi đường dẫn import

import videoSrc from "../../../assets/images/Lauriel Leather Video.mp4";

const Banner = () => {
  return (
    <div class="hero">
      <video autoplay muted loop plays-inline class="bgvideo">
        <source src={videoSrc} type="video/mp4"></source>
      </video>
      <nav>
        <img src="./logo.png" class="logo" />
        <ul>
          <li><a href="">HOME</a></li>
          <li><a href="">HOME</a></li>
          <li><a href="">HOME</a></li>
          <li><a href="">HOME</a></li>
          <li><a href="">HOME</a></li>
          <li><a href="">HOME</a></li>
          <li><a href="">HOME</a></li>
          <li><a href="">HOME</a></li>
        </ul>
        <div class="icon">
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-bag-shopping"></i>
        </div>
      </nav>
      <div class="content">
        <h1>What's your passion?</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          aspernatur laborum quibusdam provident ab quidem dolorum inventore,
          consectetur dolore molestias maxime in quae, a voluptatem saepe velit
          eveniet quod sunt.
        </p>
        <a href="#">SHOP NOW</a>
      </div>
    </div>
  );
};

export default Banner;
