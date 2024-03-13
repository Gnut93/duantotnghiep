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

const Banner = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src="/Frontend/shopda/src/assets/images/logo.png" alt="" />
        </div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Banner;
