import React from "react";
import { useState } from "react";
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
        .min(2, "Tên màu có tối thiểu 2 ký tự")
        .max(20, "Tên  màu có tối đa 20 ký tự")
        .test("no-numbers", "Không được nhập số", (value) => {
            return /^\D+$/.test(value);
        }),
    code: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên màu có tối thiểu 5 ký tự")
        .max(20, "Tên  màu có tối đa 20 ký tự"),
    quantity: yup
        .number()
        .typeError("Vui lòng nhập một số")
        .required("Không được bỏ trống")
        .min(1, "Chưa đạt số lượng tối thiểu")
        .integer("Phải là số nguyên"),
});

const NhapMau = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            code: "",
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;
    const handleSubmitMau = async (data) => {
        data.id_pd = parseInt(data.id_pd);

        try {
            const url = "http://localhost:4000/admin-products/add-color";
            const opt = {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã thêm Màu Thành Công,", responseData);
        } catch (error) {
            console.error("Lỗi khi thêm Màu: ", error);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const [listSanPham, setListSanPham] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/products/list")
            .then((res) => res.json())
            .then(setListSanPham);
    }, []);
    return (
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Thêm màu cho sản phẩm</span>
            </h3>
            <div className="checkout-address-box">
                <form
                    className="category"
                    autocomplete="off"
                    onSubmit={handleSubmit(handleSubmitMau)}
                    noValidate
                >
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Tên màu</label> <br />
                                <input
                                    type="text"
                                    id="avatar"
                                    accept="image/*"
                                    {...register("name")}
                                />
                                <p className="err">{errors.name?.message}</p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Mã màu</label> <br />
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
                                    placeholder="10"
                                    id="laptop-ram"
                                    {...register("quantity")}
                                />
                                <p className="err">
                                    {errors.quantity?.message}
                                </p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Mã Sản phẩm</label> <br />
                                <select
                                    {...register("id_pd")}
                                    className="option-cate"
                                >
                                    {listSanPham.map((sp, i) => (
                                        <option key={i} value={sp.id_pd}>
                                            {sp.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="err">{errors.id_pd?.message}</p>
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

export default NhapMau;
