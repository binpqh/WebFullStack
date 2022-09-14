import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Category from './Pages/Category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Category/>}/>
      </Routes>
    </Router>
  );
}

export default App;
