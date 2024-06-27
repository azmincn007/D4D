import React from 'react';
import { Modal } from 'flowbite-react';
import './Modalsprofile.css';
import { modalshop } from '../../Themes/Modaltheme';
import { IoCloseSharp } from "react-icons/io5";
import ProfileBanner from '../Components/Profilebanner';
import RestuarentIcon from '../Assets/Restuarenticon.png';


function ProfileShow({ isOpen, onClose, onEditProfileClick }) {
  const restaurantData = [
    {
      name: 'Atmosphere Restaurant',
      email: 'atmosphere730@gmail.com',
      location: 'UAE, Dubai',
      branches: ['Butina - Sharjah', 'Qusais', 'Jebel Ali']
    }
  ];

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={handleCloseModal} className='' theme={modalshop}>
      <Modal.Body className='shopsadminmodal font-inter relative'>
        <ProfileBanner  />
        <div className='flex flex-col items-center mt-16'>
          {restaurantData.map((obj, index) => (
            <React.Fragment key={index}>
              <div className='text-sm font-semibold mb-1'>{obj.name}</div>
              <div className='text-[#696969] text-xs font-semibold mb-1'>{obj.email}</div>
              <div className='text-[#696969] text-xs items-center gap-4 flex font-semibold mb-4'>
                <div className='flex items-center gap-2'>
                  <img src={RestuarentIcon} className='w-[29px] h-[25px]' alt="" />
                  <p>Restuarent</p>
                </div>
                <hr className=" bg-black w-[1px] h-[20px]" />
                <div>{obj.location}</div>
              </div>
             
            </React.Fragment>
          ))}
        </div>
        <div className='biodiv w-[90%] mx-auto px-2 py-2 mb-4'>
          <p className='font-semibold text-xsm text-[#1F1F1F]'>short bio</p>
          <p className='text-xs text-[#1F1F1F]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius culpa impedit error architecto quasi, sequi itaque magni earum facilis corporis voluptates rem porro, iste alias asperiores enim iure omnis ipsa laboriosam reprehenderit sapiente, dolorum debitis consectetur suscipit. Sunt, ad debitis.
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