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
    img: "https://laforce.vn/wp-content/uploads/2016/07/tui-dung-ipad-nam-da-bo-tron-tla8051-d-1-1.jpg",
  },
  {
    img: "https://myphamnga.org/wp-content/uploads/2019/01/tui-xach-du-lich-tx051-3.jpg",
  },
  {
    img: "https://cdn.vuahanghieu.com/unsafe/1200x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/news/2019/10/8-cach-nhan-biet-that-lung-nam-da-that-don-gian-chinh-xac-100-21102019174031.jpghttps://product.hstatic.net/1000205116/product/0f287685-2964-42aa-bfdd-37e903dd287e_40274bce0aad481c9c827f63fbf48c55_1024x1024.jpeg",
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
