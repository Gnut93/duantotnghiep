import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cloudinaryUpload from "../../../../service/uploads";
import { useParams, useNavigate } from "react-router-dom";
const schema = yup.object({
    name: yup.string().trim().required("Không được bỏ trống"),
    avatar: yup.mixed().test("size", "Kích thước file quá lớn", (value) => {
        if (!value) return true;
        return value.size <= 5242880;
    }),
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
            console.log(data);
            return {
                name: data.name,
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
        console.log(e.target.files[0]);
        cloudinaryUpload(uploadData)
            .then((res) => {
                console.log(res.secure_url);
                form.setValue("name", res.secure_url);
            })
            .catch((err) => console.error(err));
    };

    const handleSubmitHinh = async (data) => {
        data.id_pd = parseInt(data.id_pd);

        try {
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
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Sửa Hình Ảnh Chi Tiết</span>
            </h3>
            <div className="checkout-address-box">
                <form
                    className="category"
                    autocomplete="off"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(handleSubmitHinh)}
                >
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Hình Ảnh</label> <br />
                                <input
                                    type="file"
                                    id="avatar"
                                    onChange={(e) => handleFileUpload(e)}
                                    {...register("name")}
                                />
                                <p className="err">{errors.name?.message}</p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Mã Sản Phẩm</label> <br />
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
                                <button className="submit">Sửa</button>
                            </div>
                        </div>
                    </div>
                </form>
                <DevTool control={control} />
            </div>
        </div>
    );
};

export default EditHinh;
