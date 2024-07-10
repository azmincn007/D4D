import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import './Modalsprofile.css';
import { modalshop, modalthemeNational } from '../../Themes/Modaltheme';
import { IoCloseSharp } from "react-icons/io5";
import ProfileBanner from '../Components/Profilebanner';
import RestuarentIcon from '../Assets/Restuarenticon.png'
import { useNavigate } from 'react-router-dom';
import CreateSecurepassword from '../Components/CreateSecurepass';

function ProfileModal({ isOpen, onClose, onEditProfileClick, profileData }) {
  const [isSecurePassModalOpen, setIsSecurePassModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    onClose();
  };

  const handleChangePassword = () => {
    onClose(); // Close the profile modal
    setIsSecurePassModalOpen(true); // Open the secure password modal
  };

  const handleSecurePassModalClose = () => {
    setIsSecurePassModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onClose();
    navigate('/loginadmin');
  };

  if (!profileData) {
    navigate('/404error')
    return null;
  }

  return (
    <>
    
      <Modal show={isOpen} onClose={handleCloseModal} className='' theme={modalthemeNational}>
        <Modal.Body className='shopsadminmodal font-inter relative'>
          <ProfileBanner circleImage={profileData.logo}/>
          <div className='flex flex-col items-center mt-16'>
            <div className='text-sm font-semibold mb-1'>{profileData.shopname_eng}</div>
            <div className='text-[#696969] text-xs font-semibold mb-1'>{profileData.email}</div>
            <div className='text-[#696969] text-xs items-center gap-4 flex font-semibold mb-4'>
              <div className='flex items-center gap-2'>
                <img src={RestuarentIcon} className='w-[29px] h-[25px]' alt="" />
                <p>Restaurant</p>
              </div>
              <hr className=" bg-black w-[1px] h-[20px]" />
              <div>{profileData.region}, {profileData.country}</div>
            </div>
            {profileData.branches && (
              <div className='flex text-xsm mb-2'>
                {profileData.branches.map((branch, branchIndex) => (
                  <div key={branchIndex} className='branches'>{branch}</div>
                ))}
              </div>
            )}
          </div>
          <div className='biodiv w-[90%] mx-auto px-2 py-2 mb-4'>
            <p className='font-semibold text-xsm text-[#1F1F1F]'>short bio</p>
            <p className='text-xs text-[#1F1F1F]'>
              {profileData.desc || "No bio available"}
            </p>
          </div>
          <div className='flex items-center justify-center buttonsprofile mb-8'>
            <button className='mr-5 bg-yellow font-semibold text-[14px] Mobile:text-[12px]' onClick={handleChangePassword}>
              Change Password
            </button>
            <button className='mr-5  bg-yellow font-semibold text-[14px] Mobile:text-[12px]' onClick={onEditProfileClick}>
              Edit Profile
            </button>
            <button className='lgout text-[14px] Mobile:text-[12px]' onClick={handleLogout}>Log out</button>
          </div>
          <div className='absolute top-2 right-3 bg-white rounded-full' onClick={handleCloseModal}>
            <IoCloseSharp />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isSecurePassModalOpen}
        onClose={handleSecurePassModalClose}
        theme={modalthemeNational}
      >
        <Modal.Body>
          <CreateSecurepassword
            email={profileData.email}
            onClose={handleSecurePassModalClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;