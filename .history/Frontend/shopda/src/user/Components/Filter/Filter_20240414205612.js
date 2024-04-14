const Filter = () => {
  return (
    <div className="filter">
      
      <div className="filter-size">
        Tìm kiếm theo:
        <select>
          <option value="">Ngày</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          
        </select>
      </div>
    </div>
  );
};

export default Filter;
