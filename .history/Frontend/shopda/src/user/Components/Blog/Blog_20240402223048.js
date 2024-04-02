import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";

const Blog = () => {
  return (
    <>
      <section className="blog">
        <Navbar />
        <div className="title1">
          <h2>Blog</h2>
        </div>
        <div className="container1">
          <div className="main">
            <div className="img">
              <img
                src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
                alt=""
              />
            </div>
            <div>
              <h6>title</h6>
            </div>
            <div>
              <button>Đọc thêm</button>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="item">
            <img
              className="image"
              src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
              alt=""
            />
            <h6>title</h6>
            <button>Đọc thêm</button>
          </div>
          <div className="item">
            {/* Duplicate the item div with same classes */}
            <img
              className="image"
              src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
              alt=""
            />
            <h6>title</h6>
            <button>Đọc thêm</button>
          </div>
          <div className="item">
            {/* Duplicate the item div with same classes */}
            <img
              className="image"
              src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
              alt=""
            />
            <h6>title</h6>
            <button>Đọc thêm</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
