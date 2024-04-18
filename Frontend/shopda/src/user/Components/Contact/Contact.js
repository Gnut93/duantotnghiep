import React from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import {useSelector} from "react-redux";
import Select from "react-select"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cloudinaryUpload from "../../../user/service/uploads";
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
        .min(2, "Tên Size có tối thiểu 2 ký tự")
        .max(20, "Tên  Size có tối đa 20 ký tự"),
    color: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên Màu có tối thiểu 2 ký tự")
        .max(20, "Tên  màu có tối đa 20 ký tự"),
    image: yup.string().trim().required("Không được bỏ trống"),
    avatar: yup.mixed().test("size", "Kích thước file quá lớn", (value) => {
        if (!value) return true; // Trường hợp không có file được chọn
        return value.size <= 5242880; // Kích thước file không vượt quá 5MB (5242880 bytes)
    }),
    email: yup
        .string()
        .email("email có định dạng không hợp lệ")
        .trim()
        .required("Không được bỏ trống"),
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
    const result = JSON.parse(localStorage.getItem('result'));
    const user = result?.userInfo;
    const form = useForm({
        defaultValues: {
            name: user?.name,
            loai: "",
            color: "",
            image: "",
            email: user?.email,
            phone: user?.phone,
            description: "",
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;
    const handleSubmitForm = async (data) => {
        console.log(data);
        try {
            const url = "http://localhost:4000/custom/add";
            const opt = {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const reponseData = await res.json();
            alert(
                "Đã gửi yêu cầu sản phẩm chúng tôi sẽ liên hệ lại sau",
                reponseData
            );
        } catch (error) {
            console.error("Lỗi khi gửi form: ", error);
        }
    };
    
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        cloudinaryUpload(uploadData)
            .then((res) => {
                form.setValue("image", res.secure_url);
            })
            .catch((err) => console.error(err));
    };
    const loai = [
        { value: "Ví", label: "Ví" },
        { value: "Túi xách", label: "Túi xách" },
        { value: "Túi du lịch", label: "Túi du lịch" },
        { value: "Thắt lưng", label: "Thắt lưng" },
        { value: "Balo", label: "Balo" },
      ]
      const color = [
        { value: "Màu đen", label: "Màu đen" },
        { value: "Màu nâu", label: "Màu nâu" },
        { value: "Màu nâu bò", label: "Màu nâu bò" },
        { value: "Màu lợt", label: "Màu lợt" },
      ]
      const customStyles = {
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "rgba(231, 231, 231, 0.2)",
          borderRadius: "10px",
          border: '1px solid #7b88a8',
          height: "52px",
          color: "black"
        })}
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
                Dịch vụ thiết kế đồ da cá nhân hóa của chúng tôi tạo ra
                 sản phẩm độc đáo, phản ánh phong cách và nhu cầu riêng
                  của bạn. Từ ví, túi xách đến phụ kiện, mỗi sản phẩm được
                   chăm chút từng chi tiết. Bạn có thể tham gia vào quá trình
                    thiết kế, từ chọn da, màu sắc đến chi tiết cá nhân hóa. 
                    Đội ngũ thiết kế và thợ thủ công kỳ công cam kết mang lại
                     sản phẩm tinh tế, 
                chất lượng và đảm bảo sự hài lòng tuyệt đối.
                 Hãy để chúng tôi tạo nên những tác phẩm độc đáo, 
                 phản ánh phong cách và cá tính của bạn.
                </p>
                <div className="contact-center">
                    <form
                        method="post"
                        action=""
                        class="contact-form"
                        onSubmit={handleSubmit(handleSubmitForm)}
                    >
                        <div className="contact-form-gid">
                            <div className="contact-form-gid-item">
                                <input
                                    class="name"
                                    type="text"
                                    id=""
                                    placeholder="Tên"
                                    {...register("name")}
                                />
                                <p className="err">{errors.name?.message}</p>
                            </div>
                            <div className="contact-form-gid-item">
                            <Select className="select" options={loai} placeholder="Loại sản phẩm" styles={customStyles} {...register("loai")}></Select>
                                <p className="err">{errors.loai?.message}</p>
                            </div>
                            <div className="contact-form-gid-item">
                            <Select className="select" placeholder="Màu da" styles={customStyles} options={color} {...register("color")}>
                                   
                                </Select>
                                <p className="err">{errors.color?.message}</p>
                            </div>
                            <div className="contact-form-gid-item">
                                <input
                                    class="email"
                                    type="file"
                                    id="avatar"
                                    placeholder="Hình mẫu"
                                    {...register("image")}
                                    onChange={(e) => handleFileUpload(e)}
                                />
                                <p className="err">{errors.image?.message}</p>
                            </div>
                            <div className="contact-form-gid-item">
                                <input
                                    class="subject"
                                    type="text"
                                    id=""
                                    placeholder="email"
                                    {...register("email")}
                                />
                                <p className="err">{errors.email?.message}</p>
                            </div>
                            <div className="contact-form-gid-item">
                                <input
                                    class="phone"
                                    type="phone"
                                    id=""
                                    placeholder="Số điện thoại"
                                    {...register("phone")}
                                />
                                <p className="err">{errors.phone?.message}</p>
                            </div>
                        </div>
                        <textarea
                            class="message"
                            type="text"
                            id=""
                            placeholder="mỗ tả chi tiết"
                            rows="7"
                            {...register("description")}
                        ></textarea>
                        <p className="err">{errors.description?.message}</p>
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
                                <p>daleather.2024@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
