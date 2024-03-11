import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "../cartSlice";

import "./Search.css";
import "../Products/Products.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Thêm state để kiểm soát việc hiển thị kết quả

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch danh sách sản phẩm từ API khi component được render
    fetch("http://localhost:4000/products/list")
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      });
  }, []);

  // Hàm xử lý khi người dùng thay đổi giá trị tìm kiếm
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // Nếu giá trị tìm kiếm không rỗng, hiển thị kết quả tìm kiếm
    if (event.target.value !== "") {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Hàm xử lý khi người dùng nhấn nút tìm kiếm
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lọc danh sách sản phẩm dựa trên giá trị tìm kiếm
    const filteredResults = searchResults.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Hiển thị danh sách sản phẩm phù hợp
    setSearchResults(filteredResults);
    setShowResults(true); // Hiển thị kết quả tìm kiếm
  };

  return (
    <div className="search">
        <h4>Tìm</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      {/* Hiển thị kết quả tìm kiếm chỉ khi showResults là true */}
      {showResults && (
        <div className="search-results">
          {searchResults.map((product, index) => (
            <div className="products-item" key={index}>
              <div className="products-main">
                <img
                  className="products-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="products-content">
                  <ul className="products-social">
                    <li className="products-social-item">
                      <Link
                        to={`/product/${product.id_pd}`}
                        className="products-social-link"
                      >
                        <i className="fas fa-search"></i>
                      </Link>
                    </li>
                    <li className="products-social-item">
                      <span
                        className="products-social-link cart"
                        onClick={() => dispatch(themSP(product))}
                      >
                        <i className="fas fa-cart-plus"></i>
                      </span>
                    </li>
                    <li className="products-social-item">
                      <span className="products-social-link">
                        <i className="fas fa-heart"></i>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="products-info">
                  <h4 className="products-name">{product.name}</h4>
                  <div className="products-price">
                    <span>
                      {parseInt(product.price_sale).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <del>
                      {parseInt(product.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </del>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
