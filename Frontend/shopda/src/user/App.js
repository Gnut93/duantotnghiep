import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Collection from './Components/Collection/Collection';
function App() {
  return (
    <div className="wapper">
      <Header></Header>
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
            path="/collection"
            exact
            element={<Collection />}
          />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
