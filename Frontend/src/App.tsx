import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import LayoutDefault from "./Layouts/LayoutDefault";
import Product from "./Pages/Product";
import Category from "./Pages/Category";
import Store from "./Pages/Stores";
import Brand from "./Pages/Brand";
import Login from "./Pages/Auth/Login";
import { fetchBrands } from "./Features/Brand/BrandList/brandsSlice";
import { PrivateRoute } from "./Layouts/PrivateRoute";

function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="App">
      <Routes>
      <Route element={<PrivateRoute roles={["Admin"]} />}>
        <Route path="/" element={<LayoutDefault content="Product" />}>
          <Route index element={<Product />} />;
        </Route>
        <Route path="/category" element={<LayoutDefault content="Category" />}>
          <Route index element={<Category />} />;
        </Route>
        <Route path="/store" element={<LayoutDefault content="Store" />}>
          <Route index element={<Store />} />;
        </Route>
        <Route path="/brand" element={<LayoutDefault content="Brand" />}>
          <Route index element={<Brand />} />;
        </Route>

          {/* khúc này thêm 1 page k có quyền khi mà chưa login
         <Route path={'not-auth'} element={<NotAuth />} /> */}
=======
      <Route element={<PrivateRoute roles={["Admin"]} />}>
        <Route path="/" element={<LayoutDefault content="Product" />}>
          <Route index element={<Product />} />;
        </Route>
        <Route path="/category" element={<LayoutDefault content="Category" />}>
          <Route index element={<Category />} />;
        </Route>
        <Route path="/product" element={<LayoutDefault content="Product" />}>
          <Route index element={<Product />} />;
        </Route>
        
        <Route path="/brand" element={<LayoutDefault content="Brand" />}>
          <Route index element={<Brand />} />;
>>>>>>> e6fa731cc1f7280cf23625abb528def2490debbf
        </Route>

        <Route path="/login" element={<LayoutDefault content="Login" />}>
          <Route index element={<Login />} />;
        </Route>
      </Routes>
    </div>
  );
}

export default App;
