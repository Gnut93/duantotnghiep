import React from "react";
import "./Offer.css";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <>
      <div class="wrapper">
      <div class="left">
        <img src="LEARNMORE.png" alt="" />
      </div>
      <div class="right">
        <h1>Handcrafted just for you.</h1>
        <p>
          Duis efficitur gravida tincidunt. Nam sodales vel odio at
          sollicitudin. Vestibulum sed rutrum nisl. Nulla diam arcu, facilisis
          nec blandit non, interdum et orci. Nam aliquam lorem vitae risus
          molestie convallis.
        </p>
        <a href="#">LEARN MORE</a>
      </div>
    </div>
    </>
  );
};

export default Offer;
