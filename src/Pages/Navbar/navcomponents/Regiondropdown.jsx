import React, { useContext } from 'react';
import '../../../styles/nav.css';
import { Dropdown } from 'flowbite-react';
import { Countrycontext, NationalityContext } from '../../../App';
import flowbiteDrop from '../../../Themes/Flowbitedrop';

function Regiondropdown() {
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const Nationalities = useContext(NationalityContext);
  const remainingCountries = Nationalities.filter(
    (country) => country.Country !== selectedCountry.Country
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="regiondrop flex items-center">
      <div className="countryimage LgTab2:hidden">
        <img
          className="logocountry rounded-full" // Add the 'rounded-full' class to make the image circular
          src={selectedCountry.Img}
          alt=""
        />
      </div>
      <div className="drop mr-[10px]  Tab:mr-0">
        <Dropdown
          theme={flowbiteDrop}
          style={{ background: 'transparent', fontSize: '12px' }}
          label={selectedCountry.Country}
        >
          {remainingCountries.map((country, index) => (
            <Dropdown.Item
            className='dropitem px-0'
              key={index}
              onClick={() => handleCountrySelect(country)}
            >
              {country.Country}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}

export default Regiondropdown;