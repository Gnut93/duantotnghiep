import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const NhapBaiViet = () => {
    const form = useForm({
        defaultValues: {
            heading: "",
            image: "",
            description: "",
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

    const handleSubmitPost = async (data) => {
        try {
            const url = "http://localhost:4000/post/add";
            const opt = {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const reponseData = await res.json();
            alert("Đã thêm bài viết,", reponseData);
        } catch (error) {
            console.error("Lỗi khi thêm bài viết: ", error);
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
                <span>Thêm sản phẩm</span>
            </h3>
            <div className="checkout-address-box">
                <form
                    className="product"
                    onSubmit={handleSubmit(handleSubmitPost)}
                    noValidate
                >
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Tiêu Đề Bài Viết</label> <br />
                                <input
                                    type="text"
                                    placeholder="Tên Bài Viết"
                                    id="laptop-name"
                                    {...register("heading")}
                                />
                                <p className="err">{errors.heading?.message}</p>
                            </div>
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
                                <label>Nội Dung Bài Viết</label> <br />
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

export default NhapBaiViet;
