import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import img6 from '../../../assets/images/phukien.jpg';
const imgList = [
  {
    img: 'https://product.hstatic.net/1000260559/product/clutch-cam-tay-dang-mong-sang-trong-lich-lam-4062575__5__da81c4ca22e54d788809e0b839ebced5_large.jpg',
  },
  {
    img: 'https://laforce.vn/wp-content/uploads/2016/07/tui-dung-ipad-nam-da-bo-tron-tla8051-d-1-1.jpg',
  },
  {
    img: 'https://myphamnga.org/wp-content/uploads/2019/01/tui-xach-du-lich-tx051-3.jpg',
  },
  {
    img: 'https://laforce.vn/wp-content/uploads/2021/05/day-lung-quan-tay-mat-kim-d690-a202001b-3.jpg',
  },
  {
    img: 'https://vuadasaigon.com/images/detailed/4/balo_nam_dep_bld57_2.jpg',
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
    <section className="category">
      <Navbar></Navbar>
      <div className="container">
        <h3
          className="related-heading"
          style={{ marginBottom: '60px', marginTop: '60px' }}>
          Danh Mục Sản Phẩm
        </h3>
        <div className="category-list">
          {listLoai.map((item, index) => (
            <Link
              to={`/cate/${item.id_cate}`}
              key={item.id_cate}>
              <div className="category-item">
                <div className="category-img">
                  <img
                    src={imgList[index % imgList.length].img}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '420px',
                    }}></img>
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
