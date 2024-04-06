import React from "react";
import "../Edit.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import cloudinaryUpload from "../../../../service/uploads";
const schema = yup.object({
    heading: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),

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

const EditBaiViet = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/post/info/${id}`
            );
            const data = await reponse.json();
            return {
                heading: data.heading,
                description: data.description,
                image: data.image,
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
        data.id_post = parseInt(data.id_post);
        try {
            const confirmation = window.confirm(
                "Bạn có chắc chắn muốn sửa Bài Viết này?"
            );
            if (!confirmation) {
                return;
            }
            const url = `http://localhost:4000/post/update/${id}`;
            const opt = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã Sửa Bài Viết  Thành Công,", responseData);
            navigate("/admin/blogList");
        } catch (error) {
            console.error("Lỗi khi Sửa Bài Viết: ", error);
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
                        <h1>Sửa Bài Viết</h1>
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
                                            <label>Tên Bài Viết</label> <br />
                                            <input
                                                type="text"
                                                placeholder="Tên Sản Phẩm"
                                                id="laptop-name"
                                                {...register("heading")}
                                            />
                                            <p className="err">
                                                {errors.heading?.message}
                                            </p>
                                        </div>
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

export default EditBaiViet;
