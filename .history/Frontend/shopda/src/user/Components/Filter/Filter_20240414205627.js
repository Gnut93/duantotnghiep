const Filter = () => {
  return (
    <div className="filter">
      
      <div className="filter-size">
        Tìm kiếm theo:
        <select>
          <option value="">Ngày</option>
          <option value="XS">Giá</option>
          <option value="S">Lượt xem</option>
          <option value="M">Mặc định</option>
          
        </select>
      </div>
    </div>
  );
};

export default Filter;
