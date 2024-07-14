import React, { useContext, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { LanguageContext } from '../../App';

const LanguageModal = ({ isOpen, onClose, onSelect }) => {
  const languages = ['English', 'Arabic', 'Hindi', 'Malayalam'];
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('userLanguageSelected');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      onSelect(storedLanguage);
    }
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('userLanguageSelected', language);
    onSelect(language);
    onClose();
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