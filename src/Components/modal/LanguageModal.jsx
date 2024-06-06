import React, { useContext } from 'react';
import { Modal } from 'flowbite-react';
import { modalthemeNational } from '../../Themes/Modaltheme';
import { LanguageContext } from '../../App';

const LanguageModal = ({ isOpen, onClose, onSelect }) => {
  const languages = ['English', 'Arabic', 'French', 'Turkish', 'Malayalam', 'Hindi', 'Tamil'];
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    onselect(language);
    onClose(); // Close the modal after selecting the region

  };

  return (
    <Modal className='modalregion' show={isOpen} onClose={onClose}>
      <Modal.Body>
       <div className='font-inter'>
        <div className='flex justify-center pb-4 text-sm font-semibold text-[#6D6D6D]'>Select Your Language</div>
        <div>
            <ul>
                {languages.map((language) => (
                  <li key={language} className='bg-[#F5F3F3] mb-1 cursor-pointer' onClick={() => handleLanguageSelect(language)}>
                    <p className='ml-2 py-1'>{language}</p>
                  </li>
                ))}
            </ul>
        </div>
       </div>
      </Modal.Body>
    </Modal>
  );
};

export default LanguageModal;
