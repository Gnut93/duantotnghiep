import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Trending.css';
const imgList = [
  {
    img: 'https://leeandtee.vn/image/358/263/1/0/product/category/bop-vi-da-leeandtee-banner-2.png',
  },
  {
    img: 'https://leeandtee.vn/image/358/263/1/0/product/category/tui-xach-leeandtee-banner-1.png',
  },
  {
    img: 'https://leeandtee.vn/image/358/263/1/0/product/category/tui-du-lich-leeandtee-banner-1.png',
  },
  {
    img: 'https://leeandtee.vn/image/358/263/1/0/product/category/that-lung-leeandtee-1.jpg',
  },
  {
    img: 'https://leeandtee.vn/image/358/263/1/0/product/category/balo-leeandtee-banner-3.png',
  },
  {
    img: 'https://leeandtee.vn/image/358/263/1/0/product/category/phu-kien-moc-khoa-leeandtee-2.png',
  },
];

const Shop = () => {
  const [listLoai, setListLoai] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:4000/category/list');
      const data = await response.json();
      setListLoai(data);
    };
    fetchCategories();
  }, []);

  return (
    <section className="trending">
      <div className="container">
        <h2 className="trending-heading">Xu Hướng</h2>
        <div className="category-list">
          {listLoai.map((item, index) => (
            <Link
              to={`/cate/${item.id_cate}`}
              key={item.id_cate}>
              <div className="category-item">
                <div className="category-img">
                  <img
                    src={imgList[index % imgList.length].img}
                    alt={item.name}></img>
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

export default Shop;
