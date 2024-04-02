import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";

const Blog = () => {
  return (
    <>
      <section className="blog">
        <Navbar></Navbar>
        <div className="title1">
          <h2>Blog</h2>
        </div>
        <div className="container1">
          <div className="grid-container">
            {" "}
            {/* New Grid Container */}
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
              {" "}
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
              {" "}
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
        </div>
      </section>
    </>
  );
};

export default Blog;
