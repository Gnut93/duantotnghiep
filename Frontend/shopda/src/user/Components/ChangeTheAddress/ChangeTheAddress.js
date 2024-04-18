import React from "react";
import Navbar from "../Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    address: yup.string().trim().required("Không được bỏ trống"),
    newaddress: yup.string().trim().required("Không được bỏ trống"),
});
const ChangeTheAddress = () => {
    const navigate = useNavigate();
    let { id } = useParams();

    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/bill/detail/${id}`
            );
            const data = await reponse.json();
            return {
                address: data.address,
            };
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, formState, control } = form;
    const { errors, isSubmitSuccessful } = formState;

    const handleChangeTheAddress = async (data) => {
        try {
            const confirmation = window.confirm(
                "Bạn có chắc chắn muốn cập nhật địa chỉ giao hàng mới?"
            );
            if (!confirmation) {
                return;
            }
            const url = `http://localhost:4000/bill/set-address/${id}`;
            const opt = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert("Đã cập nhật địa chỉ giao hàng thành công,", responseData);

            // if () {
            navigate("/follow-order-user");
            // } else {
            //     navigate("/follow-order");
            // }
        } catch (error) {
            console.error("Lỗi khi Sửa Trạng Thái: ", error);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);
    return (
        <section className="infoUser">
            <Navbar />
            <div className="container">
                <h1 className="infoUer-heading">Địa Chỉ Đơn Hàng</h1>
                <div className="infoUser-wrapper">
                    <div className="infoUser-image"></div>
                    <div className="infoUser-content">
                        <form
                            onSubmit={handleSubmit(handleChangeTheAddress)}
                            noValidate
                        >
                            <h3 className="infoUser-title">Thay đổi Địa Chỉ</h3>
                            <div className="infoUser-list">
                                <div className="infoUser-item">
                                    <label className="infoUser-text">
                                        Địa Chỉ Cũ
                                    </label>
                                    <input
                                        placeholder="Địa Chỉ Cũ"
                                        type="email"
                                        readOnly
                                        {...register("address")}
                                    />
                                    <p className="err">
                                        {errors.address?.message}
                                    </p>
                                </div>
                                <div className="infoUser-item">
                                    <label className="infoUser-text">
                                        Địa Chỉ Mới
                                    </label>
                                    <input
                                        placeholder="Địa Chỉ Mới"
                                        type="text"
                                        {...register("newaddress")}
                                    />
                                    <p className="err">
                                        {errors.newaddress?.message}
                                    </p>
                                </div>
                            </div>
                            <button className="infoUser-button" type="submit">
                                Thay đổi
                            </button>
                        </form>
                        <DevTool control={control} />
                    </div>
                    <div className="infoUser-packlink"></div>
                </div>
            </div>
        </section>
    );
};

export default ChangeTheAddress;
