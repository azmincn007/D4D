import React, { useContext, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { Countrycontext, NationalityContext, LanguageContext } from '../../App';
import { API_BASE_URL } from '../../config/config';
import { modalthemeNational } from '../../Themes/Modaltheme';
import useLanguageText from '../Uselanguagetext';

const NationalityModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [Nationalities] = useContext(NationalityContext);
  const [selectedLanguage] = useContext(LanguageContext);

  useEffect(() => {
    const storedCountry = localStorage.getItem('userCountrySelected');
    if (storedCountry) {
      setSelectedCountry(JSON.parse(storedCountry));
      onSelect(JSON.parse(storedCountry));
    }
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    localStorage.setItem('userCountrySelected', JSON.stringify(country));
    onSelect(country);
    onClose();
  };

  // Pre-process the country names
  const countryNames = Nationalities.map(nation => 
    useLanguageText({
      country_eng: nation.country_eng,
      country_ar: nation.country_ar,
      country_mal: nation.country_mal,
      country_hin: nation.country_hin
    })
  );

  return (
    <Modal theme={modalthemeNational} show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className="mainmodalnationality font-inter pb-3">
          <div className='flex flex-col justify-center items-center'>
            <div className='py-6 text-sm text-[#6D6D6D] font-semibold'>Popular Countries</div>
            <div className="grid grid-cols-4 gap-x-16 gap-y-5 Tab:grid-cols-3 LgMobile:grid-cols-2">
              {Nationalities.map((nation, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => handleCountrySelect(nation)}>
                  <img src={`${API_BASE_URL}/${nation.image}`} alt={nation.name} className="w-[100px] h-[75px] mb-1" />
                  <span className='text-sm flex justify-center'>{countryNames[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NationalityModal;