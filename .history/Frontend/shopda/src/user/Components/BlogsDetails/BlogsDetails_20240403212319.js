import React from "react";
import "./BlogsDetails.css";
import Navbar from "../Navbar/Navbar";

const BlogsDetails = () => {
  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="title__blog">
        <h1>BlogsDetails</h1>
      </div>
        <div className="blog__details">
            <div className="blog__details__img">
            <img
                src="https://cdn.pixabay.com/photo/2021/09/15/17/31/leathercraft-6627431_1280.jpg"
                alt=""
            />
            </div>
            <div className="blog__details__content">
            <h1>Bạn muốn chăm sóc đồ da tốt nhất?</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                doloremque, quae, quas, eaque voluptate atque quos doloribus
                voluptatem quibusdam nemo dolorum. Quisquam doloremque, quae, quas,
                eaque voluptate atque quos doloribus voluptatem quibusdam nemo
                dolorum. Quisquam doloremque, quae, quas, eaque voluptate atque quos
                doloribus voluptatem quibusdam nemo dolorum. Quisquam doloremque,
                quae, quas, eaque voluptate atque quos doloribus voluptatem quibusdam
                nemo dolorum.
            </p>
            </div>
        </div>
    </>
  );
};

export default BlogsDetails;