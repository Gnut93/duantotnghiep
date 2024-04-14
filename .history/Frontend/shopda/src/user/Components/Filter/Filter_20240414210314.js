import React, { useState } from "react";

const Filter = () => {
  const [sortOption, setSortOption] = useState("default");
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  const sortedSP = [...sp];
  if (sortOption === "date") {
    sortedSP.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortOption === "price") {
    sortedSP.sort((a, b) => a.price_sale - b.price_sale);
  } else if (sortOption === "views") {
    sortedSP.sort((a, b) => b.views - a.views);
  }
  
  return (
    <div className="filter">
      <div className="filter-size">
        Tìm kiếm theo:
        <select onChange={handleSortChange}>
          <option value="default">Mặc định</option>
          <option value="date">Ngày tháng</option>
          <option value="price">Giá</option>
          <option value="views">Lượt xem</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
