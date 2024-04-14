
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
        <select>
          <option value="M">Mặc định</option>
          <option value="">Ngày</option>
          <option value="XS">Giá</option>
          <option value="S">Lượt xem</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
