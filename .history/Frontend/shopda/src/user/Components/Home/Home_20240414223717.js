import React from "react";
import Banner from "../Banner/Banner";
import ViewProduct from "../ViewProduct/ViewProduct";
import Offer from "../Offer/Offer";
import Trending from "../Trending/Trending";
// import BgHome from '../BgHome/BgHome';

const Home = () => {
  return (
    <>
      <div>
        <Banner></Banner>
        <Offer></Offer>
        <Trending></Trending>
        <ViewProduct></ViewProduct>
      </div>
    </>
  );
};

export default Home;
