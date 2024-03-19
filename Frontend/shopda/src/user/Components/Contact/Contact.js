import React from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";
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
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),
    size: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),
    color: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),
    image: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),
    email: yup
        .string()
        .email("email có định dạng không hợp lệ")
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên sản phẩm có tối thiểu 2 ký tự")
        .max(20, "Tên  sản phẩm có tối đa 20 ký tự"),
    phone: yup
        .number()
        .typeError("Vui lòng nhập một số")
        .min(10, "Chưa đạt số lượng tối thiểu")
        .required("Không được bỏ trống"),
    description: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Mô tả có tối thiểu 10 ký tự")
        .max(2000, " Mô tả có tối đa 2000 ký tự"),
});
const Contact = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            size: "",
            color: "",
            image: "",
            email: "",
            phone: "",
            description: "",
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;
    const handleSubmitForm = (data) => {
        console.log(data);
    };
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <section className="contact">
            <Navbar></Navbar>
            <div className="container">
                <h2 className="contact-heading">Dịch vụ theo yêu cầu</h2>
                <p className="contact-desc">
                    Dịch vụ thiết kế đồ da theo yêu cầu của chúng tôi cung cấp
                    trải nghiệm cá nhân hóa tối ưu cho khách hàng, mang lại cơ
                    hội sở hữu những sản phẩm da độc đáo, phản ánh đúng phong
                    cách và nhu cầu cá nhân. Từ ví da, túi xách, đến các sản
                    phẩm phụ kiện khác, mỗi món đồ được tạo ra với sự tỉ mỉ và
                    chăm chút đến từng chi tiết. Khách hàng có thể tham gia trực
                    tiếp vào quá trình thiết kế: lựa chọn loại da, màu sắc, kiểu
                    dáng, cũng như thêm các chi tiết cá nhân hóa như khắc tên
                    hoặc thông điệp ý nghĩa. Đội ngũ thiết kế và thợ thủ công
                    của chúng tôi, với bề dày kinh nghiệm và tay nghề cao, cam
                    kết mang lại sản phẩm tinh tế, chất lượng, đảm bảo sự hài
                    lòng tuyệt đối cho khách hàng. Hãy để chúng tôi giúp bạn tạo
                    nên những tác phẩm đồ da riêng biệt, phản ánh đẳng cấp và cá
                    tính của bạn.
                </p>
                <div className="contact-center">
                    <form
                        method="post"
                        action=""
                        class="contact-form"
                        onSubmit={handleSubmit(handleSubmitForm)}
                    >
                        <input
                            class="name"
                            type="text"
                            id=""
                            placeholder="Tên"
                            {...register("name")}
                        />
                        {/* <p className="err">{errors.name?.message}</p> */}
                        <input
                            class="email"
                            type="text"
                            id=""
                            placeholder="Size"
                            {...register("size")}
                        />
                        {/* <p className="err">{errors.size?.message}</p> */}
                        <input
                            class="name"
                            type="text"
                            id=""
                            placeholder="Màu da"
                            {...register("color")}
                        />
                        {/* <p className="err">{errors.color?.message}</p> */}
                        <input
                            class="email"
                            type="text"
                            id=""
                            placeholder="Hình mẫu"
                            {...register("image")}
                        />
                        {/* <p className="err">{errors.image?.message}</p> */}
                        <input
                            class="subject"
                            type="text"
                            id=""
                            placeholder="email"
                            {...register("email")}
                        />
                        {/* <p className="err">{errors.email?.message}</p> */}
                        <input
                            class="phone"
                            type="phone"
                            id=""
                            placeholder="Số điện thoại"
                            {...register("phone")}
                        />
                        {/* <p className="err">{errors.phone?.message}</p> */}
                        <textarea
                            class="message"
                            type="text"
                            id=""
                            placeholder="mỗ tả chi tiết"
                            rows="7"
                            {...register("description")}
                        ></textarea>
                        {/* <p className="err">{errors.description?.message}</p> */}
                        <button type="submit">Send message</button>
                    </form>
                    <DevTool control={control} />
                    <div className="contact-detail">
                        <div class="contact-item">
                            <i class="fa-solid fa-location-dot fa-xl"></i>
                            <div class="contact-text">
                                <h4>Address</h4>
                                <p>
                                    Quang Trung Software Park QTSC Building 1,
                                    Quang Trung, Ward 12, HCMC
                                </p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fa-solid fa-phone fa-xl"></i>
                            <div class="contact-text">
                                <h4>Phone</h4>
                                <p>(+84) 901.379.586</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <i class="fa-solid fa-envelope fa-xl"></i>
                            <div class="contact-text">
                                <h4>Email</h4>
                                <p>dashop2024@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
