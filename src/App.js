import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductDef from './Pages/ProductDef';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Products' element={<ProductDef />} />
      </Routes>
    </div>
  );
}

export default App;
