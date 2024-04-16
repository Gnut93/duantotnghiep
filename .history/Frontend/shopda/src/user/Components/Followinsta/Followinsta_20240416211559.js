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
import img8 from "./8.png";
import img9 from "./9.jpg";
import img10 from "./10.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  };

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <div className="container">
      <h3
        data-aos="fade-up"
        className="related-heading"
        style={{ marginBottom: "60px", marginTop: "70px" }}
      >
        Theo dõi chúng tôi trên instagram <i class="ri-instagram-fill"></i>
      </h3>

      <div className="slider-container" data-aos="fade-up">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div
              key={index}
              className="slick-slide-item"
              onClick={() => handleImgClick(img)}
            >
              <div className="img-container">
                <img src={img} alt="" />
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Followinsta;
