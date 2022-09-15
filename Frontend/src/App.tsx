import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Store from './Pages/Stores';
import Category from './Pages/Category';
import Product from './Pages/Product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Store />}/>
        <Route path='/' element={<Product/>}/>
      </Routes>
    </Router>
  );
}

export default App;
