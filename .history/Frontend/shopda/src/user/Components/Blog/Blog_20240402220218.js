import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";

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
          <h6> title</h6>
          <button>Đọc thêm</button>
        </div>
        <div className="col">
          <div className="col1">
            <img
              src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
              alt=""
            />
          </div>
          <div className="col2">
            <img
              src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
              alt=""
            />
          </div>
          <div className="col3">
            <img
              src="https://cdn.shopify.com/s/files/1/1236/1344/files/banner_dfca8b7b-6831-4e05-a06e-e48f9271ceeb.png?v=1700454254"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
