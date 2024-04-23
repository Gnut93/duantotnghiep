import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import ViewProduct from '../ViewProduct/ViewProduct';
import Offer from '../Offer/Offer';
import Trending from '../Trending/Trending';
import Recommend from '../Recommend/Recommend';
import Followinsta from '../Followinsta/Followinsta';
import Partner from '../Partner/Partner';
import NewProduct from '../NewProduct/NewProduct';
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
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);
  const styles = {
    scrollButton: {
      height: '50px',
      width: '50px',
      position: 'fixed',
      bottom: '30px',
      right: '20px',
      cursor: 'pointer',
      backgroundColor: '#753232',
      color: '#fff',
      border: 'none',
      padding: '12px',
      borderRadius: '50%',
      textAlign: 'center',
      fontSize: '18px',
      zIndex: '1000',
    },
  };

  return (
    <>
      <div>
        <Banner></Banner>
        <Offer></Offer>
        <Trending></Trending>
        <NewProduct></NewProduct>
        <ViewProduct></ViewProduct>
        <Recommend></Recommend>
        <Followinsta></Followinsta>
        <Partner></Partner>
        {isVisible && (
          <div
            onClick={scrollToTop}
            style={styles.scrollButton}>
            <i className="ri-arrow-up-line"></i>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
