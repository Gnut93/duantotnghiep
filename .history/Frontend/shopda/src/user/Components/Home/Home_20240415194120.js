import React from "react";
import Banner from "../Banner/Banner";
import ViewProduct from "../ViewProduct/ViewProduct";
import Offer from "../Offer/Offer";
import Trending from "../Trending/Trending";
import Deal from "../Deal/Deal";
import Recommend from "../Recommend/Recommend";
import Followinsta from "../Followinsta/Followinsta";
// import BgHome from '../BgHome/BgHome';

const Home = () => {
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
        <
      </div>
    </>
  );
};

export default Home;
