import React from "react";
import "../Edit.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
const schema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .url("link hình ảnh không hợp lệ"),
});
const EditHinh = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/products/image/${id}`
            );
            const data = await reponse.json();
            return {
                name: data.name,
                id_pd: data.id_pd,
            };
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;

    const handleSubmitHinh = async (data) => {
        data.id_pd = parseInt(data.id_pd);

        try {
            const confirmation = window.confirm(
                "Bạn có chắc chắn muốn sửa Hình này?"
            );
            if (!confirmation) {
                return;
            }
            const url = `http://localhost:4000/admin-products/edit-image/${id}`;
            const opt = {
                method: "put",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã sửa hình Thành Công,", responseData);
            navigate("/admin/image");
        } catch (error) {
            console.error("Lỗi khi sửa hình: ", error);
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
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Sửa Hình Ảnh C</h1>
                    </div>
                </div>
                <div className="tab-additional active" data-tab="1">
                    <div className="checkout-address">
                        <h3 className="checkout-address-title">
                            <span>Sửa Hình Ảnh Chi Tiết</span>
                        </h3>
                        <div className="checkout-address-box">
                            <form
                                className="category"
                                autocomplete="off"
                                onSubmit={handleSubmit(handleSubmitHinh)}
                            >
                                <div className="checkout-address-list">
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Link Hình</label> <br />
                                            <input
                                                type="text"
                                                id="avatar"
                                                accept="image/*"
                                                {...register("name")}
                                            />
                                            <p className="err">
                                                {errors.name?.message}
                                            </p>
                                        </div>
                                        <div className="checkout-address-input">
                                            <label>Mã Sản phẩm</label> <br />
                                            <select
                                                {...register("id_pd")}
                                                className="option-cate"
                                            >
                                                {listSanPham.map((sp, i) => (
                                                    <option
                                                        key={i}
                                                        value={sp.id_pd}
                                                    >
                                                        {sp.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="err">
                                                {errors.id_pd?.message}
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

export default EditHinh;
