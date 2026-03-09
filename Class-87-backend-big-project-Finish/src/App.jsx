//import { useState } from 'react'
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Marketplace from './pages/Marketplace';

import RootLayout from './layout/RootLayout';
import { Routes, Route } from "react-router";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/MarketPlace" element={<Marketplace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
