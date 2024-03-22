import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên loại hàng có tối thiểu 2 ký tự")
        .max(20, "Tên loại hàng có tối đa 20 ký tự"),
});

const NhapLoai = () => {
    const form = useForm({
        defaultValues: {
            name: "",
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;
    const handleSubmitLoai = async (data) => {
        try {
            const url = "http://localhost:4000/admin-category/add";
            const opt = {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã thêm Loại Thành Công,", responseData);
        } catch (error) {
            console.error("Lỗi khi thêm Loại: ", error);
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
                <span>Thêm loại Hàng</span>
            </h3>
            <div className="checkout-address-box">
                <form
                    className="category"
                    autoComplete="off"
                    onSubmit={handleSubmit(handleSubmitLoai)}
                    noValidate
                >
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Tên loại hàng</label> <br />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    {...register("name")}
                                />
                                <p className="err">{errors.name?.message}</p>
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

export default NhapLoai;
