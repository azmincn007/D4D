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

const NATIONALITIES_CACHE_KEY = 'nationalities';
const REGIONS_CACHE_KEY = 'regions';

const fetchNationalities = async () => {
  const cachedData = localStorage.getItem(NATIONALITIES_CACHE_KEY);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(`${API_BASE_URL}/api/countries`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  localStorage.setItem(NATIONALITIES_CACHE_KEY, JSON.stringify(data));
  return data;
};

const fetchRegions = async (countryId) => {
  const cacheKey = `${REGIONS_CACHE_KEY}_${countryId}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(`${API_BASE_URL}/api/regions/${countryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch regions');
  }
  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
};

function Home() {
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
  const navigate =useNavigate();
  const [FavCount, SetFavCount] = useContext(FavCountContext);

  console.log(showFavoriteModal);
  


  const queryClient = useQueryClient();

  const { data: nationalities, isLoading: nationalitiesLoading, isError: nationalitiesError } = useQuery(
    NATIONALITIES_CACHE_KEY, 
    fetchNationalities, 
    {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      onSuccess: (data) => {
        setNationalities(data.data.countries);
      },
    }
  );

  const { data: regionsData, isLoading: regionsLoading, isError: regionsError } = useQuery(
    [REGIONS_CACHE_KEY, selectedCountry?.id], 
    () => selectedCountry ? fetchRegions(selectedCountry.id) : null, 
    {
      enabled: !!selectedCountry,
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60, // 1 hour
      onSuccess: (data) => {
        setRegions(data.data.regions);
      },
    }
  );

  useEffect(() => {
    if (selectedCountry) {
      queryClient.invalidateQueries([REGIONS_CACHE_KEY, selectedCountry.id]);
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
  
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    } else {
      setShowLanguageModal(true);
    }
  
    if (storedCountry) {
      const parsedCountry = JSON.parse(storedCountry);
      setSelectedCountry(parsedCountry);
    }
  
    if (storedRegion) {
      setSelectedRegion(JSON.parse(storedRegion));
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



  // if (nationalitiesLoading || regionsLoading) return <p><Loading/></p>;

 

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