import "./Navbar.css";
function Navbar() {
  return (
    <div>
      <div className="phone">
        <span>HOTLINE : 0901.379.586</span>
      </div>
      <nav>
        <div className="logo"></div>
        <div>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
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
