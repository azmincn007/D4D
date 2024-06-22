// NationalityModal.js
import React, { useContext, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { LuLocateFixed } from "react-icons/lu";
import { modalthemeNational } from '../../Themes/Modaltheme';
import { Countrycontext, LanguageContext, NationalityContext } from '../../App';
import { useQuery } from 'react-query';
import useLanguageText from '../Uselanguagetext';

const fetchNationalities = async () => {
  const response = await fetch('https://hezqa.com/api/countries');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const NationalityModal = ({ isOpen, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [Nationalities, setNationalities] = useContext(NationalityContext);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  console.log(selectedLanguage);

  const { data: nationalities, isLoading, isError } = useQuery('nationalities', fetchNationalities, {
    onSuccess: (data) => {
      console.log('API Response:', data);
      setNationalities(data.data.countries);
    },
  });

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onClose();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <Modal theme={modalthemeNational} show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className="mainmodalnationality font-inter pb-3">
          <div className='flex flex-col justify-center items-center'>
            <div className='py-6 text-sm text-[#6D6D6D] font-semibold'>Popular Countries</div>
            <div className="grid grid-cols-4 gap-x-16 gap-y-5 Tab:grid-cols-3 LgMobile:grid-cols-2">
              {Nationalities.map((nation, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => handleCountrySelect(nation)}>
                  <img src={`https://hezqa.com/${nation.image}`} alt={useLanguageText(nation)} className="w-[100px] h-[75px] mb-1" />
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