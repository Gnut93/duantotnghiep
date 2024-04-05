import React from "react";
import Navbar from "../Navbar/Navbar";

const Blog = () => {
  return (
    <>
      <section className="blog">
        <Navbar></Navbar>
      </section>
      <div className="container1">
        <div className="title1">
          <h2>Blog</h2>
        </div>
        <div className="row1">
          <img
            src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
            alt=""
            width="100%"
          />
        </div>
        <div className="row1">
          <div className="col1"></div>
          <div className="col1"></div>
          <div className="col1"></div>
        </div>
      </div>
    </>
  );
};

export default Blog;
