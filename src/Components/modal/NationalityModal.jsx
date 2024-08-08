import React, { useContext } from 'react';
import { Modal } from 'flowbite-react';
import { modalthemeNational } from '../../Themes/Modaltheme';
import { Countrycontext, NationalityContext } from '../../App';
import { API_BASE_URL } from '../../config/config';
import useLanguageText from '../Uselanguagetext';

const NationalityModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [Nationalities] = useContext(NationalityContext); // Use the Nationalities fetched in Home component

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onSelect(country); // Trigger the parent component's onSelect function
    onClose(); // Close the modal
  };

  return (
    <Modal theme={modalthemeNational} show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className="mainmodalnationality font-inter pb-3">
          <div className='flex flex-col justify-center items-center'>
            <div className='py-6 text-sm text-[#6D6D6D] font-semibold'>Popular Countries</div>
            <div className="grid grid-cols-4 gap-x-16 gap-y-5 Tab:grid-cols-3 LgMobile:grid-cols-2">
              {Nationalities.map((nation, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => handleCountrySelect(nation)}>
                  <img src={`${API_BASE_URL}/${nation.image}`} alt={useLanguageText(nation)} className="w-[100px] h-[75px] mb-1" />
                  <span className='text-sm flex justify-center'>{useLanguageText(nation)}</span>
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
