import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Maincontainer from './Pages/Maincontainer';
import ProductDef from './Pages/ProductDef';
import {Navbar} from './Components/Navbar';
import {Data} from './Data';
import ProductsSearch from './Components/ProductsSearch';

function App() {
  const [search, setsearch] = useState('');
  const [price, selectedprice] = useState('');
  const [version, selectedversion] = useState('');
  const [category, selectedcategory] = useState('');
  console.log(price);
  console.log(version);
  console.log(category);
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
              Pricefilter={(event) => {
                selectedprice(event.target.value);
              }}
              Versionfilter={(event) => {
                selectedversion(event.target.value);
              }}
              Categoryfilter={(event) => {
                selectedcategory(event.target.value);
              }}
              data={Data.Contents.filter((vals) => {
                if (search !== '') {
                  console.log(vals.categorie);
                  return search.includes(vals.head.toLowerCase());
                } else if (vals.versions.includes(version)) {
                  return version.includes(vals.versions);
                } else if (vals.categorie.includes(category)) {
                  return category.includes(vals.categorie);
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
