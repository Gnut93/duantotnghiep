import React from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { thoat } from "../../../authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
    oldPassword: yup.string().trim().required("Không được bỏ trống"),
    newPassword: yup.string().trim().required("Không được bỏ trống"),
    confirmpassword: yup
        .string()
        .required("Không được bỏ trống")
        .oneOf([yup.ref("newPassword"), null], "Mật khẩu không trùng khớp"),
    email: yup
        .string()
        .email('email có định dạng không hợp lệ')
        .trim()
        .required('Không được bỏ trống'),
});
const ResetPass = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            email: user?.email,
            oldPassword: "",
            newPassword: "",
            confirmpassword: "",
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;
    const handleChangeRessPassword = async (data) => {
        try {
            const response = await fetch(
                `http://localhost:4000/users/change-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            console.log(result);
        }catch (error) {
            console.error("Lỗi khi gửi form: ", error);
        }
    };
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const handleLogout = () => {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem("result");
        // Cập nhật Redux store
        dispatch(thoat());
        navigate("/");
    };

    return (
        <section className="infoUser">
            <Navbar />
            <div className="container">
                <h1 className="infoUer-heading">Thông tin cá nhân</h1>
                <div className="infoUser-wrapper">
                    <div className="infoUser-image">
                        <img src={user?.avatar} alt="avatar-user" />
                        <p className="infoUser-name">{user?.name}</p>
                        <p className="infoUser-info">{user?.phone}</p>
                        <p className="infoUser-info">{user?.email}</p>
                    </div>
                    <div className="infoUser-content">
                        <form
                            onSubmit={handleSubmit(handleChangeRessPassword)}
                            noValidate
                        >
                            <h3 className="infoUser-title">
                                Thay đổi mật khẩu
                            </h3>
                            <div className="infoUser-list">
                            <div className="infoUser-item">
                                    <label className="infoUser-text">
                                        Email
                                    </label>
                                    <input
                                        placeholder="Mật khẩu cũ"
                                        type="email"
                                        readOnly
                                        {...register("email")}
                                    />
                                    <p className="err">
                                        {errors.email?.message}
                                    </p>
                                </div>
                                <div className="infoUser-item">
                                    <label className="infoUser-text">
                                        Mật khẩu cũ
                                    </label>
                                    <input
                                        placeholder="Mật khẩu cũ"
                                        type="password"
                                        {...register("oldPassword")}
                                    />
                                    <p className="err">
                                        {errors.oldPassword?.message}
                                    </p>
                                </div>
                                <div className="infoUser-item">
                                    <label className="infoUser-text">
                                        Mật khẩu mới
                                    </label>
                                    <input
                                        placeholder="Mật khẩu mới"
                                        type="password"
                                        {...register("newPassword")}
                                    />
                                    <p className="err">
                                        {errors.newPassword?.message}
                                    </p>
                                </div>
                                <div className="infoUser-item">
                                    <label className="infoUser-text">
                                        Nhập lại mật khẩu mới
                                    </label>
                                    <input
                                        placeholder="Mật khẩu mới"
                                        type="password"
                                        {...register("confirmpassword")}
                                    />
                                    <p className="err">
                                        {errors.confirmpassword?.message}
                                    </p>
                                </div>
                            </div>
                            <button className="infoUser-button" type="submit">
                                Thay đổi
                            </button>
                        </form>
                        <DevTool control={control} />
                    </div>
                    <div className="infoUser-packlink">
                        <Link to="/info-user">
                            <p className="infoUser-link">Thông tin</p>
                        </Link>
                        <Link to="/favorite">
                            <p className="infoUser-link">Sản phẩm yêu thích</p>
                        </Link>
                        <Link to="/" onClick={handleLogout}>
                            <p className="infoUser-link">Đăng xuất</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPass;
