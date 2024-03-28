import React, { useMemo } from 'react';
import './Checkout.css';
import Navbar from '../Navbar/Navbar';
import momo from '../../../assets/images/logo-momo-png-1.png';
import zalo from '../../../assets/images/zalo-pay-logo-png-2.png';
import cod from '../../../assets/images/cod.png';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Không được bỏ trống')
    .min(2, 'Tên sản phẩm có tối thiểu 2 ký tự')
    .max(20, 'Tên  sản phẩm có tối đa 20 ký tự'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
    .required('Không được bỏ trống'),
  email: yup
    .string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ')
    .required('Không được bỏ trống'),

  street: yup.string().required('Địa chỉ không được bỏ trống'),
  district: yup.string().required('Địa chỉ không được bỏ trống'),
  city: yup.string().required('Địa chỉ không được bỏ trống'),
  pay: yup.string().required(' không được bỏ trống phương thức thanh toán'),
});
const Checkout = () => {
  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, reset, formState, control, getValues } = form;
  const { errors, isSubmitSuccessful } = formState;

  const handleCheckOut = async (data) => {
    const selectedPayment = getValues('pay');
    const formData = {
      name: data.name,
      address: `${data.street}, ${data.district}, ${data.city}`,
      phone: data.phone,
      email: data.email,
      total_price: TotalPrice,
      status: 'Chờ',
      note: data.note,
      payment_type: selectedPayment,
    };
    console.log(formData);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const cart = useSelector((state) => state.cart.listSP);

  const subTotal = useMemo(() => {
    return cart.reduce((total, sp) => total + sp.price_sale * sp.soluong, 0);
  }, [cart]);
  let shipping = 50000;
  let TotalPrice = subTotal ? subTotal + shipping : 0;

  return (
    <section className="checkout">
      <Navbar></Navbar>
      <div className="container">
        <h2 className="checkout-headng">Thông tinh đơn hàng và thanh toán</h2>
        <form
          onSubmit={handleSubmit(handleCheckOut)}
          noValidate>
          <div className="checkout-list">
            <div className="checkout-left">
              <div className="checkout-address">
                <h3 className="checkout-address-heding">
                  Thông tin đăng ký mua hàng
                </h3>
                <div className="checkout-address-form">
                  <div className="checkout-address-form-item">
                    <input
                      type="text"
                      placeholder="Tên"
                      {...register('name')}
                    />
                    <p className="err">{errors.name?.message}</p>
                  </div>
                  <div className="checkout-address-form-item">
                    <input
                      type="email"
                      placeholder="Email"
                      {...register('email')}
                    />
                    <p className="err">{errors.email?.message}</p>
                  </div>
                  <div className="checkout-address-form-item">
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      {...register('phone')}
                    />
                    <p className="err">{errors.phone?.message}</p>
                  </div>
                  <div className="checkout-address-form-item">
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      {...register('street')}
                    />
                    <p className="err">{errors.street?.message}</p>
                  </div>
                  <div className="checkout-address-form-item">
                    <input
                      type="text"
                      placeholder="Quận/Huyện"
                      {...register('district')}
                    />
                    <p className="err">{errors.district?.message}</p>
                  </div>
                  <div className="checkout-address-form-item">
                    <input
                      type="text"
                      placeholder="Thành phố"
                      {...register('city')}
                    />
                    <p className="err">{errors.city?.message}</p>
                  </div>
                  <div className="checkout-address-form-item textarea">
                    <textarea
                      className="checkout-pay-note"
                      placeholder="Ghi chú"
                      rows="8"
                      {...register('note')}></textarea>
                    <p className="err">{errors.note?.message}</p>
                  </div>
                  <div className="checkout-pay-list">
                    <h3 className="checkout-pay-heading">
                      Hình thức thanh toán
                    </h3>
                    <label className="checkout-pay-item">
                      <img
                        src={momo}
                        alt="Momo Payment"
                        className="checkout-pay-icon"
                      />
                      <input
                        name="pay"
                        type="radio"
                        value="momo"
                        {...register('pay')}
                      />
                    </label>
                    <label className="checkout-pay-item">
                      <img
                        src={zalo}
                        alt="Zalo Pay Payment"
                        className="checkout-pay-icon"
                      />
                      <input
                        name="pay"
                        type="radio"
                        value="zalo"
                        {...register('pay')}
                      />
                    </label>
                    <label className="checkout-pay-item">
                      <img
                        src={cod}
                        alt="Cash on Delivery"
                        className="checkout-pay-icon"
                      />
                      <input
                        name="pay"
                        type="radio"
                        value="cod"
                        {...register('pay')}
                      />
                    </label>
                    <p className="err">{errors.pay?.message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="checkout-right">
              <h3 className="cart-pay-title">Đơn hàng</h3>
              <div className="cart-pay-total">
                <p className="cart-pay-info">Tổng cộng</p>
                <p className="cart-pay-price">
                  {subTotal.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <div className="cart-pay-discout">
                <p className="cart-pay-info">Giảm giá</p>
                <p className="cart-pay-price">0</p>
              </div>
              <div className="cart-pay-ship">
                <p className="cart-pay-info">Phí vận chuyển</p>
                <p className="cart-pay-price">
                  {shipping.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <div className="cart-pay-sub">
                <p className="cart-pay-info">Thành tiền</p>
                <p className="cart-pay-price">
                  {TotalPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
              </div>
              <p className="cart-discout">Bạn có mã giảm giá?</p>
              <form>
                <input
                  type="text"
                  placeholder="Nhặp mã giảm giá tại đây"
                  className="pay-code"
                  {...register('gif-code')}
                />
                <button
                  type="button"
                  className="pay-add">
                  Thêm
                </button>
              </form>
              <button className="cart-pay-next submit">Thêm</button>
            </div>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </section>
  );
};

export default Checkout;
