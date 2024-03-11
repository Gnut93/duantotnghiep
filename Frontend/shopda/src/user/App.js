import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Products from './Components/Products/Products';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import ShowCar from './Components/ShowCart/ShowCart';
import Contact from './Components/Contact/Contact';
import Checkout from './Components/Checkout/Checkout';
function App() {
  return (
    <div className="wapper">
      <Header></Header>
      <ScrollToTop></ScrollToTop>
      <main className="main">
        <Routes>
          <Route
            path="/"
            exact
            element={<Home />}
          />
          <Route
            path="/shop"
            exact
            element={<Shop />}
          />
          <Route
            path="/cate/:id_cate"
            exact
            element={<Products />}
          />
          <Route
            path="/showcart"
            exact
            element={<ShowCar />}
          />
          <Route
            path="/product/:id_pd"
            exact
            element={<ProductDetail />}
          />
          <Route
            path="/contact"
            exact
            element={<Contact />}
          />
          <Route
            path="/checkout"
            exact
            element={<Checkout />}
          />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
