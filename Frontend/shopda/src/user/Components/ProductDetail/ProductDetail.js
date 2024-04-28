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
  const [sp, setSP] = useState({});
  const [detail, setSPCT] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const cart = useSelector((state) => state.cart.listSP);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:4000/products/item/${id_pd}`)
      .then((res) => res.json())
      .then((data) => {
        setSP(data);
      });
    fetch(`http://localhost:4000/products/product-detail/${id_pd}`)
      .then((res) => res.json())
      .then((data) => {
        setSPCT(data);
        if (data.length > 0) {
          setSelectedColorId(data[0].id_pd_detail);
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
    (p) => p.id_pd === sp.id_pd && p.id_pd_detail === selectedColorId
  )?.soluong;
  const selectColor = (id) => {
    setSelectedColorId(id);
    const selectedColor = detail.find((item) => item.id_pd_detail === id);
    const itemInCart = cart.find(
      (p) => p.id_pd === sp.id_pd && p.id_pd_detail === id
    );
    const quantityInCart = itemInCart ? itemInCart.soluong : 0;
    if (selectedColor) {
      let maxQuantityInCart = selectedColor.quantity - quantityInCart;
      setMaxQuantity(maxQuantityInCart);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const selectedColor = detail.find(
      (item) => item.id_pd_detail === selectedColorId
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
        themSPDetail({
          ...sp,
          id_pd_detail: selectedColorId,
          soluong: quantity,
          nameColor: selectedColor.color,
        })
      );
      console.log(selectedColor);
      setQuantity(1);
    }
  };

  return (
    <section className="detail">
      <Navbar></Navbar>
      <div className="container">
        <div className="detail-content">
          <div className="detael-image">
            <div className="detail-image-main">
              {detail?.map(
                (item, i) =>
                  selectedColorId === item.id_pd_detail && (
                    <img
                      key={i}
                      src={item.image}
                      alt=""
                    />
                  )
              )}
            </div>
            <div className="detail-image-list">
              {detail?.map((item, i) => (
                <img
                  key={i}
                  src={item.image}
                  alt=""
                  onClick={() => selectColor(item.id_pd_detail)}
                  className={`detail-image-item ${
                    selectedColorId === item.id_pd_detail ? 'active' : ''
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="detail-info">
            <h3 className="detail-heading">{sp?.name}</h3>
            <div className="detail-price">
              <div className="detail-price-item">
                <span>
                  {parseInt(sp?.price_sale).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
                <del>
                  {parseInt(sp?.price).toLocaleString('vi-VN', {
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
                {detail.map((item) => (
                  <div
                    key={item.id_pd_detail}
                    className={`detail-color-item ${
                      selectedColorId === item.id_pd_detail ? 'active' : ''
                    }`} // Apply the active class based on the selected color ID
                    style={{ backgroundColor: `${item.color_code}` }}
                    onClick={() => selectColor(item.id_pd_detail)} // Handle color selection
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
