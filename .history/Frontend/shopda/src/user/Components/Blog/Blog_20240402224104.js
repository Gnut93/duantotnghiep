import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";

const Blog = () => {
  return (
    <>
    <div className="nav">
      <Navbar />
      </div>
      <div className="blog">
        <div className="tong">
          <div className="blog__title">
            <h1>Blog</h1>
            </div>
          <div className="blog__img">
          </div>
          <div className="blog__button">
            <button>Read More</button>
            </div>
            </div>

      </div>
    </>
  );
};

export default Blog;
