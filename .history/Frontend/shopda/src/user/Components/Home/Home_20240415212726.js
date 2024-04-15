import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import ViewProduct from "../ViewProduct/ViewProduct";
import Offer from "../Offer/Offer";
import Trending from "../Trending/Trending";
import Deal from "../Deal/Deal";
import Recommend from "../Recommend/Recommend";
import Followinsta from "../Followinsta/Followinsta";
import Partner from "../Partner/Partner";
// import BgHome from '../BgHome/BgHome';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <div>
        <Banner></Banner>
        <Offer></Offer>
        <Trending></Trending>
        <ViewProduct></ViewProduct>
        <Deal></Deal>
        <Recommend></Recommend>
        <Followinsta></Followinsta>
        <Partner></Partner>
        {isVisible && 
          <div onClick={scrollToTop} style={styles.scrollButton}>
            Top
          </div>}
      </div>
    </>
  );
};

export default Home;

const styles = {
  scrollButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    cursor: "pointer",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    textAlign: "center",
    fontSize: "18px",
    zIndex: "1000"
  }
};