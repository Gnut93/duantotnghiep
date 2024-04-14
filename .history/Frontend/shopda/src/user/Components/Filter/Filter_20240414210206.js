
import React, { useState } from "react";

const Filter = () => {
    const [sortOption, setSortOption] = useState("default");
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
      };
      

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
