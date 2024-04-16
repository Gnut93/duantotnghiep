import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
    id_cate: yup
        .string()
        .notOneOf([""], "Vui lòng chọn sản phẩm")
        .required("Vui lòng chọn sản phẩm"),
    image: yup.string().required("Không được bỏ trống"),
    avatar: yup.mixed().test("size", "Kích thước file quá lớn", (value) => {
        if (!value) return true; // Trường hợp không có file được chọn
        return value.size <= 5242880; // Kích thước file không vượt quá 5MB (5242880 bytes)
    }),
    description: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Mô tả có tối thiểu 10 ký tự")
        .max(200, " Mô tả có tối đa 200 ký tự"),
});

const NhapSP = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            price: "",
            price_sale: "",
            image: "",
            description: "",
            id_cate: "",
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        console.log(e.target.files[0]);
        cloudinaryUpload(uploadData)
            .then((res) => {
                console.log(res.secure_url);
                form.setValue("image", res.secure_url);
            })
            .catch((err) => console.error(err));
    };

    const handleSubmitSanPham = async (data) => {
        data.id_pd = parseInt(data.id_pd);
        try {
            const url = "http://localhost:4000/admin-products/add-product";
            const opt = {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const reponseData = await res.json();
            alert("Đã thêm sản phẩm,", reponseData);
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm: ", error);
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
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Thêm sản phẩm</span>
            </h3>
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
                                <p className="err">{errors.name?.message}</p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Giá gốc</label> <br />
                                <input
                                    type="number"
                                    placeholder="VNĐ"
                                    id="laptop-gia"
                                    {...register("price")}
                                />
                                <p className="err">{errors.price?.message}</p>
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
                                    <option value="" disabled selected>
                                        Vui lòng chọn loại sản phẩm
                                    </option>
                                    {listLoai.map((loai, i) => (
                                        <option key={i} value={loai.id_cate}>
                                            {loai.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="err">{errors.id_cate?.message}</p>
                            </div>
                        </div>
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Hình Ảnh</label> <br />
                                <input
                                    type="file"
                                    id="avatar"
                                    onChange={(e) => handleFileUpload(e)}
                                />
                                <p className="err">{errors.image?.message}</p>
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

export default NhapSP;
