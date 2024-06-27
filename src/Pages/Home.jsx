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
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [showNationalityModal, setShowNationalityModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  
  const [selectedValue, setSelectedValue] = useState('Shops');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedLanguage) {
      setShowLanguageModal(false);
      setShowNationalityModal(true);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (selectedCountry) {
      setShowNationalityModal(false);
      setShowRegionModal(true);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedRegion) {
      setShowRegionModal(false);
    }
    setLoading(false);
  }, [selectedRegion]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleShopswiperCardClick = () => {
    navigate('/resto');
  };

  const handleLanguageSelection = (selectedLanguage) => {
    console.log('Selected language:', selectedLanguage);
    setSelectedLanguage(selectedLanguage);
  };

  const handleNationalitySelection = (selectedCountry) => {
    console.log('Selected Country:', selectedCountry);
    setSelectedCountry(selectedCountry);
  };

  const handleRegionSelection = (selectedRegion) => {
    console.log('Selected Region:', selectedRegion);
    setSelectedRegion(selectedRegion);
  };

  if (loading) {
    return null; // Or a loading spinner or some fallback UI
  }

  return (
    <div>
      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onSelect={handleLanguageSelection}
      />
      <NationalityModal
        isOpen={showNationalityModal}
        onClose={() => setShowNationalityModal(false)}
        onSelect={handleNationalitySelection}
      />
      <RegionModal
        isOpen={showRegionModal}
        onClose={() => setShowRegionModal(false)}
        onSelect={handleRegionSelection}
      />
      <div className="navbarhome">
        <NavbarComponent />
      </div>
      <div className="categorytab">
        <Categorytab />
      </div>
      <MarqueeComponent />
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