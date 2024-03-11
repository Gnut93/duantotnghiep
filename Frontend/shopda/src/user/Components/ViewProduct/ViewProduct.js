import React, { useEffect, useState } from 'react';
import './ViewProduct.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { themSP } from '../cartSlice';

const ViewProduct = () => {
  const dispatch = useDispatch();
  const [sp, setSP] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/products/list/view/8`)
      .then((res) => res.json())
      .then((data) => setSP(data));
  }, []);

  return (
    <section className="view">
      <div className="container">
        <h3 className="related-heading">Sản Phẩm Được Nem Nhiều</h3>
        <div className="related-product">
          {sp.map((item, i) => (
            <div
              className="products-item"
              key={i}>
              <div className="products-main">
                <img
                  className="products-image"
                  src={item.image}
                  alt={item.name}
                />
                <div className="products-content">
                  <ul className="products-social">
                    <li className="products-social-item">
                      <Link
                        to={`/product/${item.id_pd}`}
                        className="products-social-link">
                        <i className="fas fa-search"></i>
                      </Link>
                    </li>
                    <li className="products-social-item">
                      <span
                        className="products-social-link cart"
                        onClick={() => dispatch(themSP(item))}>
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
                  <h4 className="products-name">{item.name}</h4>
                  <div className="products-price">
                    <span>
                      {parseInt(item.price_sale).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                    <del>
                      {parseInt(item.price).toLocaleString('vi-VN', {
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
      </div>
    </section>
  );
};

export default ViewProduct;
