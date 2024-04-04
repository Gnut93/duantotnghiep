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
import Search from './Components/Search/Search';
import About from './Components/About/About';
import Blog from './Components/Blog/Blog';
import BlogDetails from './Components/BlogsDetails/BlogsDetails';
import FollowOrder from './Components/FollowOrder/FollowOrder';
import InforUser from './Components/InforUser/InforUser';
import Policy from './Components/Policy/Policy';
import Questions from './Components/Questions/Questions';
import Trans from './Components/Policy-trans/Policy-trans';
import ChangeGoods from './Components/Change-goods/Change-goods';
import ShopGuide from './Components/Shopping-guide/Shopping-guide';
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
            path="/search"
            exact
            element={<Search />}
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
            path="/about"
            exact
            element={<About />}
          />
          <Route
            path="/blogs"
            exact
            element={<Blog />}
          />
          
          <Route
            path="/checkout"
            exact
            element={<Checkout />}
          />
          <Route
            path="/follow-order"
            exact
            element={<FollowOrder />}
          />
          <Route
            path="/info-user"
            exact
            element={<InforUser />}
          />
            <Route
            path="/policy"
            exact
            element={<Policy />}
            
          /> 
           <Route
          path="/quest"
          exact
          element={<Questions />}
          
        />
         <Route
          path="/trans"
          exact
          element={<Trans />}
          
        />
        <Route
          path="/shopguide"
          exact
          element={<ShopGuide />}
          
        />
        <Route
          path="/changegoods"
          exact
          element={<ChangeGoods />}
          
        />
        </Routes>
        
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
