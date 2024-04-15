import React from "react";
import "./Followinsta.css";
const Followinsta = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <>
      <h3
        className="related-heading"
        style={{ marginBottom: "30px", marginTop: "70px" }}
      >
        Follow us on Instagram
      </h3>
    </>
  );
};

export default Followinsta;
