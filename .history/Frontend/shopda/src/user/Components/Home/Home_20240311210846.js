import React from 'react';
import Banner from '../Banner/Banner';
import ViewProduct from '../ViewProduct/ViewProduct';
import Offer from '../Offer/Offer';

const Home = () => {
  return (
    <>
      <div>
        <Banner></Banner>
        <ViewProduct></ViewProduct>
        <Offer></Offer>
      </div>
    </>
  );
};

export default Home;
