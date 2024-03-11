import React, { useState } from "react";

const NhapDiscout = () => {
    const [form, setForm] = useState({
        code: "",
        price: "",
        quantity: "",
        expiration_date: "",
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
    const handleSubmitDiscout = async () => {
        try {
            const url = "http://localhost:4000/admin-giftcode/add";
            const opt = {
                method: "post",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const data = await res.json();
            alert("Đã thêm Discout Thành Công,", data);
        } catch (error) {
            console.error("Lỗi khi thêm Discout: ", error);
        }
    };
    return (
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Thêm Mã giảm giá</span>
            </h3>
            <div className="checkout-address-box">
                <form className="category" autocomplete="off">
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Mã Code</label> <br />
                                <input
                                    type="text"
                                    name="code"
                                    id="avatar"
                                    accept="image/*"
                                    value={form.code}
                                    onChange={handleChange}
                                />
                                <p className="err"></p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Số lượng</label> <br />
                                <input
                                    type="text"
                                    name="quantity"
                                    id="avatar"
                                    accept="image/*"
                                    value={form.quantity}
                                    onChange={handleChange}
                                />
                                <p className="err"></p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Giá</label> <br />
                                <input
                                    type="text"
                                    name="price"
                                    id="avatar"
                                    accept="image/*"
                                    value={form.price}
                                    onChange={handleChange}
                                />
                                <p className="err"></p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Ngày hết hạn</label> <br />
                                <input
                                    type="date"
                                    name="expiration_date"
                                    id="avatar"
                                    accept="image/*"
                                    value={form.expiration_date}
                                    onChange={handleChange}
                                />
                                <p className="err"></p>
                            </div>
                            <div className="checkout-address-input">
                                <button
                                    type="button"
                                    className="submit"
                                    onClick={handleSubmitDiscout}
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

export default NhapDiscout;
