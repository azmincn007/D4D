import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from './Navbar/Navbar';
import Categorytab from '../Components/Home/Categorytab';
import Shopswiper from '../Components/Home/Shopswiper';
import Homecontainer from '../Components/Home/Homecontainer';
import NationalityModal from '../Components/modal/NationalityModal';
import { Countrycontext, LanguageContext, RegionContext } from '../App';
import MaxWidthWrapper from '../Components/Maxwidth';
import RegionModal from '../Components/modal/RegionModal';
import LanguageModal from '../Components/modal/LanguageModal';
import MarqueeComponent from '../Components/Home/Marquee';

function Home() {
  const [nationality, selectNationality] = useState(true);
  const [region, selectRegion] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedValue, setSelectedValue] = useState('Shops');
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);

  const navigate = useNavigate();
  const [nationalitySelected, setNationalitySelected] = useState(false);

  useEffect(() => {
    if (selectedCountry) {
      selectNationality(false);
      setNationalitySelected(true);
      selectRegion(true); // Open the RegionModal when the country is updated
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedRegion && selectedLanguage === '') {
      setShowLanguageModal(true);
    } else {
      setShowLanguageModal(false);
    }
  }, [selectedCountry, selectedRegion, selectedLanguage]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleShopswiperCardClick = () => {
    navigate('/resto');
  };

  const handleRegionSelection = (selectedRegion) => {
    console.log('Selected Region:', selectedRegion);
    setSelectedRegion(selectedRegion);
    selectRegion(false); // Close the RegionModal after selection
  };

  const handleLanguageSelection = (selectedLanguage) => {
    console.log('Selected language:', selectedLanguage);
    setSelectedLanguage(selectedLanguage);
    setShowLanguageModal(false); // Close the LanguageModal after selection
  };

  console.log(selectedLanguage);

  return (
    <div>
      <NationalityModal isOpen={nationality} onClose={() => selectNationality(false)} />
      <RegionModal
        isOpen={region && !selectedRegion}
        onClose={() => selectRegion(false)}
        onSelect={handleRegionSelection}
      />
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onSelect={handleLanguageSelection}
      />
      <div className="navbarhome">
        <NavbarComponent />
      </div>
      <div className="categorytab">
        <Categorytab />
      </div>
      <MarqueeComponent/>
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