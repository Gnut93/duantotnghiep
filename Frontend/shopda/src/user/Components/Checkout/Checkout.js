<<<<<<< HEAD
import React, { useMemo, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
=======
import React, { useMemo, useState } from "react";
import "./Checkout.css";
import Navbar from "../Navbar/Navbar";
import momo from "../../../assets/images/logo-momo-png-1.png";
import zalo from "../../../assets/images/zalo-pay-logo-png-2.png";
import cod from "../../../assets/images/cod.png";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
// import { useNavigate } from "react-router-dom";
>>>>>>> bd280cc9233e36974e1139e191c5b73ef1600890
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
<<<<<<< HEAD
  const [discountAmount, setDiscountAmount] = useState(0);
  const [idGc, setIdGc] = useState(null);
  const [quantityDiscount, setQuantityDiscount] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const form = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState,
    control,
    getValues,
    setValue,
  } = form;
  const {
    register: registerDiscount,
    handleSubmit: handleSubmitDiscount,
    reset: resetDiscount,
  } = useForm();

  const { errors, isSubmitSuccessful } = formState;
  const cart = useSelector((state) => state.cart.listSP);
  const user = useSelector((state) => state.auth.user);
  // const idUser = user.id_user;
  // useEffect(() => {
  //     if (idUser) {
  //         setUserId(idUser);
  //     } else {
  //         setUserId(null);
  //     }
  // }, [idUser]);
  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
    }
  }, [user, setValue]);
  const handleCheckOut = async (data) => {
    try {
      const selectedPayment = getValues('pay');
      const formBill = generateBillData(data, selectedPayment);
=======
    const [discountAmount, setDiscountAmount] = useState(0);
    const [idGc, setIdGc] = useState(null);
    const [quantityDiscount, setQuantityDiscount] = useState(0);
    const [userId, setUserId] = useState(null);
    // const navigate = useNavigate();
    const form = useForm({
        resolver: yupResolver(schema),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        getValues,
        setValue,
    } = form;
    const {
        register: registerDiscount,
        handleSubmit: handleSubmitDiscount,
        reset: resetDiscount,
    } = useForm();

    const { errors, isSubmitSuccessful } = formState;
    const cart = useSelector((state) => state.cart.listSP);
    const user = useSelector((state) => state.auth.user);
    const idUser = user ? user.id_user : null;
    useEffect(() => {
        setUserId(idUser);
    }, [idUser, user]);
    useEffect(() => {
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("phone", user.phone);
        }
    }, [user, setValue]);
    const handleCheckOut = async (data) => {
        try {
            const selectedPayment = getValues("pay");
            const formBill = generateBillData(data, selectedPayment);
>>>>>>> bd280cc9233e36974e1139e191c5b73ef1600890

      const billResponse = await addBill(
        'http://localhost:4000/bill/add',
        formBill
      );

<<<<<<< HEAD
      const id_bd = billResponse.id_dh;
      const formBillDetail = generateBillDetailData(selectedProducts, id_bd);

      const firstCartItem = cart[0];
      const id_color = firstCartItem.id_color;
      const formQuantity = updateQuantityProduct(quantity, id_color);
      const formQuantityDiscount = updateQuantityDiscount(quantity, idGc);
      await addBillDetail(
        'http://localhost:4000/bill/add-detail',
        formBillDetail
      );
      await putQuantityProduct(
        `http://localhost:4000/admin-products/edit-quantity/${id_color}`,
        formQuantity
      );
      await putQuantityDiscount(
        `http://localhost:4000/admin-giftcode/edit-quantity/${idGc}`,
        formQuantityDiscount
      );

      alert('Thanh Toán thành công,', billResponse);
      navigate('/');
    } catch (error) {
      handleError(error);
    }
  };

  const generateBillData = (data, selectedPayment) => {
    let billData = {
      name: data.name,
      address: `${data.street}, ${data.district}, ${data.city}`,
      phone: data.phone,
      email: data.email,
      total_price: TotalPrice,
      status: 'Chờ',
      note: data.note,
      payment_type: selectedPayment,
=======
            const id_bd = billResponse.id_dh;
            const formBillDetail = generateBillDetailData(
                selectedProducts,
                id_bd
            );
            const firstCartItem = cart[0];
            const id_color = firstCartItem.id_color;
            const formQuantity = updateQuantityProduct(quantity, id_color);
            const formQuantityDiscount = updateQuantityDiscount(quantity, idGc);
            await addBillDetail(
                "http://localhost:4000/bill/add-detail",
                formBillDetail
            );
            await putQuantityProduct(
                `http://localhost:4000/admin-products/edit-quantity/${id_color}`,
                formQuantity
            );
            await putQuantityDiscount(
                `http://localhost:4000/admin-giftcode/edit-quantity/${idGc}`,
                formQuantityDiscount
            );

            alert("Thanh Toán thành công,", billResponse);
            // navigate("/");
        } catch (error) {
            handleError(error);
        }
>>>>>>> bd280cc9233e36974e1139e191c5b73ef1600890
    };
    if (idGc) {
      billData.id_gc = idGc;
    }
    if (userId) {
      billData.id_user = userId;
    }

    return billData;
  };

  const generateBillDetailData = (selectedProducts, id_bd) => {
    return selectedProducts.map((product) => ({
      id_bill: id_bd,
      name: product.name,
      price: product.price,
      color: product.nameColor,
      quantity: product.soluong,
      total_price: TotalPrice,
      id_pd: product.id_pd,
    }));
  };
  const updateQuantityProduct = (quantity, id_color) => {
    return {
      id_color: id_color,
      quantity: quantity,
    };
<<<<<<< HEAD
  };

  const updateQuantityDiscount = (id_gc) => {
    const updatedQuantity = quantityDiscount - 1;
    setQuantityDiscount(updatedQuantity);

    return {
      id_gc: id_gc,
      quantity: updatedQuantity,
    };
  };

  const addBill = async (url, data) => {
    const options = {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
=======
    const selectedProducts = cart.map((item) => {
        const { name, nameColor, price, soluong, id_pd } = item;
        return { name, nameColor, price, soluong, id_pd };
    });
    const generateBillDetailData = (selectedProducts, id_bd) => {
        return selectedProducts.map((product) => ({
            id_bill: id_bd,
            name: product.name,
            price: product.price,
            color: product.nameColor,
            quantity: product.soluong,
            total_price: TotalPrice,
            id_pd: product.id_pd,
        }));
    };
    const quantity = useMemo(() => {
        return cart.reduce(
            (total, sp) => total + (sp.maxQuantity - sp.soluong),
            0
        );
    }, [cart]);
    console.log(quantity);

    const updateQuantityProduct = (quantity, id_color) => {
        return {
            id_color: id_color,
            quantity: quantity,
        };
>>>>>>> bd280cc9233e36974e1139e191c5b73ef1600890
    };
    const response = await fetch(url, options);
    return await response.json();
  };

  const addBillDetail = async (url, data) => {
    const options = {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(url, options);
    return await response.json();
  };

  const putQuantityProduct = async (url, data) => {
    const options = {
      method: 'put',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
<<<<<<< HEAD
    const response = await fetch(url, options);
    return await response.json();
  };
  const putQuantityDiscount = async (url, data) => {
    const options = {
      method: 'put',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
=======

    const addBillDetail = async (url, data) => {
        console.log(data);
        const options = {
            method: "post",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, options);
        return await response.json();
>>>>>>> bd280cc9233e36974e1139e191c5b73ef1600890
    };
    const response = await fetch(url, options);
    return await response.json();
  };

  const handleError = (error) => {
    console.error('lỗi khi thanh toán: ', error);
  };
  const handleCheckDiscount = async (data) => {
    try {
      const url = 'http://localhost:4000/admin-giftcode/check-discount';
      const opt = {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await fetch(url, opt);
      const responseData = await res.json();
      if (responseData.validDiscount) {
        const { id_gc, price, quantity } = responseData;
        alert('Mã giảm giá được áp dụng');
        setDiscountAmount(price);
        setQuantityDiscount(quantity);
        setIdGc(id_gc);
      } else {
        alert('Mã giảm giá không hợp lệ!');
        setDiscountAmount(0);
        setIdGc(null);
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra mã giảm giá:', error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const selectedProducts = cart.map((item) => {
    const { name, nameColor, price, soluong, id_pd } = item;
    return { name, nameColor, price, soluong, id_pd };
  });
  const quantity = useMemo(() => {
    return cart.reduce((total, sp) => total + (sp.maxQuantity - sp.soluong), 0);
  }, [cart]);

<<<<<<< HEAD
  const subTotal = useMemo(() => {
    return cart.reduce((total, sp) => total + sp.price_sale * sp.soluong, 0);
  }, [cart]);
  let shipping = 50000;
  let TotalPrice = subTotal ? subTotal + shipping - discountAmount : 0;

  return (
    <section className="checkout">
      <Navbar></Navbar>
      <div className="container">
        <h2 className="checkout-headng">Thông tinh đơn hàng và thanh toán</h2>
        <div className="checkout-list">
          <form
            className="checkout-wrapper"
            onSubmit={handleSubmit(handleCheckOut)}
            noValidate>
            <div className="checkout-left">
              <div className="checkout-address-info">
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
=======
    const subTotal = useMemo(() => {
        return cart.reduce(
            (total, sp) => total + sp.price_sale * sp.soluong,
            0
        );
    }, [cart]);
    let shipping = 50000;
    let TotalPrice = subTotal ? subTotal + shipping - discountAmount : 0;

    return (
        <section className="checkout">
            <Navbar></Navbar>
            <div className="container">
                <h2 className="checkout-headng">
                    Thông tinh đơn hàng và thanh toán
                </h2>
                <div className="checkout-list">
                    <form
                        className="checkout-wrapper"
                        onSubmit={handleSubmit(handleCheckOut)}
                        noValidate
                    >
                        <div className="checkout-left">
                            <div className="checkout-address-info">
                                <h3 className="checkout-address-heding">
                                    Thông tin đăng ký mua hàng
                                </h3>
                                <div className="checkout-address-form">
                                    <div className="checkout-address-form-item">
                                        <input
                                            type="text"
                                            placeholder="Tên"
                                            {...register("name")}
                                        />
                                        <p className="err">
                                            {errors.name?.message}
                                        </p>
                                    </div>
                                    <div className="checkout-address-form-item">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            {...register("email")}
                                        />
                                        <p className="err">
                                            {errors.email?.message}
                                        </p>
                                    </div>
                                    <div className="checkout-address-form-item">
                                        <input
                                            type="text"
                                            placeholder="Số điện thoại"
                                            {...register("phone")}
                                        />
                                        <p className="err">
                                            {errors.phone?.message}
                                        </p>
                                    </div>
                                    <div className="checkout-address-form-item">
                                        <input
                                            type="text"
                                            placeholder="Địa chỉ"
                                            {...register("street")}
                                        />
                                        <p className="err">
                                            {errors.street?.message}
                                        </p>
                                    </div>
                                    <div className="checkout-address-form-item">
                                        <input
                                            type="text"
                                            placeholder="Quận/Huyện"
                                            {...register("district")}
                                        />
                                        <p className="err">
                                            {errors.district?.message}
                                        </p>
                                    </div>
                                    <div className="checkout-address-form-item">
                                        <input
                                            type="text"
                                            placeholder="Thành phố"
                                            {...register("city")}
                                        />
                                        <p className="err">
                                            {errors.city?.message}
                                        </p>
                                    </div>
                                    <div className="checkout-address-form-item textarea">
                                        <textarea
                                            className="checkout-pay-note"
                                            placeholder="Ghi chú"
                                            rows="8"
                                            {...register("note")}
                                        ></textarea>
                                        <p className="err">
                                            {errors.note?.message}
                                        </p>
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
                                                {...register("pay")}
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
                                                {...register("pay")}
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
                                                {...register("pay")}
                                            />
                                        </label>
                                        <p className="err">
                                            {errors.pay?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-right">
                            <h3 className="cart-pay-title">Đơn hàng</h3>
                            <div className="cart-pay-total">
                                <p className="cart-pay-info">Tổng cộng</p>
                                <p className="cart-pay-price">
                                    {subTotal.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            </div>
                            <div className="cart-pay-discout">
                                <p className="cart-pay-info">Giảm giá</p>
                                <p className="cart-pay-price">
                                    {discountAmount.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            </div>
                            <div className="cart-pay-ship">
                                <p className="cart-pay-info">Phí vận chuyển</p>
                                <p className="cart-pay-price">
                                    {shipping.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            </div>
                            <div className="cart-pay-sub">
                                <p className="cart-pay-info">Thành tiền</p>
                                <p className="cart-pay-price">
                                    {TotalPrice.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            </div>
                            <button className="cart-pay-next submit">
                                Đặt hàng
                            </button>
                        </div>
                    </form>

                    <div className="checkout-form-discout">
                        <p className="form-discout-text">Bạn có mã giảm giá?</p>
                        <form
                            onSubmit={handleSubmitDiscount(handleCheckDiscount)}
                            noValidate
                        >
                            <input
                                type="text"
                                placeholder="Nhập mã giảm giá tại đây"
                                className="pay-code"
                                {...registerDiscount("discount")}
                            />
                            <button className="pay-add">Thêm</button>
                            <button
                                className="pay-add"
                                type="button"
                                onClick={() =>
                                    resetDiscount(setDiscountAmount(0))
                                }
                            >
                                Xóa
                            </button>
                        </form>
                    </div>
>>>>>>> bd280cc9233e36974e1139e191c5b73ef1600890
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
                <p className="cart-pay-price">
                  {discountAmount.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
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
              <button className="cart-pay-next submit">Đặt hàng</button>
            </div>
          </form>

          <div className="checkout-form-discout">
            <p className="form-discout-text">Bạn có mã giảm giá?</p>
            <form
              onSubmit={handleSubmitDiscount(handleCheckDiscount)}
              noValidate>
              <input
                type="text"
                placeholder="Nhập mã giảm giá tại đây"
                className="pay-code"
                {...registerDiscount('discount')}
              />
              <button className="pay-add">Thêm</button>
              <button
                className="pay-add"
                type="button"
                onClick={() => resetDiscount(setDiscountAmount(0))}>
                Xóa
              </button>
            </form>
          </div>
        </div>

        <DevTool control={control} />
      </div>
    </section>
  );
};

export default Checkout;
