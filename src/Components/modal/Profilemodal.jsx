// ProfileModal.js
import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { modalthemeNational } from '../../Themes/Modaltheme';
import { IoIosClose } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import AvatarComponent from '../../Pages/Navbar/navcomponents/AvatarComponent';
import EditProfile from './EditProfile';

const ProfileModal = ({ isOpen, onClose }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(isOpen);

  const handleEditProfileClick = () => {
    setIsProfileModalOpen(false);
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
    onClose();
  };

  return (
    <>
      {isProfileModalOpen && (
        <Modal theme={modalthemeNational} show={isProfileModalOpen} onClose={handleProfileModalClose}>
          <Modal.Body>
            <div>
              <div className="flex flex-col items-center font-inter">
                <h2 className="text-[22px] font-semibold mb-2">My profile</h2>
                <AvatarComponent height={100} width={100} />
                <div className="flex items-center mt-2">
                  <p className="text-[16px] font-semibold">Name</p>
                  <div className="mx-2 w-[1px] h-4 bg-[#7A7A78]"></div>
                  <p className="text-[10px] text-[#7A7A78]">dubai</p>
                  <IoLocationOutline className="text-yellow" />
                </div>
                <p className="text-[10px] text-[#7A7A78] mb-3">azminsazz@gmail.com</p>
              <div className='flex'>
              <button
                  className="border-2 border-yellow text-[12px] px-2 font-semibold py-1 rounded-[6px] w-[80px] mr-4"
                  onClick={handleEditProfileClick}
                >
                 Logout
                </button>
              <button
                  className="bg-yellow text-[12px] px-2 font-semibold py-1 rounded-[6px] w-[80px]"
                  onClick={handleEditProfileClick}
                >
                  Edit Profile
                </button>
              </div>
             
              </div>
              <div className="absolute top-0 right-0 mt-3 mr-3">
                <div className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white">
                  <IoIosClose className="text-base cursor-pointer" onClick={handleProfileModalClose} />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {isEditProfileOpen && (
        <EditProfile isOpen={isEditProfileOpen} onClose={handleEditProfileClose} />
      )}
    </>
  );
};

export default ProfileModal;