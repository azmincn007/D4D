import React, { useState, useRef, useEffect, useContext } from 'react';
import { Modal } from 'flowbite-react';
import { CiSearch } from "react-icons/ci";
import { LuLocateFixed } from "react-icons/lu";

import { modalthemeNational } from '../../Themes/Modaltheme';
import { Countrycontext, NationalityContext } from '../../App';

const NationalityModal = ({ isOpen, onClose, onSelect }) => {
 
  const Nationalities=useContext(NationalityContext)
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [showDropdownFor, setShowDropdownFor] = useState(null);
  const countryDivRefs = useRef([]);

  const handleCountrySelect = (country, index) => {
    setShowDropdownFor(country.Country);

    const countryDiv = countryDivRefs.current[index];
    const rect = countryDiv.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - 150; // 150 is the approximate height of the dropdown
    const left = rect.left + window.pageXOffset;

    // Update the dropdown position
    const dropdown = document.getElementById(`dropdown-${country.Country}`);
    if (dropdown) {
      dropdown.style.top = `${top - dropdown.offsetHeight}px`;
      dropdown.style.left = `${left}px`;
    }
  };

  const handleDropdownSelect = (country) => {
    setSelectedCountry(country);
    console.log('Selected Country:', country);
    setShowDropdownFor(null); // Close the dropdown
    if (onClose) {
      onClose(); // Call the onClose function if it exists
    }
  };

  const handleDropdownClose = () => {
    setShowDropdownFor(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElements = document.querySelectorAll('[id^="dropdown-"]');
      const isClickInsideDropdown = Array.from(dropdownElements).some(
        (dropdown) => dropdown.contains(event.target)
      );

      if (!isClickInsideDropdown) {
        handleDropdownClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Modal theme={modalthemeNational} show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className="mainmodalnationality font-inter pb-3">
          <div className='py-1 w-full border border-[#CCCCCC] rounded-md h-[43px]'>
            <div className='px-2 flex items-center'>
              <CiSearch className='text-[#959595]' />
              <input className='border-none text-xsm h-[33px]' placeholder="Search your country" type="text" />
            </div>
          </div>
          <div className='pt-3 text-[#E91C25] flex items-center'>
            <LuLocateFixed className='mr-2' />
            <p className='text-[16px]'>Detect my location</p>
          </div>
          <div className='py-1 w-full border-b border-[#959595]'></div>
          <div className='flex flex-col justify-center items-center'>
            <div className='py-6 text-sm text-[#6D6D6D] font-semibold'>Popular Countries</div>
            <div className="grid grid-cols-4 gap-x-16 gap-y-5 Tab:grid-cols-3 LgMobile:grid-cols-2">
              {Nationalities.map((nation, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer relative" ref={(el) => (countryDivRefs.current[index] = el)}>
                  <div onClick={() => handleCountrySelect(nation, index)}>
                    <img src={nation.Img} alt={nation.Country} className="w-[100px] h-[75px] mb-1" />
                    <span className='text-sm flex justify-center'>{nation.Country}</span>
                  </div>
                  {showDropdownFor === nation.Country && (
                    <div id={`dropdown-${nation.Country}`} className="absolute top-[10px] left-[50px] z-10 w-[100px] py-2 px-2  bg-white shadow-md p-2 rounded-md">
                      <div className="text-small cursor-pointer py-1" onClick={() => handleDropdownSelect(nation)}>Option 1</div>
                      <div className="text-small cursor-pointer py-1" onClick={() => handleDropdownSelect(nation)}>Option 2</div>
                      <div className="text-small cursor-pointer py-1" onClick={() => handleDropdownSelect(nation)}>Option 3</div>
                      <div className="text-small cursor-pointer py-1" onClick={() => handleDropdownSelect(nation)}>Option 4</div>
                    </div>
                  )}
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
