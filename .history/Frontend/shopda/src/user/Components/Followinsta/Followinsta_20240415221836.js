import React from "react";
import "./Followinsta.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.png";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import img7 from "./7.jpg";
import img7 from "./7.jpg";
import img7 from "./7.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
const Followinsta = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleImgClick = (img) => {
    if (!isDragging) {
      setSelectedImg(img);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  };
  return (
    <>
      <h3
        data-aos="fade-up"
        className="related-heading"
        style={{ marginBottom: "60px", marginTop: "70px" }}
      >
        Follow us on Instagram <i class="ri-instagram-fill"></i>
      </h3>

      <div className="slider-container" data-aos="fade-up">
        <Slider {...settings}>
          <div
            className="slick-slide-item"
            onClick={() => handleImgClick(img1)}
          >
            <div className="img-container">
              <img src={img1} alt="" />
            </div>
          </div>
          <div
            className="slick-slide-item"
            onClick={() => handleImgClick(img2)}
          >
            <div className="img-container">
              <img src={img2} alt="" />
            </div>
          </div>
          <div
            className="slick-slide-item"
            onClick={() => handleImgClick(img3)}
          >
            <div className="img-container">
              <img src={img3} alt="" />
            </div>
          </div>
          <div
            className="slick-slide-item"
            onClick={() => handleImgClick(img4)}
          >
            <div className="img-container">
              <img src={img4} alt="" />
            </div>
          </div>
          <div
            className="slick-slide-item"
            onClick={() => handleImgClick(img5)}
          >
            <div className="img-container">
              <img src={img5} alt="" />
            </div>
          </div>
          <div
            className="slick-slide-item"
            onClick={() => handleImgClick(img6)}
          >
            <div className="img-container">
              <img src={img6} alt="" />
            </div>
          </div>
          <div
            className="slick-slide-item"
            onClick={() => handleImgClick(img7)}
          >
            <div className="img-container">
              <img src={img7} alt="" />
            </div>
          </div>
        </Slider>
      </div>
      {isModalOpen && (
        <div className="modal">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <img className="modal-content" src={selectedImg} alt="" />
        </div>
      )}
    </>
  );
};

export default Followinsta;
