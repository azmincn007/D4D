import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { NavbarComponent } from "./Navbar/Navbar";
import Categorytab from "../Components/Home/Categorytab";
import Shopswiper from "../Components/Home/Shopswiper";
import Homecontainer from "../Components/Home/Homecontainer";
import NationalityModal from "../Components/modal/NationalityModal";
import { Countrycontext, LanguageContext, RegionContext, SelectionContext } from "../App";
import RegionModal from "../Components/modal/RegionModal";
import LanguageModal from "../Components/modal/LanguageModal";
import MarqueeComponent from "../Components/Home/Marquee";

const BASE_URL = "https://hezqa.com";

function Home() {
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [showNationalityModal, setShowNationalityModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);

  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  const [selectedValue, setSelectedValue] = useContext(SelectionContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!selectedRegion) {
      return null;
    }
    let endpoint;
    if (selectedValue === "Restaurant") {
      endpoint = `${BASE_URL}/api/public/restaurent/home/${selectedRegion}`;
    } else {
      endpoint = `${BASE_URL}/api/public/restaurent/home/${selectedRegion}`;
    }
    const response = await axios.get(endpoint);
    console.log(response.data.data);
    console.log(response.data.data.restaurants);
  
    return response.data.data;
  };

  const { data, isLoading, error } = useQuery(["data", selectedRegion, selectedValue], fetchData, {
    enabled: !!selectedRegion,
  });

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

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

 

  return (
    <div>
      <LanguageModal isOpen={showLanguageModal} onClose={() => setShowLanguageModal(false)} onSelect={handleLanguageSelection} />
      <NationalityModal isOpen={showNationalityModal} onClose={() => setShowNationalityModal(false)} onSelect={handleNationalitySelection} />
      <RegionModal isOpen={showRegionModal} onClose={() => setShowRegionModal(false)} onSelect={handleRegionSelection} />
      <div className="navbarhome">
        <NavbarComponent />
      </div>
      <div className="categorytab">
        <Categorytab />
      </div>
      <MarqueeComponent />
      <Shopswiper data={data?.restaurants || []} />
      <div className="homecontainerdiv">
      <Homecontainer onValueChange={handleValueChange} menus={data?.menus || []}  currencySymbol={data?.country?.currency_symbol || '$'} />      </div>
    </div>
  );
}

export default Home;
