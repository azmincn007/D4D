import React, { useState, useContext, useEffect } from 'react';
import {  NavbarComponent } from './Navbar/Navbar';
import Categorytab from '../Components/Home/Categorytab';
import Shopswiper from '../Components/Home/Shopswiper';
import Homecontainer from '../Components/Home/Homecontainer';
import NationalityModal from '../Components/modal/NationalityModal';
import { Countrycontext } from '../App';

function Home() {
  const [nationality, selectNationality] = useState(true);
  const [selectedCountry] = useContext(Countrycontext);

  useEffect(() => {
    if (selectedCountry) {
      selectNationality(false);
    }
  }, [selectedCountry]);

  return (
    <div>
      <NationalityModal isOpen={nationality} onClose={() => selectNationality(false)} />
      <div className="navbarhome"><NavbarComponent /></div>
      <div className="categorytab"><Categorytab /></div>
      <div className="shopswiper"><Shopswiper /></div>
      <div className="homecontainerdiv"><Homecontainer /></div>
    </div>
  );
}

export default Home;
