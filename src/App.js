import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Maincontainer from './Pages/Maincontainer';
import ProductDef from './Pages/ProductDef';
import {Navbar} from './Components/Navbar';
import {Data} from './Data';
import ProductsSearch from './Components/ProductsSearch';

function App() {
  const [search, setsearch] = useState('');
  console.log(search);
  return (
    <div className='App'>
      <Navbar />
      <ProductsSearch
        Searchfunc={(event) => {
          setsearch(event.target.value);
        }}
      />
      <Routes>
        <Route
          path='/Home'
          element={
            <Maincontainer
              data={Data.Contents.filter((vals) => {
                if (search === '') {
                  return vals;
                } else if (search !== '') {
                  return search.includes(vals.head.toLowerCase());
                } else {
                  console.log('Oops...!');
                }
              })}
            />
          }
        />
        <Route path='/Products' element={<ProductDef />} />
      </Routes>
    </div>
  );
}

export default App;
