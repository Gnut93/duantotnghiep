import React, { useState, useEffect } from "react";

const NhapHinh = () => {
    const [form, setForm] = useState({
        name: "",
        id_pd: 0,
    });

    const handleChange = (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        if (name === "id_pd") {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: parseInt(value),
            }));
            return;
        }
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmitHinh = async () => {
        try {
            const url = "http://localhost:4000/admin-products/add-image";
            const opt = {
                method: "post",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const data = await res.json();
            alert("Đã thêm hình Thành Công,", data);
        } catch (error) {
            console.error("Lỗi khi thêm hình sản phẩm: ", error);
        }
    };

    const [listSanPham, setListSanPham] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/products/list")
            .then((res) => res.json())
            .then(setListSanPham);
    }, []);

    return (
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Thêm Hình Ảnh Chi Tiết</span>
            </h3>
            <div className="checkout-address-box">
                <form className="category" autocomplete="off">
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Link Hình</label> <br />
                                <input
                                    type="text"
                                    name="name"
                                    id="avatar"
                                    accept="image/*"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                <p className="err"></p>
                            </div>
                            <div className="checkout-address-input">
                                <label>Mã Sản phẩm</label> <br />
                                <select
                                    name="id_pd"
                                    className="option-cate"
                                    value={form.id_pd}
                                    onChange={handleChange}
                                >
                                    {listSanPham.map((sp, i) => (
                                        <option key={i} value={sp.id_pd}>
                                            {sp.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="checkout-address-input">
                                <button
                                    type="button"
                                    className="submit"
                                    onClick={handleSubmitHinh}
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

export default NhapHinh;
