import React, { useContext } from 'react';
import { Modal } from 'flowbite-react';
import { RegionContext } from '../../App';

const RegionModal = ({ isOpen, onClose, onSelect }) => {
  const regions = ['Dubai', 'Abu Dhabi', 'Sharja', 'Al Ain', 'Fujaira', 'Ras al Khaimah'];
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region); // Update the selectedRegion state with the selected region
    onSelect(region); // Call the onSelect callback with the selected region
    onClose(); // Close the modal after selecting the region
  };

  return (
    <Modal className='modalregion' show={isOpen} onClose={onClose}>
      <Modal.Body>
        <div className='font-inter'>
          <div className='flex justify-center pb-4 text-sm font-semibold text-[#6D6D6D]'>
            Select Your Region
          </div>
          <div>
            <ul>
              {regions.map((obj) => (
                <li
                  key={obj}
                  className='bg-[#F5F3F3] mb-1 cursor-pointer'
                  onClick={() => handleRegionSelect(obj)}
                >
                  <p className='ml-2 py-1'>{obj}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegionModal;