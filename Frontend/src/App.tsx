import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import LayoutDefault from "./Layouts/LayoutDefault";
import Product from "./Pages/Product";
import Category from "./Pages/Category";
import Brand from "./Pages/Brand";
import { fetchBrands } from "./Features/Brand/BrandList/brandsSlice";

function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutDefault content="Product" />}>
          <Route index element={<Product />} />;
        </Route>
        <Route path="/category" element={<LayoutDefault content="Category" />}>
          <Route index element={<Category />} />;
        </Route>
        <Route path="/brand" element={<LayoutDefault content="Brand" />}>
          <Route index element={<Brand />} />;
        </Route>
        {/* <Route path='/' element={<Store />}/>
        <Route path='/' element={<Product/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
