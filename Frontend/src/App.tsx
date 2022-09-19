import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Category from "./Pages/Category";
import Product from "./Pages/Product";
import Store from "./Pages/Stores";

function App() {
  return (
  
         <Routes>
         <Route path='/' element={<Store />}/>
        <Route path='/Category' element={<Category/>}/>
        <Route path='/product' element={<Product/>}/>
      </Routes>
    
  );
}

export default App;
