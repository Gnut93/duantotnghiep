import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Trending.css';
import img1 from '../../../assets/images/vinam.jpg';
import img2 from '../../../assets/images/tui';
import img3 from '../../../assets/images/tui-du-lịch-img.webp';
import img4 from '../../../assets/images/that-lung-img.webp';
import img5 from '../../../assets/images/balo-img.webp';
import img6 from '../../../assets/images/phu-kien-khac.webp';
const imgList = [
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img3,
  },
  {
    img: img4,
  },
  {
    img: img5,
  },
  {
    img: img6,
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
