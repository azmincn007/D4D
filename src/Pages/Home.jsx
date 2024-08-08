import React, { useState, useContext, useEffect } from "react";
import { NavbarComponent } from "./Navbar/Navbar";
import Categorytab from "../Components/Home/Categorytab";
import Shopswiper from "../Components/Home/Shopswiper";
import Homecontainer from "../Components/Home/Homecontainer";
import NationalityModal from "../Components/modal/NationalityModal";
import { Countrycontext, LanguageContext, LoginContext, RegionContext, SelectionContext, OfferContext, NationalityContext } from "../App";
import RegionModal from "../Components/modal/RegionModal";
import LanguageModal from "../Components/modal/LanguageModal";
import MarqueeComponent from "../Components/Home/Marquee";
import { useQuery } from 'react-query';
import { API_BASE_URL } from '../config/config';

const fetchNationalities = async () => {
  const response = await fetch(`${API_BASE_URL}/api/countries`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function Home() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showNationalityModal, setShowNationalityModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [swiperData, setSwiperData] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [resetToAllOffers, setResetToAllOffers] = useState(false);

  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  const [Nationalities, setNationalities] = useContext(NationalityContext);
  const [selectedValue] = useContext(SelectionContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { setSelectedOfferId } = useContext(OfferContext);

  // Fetch Nationalities
  const { data: nationalities, isLoading, isError } = useQuery('nationalities', fetchNationalities, {
    onSuccess: (data) => {
      setNationalities(data.data.countries);
    },
  });

  useEffect(() => {
    if (!selectedLanguage) {
      setShowLanguageModal(true);
    }
  }, [selectedLanguage]);

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
  }, [selectedRegion]);

  const handleLanguageSelection = (selectedLanguage) => {
    console.log("Selected language:", selectedLanguage);
    setSelectedLanguage(selectedLanguage);
  };

  const handleNationalitySelection = (selectedCountry) => {
    console.log("Selected Country:", selectedCountry);
    setSelectedCountry(selectedCountry);
  };

  const handleRegionSelection = (selectedRegion) => {
    console.log("Selected Region:", selectedRegion);
    setSelectedRegion(selectedRegion);
  };

  const handleDataFetched = (data) => {
    setSwiperData(data);
  };

  useEffect(() => {
    const checkUserToken = () => {
      const token = localStorage.getItem('usertoken');
      setIsLoggedIn(!!token);
    };

    checkUserToken();

    const handleTokenUpdate = () => checkUserToken();
    window.addEventListener('tokenUpdated', handleTokenUpdate);
    window.addEventListener('storage', checkUserToken);

    return () => {
      window.removeEventListener('tokenUpdated', handleTokenUpdate);
      window.removeEventListener('storage', checkUserToken);
    };
  }, [setIsLoggedIn]);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setSelectedOfferId(1);
      setResetToAllOffers(prev => !prev);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div>
      <LanguageModal isOpen={showLanguageModal} onClose={() => setShowLanguageModal(false)} onSelect={handleLanguageSelection} />
      <NationalityModal isOpen={showNationalityModal} onClose={() => setShowNationalityModal(false)} onSelect={handleNationalitySelection} />
      <RegionModal isOpen={showRegionModal} onClose={() => setShowRegionModal(false)} onSelect={handleRegionSelection} />
      <div className="navbarhome">
        <NavbarComponent onFavoriteClick={toggleFavorites} />
      </div>
      <div className="categorytab">
        <Categorytab resetToAllOffers={resetToAllOffers} />
      </div>
      <MarqueeComponent />
      <Shopswiper data={swiperData} Type={selectedValue} />
      <div className="homecontainerdiv">
        <Homecontainer 
          onDataFetched={handleDataFetched} 
          showFavorites={showFavorites} 
          setShowFavorites={setShowFavorites}
          setResetToAllOffers={setResetToAllOffers}
        />
      </div>
    </div>
  );
}

export default Home;
