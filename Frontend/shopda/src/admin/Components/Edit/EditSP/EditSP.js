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
    image: yup.string().trim().required("Không được bỏ trống"),
    avatar: yup.mixed().test("size", "Kích thước file quá lớn", (value) => {
        if (!value) return true;
        return value.size <= 5242880;
    }),
    description: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Mô tả có tối thiểu 10 ký tự")
        .max(200, " Mô tả có tối đa 200 ký tự"),
});

const EditSP = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [listLoai, setListLoai] = useState([]);
    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/products/info/${id}`
            );
            const data = await reponse.json();
            return {
                name: data.name,
                price: data.price,
                price_sale: data.price_sale,
                id_cate: data.id_cate,
                image: data.image,
                description: data.description,
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
                console.log(res.secure_url);
                form.setValue("image", res.secure_url);
            })
            .catch((err) => console.error(err));
    };

    const handleSubmitSP = async (data) => {
        data.id_pd = parseInt(data.id_pd);
        console.log(data);
        try {
            const confirmation = window.confirm(
                "Bạn có chắc chắn muốn sửa Sản Phẩm này?"
            );
            if (!confirmation) {
                return;
            }
            const url = `http://localhost:4000/admin-products/edit/${id}`;
            const opt = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã Sửa Sản Phẩm Thành Công,", responseData);
            navigate("/admin/khohang");
        } catch (error) {
            console.error("Lỗi khi thêm Sản Phẩm: ", error);
        }
    };

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
                                onSubmit={handleSubmit(handleSubmitSP)}
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
                                            <label>Hình Ảnh</label> <br />
                                            <input
                                                type="file"
                                                id="avatar"
                                                onChange={(e) =>
                                                    handleFileUpload(e)
                                                }
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
                                        <div className="checkout-address-input">
                                            <button
                                                type="button"
                                                className="submit"
                                                onClick={() => reset()}
                                            >
                                                Khôi Phục Dữ Liệu
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
