import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import 
function App() {
  return (
    <BrowserRouter basename="/">
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
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
