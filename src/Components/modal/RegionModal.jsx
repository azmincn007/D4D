import React, { useContext, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { useQuery } from 'react-query';
import { Countrycontext, LanguageContext, RegionContext } from '../../App';
import useLanguageText from '../Uselanguagetext';

const RegionModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);



  useEffect(() => {
  }, [selectedCountry]);

  const fetchRegions = async () => {
    const response = await fetch(`https://hezqa.com/api/regions/${selectedCountry.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }
    const data = await response.json();
    return data.data.regions; // Assuming regions are under data.regions
  };

  const { data: regions, isLoading, isError } = useQuery(['regions', selectedCountry.id], fetchRegions);


  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    onSelect(region);
    onClose();
  };

  return (
    <Modal className='modalregion' show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className='font-inter'>
          <div className='flex justify-center pb-4 text-sm font-semibold text-[#6D6D6D]'>
            Select Your Region
          </div>
          {isLoading ? (
            <p>Loading regions...</p>
          ) : isError ? (
            <p>Error fetching regions</p>
          ) : (
            <div>
              <ul>
                {Array.isArray(regions) && regions.map((region) => (
                  <li
                    key={region.region_id}
                    className='bg-[#F5F3F3] mb-1 cursor-pointer'
                    onClick={() => handleRegionSelect(region.id)}
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
