import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
const NhapDiscout = () => {
    const form = useForm({
        defaultValues: {
            code: "",
            quantity: "",
            price: "",
            expiration_date: new Date(),
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;

    const handleSubmitDiscout = async (data) => {
        try {
            const url = "http://localhost:4000/admin-giftcode/add";
            const opt = {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã thêm Discout Thành Công,", responseData);
        } catch (error) {
            console.error("Lỗi khi thêm Discout: ", error);
        }
    };
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);
    return (
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Thêm Mã giảm giá</span>
            </h3>
            <div className="checkout-address-box">
                <form
                    className="category"
                    autoComplete="off"
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
                                <p className="err">{errors.code?.message}</p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Số lượng</label> <br />
                                <input
                                    type="number"
                                    id="avatar"
                                    accept="image/*"
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
                                    id="avatar"
                                    accept="image/*"
                                    {...register("price")}
                                />
                                <p className="err">{errors.price?.message}</p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Ngày hết hạn</label> <br />
                                <input
                                    type="date"
                                    id="avatar"
                                    accept="image/*"
                                    {...register("expiration_date")}
                                />
                                <p className="err">
                                    {errors.expiration_date?.message}
                                </p>
                            </div>
                            <div className="checkout-address-input">
                                <button className="submit">Thêm</button>
                            </div>
                            <div className="checkout-address-input">
                                <button
                                    type="button"
                                    className="submit"
                                    onClick={() => reset()}
                                >
                                    reset
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <DevTool control={control} />
            </div>
        </div>
    );
};

export default NhapDiscout;
