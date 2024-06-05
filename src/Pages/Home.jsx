import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from './Navbar/Navbar';
import Categorytab from '../Components/Home/Categorytab';
import Shopswiper from '../Components/Home/Shopswiper';
import Homecontainer from '../Components/Home/Homecontainer';
import NationalityModal from '../Components/modal/NationalityModal';
import { Countrycontext } from '../App';
import MaxWidthWrapper from '../Components/Maxwidth';

function Home() {
  const [nationality, selectNationality] = useState(true);
  const [selectedCountry] = useContext(Countrycontext);
  const [selectedValue, setSelectedValue] = useState('Shops');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCountry) {
      selectNationality(false);
    }
  }, [selectedCountry]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleShopswiperCardClick = () => {
    navigate('/resto');
  };

  return (
    <div>
      <NationalityModal isOpen={nationality} onClose={() => selectNationality(false)} />
      <div className="navbarhome"><NavbarComponent /></div>
      <div className="categorytab"><Categorytab /></div>
      <div className="shopswiper">
        <Shopswiper onCardClick={handleShopswiperCardClick} />
      </div>
      <div className="homecontainerdiv">
        <Homecontainer onValueChange={handleValueChange} />
      </div>
    </div>
  );
}

export default Home;
