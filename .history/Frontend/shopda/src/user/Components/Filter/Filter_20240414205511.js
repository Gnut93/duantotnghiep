const Filter.js = () => {
    return (
        <div className="filter">
        <div className="filter-result">Products</div>
        <div className="filter-sort">Order{" "}
            <select>
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
            </select>
        </div>
        <div className="filter-size">Filter{" "}
            <select>
            <option value="">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            </select>
        </div>
        </div>
    );
    };
    