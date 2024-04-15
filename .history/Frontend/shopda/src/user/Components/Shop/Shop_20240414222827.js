import React, { useEffect, useState } from "react";
import "./Shop.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import img1 from "../../../assets/images/vinam1.jpg";
import img2 from "../../../assets/images/tuixach.jpg";
import img3 from "../../../assets/images/tuidulich.jpg";
import img4 from "../../../assets/images/thatlung.jpg";
import img5 from "../../../assets/images/balo.jpg";
import img6 from "../../../assets/images/phukien.jpg";
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
      const response = await fetch("http://localhost:4000/category/list");
      const data = await response.json();
      setListLoai(data);
    };
    fetchCategories();
  }, []);

  return (
    <section className="category">
      <Navbar></Navbar>
      <div className="container">
        <div className="category">
          <h2 className="category-heading">Danh Mục Sản Phẩm</h2>
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
      </div>
    </section>
  );
};

export default Shop;
