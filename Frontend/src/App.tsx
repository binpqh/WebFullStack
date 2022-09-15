import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LayoutCategory from "./Layouts/LayoutCategory";
import LayoutProduct from "./Layouts/LayoutProduct";
import Category from "./Pages/Category";
import Product from "./Pages/Product";
import AddProduct from "./Pages/Product/AddProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutProduct />}>
          <Route index element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
        </Route>

        <Route path="/category" element={<LayoutCategory />}>
          <Route index element={<Category />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
