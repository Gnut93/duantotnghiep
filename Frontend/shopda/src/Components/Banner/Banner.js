import React, { useState } from 'react';
import './Banner.css';
const imageBanner = [
  {
    image:
      'https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png',
  },
  {
    image:
      'https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png',
  },
  {
    image:
      'https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png',
  },
  {
    image:
      'https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextBanner = () => {
    setCurrent((current + 1) % imageBanner.length);
  };

  const prevBanner = () => {
    setCurrent((current - 1 + imageBanner.length) % imageBanner.length);
  };

  const getTransformStyle = () => {
    return {
      transform: `translateX(-${current * 100}%)`,
    };
  };
  return (
    <div className="banner">
      <i
        class="fas fa-chevron-left banner-prev"
        onClick={prevBanner}></i>
      <div class="banner-wrapper">
        <div
          class="banner-main"
          style={getTransformStyle()}>
          {imageBanner.map((image, index) => (
            <div
              class="banner-item"
              key={index}>
              <img
                src={image.image}
                alt=""
              />
            </div>
          ))}

          <div class="banner-item">
            <img
              src="https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png"
              alt=""
            />
          </div>
          <div class="banner-item">
            <img
              src="https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png"
              alt=""
            />
          </div>
          <div class="banner-item">
            <img
              src="https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png"
              alt=""
            />
          </div>
          <div class="banner-item">
            <img
              src="https://leeandtee.vn/image/1920/884/1/0/banners/happy-womens-day-nhan-qua-cuc-slay-banner-01.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <i
        class="fas fa-chevron-right banner-next"
        onClick={nextBanner}></i>
    </div>
  );
};

export default Banner;
