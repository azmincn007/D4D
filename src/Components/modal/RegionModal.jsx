import React, { useContext, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { Countrycontext, RegionContext } from '../../App';
import useLanguageText from '../Uselanguagetext';

const RegionModal = ({ isOpen, onClose, onSelect ,regions}) => {
  console.log(regions);
  
  const [selectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);

  useEffect(() => {
    const storedRegion = localStorage.getItem('userRegionSelected');
    if (storedRegion) {
      setSelectedRegion(JSON.parse(storedRegion));
      onSelect(JSON.parse(storedRegion));
    }
  }, []);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    localStorage.setItem('userRegionSelected', JSON.stringify(region));
    onSelect(region);
    onClose();
  };

  return (
    <Modal className='modalregion' show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className='font-inter'>
          <div className='flex justify-center pb-4 text-sm font-semibold text-[#6D6D6D]'>Select Your Region</div>
          {selectedCountry && (
            <div>
              <ul>
                {regions?.map((region) => (
                  <li
                    key={region.id}
                    className={`bg-[#F5F3F3] mb-1 cursor-pointer ${selectedRegion?.id === region.id ? 'bg-[#E6E6E6]' : ''}`}
                    onClick={() => handleRegionSelect(region)}
                  >
                    <p className='ml-2 py-1'>{useLanguageText(region)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegionModal;