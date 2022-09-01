import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Maincontainer from './Pages/Maincontainer';
import ProductDef from './Pages/ProductDef';
import {Navbar} from './Components/Navbar';
import ProductsSearch from './Components/ProductsSearch';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <ProductsSearch />
      <Routes>
        <Route path='/Home' element={<Maincontainer />} />
        <Route path='/Products' element={<ProductDef />} />
      </Routes>
    </div>
  );
}

export default App;
