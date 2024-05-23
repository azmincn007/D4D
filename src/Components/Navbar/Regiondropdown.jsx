import React, { useContext } from 'react';
import '../../styles/nav.css';
import { Dropdown } from 'flowbite-react';
import { Countrycontext, NationalityContext } from '../../App';

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
    <div className="regiondrop flex flex-items-center">
      <div className="countryimage">
        <img className="logocountry" src={selectedCountry.Img} alt="" />
      </div>
      <div className="drop">
        <Dropdown
          style={{ background: 'transparent', fontSize: '12px' }}
          label={selectedCountry.Country}
        >
          {remainingCountries.map((country, index) => (
            <Dropdown.Item
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