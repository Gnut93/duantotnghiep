import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogsDetails.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const BlogsDetails = () => {
  const [blog, setBlogs] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch(`http://localhost:4000/post/info/${id}`);
      const data = await response.json();
      setBlogs(data);
    };
    getBlogs();
  }, [id]);
  console.log(blog);

  const [item, setItem] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const response = await fetch("http://localhost:4000/post/list");
      const data = await response.json();
      setItem(data);
    };
    getItem();
  }, []);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="title__blog">
        <h1>BlogsDetails</h1>
      </div>
      <div className="blog__details">
        <div className="blog__details__icon">
          <i class="fa-solid fa-calendar"></i>
          <span>Ngày 15/09/2024</span>
          <i class="fa-solid fa-house"></i>
          <span>Da Shop</span>
        </div>
        <hr />

        <div className="blog__details__title">
          <h1>{blog.heading}</h1>
        </div>
        <div className="blog__details__img">
          <img src={blog.image} alt="" />
        </div>
        <div className="blog__details__des">
          <p>{blog.description}</p>
        </div>
        <div className="blog__details__post">
          <h1>Viết bình luận của bạn:</h1>

          <div className="blog__details__post__form">
            <form action="">
              <input type="text" placeholder="Họ và tên" />
              <input type="email" placeholder="Email" />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Nội dung bình luận của bạn"
              ></textarea>
              <button>Post</button>
            </form>
          </div>
        </div>
      </div>
      <div className="baivietlienquan">
        <h1>Bài viết mới nhất</h1>
      </div>
      <div className="blog_main">
      <div className="blog">
        {item.map((items, index) => (
          <div className="item">
            <div className="blog__img">
              <img src={items.image} alt="" />
            </div>
            <div className="blog__title">
              <h3>{items.heading}</h3>
            </div>
            <div className="blog__button">
              <Link key={items.id_post} to={`/blogsdetails/${items.id_post}`}>
                <h5>READ MORE</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default BlogsDetails;
