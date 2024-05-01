import React, { useMemo, useState } from "react";
import "./Checkout.css";
import Navbar from "../Navbar/Navbar";
import momo from "../../../assets/images/logo-momo-png-1.png";
import cod from "../../../assets/images/cod.png";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { Spin } from "antd";
import { xoaGH } from "../cartSlice";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 chữ số")
        .required("Không được bỏ trống"),
    email: yup
        .string()
        .trim()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ")
        .required("Không được bỏ trống"),

    street: yup.string().required("Địa chỉ không được bỏ trống"),
    district: yup.string().required("Địa chỉ không được bỏ trống"),
    city: yup.string().required("Địa chỉ không được bỏ trống"),
    pay: yup.string().required(" không được bỏ trống phương thức thanh toán"),
});
const Checkout = () => {
    const [discountAmount, setDiscountAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [idGc, setIdGc] = useState(null);
    const [quantityDiscount, setQuantityDiscount] = useState(0);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    const [api, contextHolder] = notification.useNotification();
    const subTotal = useMemo(() => {
        return cart.reduce(
            (total, sp) => total + sp.price_sale * sp.soluong,
            0
        );
    }, [cart]);

    let TotalPrice = subTotal ? subTotal - discountAmount : 0;
    useEffect(() => {
        setUserId(idUser);
    }, [idUser, user]);
    useEffect(() => {
        if (user) {
            if (user.address) {
                let street = user.address.trim().split(",")[0];
                let ward = user.address.trim().split(",")[1];
                let address = street + ", " + ward;
                let district = user.address.trim().split(",")[2];
                let city = user.address.trim().split(",")[3];
                setValue("street", address);
                setValue("district", district);
                setValue("city", city);
            }
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("phone", user.phone);
        }
    }, [user, setValue]);

    const handleCheckOut = async (data) => {
        try {
            setLoading(true);
            console.log(data);
            const paymentMethod = data.pay;
            if (paymentMethod === "momo") {
                const selectedPayment = getValues("pay");
                let formBill = generateBillData(data, selectedPayment);
                formBill.status = "chờ thanh toán";
                const billResponse = await addBill(
                    "http://localhost:4000/bill/add",
                    formBill
                );
                const id_bd = billResponse.id_dh;
                const formBillDetail = generateBillDetailData(
                    selectedProducts,
                    id_bd
                );
                await addBillDetail(
                    "http://localhost:4000/bill/add-detail",
                    formBillDetail
                );
                const opt = {
                    method: "get",
                    headers: { "Content-Type": "application/json" },
                };
                const res = await fetch(
                    `http://localhost:4000/momo?price=${TotalPrice}&billId=${id_bd}`,
                    opt
                );
                const { payUrl } = await res.json();
                window.location.href = payUrl;
                return;
            }
            const selectedPayment = getValues("pay");
            const formBill = generateBillData(data, selectedPayment);
            const billResponse = await addBill(
                "http://localhost:4000/bill/add",
                formBill
            );
            const id_bd = billResponse.id_dh;
            const formBillDetail = generateBillDetailData(
                selectedProducts,
                id_bd
            );
            await addBillDetail(
                "http://localhost:4000/bill/add-detail",
                formBillDetail
            );
            const firstCartItem = cart[0];
            const id_pd_detail = firstCartItem.id_pd_detail;
            const formQuantity = updateQuantityProduct(
                quantityData,
                id_pd_detail
            );
            const formQuantityDiscount = updateQuantityDiscount(
                quantityData,
                idGc
            );
            await putQuantityProduct(
                `http://localhost:4000/admin-products/edit-quantity/${id_pd_detail}`,
                formQuantity
            );
            await putQuantityDiscount(
                `http://localhost:4000/admin-giftcode/edit-quantity/${idGc}`,
                formQuantityDiscount
            );
            api["success"]({
                message: "Đặt hàng thành công !!!",
            });
            dispatch(xoaGH());
            await sendMail(
                `http://localhost:4000/users/delivery`,
                formBill,
                formBillDetail
            );
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
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
            status: "Chờ",
            note: data.note,
            payment_type: selectedPayment,
        };
        if (idGc) {
            billData.id_gc = idGc;
        }
        if (userId) {
            billData.id_user = userId;
        }

        return billData;
    };
    const selectedProducts = cart.map((item) => {
        const { name, nameColor, price, image, soluong, id_pd_detail } = item;
        return { name, nameColor, price, image, soluong, id_pd_detail };
    });
    const generateBillDetailData = (selectedProducts, id_bd) => {
        return selectedProducts.map((product) => ({
            id_bill: id_bd,
            name: product.name,
            price: product.price,
            color: product.nameColor,
            image: product.image,
            quantity: product.soluong,
            total_price: TotalPrice,
            id_pd_detail: product.id_pd_detail,
        }));
    };
    const updateQuantityDiscount = (id_gc) => {
        const updatedQuantity = quantityDiscount - 1;
        setQuantityDiscount(updatedQuantity);

        return {
            id_gc: id_gc,
            quantity: updatedQuantity,
        };
    };
    const quantityData = useMemo(() => {
        const quantityMap = {};

        cart.forEach((sp) => {
            const { id_pd_detail, maxQuantity, soluong } = sp;
            if (!quantityMap[id_pd_detail]) {
                quantityMap[id_pd_detail] = maxQuantity - soluong;
            } else {
                quantityMap[id_pd_detail] += maxQuantity - soluong;
            }
        });

        return quantityMap;
    }, [cart]);

    const updateQuantityProduct = (quantityData) => {
        if (!quantityData) return [];

        return Object.entries(quantityData).map(([id_pd_detail, quantity]) => ({
            id_pd_detail,
            quantity,
        }));
    };
    const addBill = async (url, data) => {
        const options = {
            method: "post",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, options);
        return await response.json();
    };

    const addBillDetail = async (url, data) => {
        const options = {
            method: "post",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, options);
        return await response.json();
    };

    const putQuantityProduct = async (url, data) => {
        const options = {
            method: "put",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(url, options);
        return await response.json();
    };
    const putQuantityDiscount = async (url, data) => {
        const options = {
            method: "put",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, options);
        return await response.json();
    };
    const sendMail = async (url, formBill, formBillDetail) => {
        const combinedData = { ...formBill, ...formBillDetail };

        const options = {
            method: "post",
            body: JSON.stringify(combinedData),
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, options);
        return await response.json();
    };

    const handleError = (error) => {
        console.error("lỗi khi thanh toán: ", error);
    };

    const handleCheckDiscount = async (data) => {
        try {
            const url = "http://localhost:4000/admin-giftcode/check-discount";
            const opt = {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            if (responseData.validDiscount) {
                const { id_gc, price, quantity } = responseData;
                api["success"]({
                    message: "Mã giảm giá được áp dụng !!!",
                });
                setDiscountAmount(price);
                setQuantityDiscount(quantity);
                setIdGc(id_gc);
            } else {
                api["error"]({
                    message: "Mã giảm giá không hợp lệ!",
                });
                setDiscountAmount(0);
                setIdGc(null);
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra mã giảm giá:", error);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <section className="checkout">
            {contextHolder}
            <Navbar></Navbar>
            <Spin spinning={loading}>
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
                                {cart.map((item) => (
                                    <div className="cart-pay-ship">
                                        <p className="cart-pay-info">
                                            {item.name}
                                        </p>
                                        <p className="cart-pay-price">
                                            {item.nameColor}
                                        </p>
                                        <p className="cart-pay-price">
                                            x{item.soluong}
                                        </p>
                                    </div>
                                ))}
                                <div className="cart-pay-discout">
                                    <p className="cart-pay-info">Giảm giá</p>
                                    <p className="cart-pay-price">
                                        {discountAmount.toLocaleString(
                                            "vi-VN",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}
                                    </p>
                                </div>
                                <div className="cart-pay-ship">
                                    <p className="cart-pay-info">
                                        Phí vận chuyển
                                    </p>
                                    <p className="cart-pay-price">Miễn phí</p>
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
                        <div className="checkout-form-left">
                            <div className="checkout-form-discout">
                                <p className="form-discout-text">
                                    Bạn có mã giảm giá?
                                </p>
                                <form
                                    onSubmit={handleSubmitDiscount(
                                        handleCheckDiscount
                                    )}
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
                        </div>
                    </div>
                    <DevTool control={control} />
                </div>
            </Spin>
        </section>
    );
};

export default Checkout;
