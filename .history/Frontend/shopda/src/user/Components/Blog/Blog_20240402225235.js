import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";

const Blog = () => {
  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="title">
          <h1>Blog</h1>
        </div>
      <div className="blog">
        <div className="item">
          <div className="blog__img">
            <img
              src="https://cdn.pixabay.com/photo/2018/10/06/14/48/leather-craft-3727997_1280.jpg"
              alt=""
            />
          </div>
          <div className="blog__title">
            <h1>title</h1>
          </div>
          <div className="blog__button">
            <button>Read More</button>
          </div>
        </div>
        <div className="item">
          <div className="blog__img">
            <img
              src="https://cdn.pixabay.com/photo/2018/10/06/14/48/leather-craft-3727997_1280.jpg"
              alt=""
            />
          </div>
          <div className="blog__title">
            <h1>title</h1>
          </div>
          <div className="blog__button">
            <button>Read More</button>
          </div>
        </div>
        <div className="item">
          <div className="blog__img">
            <img
              src="https://cdn.pixabay.com/photo/2018/10/06/14/48/leather-craft-3727997_1280.jpg"
              alt=""
            />
          </div>
          <div className="blog__title">
            <h1>title</h1>
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
