import React from "react";
import "../Edit.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
const schema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),
    price: yup
        .number()
        .typeError("Vui lòng nhập một số")
        .min(1, "Chưa đạt số lượng tối thiểu")
        .required("Không được bỏ trống"),

    price_sale: yup
        .number()
        .typeError("Vui lòng nhập một số")
        .min(1, "Chưa đạt số lượng tối thiểu")
        .required("Không được bỏ trống"),
    quantity: yup
        .number()
        .typeError("Vui lòng nhập một số")
        .required("Không được bỏ trống")
        .min(1, "Chưa đạt số lượng tối thiểu")
        .integer("Phải là số nguyên"),

    image: yup
        .string()
        .url("link ảnh không hợp lệ")
        .required("Không được bỏ trống"),
    description: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Mô tả có tối thiểu 10 ký tự")
        .max(200, " Mô tả có tối đa 200 ký tự"),
});

const EditSP = () => {
    let { id } = useParams();
    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/products/info/${id}`
            );
            const data = await reponse.json();
            return {
                id_cate: data.id_cate,
                name: data.name,
                price: data.price,
                price_sale: data.price_sale,
                quantity: data.quantity,
                image: data.image,
                description: data.description,
            };
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;

    const handleSubmitSanPham = async (data) => {
        data.id_pd = parseInt(data.id_pd);
        try {
            const url = `http://localhost:4000/admin-products/edit/${id}`;
            const opt = {
                method: "put",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const reponseData = await res.json();
            alert("Đã sửa sản phẩm,", reponseData);
            console.log(data);
        } catch (error) {
            console.error("Lỗi khi sửa sản phẩm: ", error);
        }
    };

    const [listLoai, setListLoai] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/category/list")
            .then((res) => res.json())
            .then(setListLoai);
    }, []);

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
                        <h1>Sửa Sản Phẩm</h1>
                    </div>
                </div>
                <div className="tab-additional active" data-tab="1">
                    <div className="checkout-address">
                        <div className="checkout-address-box">
                            <form
                                className="product"
                                onSubmit={handleSubmit(handleSubmitSanPham)}
                                noValidate
                            >
                                <div className="checkout-address-list">
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Tên sản phẩm</label> <br />
                                            <input
                                                type="text"
                                                placeholder="Tên Sản Phẩm"
                                                id="laptop-name"
                                                {...register("name")}
                                            />
                                            <p className="err">
                                                {errors.name?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Giá gốc</label> <br />
                                            <input
                                                type="number"
                                                placeholder="VNĐ"
                                                id="laptop-gia"
                                                {...register("price")}
                                            />
                                            <p className="err">
                                                {errors.price?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Giá khuyến mãi</label> <br />
                                            <input
                                                type="number"
                                                placeholder="VNĐ"
                                                id="laptop-km"
                                                {...register("price_sale")}
                                            />
                                            <p className="err">
                                                {errors.price_sale?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Loại Hàng</label> <br />
                                            <select
                                                className="option-cate"
                                                {...register("id_cate")}
                                            >
                                                {listLoai.map((loai, i) => (
                                                    <option
                                                        key={i}
                                                        value={loai.id_cate}
                                                    >
                                                        {loai.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Số lượng</label> <br />
                                            <input
                                                type="text"
                                                placeholder="10"
                                                id="laptop-ram"
                                                {...register("quantity")}
                                            />
                                            <p className="err">
                                                {errors.quantity?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Hình Ảnh</label> <br />
                                            <input
                                                type="text"
                                                id="avatar"
                                                accept="image/*"
                                                {...register("image")}
                                            />
                                            <p className="err">
                                                {errors.image?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Mô tả</label> <br />
                                            <textarea
                                                class="message"
                                                type="text"
                                                id=""
                                                placeholder="Message..."
                                                rows="7"
                                                {...register("description")}
                                            ></textarea>
                                            <p className="err">
                                                {errors.description?.message}
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

export default EditSP;
