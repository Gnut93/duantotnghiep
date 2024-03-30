import React from "react";
import "../Edit.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
const schema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Không được bỏ trống")
        .min(2, "Tên loại hàng có tối thiểu 2 ký tự")
        .max(20, "Tên loại hàng có tối đa 20 ký tự"),
});

const EditRole = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: async () => {
            const reponse = await fetch(
                `http://localhost:4000/users/role/${id}`
            );
            const data = await reponse.json();
            console.log(data);
            return {
                name: data.role,
            };
        },
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, reset, control } = form;

    const listRole = [{ role: "admin" }, { role: "Người Dùng" }];
    const handleSubmitRole = async (data) => {
        try {
            const confirmation = window.confirm(
                "Bạn có chắc chắn muốn phần quyền này?"
            );
            if (!confirmation) {
                return;
            }
            const url = `http://localhost:4000/users/set-role/${id}`;
            const opt = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const responseData = await res.json();
            alert(" Phân quyền thành công Thành Công,", responseData);
            navigate("/admin/nguoidung");
        } catch (error) {
            console.error("Lỗi khi phân quyền: ", error);
        }
    };

    return (
        <section className="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Sửa</h1>
                    </div>
                </div>
                <div className="tab-additional active" data-tab="1">
                    <div className="checkout-address">
                        <h3 className="checkout-address-title">
                            <span>Phân Quyền</span>
                        </h3>
                        <div className="checkout-address-box">
                            <form
                                className="category"
                                autocomplete="off"
                                onSubmit={handleSubmit(handleSubmitRole)}
                                noValidate
                            >
                                <div className="checkout-address-list">
                                    <div className="checkout-address-item">
                                        <div className="checkout-address-input">
                                            <label>Trạng Thái</label> <br />
                                            <select
                                                className="option-cate"
                                                {...register("name")}
                                            >
                                                {listRole.map((role, i) => (
                                                    <option
                                                        key={i}
                                                        value={role.status}
                                                    >
                                                        {role.status}
                                                    </option>
                                                ))}
                                            </select>
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

export default EditRole;
