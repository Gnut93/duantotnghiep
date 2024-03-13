import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Trending.css';

const Trending = () => {
  const [listLoai, setListLoai] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/category/list')
      .then((res) => res.json())
      .then(setListLoai);
  }, []);
  return (
    <section className="trending">
      <div className="container">
        <h2 className="trending-heading">Xu Hướng</h2>
        <div className="category-list">
          {listLoai.map((item, i) => (
            <Link to={`/cate/${item.id_cate}`}>
              <div
                className="category-item"
                key={i}>
                <div className="category-img">
                  <img
                    src="https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png"
                    alt=""></img>
                </div>
                <div className="category-title">
                  <span>{item.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
