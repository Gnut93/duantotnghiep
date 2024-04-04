import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Shopping-guide.css";
const ShopGuide = () => {
    return (
        <section className="sg">
            <Navbar></Navbar>
            <div className="container">
                <h2 className="sg-heading">Hướng dẫn mua hàng</h2>
                <div className="sg-list">
                    <div className="sg-item">
                        <div className="sg-content">
                            <p className="sg-desc">
                                {" "}
                                DA xin hướng dẫn cách mua hàng online tại
                                website. Mọi thắc mắc quý khách vui lòng liên hệ
                                số Hotline (+84) 901.379.586 để được tư vấn và
                                giải đáp.
                            </p>
                            <h4 className="sg-title-24">
                                BƯỚC 1: Truy cập vào website ... Bạn tìm Sản
                                Phẩm mong muốn tại mục SẢN PHẨM hoặc bạn tìm
                                bằng cách Search.
                            </h4>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225074984385511496/image.png?ex=661fcefd&is=660d59fd&hm=8b6c34698452c1dbfe82492baa2272bd4ad632ac1237b84be0c8ddeefc990310&"></img>
                            <h4 className="sg-title-24">
                                BƯỚC 2: Sau đó chọn danh mục sản phẩm và sản
                                phẩm bạn muốn mua{" "}
                            </h4>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225075262715072583/image.png?ex=661fcf3f&is=660d5a3f&hm=b46be902417e44d84ad3a02069034b909cc7ea2e50745cb8f6553f0261b8c8db&"></img>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225075776895062026/image.png?ex=661fcfba&is=660d5aba&hm=106e1d442001212cee457bf9a3cf07936cdee2cc121d291556b93ad1657550cc&"></img>
                            <h4 className="sg-title-24">
                                BƯỚC 3: Đầu tiên là chọn số lượng Sản Phẩm muốn
                                mua. Sau đó thêm vào giỏ hàng{" "}
                            </h4>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225076169737506910/image.png?ex=661fd017&is=660d5b17&hm=1874264bfb4af5f4d77264d9f1ec6fae7d3be43f2a1e4b65ae03650a03fc32a5&"></img>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225076380006613092/image.png?ex=661fd049&is=660d5b49&hm=9f221322589541f4d65e1874683d0ff39ccc675accdd56664a88ad6d2fcfdb09&"></img>
                            <h4 className="sg-title-24">
                                BƯỚC 4: Sau đó vào giỏ hàng để tiếp tục thanh
                                toán{" "}
                            </h4>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225076706151370813/image.png?ex=661fd097&is=660d5b97&hm=f260d33b96d944289d716f7057e21b6cb2a339fc6212fd9ebe74da989d4c5db2&"></img>
                            <h4 className="sg-title-24">
                                BƯỚC 5: Nhập thông tin giao hàng và phương thức
                                thanh toán{" "}
                            </h4>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225077818988298304/image.png?ex=661fd1a0&is=660d5ca0&hm=392e37bc807fccec4541b231199581a93a1072011ef697157721ce766b0dd171&"></img>
                            <h4 className="sg-title-24">
                                BƯỚC 6: Sau khi đặt hàng thành công. Khách hàng
                                có thể theo dõi đơn hàng ở mục THEO DÕI ĐƠN HÀNG{" "}
                            </h4>
                            <img src="https://cdn.discordapp.com/attachments/1225074934846460022/1225080767374164018/image.png?ex=661fd45f&is=660d5f5f&hm=d08f86e941bc268e0e8660d6ddea29e57db37e82279e450b6912818ed095f171&"></img>
                        </div>
                        <div className="sg-content">
                            <hr></hr>
                            <h5 className="sg-font-18">Bài viết xem thêm</h5>
                            <ul className="sg-ul">
                                <li>
                                    <Link to="/sg" className="sg-color-black">
                                        ● Chính Sách Đổi Hàng Và Đổi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/changegoods"
                                        className="sg-color-black"
                                    >
                                        ● Hướng dẫn đổi trả hàng
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/trans"
                                        className="sg-color-black"
                                    >
                                        ● Chính sách vận chuyển
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/quest"
                                        className="sg-color-black"
                                    >
                                        ● Câu hỏi thường gặp
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ShopGuide;
