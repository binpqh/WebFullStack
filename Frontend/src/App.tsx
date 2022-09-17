import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./Pages/Category";
import Product from "./Pages/Product";
import Store from "./Pages/Stores";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Category/>}/>
        <Route path='/store' element={<Store />}/>
        <Route path='/product' element={<Product/>}/>
      </Routes>
  </Router>
    
  );
}

export default App;
