import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter basename="/">
      <div className="wapper">
        <Sidebar></Sidebar>
        <Navbar></Navbar>
        <main className="main">
          <Routes>
            <Route
              path="/"
              exact
              element={<Home />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
