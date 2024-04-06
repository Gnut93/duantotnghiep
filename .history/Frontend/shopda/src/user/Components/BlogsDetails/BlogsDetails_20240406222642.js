import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogsDetails.css";
import Navbar from "../Navbar/Navbar";

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
    ge();
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
      <div className="blog_list_main">
        <div className="blog_list">
          <div className="item_blog">
            <div className="blog__img">
              <img
                src="https://cdn.pixabay.com/photo/2018/10/06/14/48/leather-craft-3727997_1280.jpg"
                alt=""
              />
            </div>
            <div className="blog__title">
              <h1>title</h1>
            </div>
            <div className="blog_button">
              <button>Read More</button>
            </div>
          </div>
          <div className="item_blog">
            <div className="blog__img">
              <img
                src="https://cdn.pixabay.com/photo/2018/10/06/14/48/leather-craft-3727997_1280.jpg"
                alt=""
              />
            </div>
            <div className="blog__title">
              <h1>title</h1>
            </div>
            <div className="blog_button">
              <button>Read More</button>
            </div>
          </div>
          <div className="item_blog">
            <div className="blog_img">
              <img
                src="https://cdn.pixabay.com/photo/2018/10/06/14/48/leather-craft-3727997_1280.jpg"
                alt=""
              />
            </div>
            <div className="blog_title">
              <h1>title</h1>
            </div>
            <div className="blog_button">
              <button>Read More</button>
            </div>
          </div>
          <div className="item_blog">
            <div className="blog__img">
              <img
                src="https://cdn.pixabay.com/photo/2018/10/06/14/48/leather-craft-3727997_1280.jpg"
                alt=""
              />
            </div>
            <div className="blog_title">
              <h1>title</h1>
            </div>
            <div className="blog_button">
              <button>Read More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsDetails;
