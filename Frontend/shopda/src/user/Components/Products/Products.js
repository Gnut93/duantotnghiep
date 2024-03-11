import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import './Products.css';

const Products = () => {
  let { id_cate } = useParams();

  const [sp, setSP] = useState([]);
  const [loai, setLoai] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/products/list/category/' + id_cate)
      .then((res) => res.json())
      .then((data) => setSP(data));
    fetch(`http://localhost:4000/category/${id_cate}`)
      .then((res) => res.json())
      .then((data) => setLoai(data));
  }, [id_cate]);
  function HienSPTrongMotTrang({ spTrongTrang }) {
    return (
      <div className="home-product">
        {spTrongTrang.slice(0, 12).map((sp, i) => (
          <div
            className="products-item"
            key={i}>
            <div className="products-main">
              <img
                className="products-image"
                src={sp['image']}
                alt={sp['name']}
              />
              <div className="products-content">
                <ul className="products-social">
                  <li className="products-social-item">
                    <Link
                      to={`/product/${sp['id_pd']}`}
                      className="products-social-link">
                      <i className="fas fa-search"></i>
                    </Link>
                  </li>
                  <li className="products-social-item">
                    <span className="products-social-link cart">
                      <i className="fas fa-cart-plus"></i>
                    </span>
                  </li>
                  <li className="products-social-item">
                    <span className="products-social-link">
                      <i className="fas fa-heart"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="products-info">
                <h4 className="products-name">{sp['name']}</h4>
                <div className="products-price">
                  <span>
                    {parseInt(sp['price_sale']).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                  <del>
                    {parseInt(sp['price']).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </del>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function PhanTrang({ pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = sp.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(sp.length / pageSize);
    const chuyenTrang = (event) => {
      const newIndex = (event.selected * pageSize) % sp.length;
      setfromIndex(newIndex);
    };
    return (
      <>
        <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
        <ReactPaginate
          nextLabel=">"
          previousLabel="<"
          pageCount={tongSoTrang}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={chuyenTrang}
          renderOnZeroPageCount={null}
          className="thanhphantrang1"
          activeClassName="active"
        />
      </>
    );
  }
  return (
    <section className="product">
      <div className="container">
        <h2 className="product-heading">{loai.name}</h2>
        <PhanTrang pageSize={9} />
      </div>
    </section>
  );
};

export default Products;
