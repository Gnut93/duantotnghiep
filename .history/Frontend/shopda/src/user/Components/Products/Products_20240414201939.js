import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import "./Products.css";
import { themSP } from "../cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

const Products = () => {
  let { id_cate } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);
  const [sp, setSP] = useState([]);
  const [loai, setLoai] = useState([]);
  const [colors, setColors] = useState({});
  const [selectedColorIds, setSelectedColorIds] = useState({});
  const [sortOption, setSortOption] = useState("default"); // Thêm trạng thái sortOption

  const selectColor = useCallback((productId, colorId) => {
    setSelectedColorIds((prev) => ({
      ...prev,
      [productId]: colorId,
    }));
  }, []);

  useEffect(() => {
    // Fetch dữ liệu sản phẩm và màu sắc
    fetch(`http://localhost:4000/products/list/category/${id_cate}`)
      .then((res) => res.json())
      .then((data) => {
        setSP(data);
        const initialColorIds = {};
        const colorPromises = data.map((product) =>
          fetch(
            `http://localhost:4000/products/product-detail/${product.id_pd}`
          )
            .then((res) => res.json())
            .then((colorData) => {
              setColors((prevColors) => ({
                ...prevColors,
                [product.id_pd]: colorData.map((color) => ({
                  ...color,
                  maxQuantity: color.quantity,
                })),
              }));
              if (colorData.length > 0) {
                initialColorIds[product.id_pd] = colorData[0].id_pd_detail;
              }
            })
        );

        Promise.all(colorPromises).then(() => {
          setSelectedColorIds(initialColorIds);
        });
      });

    // Fetch dữ liệu loại
    fetch(`http://localhost:4000/category/${id_cate}`)
      .then((res) => res.json())
      .then((data) => setLoai(data));
  }, [id_cate]);

  const handleAddToCart = (product) => {
    // Hàm xử lý thêm sản phẩm vào giỏ hàng
  };

  const user = useSelector((state) => state.auth.user);
  const checkLogin = useSelector((state) => state.auth.daDangNhap);
  const idUser = user ? user.id_user : null;

  const HandleOnClickFavorite = async (sp) => {
    // Hàm xử lý thêm sản phẩm vào danh sách yêu thích
  };

  const HandleOnCLickView = async (sp) => {
    // Hàm xử lý tăng lượt xem sản phẩm
  };

  // Hàm xử lý thay đổi tùy chọn sắp xếp
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Hàm hiển thị sản phẩm trong một trang
  function HienSPTrongMotTrang({ spTrongTrang }) {
    return (
      <div class="home-wrapper">
        <div>Tìm kiếm theo:</div>
        <select onChange={handleSortChange}> {/* Thêm sự kiện onChange */}
          <option value="default">Mặc định</option>
          <option value="date">Ngày tháng</option>
          <option value="price">Giá</option>
          <option value="views">Lượt xem</option>
        </select>
        <div class="home-product">
          {spTrongTrang.slice(0, 12).map((sp, i) => (
            <div class="products-item" key={i}>
              <div class="products-main">
                {/* Hiển thị sản phẩm */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Hàm phân trang
  function PhanTrang({ pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    let sortedSP = [...sp];

    // Thêm logic sắp xếp sản phẩm dựa trên sortOption
    switch (sortOption) {
        case "date":
            sortedSP.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case "price":
            sortedSP.sort((a, b) => a.price_sale - b.price_sale);
            break;
        case "views":
            sortedSP.sort((a, b) => b.views - a.views);
            break;
        default:
            break;
    }
    const spTrong1Trang = sortedSP.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(sortedSP.length / pageSize);
    const chuyenTrang = (event) => {
      const newIndex = (event.selected * pageSize) % sp.length;
      setfromIndex(newIndex);
    };

    return (
      <>
        <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
        <ReactPaginate
          nextLabel=">"
          previousLabel="<"
          pageCount={tongSoTrang}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={chuyenTrang}
          renderOnZeroPageCount={null}
          className="phantrang1"
          activeClassName="active"
        />
      </>
    );
  }

  return (
    <section class="product">
      <Navbar />
      <div class="container">
        <h2 class="product-heading">{loai.name}</h2>
        <PhanTrang pageSize={9} />
      </div>
    </section>
  );
};

export default Products;
