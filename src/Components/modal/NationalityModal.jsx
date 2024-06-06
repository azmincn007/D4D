import React, { useContext } from 'react';
import { Modal } from 'flowbite-react';
import { LuLocateFixed } from "react-icons/lu";
import { modalthemeNational } from '../../Themes/Modaltheme';
import { Countrycontext, NationalityContext } from '../../App';

const NationalityModal = ({ isOpen, onClose }) => {
  const Nationalities = useContext(NationalityContext);
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
 
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onClose();
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
                  <img src={nation.Img} alt={nation.Country} className="w-[100px] h-[75px] mb-1" />
                  <span className='text-sm flex justify-center'>{nation.Country}</span>
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
