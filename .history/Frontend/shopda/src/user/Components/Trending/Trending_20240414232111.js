import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Trending.css";
import img1 from "../../../assets/images/vinam1.jpg";
import img2 from "../../../assets/images/tuixach.jpg";
import img3 from "../../../assets/images/tuidulich.jpg";
import img4 from "../../../assets/images/thatlung.jpg";
import img5 from "../../../assets/images/balo.jpg";
import img6 from "../../../assets/images/phukien.jpg";
const imgList = [
  {
    img: "https://product.hstatic.net/1000260559/product/clutch-cam-tay-dang-mong-sang-trong-lich-lam-4062575__5__da81c4ca22e54d788809e0b839ebced5_large.jpg",
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
      const response = await fetch("http://localhost:4000/category/list");
      const data = await response.json();
      setListLoai(data);
    };
    fetchCategories();
  }, []);

  return (
    <section className="trending">
      <div className="trending-container">
        <h3 className="related-heading" style={{ marginBottom: "50px" }}>
          Xu Hướng Mua Sắm
        </h3>
        <div className="category-list">
          {listLoai.map((item, index) => (
            <Link to={`/cate/${item.id_cate}`} key={item.id_cate}>
              <div className="category-item">
                <div className="category-img">
                  <img
                    src={imgList[index % imgList.length].img}
                    alt={item.name}
                    style={{ width: "100%", height: "420px" }}
                  ></img>
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
