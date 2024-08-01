import React from 'react';
import { Modal } from 'flowbite-react';
import './Modalsprofile.css';
import { modalshop } from '../../Themes/Modaltheme';
import { IoCloseSharp } from "react-icons/io5";
import ProfileBanner from '../Components/Profilebanner';
import RestuarentIcon from '../Assets/Restuarenticon.png';
import { useLocation } from 'react-router-dom';
import LazyImage from '../../api/Lazyimage';

function ProfileShow({ isOpen, onClose, onEditProfileClick }) {
  const location = useLocation();
  const formData = location.state?.formData;
  console.log(formData);

  const handleCloseModal = () => {
    onClose();
  };

  // Function to determine shop type display
  const getShopTypeDisplay = (shopType) => {
    switch (shopType) {
      case '1':
        return 'Shop';
      case '2':
        return 'Restaurant';
      default:
        return shopType; // Return the original value if it's neither 1 nor 2
    }
  };

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className='' theme={modalshop}>
      <Modal.Body className='shopsadminmodal font-inter relative'>
        <ProfileBanner />
        <div className='flex flex-col items-center mt-16'>
          <React.Fragment>
            <div className='text-sm font-semibold mb-1'>{formData?.shopname_eng}</div>
            <div className='text-[#696969] text-xs font-semibold mb-1'>{formData?.email}</div>
            <div className='text-[#696969] text-xs items-center gap-4 flex font-semibold mb-4'>
              <div className='flex items-center gap-2'>
              <LazyImage 
                  src={RestuarentIcon} 
                  className='w-[29px] h-[25px]' 
                  alt="Restaurant Icon" 
                />
                <p>{getShopTypeDisplay(formData?.shop_type)}</p>
              </div>
              <hr className=" bg-black w-[1px] h-[20px]" />
              <div className="text-[#696969] text-xs flex font-semibold items-center">
                <div className='flex items-center'>{formData?.country}, {formData?.region}</div>
              </div>
            </div>
          </React.Fragment>
        </div>
        <div className='biodiv w-[90%] mx-auto px-2 py-2 mb-4'>
          <p className='font-semibold text-xsm text-[#1F1F1F]'>short bio</p>
          <p className='text-xs text-[#1F1F1F]'>
            {formData?.desc || 'No description available.'}
          </p>
        </div>
        <div className='flex items-center justify-center buttonsprofile mb-8'>
          <button className='mr-5 w-[60%] bg-yellow' onClick={onEditProfileClick}>
            Continue
          </button>
        </div>
        <div className='absolute top-2 right-3 bg-white rounded-full' onClick={handleCloseModal}>
          <IoCloseSharp />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileShow;