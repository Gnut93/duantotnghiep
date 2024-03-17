import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { useParams } from 'react-router-dom';
import ViewProduct from '../ViewProduct/ViewProduct';
import { useDispatch } from 'react-redux';
import { themSP } from '../cartSlice';
import Navbar from '../Navbar/Navbar';

const ProductDetail = () => {
  let { id_pd } = useParams();
  const [sp, setSP] = useState([]);
  const [color, setSPLQ] = useState([]);
  const [image, setHinhSPCT] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/products/info/${id_pd}`)
      .then((res) => res.json())
      .then((data) => setSP(data));
    fetch('http://localhost:4000/products/image/list/' + id_pd)
      .then((res) => res.json())
      .then((data) => setHinhSPCT(data));
    fetch('http://localhost:4000/products/color/list/' + id_pd)
      .then((res) => res.json())
      .then((data) => setSPLQ(data));
  }, [id_pd]);
  console.log(sp.id_cate);
  const dispatch = useDispatch();

  return (
    <section className="detail">
      <Navbar></Navbar>
      <div className="container">
        <div className="detail-content">
          <div className="detael-image">
            {image.map((item, i) => (
              <img
                key={i}
                src={item.name}
                alt=""
              />
            ))}
          </div>
          <div className="detail-info">
            <h3 className="detail-heading">{sp.name}</h3>
            <div className="detail-price">
              <div className="detail-price-item">
                <span>
                  {parseInt(sp.price_sale).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
                <del>
                  {parseInt(sp.price).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </del>
              </div>
              <p className="detail-status">
                {(sp.quantity = 0 ? 'Hết hàng' : 'Còn hàng')}
              </p>
            </div>
            <div className="detail-color">
              <p className="detail-color-title">Màu sắc</p>
              <div className="detail-color-list">
                {color.map((item, i) => (
                  <div
                    key={i}
                    className="detail-color-item"
                    style={{ backgroundColor: `${item.code}` }}></div>
                ))}
              </div>
            </div>
            <div className="detail-quantity">
              <p className="detail-quantity-title">Số lượng</p>
              <div className="detail-quantity-info">
                <button className="detail-quantity-prev">
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  name="total-item"
                  className="detail-quantity-number"
                  value="1"
                />
                <button className="detail-quantity-next">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <button
              className="detail-add"
              onClick={() => dispatch(themSP(sp))}>
              Thêm vào giỏ hàng
            </button>
            <p className="detail-desc">{sp.description}</p>
          </div>
        </div>
        <RelatedProduct id={sp.id_cate}></RelatedProduct>
        <ViewProduct></ViewProduct>
      </div>
    </section>
  );
};

export default ProductDetail;
