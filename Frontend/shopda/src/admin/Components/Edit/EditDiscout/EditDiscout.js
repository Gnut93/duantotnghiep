import React from "react";
import "../Edit.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
const today = new Date();
const minDate = today.toISOString();
const schema = yup.object({
    code: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên màu có tối thiểu 2 ký tự")
        .max(20, "Tên  màu có tối đa 20 ký tự"),
    quantity: yup
        .number()
        .typeError("Vui lòng nhập một số")
        .required("Không được bỏ trống")
        .min(1, "Chưa đạt số lượng tối thiểu")
        .typeError("Giá phải là một số")
        .integer("Phải là số nguyên"),

    price: yup
        .number()
        .typeError("Vui lòng nhập một số")
        .min(1, "Chưa đạt số lượng tối thiểu")
        .typeError("Giá phải là một số")
        .required("Không được bỏ trống"),
    expiration_date: yup
        .date()
        .min(minDate, "Ngày không được nhỏ hơn ngày hiện tại"),
});
const EditDiscout = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/admin-giftcode/detail/${id}`
            );
            const data = await reponse.json();
            const expirationDate = new Date(data.expiration_date);
            const day = String(expirationDate.getDate()).padStart(2, "0");
            const month = String(expirationDate.getMonth() + 1).padStart(
                2,
                "0"
            );
            const year = expirationDate.getFullYear();
            const formattedDate = `${year}-${month}-${day}`;
            return {
                code: data.code,
                quantity: data.quantity,
                price: data.price,
                expiration_date: formattedDate,
            };
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;

    const handleSubmitDiscout = async (data) => {
        try {
            const confirmation = window.confirm(
                "Bạn có chắc chắn muốn sửa Discout này?"
            );
            if (!confirmation) {
                return;
            }
            const url = `http://localhost:4000/admin-giftcode/edit/${id}`;
            const opt = {
                method: "put",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã sửa Discout Thành Công,", responseData);
            navigate("/admin/discout");
        } catch (error) {
            console.error("Lỗi khi Sửa Discout: ", error);
        }
    };
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);
    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Edit</h1>
                    </div>
                </div>
                <div className="tab-additional active" data-tab="1">
                    <div className="checkout-address">
                        <h3 className="checkout-address-title">
                            <span>Sửa Mã giảm giá</span>
                        </h3>
                        <div className="checkout-address-box">
                            <form
                                className="category"
                                autocomplete="off"
                                onSubmit={handleSubmit(handleSubmitDiscout)}
                                noValidate
                            >
                                <div className="checkout-address-list">
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Mã Code</label> <br />
                                            <input
                                                type="text"
                                                id="avatar"
                                                accept="image/*"
                                                {...register("code")}
                                            />
                                            <p className="err">
                                                {errors.code?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Số lượng</label> <br />
                                            <input
                                                type="number"
                                                {...register("quantity")}
                                            />
                                            <p className="err">
                                                {errors.quantity?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Giá</label> <br />
                                            <input
                                                type="number"
                                                {...register("price")}
                                            />
                                            <p className="err">
                                                {errors.price?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Ngày hết hạn</label> <br />
                                            <input
                                                type="date"
                                                {...register("expiration_date")}
                                            />
                                            <p className="err">
                                                {
                                                    errors.expiration_date
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <button className="submit">
                                                Sửa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <DevTool control={control} />
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default EditDiscout;
