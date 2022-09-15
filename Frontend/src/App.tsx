import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Store from './Pages/Stores';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Store />}/>
      </Routes>
    </Router>
  );
}

export default App;
