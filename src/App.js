import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductDef from './Pages/ProductDef';
import { Navbar } from './Components/Navbar';

function App() {
  return (
    <div className='App'>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Products' element={<ProductDef />} />
      </Routes>
    </div>
  );
}

export default App;
