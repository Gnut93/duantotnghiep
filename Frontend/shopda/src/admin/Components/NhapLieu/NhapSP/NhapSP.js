import React, { useState, useEffect } from "react";

const NhapSP = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        price_sale: "",
        image: "",
        quantity: "",
        id_cate: 0,
    });

    const handleChange = (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        if (name === "id_cate") {
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

    const handleSubmitSanPham = async () => {
        try {
            const url = "http://localhost:4000/admin-products/add-product";
            const opt = {
                method: "post",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            };
            const res = await fetch(url, opt);
            const data = await res.json();
            alert("Đã thêm sản phẩm,", data);
            console.log(data);
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm: ", error);
        }
        console.log(form);
    };

    const [listLoai, setListLoai] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/category/list")
            .then((res) => res.json())
            .then(setListLoai);
    }, []);

    return (
        <div className="checkout-address">
            <h3 className="checkout-address-title">
                <span>Thêm sản phẩm</span>
            </h3>
            <div className="checkout-address-box">
                <form className="product">
                    <div className="checkout-address-list">
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Tên sản phẩm</label> <br />
                                <input
                                    type="text"
                                    placeholder="Tên Sản Phẩm"
                                    name="name"
                                    id="laptop-name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="checkout-address-input">
                                <label>Giá gốc</label> <br />
                                <input
                                    type="number"
                                    placeholder="VNĐ"
                                    name="price"
                                    id="laptop-gia"
                                    value={form.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="checkout-address-input">
                                <label>Giá khuyến mãi</label> <br />
                                <input
                                    type="number"
                                    placeholder="VNĐ"
                                    name="price_sale"
                                    id="laptop-km"
                                    value={form.price_sale}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="checkout-address-input">
                                <label>Loại Hàng</label> <br />
                                <select
                                    name="id_cate"
                                    className="option-cate"
                                    value={form.id_cate}
                                    onChange={handleChange}
                                >
                                    {listLoai.map((loai, i) => (
                                        <option key={i} value={loai.id_cate}>
                                            {loai.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="checkout-address-item">
                            <div className="checkout-address-input">
                                <label>Số lượng</label> <br />
                                <input
                                    type="text"
                                    placeholder="10"
                                    name="quantity"
                                    id="laptop-ram"
                                    value={form.quantity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="checkout-address-input">
                                <label>Hình Ảnh</label> <br />
                                <input
                                    type="text"
                                    name="image"
                                    id="avatar"
                                    accept="image/*"
                                    value={form.image}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="checkout-address-input">
                                <label>Mô tả</label> <br />
                                <textarea
                                    class="message"
                                    type="text"
                                    name="description"
                                    id=""
                                    placeholder="Message..."
                                    rows="7"
                                    value={form.des}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="checkout-address-input">
                                <input
                                    type="button"
                                    value="Thêm"
                                    className="submit"
                                    name="insert"
                                    onClick={() => handleSubmitSanPham()}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NhapSP;
