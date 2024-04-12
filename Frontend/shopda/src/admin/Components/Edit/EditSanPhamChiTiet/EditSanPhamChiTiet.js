import React from "react";
import "../Edit.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import cloudinaryUpload from "../../../../service/uploads";
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
    image: yup.string().required("Không được bỏ trống"),
    avatar: yup.mixed().test("size", "Kích thước file quá lớn", (value) => {
        if (!value) return true; // Trường hợp không có file được chọn
        return value.size <= 5242880; // Kích thước file không vượt quá 5MB (5242880 bytes)
    }),
});

const EditSanPhamChiTiet = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/products/color/detail/${id}`
            );
            const data = await reponse.json();
            console.log(data);
            return {
                name: data.color,
                code: data.color_code,
                quantity: data.quantity,
                image: data.image,
                id_pd: data.id_pd,
            };
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        cloudinaryUpload(uploadData)
            .then((res) => {
                form.setValue("name", res.secure_url);
            })
            .catch((err) => console.error(err));
    };
    const handleSubmitMau = async (data) => {
        data.id_pd = parseInt(data.id_pd);

        try {
            const confirmation = window.confirm(
                "Bạn có chắc chắn muốn sửa Màu này?"
            );
            if (!confirmation) {
                return;
            }
            const url = `http://localhost:4000/admin-products/edit-color/${id}`;
            const opt = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã Sửa Màu Thành Công,", responseData);
            navigate("/admin/chitietsanpham");
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
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Sửa Màu</h1>
                    </div>
                </div>
                <div className="tab-additional active" data-tab="1">
                    <div className="checkout-address-box">
                        <form
                            className="category"
                            autoComplete="off"
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
                                        <p className="err">
                                            {errors.name?.message}
                                        </p>
                                    </div>
                                    <div className="checkout-address-input">
                                        <label>Mã màu</label> <br />
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
                                            placeholder="10"
                                            id="laptop-ram"
                                            {...register("quantity")}
                                        />
                                        <p className="err">
                                            {errors.quantity?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="checkout-address-item">
                                    <div className="checkout-address-input">
                                        <label>Hình Ảnh</label> <br />
                                        <input
                                            type="file"
                                            id="avatar"
                                            onChange={(e) =>
                                                handleFileUpload(e)
                                            }
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
                                            <option value="" disabled selected>
                                                Vui lòng chọn loại sản phẩm
                                            </option>
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
                                        <button className="submit">Sửa</button>
                                    </div>
                                    <div className="checkout-address-input">
                                        <button
                                            type="button"
                                            className="submit"
                                            onClick={() => reset()}
                                        >
                                            Khôi phục dữ liệu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <DevTool control={control} />
                    </div>
                </div>
            </main>
        </section>
    );
};

export default EditSanPhamChiTiet;
