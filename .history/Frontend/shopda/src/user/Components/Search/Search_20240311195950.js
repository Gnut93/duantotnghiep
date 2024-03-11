import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "../cartSlice";

import "./Search.css";
import "../Products/Products.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:4000/products/list")
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowResults(event.target.value !== "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredResults = searchResults.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
    setShowResults(true);
  };

  // Đưa việc cập nhật `searchResults` vào useEffect để nó được thực hiện mỗi khi `searchTerm` thay đổi
  useEffect(() => {
    const filteredResults = searchResults.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm]);

  return (
    <div className="search">
      <h4>Tìm kiếm sản phẩm của bạn....</h4>
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
