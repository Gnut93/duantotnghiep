const Filter = () => {
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
