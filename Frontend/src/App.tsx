
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutCategory from "./Layouts/LayoutCategory";
import LayoutProduct from "./Layouts/LayoutProduct";
import Category from "./Pages/Category";
import Product from "./Pages/Product";
import AddProduct from "./Pages/Product/AddProduct";
import UpdateProduct from "./Pages/Product/EditProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Store />}/>
        <Route path='/' element={<Product/>}/>
      </Routes>
    </div>
  );
}

export default App;
