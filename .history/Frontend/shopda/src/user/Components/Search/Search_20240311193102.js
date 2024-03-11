import React, { useState, useEffect } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
  };

  return (
    <div className="search">
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
      <div className="search-results">
        {searchResults.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.price} VNĐ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
