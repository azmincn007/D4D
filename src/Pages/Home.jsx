import React, { useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { NavbarComponent } from "./Navbar/Navbar";
import Categorytab from "../Components/Home/Categorytab";
import Shopswiper from "../Components/Home/Shopswiper";
import Homecontainer from "../Components/Home/Homecontainer";
import NationalityModal from "../Components/modal/NationalityModal";
import RegionModal from "../Components/modal/RegionModal";
import LanguageModal from "../Components/modal/LanguageModal";
import MarqueeComponent from "../Components/Home/Marquee";
import { API_BASE_URL } from '../config/config';
import { Countrycontext, LanguageContext, LoginContext, RegionContext, SelectionContext, OfferContext, NationalityContext, FavCountContext, showFavmodal } from "../App";
import Loading from "../api/Loading";
import { useNavigate } from "react-router-dom";
import FavoriteModal from "../Components/modal/Favouratemodal";

const fetchNationalities = async () => {
  const response = await fetch(`${API_BASE_URL}/api/countries`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchRegions = async (countryId) => {
  const response = await fetch(`${API_BASE_URL}/api/regions/${countryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch regions');
  }
  const data = await response.json();
  console.log(data);
  return data;
};

function Home() {
  console.log("hi");
  
  const [showFavoriteModal, setShowFavoriteModal] = useContext(showFavmodal);

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

  const [regions, setRegions] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const navigate = useNavigate();
  const [FavCount, SetFavCount] = useContext(FavCountContext);

  const queryClient = useQueryClient();

  const { data: nationalities, isLoading: nationalitiesLoading, isError: nationalitiesError } = useQuery(
    'nationalities', 
    fetchNationalities, 
    {
      onSuccess: (data) => {
        setNationalities(data.data.countries);
      },
    }
  );

  const { data: regionsData, isLoading: regionsLoading, isError: regionsError } = useQuery(
    ['regions', selectedCountry?.id], 
    () => selectedCountry ? fetchRegions(selectedCountry.id) : null, 
    {
      enabled: !!selectedCountry,
      onSuccess: (data) => {
        setRegions(data.data.regions);
      },
    }
  );

  useEffect(() => {
    if (selectedCountry) {
      queryClient.invalidateQueries(['regions', selectedCountry.id]);
    }
  }, [selectedCountry, queryClient]);

  useEffect(() => {
    if (selectedCountry && selectedCountry.currency_symbol) {
      setCurrencySymbol(selectedCountry.currency_symbol);
      localStorage.setItem('currencySymbol', selectedCountry.currency_symbol);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('userLanguageSelected');
    const storedCountry = localStorage.getItem('userCountrySelected');
    const storedRegion = localStorage.getItem('userRegionSelected');

    console.log('Stored Country:', storedCountry);
    console.log('Stored Region:', storedRegion);

    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    } else {
      setShowLanguageModal(true);
    }

    if (storedCountry) {
      const parsedCountry = JSON.parse(storedCountry);
      setSelectedCountry(parsedCountry);
      console.log('Parsed Country:', parsedCountry);
    }

    if (storedRegion) {
      const parsedRegion = JSON.parse(storedRegion);
      setSelectedRegion(parsedRegion);
      console.log('Parsed Region:', parsedRegion);
    }
  }, [setSelectedLanguage, setSelectedCountry, setSelectedRegion]);

  useEffect(() => {
    if (selectedLanguage) {
      setShowLanguageModal(false);
      if (!selectedCountry) {
        setShowNationalityModal(true);
      }
    }
  }, [selectedLanguage, selectedCountry]);

  useEffect(() => {
    console.log('Selected Country:', selectedCountry);
    console.log('Selected Region:', selectedRegion);
  }, [selectedCountry, selectedRegion]);

  useEffect(() => {
    if (selectedCountry) {
      setShowNationalityModal(false);
      if (!selectedRegion) {
        setShowRegionModal(true);
      }
    }
  }, [selectedCountry, selectedRegion]);

  useEffect(() => {
    if (selectedRegion) {
      setShowRegionModal(false);
    }
  }, [selectedRegion]);

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
  };

  const handleNationalitySelection = (country) => {
    setSelectedCountry(country);
  };

  const handleRegionSelection = (region) => {
    setSelectedRegion(region);
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

  return (
    <div>
      <FavoriteModal
        isOpen={showFavoriteModal}
        onClose={() => {
          setShowFavoriteModal(false);
        }}
        onSubmit={() => {
          setShowFavoriteModal(false);
          navigate('/');
        }}
      />

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
        regions={regions}
      />
    
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