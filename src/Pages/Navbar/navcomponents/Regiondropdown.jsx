import React, { useContext } from 'react';
import '../../../styles/nav.css';
import { Dropdown } from 'flowbite-react';
import { Countrycontext, NationalityContext } from '../../../App';
import flowbiteDrop from '../../../Themes/Flowbitedrop';
import { API_BASE_URL } from '../../../config/config';

function Regiondropdown() {
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const { 0: Nationalities } = useContext(NationalityContext);
  
const remainingCountries = Nationalities.filter(
  (country) => country.country_eng !== selectedCountry.country_eng
);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="regiondrop flex items-center">
      <div className="countryimage LgTab2:hidden">
        <img
          className="logocountry rounded-full" // Add the 'rounded-full' class to make the image circular
           src={`${API_BASE_URL}/${selectedCountry.image}`} 
          alt=""
        />
      </div>
      <div className="drop mr-[10px]  Tab:mr-0">
        <Dropdown
        className='regiondropp'
          theme={flowbiteDrop}
          style={{
            background: 'transparent',
            fontSize: '12px',
            outline: 'none', // Add this line
            ':focus': { outline: 'none' ,border:'none'},
             // Add this line
          }}          label={selectedCountry.country_eng}
        >
          {remainingCountries.map((country, index) => (
            <Dropdown.Item
            className='dropitem px-0'
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