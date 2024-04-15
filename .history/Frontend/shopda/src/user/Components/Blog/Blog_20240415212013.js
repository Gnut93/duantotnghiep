import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";
import { Link } from "react-router-dom";
import ViewProduct from "../ViewProduct/ViewProduct";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch("http://localhost:4000/post/list");
      const data = await response.json();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      
        <h3
          className="related-heading"
          style={{ marginBottom: "60px", marginTop: "60px" }}
        >
          Bài Viết
        </h3>
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
            <Link to="/blogsdetails/2">Xem bài viết</Link>
          </div>
        </div>
        <div className="blog">
          {blogs.map((blog, index) => (
            <div className="item">
              <div className="blog__img">
                <img src={blog.image} alt="" />
              </div>
              <div className="blog__title">
                <h3>{blog.heading}</h3>
              </div>
              <div className="blog__button">
                <Link key={blog.id_post} to={`/blogsdetails/${blog.id_post}`}>
                  <h5>Xem bài viết</h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <ViewProduct />
      </div>
    </>
  );
};

export default Blog;
