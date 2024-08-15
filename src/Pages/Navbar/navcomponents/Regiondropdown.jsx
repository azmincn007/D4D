import React, { useContext, useState, useEffect } from 'react';
import '../../../styles/nav.css';
import { Dropdown } from 'flowbite-react';
import { Countrycontext, NationalityContext, RegionContext } from '../../../App';
import flowbiteDrop from '../../../Themes/Flowbitedrop';
import { API_BASE_URL } from '../../../config/config';

function Regiondropdown() {
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [Nationalities] = useContext(NationalityContext);
  const [storedUserCountry, setStoredUserCountry] = useState(null);

  useEffect(() => {
    const storedCountry = localStorage.getItem('userCountrySelected');
    if (storedCountry) {
      setStoredUserCountry(JSON.parse(storedCountry));
      setSelectedCountry(JSON.parse(storedCountry));
    }
  }, [setSelectedCountry]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    localStorage.setItem('userCountrySelected', JSON.stringify(country));
    window.dispatchEvent(new Event('userCountryUpdated'));
    setSelectedRegion("")
    localStorage.removeItem('userRegionSelected');
  };

  const remainingCountries = Nationalities.filter(
    (country) => country.country_eng !== selectedCountry?.country_eng
  );

  return (
    <div className="regiondrop flex items-center">
      <div className="countryimage LgTab2:hidden">
        <img
          className="logocountry rounded-full"
          src={`${API_BASE_URL}/${selectedCountry?.image}`}
          alt={selectedCountry?.country_eng || 'Selected Country'}
        />
      </div>
      <div className="drop mr-[10px] Tab:mr-0">
        <Dropdown
          className="regiondropp"
          theme={flowbiteDrop}
          style={{
            background: 'transparent',
            fontSize: '12px',
            outline: 'none',
            ':focus': { outline: 'none', border: 'none' },
          }}
          label={selectedCountry?.country_eng || 'Select Country'}
        >
          {remainingCountries.map((country, index) => (
            <Dropdown.Item
              className="dropitem px-0"
              key={index}
              onClick={() => handleCountrySelect(country)}
            >
              {country.country_eng}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}

export default Regiondropdown;
