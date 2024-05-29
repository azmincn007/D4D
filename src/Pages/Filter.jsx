import React, { useState, useContext, useEffect } from 'react';
import {  NavbarComponent } from '../Components/Navbar';
import Categorytab from '../Components/Home/Categorytab';
import Shopswiper from '../Components/Home/Shopswiper';
import { Countrycontext } from '../App';
import MobilefilterContainer from '../Components/Mobile/MobileFilterContainer';

function Filter() {
  const [nationality, selectNationality] = useState(true);
  const [selectedCountry] = useContext(Countrycontext);

  useEffect(() => {
    if (selectedCountry) {
      selectNationality(false);
    }
  }, [selectedCountry]);

  return (
    <div>
     
      <div className="navbarhome"><NavbarComponent /></div>
     
      <div className="filtercontainer"><MobilefilterContainer /></div>
    </div>
  );
}

export default Filter;
