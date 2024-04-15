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

const Followinsta = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  return (
    <>
      <h3
        className="related-heading"
        style={{ marginBottom: "30px", marginTop: "70px" }}
      >
        Follow us on Instagram
      </h3>
      <Slider {...settings}>
        <div>
          <img src={img1} alt="" />
        </div>
        <div>
        <img src={img1} alt="" />
        </div>
        <div>
        <img src={img1} alt="" />
        </div>
        <div>
        <img src={img1} alt="" />
        </div>
        <div>
          <img
            src="https://www.instagram.com/static/images/homepage/screenshot1-2x.jpg/9144d6673849.jpg"
            alt="insta"
            className="insta-img"
          />
        </div>
        <div>
          <img
            src="https://www.instagram.com/static/images/homepage/screenshot1-2x.jpg/9144d6673849.jpg"
            alt="insta"
            className="insta-img"
          />
        </div>
      </Slider>
    </>
  );
};

export default Followinsta;
