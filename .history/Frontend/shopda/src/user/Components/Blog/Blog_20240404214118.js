import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="title">
        <h3>Blogs</h3>
      </div>
      <div className="tong">
        <div className="main">
          <div className="main__img">
            <img
              src="https://cdn.pixabay.com/photo/2021/09/15/17/31/leathercraft-6627431_1280.jpg"
              alt=""
            />
          </div>
          <div className="main__title">
            <h1>Bạn muốn chăm sóc đồ da tốt nhất?</h1>
          </div>
          <div className="main__button">
            <Link to="/blogsdetails">READ MORE</Link>
          </div>
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
      </div>
      <div className="title">
        <h3>Sản phẩm mới nhất</h3>
      </div>
      <ViewProduct></ViewProduct>
    </>
  );
};

export default Blog;
