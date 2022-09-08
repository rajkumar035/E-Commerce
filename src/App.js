import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Maincontainer from './Pages/Maincontainer';
import ProductDef from './Pages/ProductDef';
import {Navbar} from './Components/Navbar';
import {Data} from './Data';
import ProductsSearch from './Components/ProductsSearch';
import Contacts from './Components/Contacts';

function App() {
  const [search, setsearch] = useState('');
  const [version, selectedversion] = useState('');
  const [category, selectedcategory] = useState('');
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
              Versionfilter={(event) => {
                selectedversion(event.target.value);
              }}
              Categoryfilter={(event) => {
                selectedcategory(event.target.value);
              }}
              data={Data.Contents.filter((vals) => {
                if (search === '' && version === '' && category === '') {
                  return vals;
                }
                if (search !== '') {
                  console.log(vals.categorie);
                  return search.includes(vals.head.toLowerCase());
                }
                if (vals.versions.includes(version)) {
                  return version.includes(vals.versions);
                }
                if (vals.categorie.includes(category)) {
                  return category.includes(vals.categorie);
                }
              })}
            />
          }
        />
        <Route path='/Products' element={<ProductDef />} />
      </Routes>
      <Contacts />
    </div>
  );
}

export default App;
