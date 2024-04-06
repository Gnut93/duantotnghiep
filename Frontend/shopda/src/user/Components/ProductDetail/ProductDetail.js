import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { useParams } from 'react-router-dom';
import ViewProduct from '../ViewProduct/ViewProduct';
import { useDispatch, useSelector } from 'react-redux';
import { themSPDetail } from '../cartSlice';
import Navbar from '../Navbar/Navbar';

const ProductDetail = () => {
  let { id_pd } = useParams();
  const [sp, setSP] = useState([]);
  const [color, setSPLQ] = useState([]);
  const [image, setHinhSPCT] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const cart = useSelector((state) => state.cart.listSP);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:4000/products/info/${id_pd}`)
      .then((res) => res.json())
      .then((data) => {
        setSP(data);
      });
    fetch('http://localhost:4000/products/image/detail/' + id_pd)
      .then((res) => res.json())
      .then((data) => setHinhSPCT(data));
    fetch('http://localhost:4000/products/color/list/' + id_pd)
      .then((res) => res.json())
      .then((data) => {
        setSPLQ(data);
        if (data.length > 0) {
          setSelectedColorId(data[0].id_color);
          setMaxQuantity(data[0].quantity);
        }
      });
  }, [id_pd]);
  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    } else {
      alert('Số lượng vượt quá số lượng trong kho.');
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const currentProductQuantity = cart.find(
    (p) => p.id_pd === sp.id_pd && p.id_color === selectedColorId
  )?.soluong;
  const selectColor = (id) => {
    setSelectedColorId(id);
    const selectedColor = color.find((item) => item.id_color === id);
    const itemInCart = cart.find(
      (p) => p.id_pd === sp.id_pd && p.id_color === id
    );
    const quantityInCart = itemInCart ? itemInCart.soluong : 0;
    if (selectedColor) {
      let maxQuantityInCart = selectedColor.quantity - quantityInCart;
      setMaxQuantity(maxQuantityInCart);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const selectedColor = color.find(
      (item) => item.id_color === selectedColorId
    );
    const totalQuantityAfterAdding = currentProductQuantity + quantity;
    if (selectedColor.quantity <= 0) {
    } else if (
      selectedColor &&
      totalQuantityAfterAdding > selectedColor.quantity
    ) {
      alert(
        `Không thể thêm, số lượng vượt quá tồn kho. Chỉ còn lại ${
          selectedColor.quantity - currentProductQuantity
        } sản phẩm.`
      );
    } else {
      dispatch(
        themSPDetail({ ...sp, id_color: selectedColorId, soluong: quantity })
      );
      setQuantity(1);
    }
  };

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
                {color.map((item) => (
                  <div
                    key={item.id_color}
                    className={`detail-color-item ${
                      selectedColorId === item.id_color ? 'active' : ''
                    }`} // Apply the active class based on the selected color ID
                    style={{ backgroundColor: `${item.code}` }}
                    onClick={() => selectColor(item.id_color)} // Handle color selection
                  ></div>
                ))}
              </div>
            </div>
            <div className="detail-quantity">
              <p className="detail-quantity-title">Số lượng</p>
              <div className="detail-quantity-info">
                <button
                  className="detail-quantity-prev"
                  onClick={decreaseQuantity}>
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  name="total-item"
                  className="detail-quantity-number"
                  value={quantity} // Liên kết số lượng với state
                  readOnly
                />
                <button
                  className="detail-quantity-next"
                  onClick={increaseQuantity}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <button
              className="detail-add"
              onClick={handleAddToCart}>
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
