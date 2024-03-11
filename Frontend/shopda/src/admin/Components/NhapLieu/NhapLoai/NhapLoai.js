import React, { useState } from "react";

const NhapLoai = () => {
    const [form, setForm] = useState({
        name: "",
    });

    const handleChange = (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmitLoai = async () => {
        try {
            const url = "http://localhost:4000/admin-category/add";
            const opt = {
                method: "post",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const data = await res.json();
            alert("Đã thêm Loại Thành Công,", data);
        } catch (error) {
            console.error("Lỗi khi thêm Loại: ", error);
        }
    };

    return (
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Thêm loại</span>
            </h3>
            <div className="checkout-address-box">
                <form className="category" autocomplete="off">
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Tên loại</label> <br />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                <p className="err"></p>
                            </div>
                            <div className="checkout-address-input">
                                <button
                                    type="button"
                                    className="submit"
                                    onClick={handleSubmitLoai}
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NhapLoai;
