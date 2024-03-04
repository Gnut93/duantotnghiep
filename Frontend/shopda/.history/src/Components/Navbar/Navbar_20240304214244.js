import "./Navbar.css";
function Navbar() {
  return (
    <div>
      <div className="phone">
        <span>HOTLINE : 0901.379.586</span>
      </div>
      <nav>
        <div className="logo">
          <a>LOGO</a>
        </div>
        <div>
          <ul>
            <li>TRANG CHỦ</li>
            <li>SẢN PHẨM</li>
            <li>BỘ SƯU TẬP</li>
            <li>BLOGS</li>
            <li>KHUYẾN MÃI</li>
            <li>ORDER THEO SỞ THÍCH</li>
            <li>TIN TỨC</li>
          </ul>
        </div>
        <div className="icon">
          <i className="fas fa-search"></i>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
