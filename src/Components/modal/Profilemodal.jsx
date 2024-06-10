import React, { useState, useEffect } from 'react';
import { Modal, Dropdown } from 'flowbite-react';
import { modalthemeNational } from '../../Themes/Modaltheme';
import { IoIosClose } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import AvatarComponent from '../../Pages/Navbar/navcomponents/AvatarComponent';
import EditProfile from './EditProfile';

const ProfileModal = ({ isOpen, onClose, handleLogout }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(isOpen);
  const languages = ['English', 'Arabic', 'French', 'Turkish', 'Malayalam', 'Hindi', 'Tamil'];
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    setIsProfileModalOpen(isOpen);
  }, [isOpen]);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleProfileModalClose();
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
    onClose();
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
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
                <div className='flex items-center space-x-2  prf'>
                 
                  <Dropdown
                    label={selectedLanguage}
                 
                    style={{backgroundColor:'#F1F1F1',maxWidth:'145px' ,height:'30px', display:'flex' ,alignItems:'center', borderRadius:'4px' ,color:'#6D6D6D'}}
                  >
                    {languages.map((language) => (
                      <Dropdown.Item key={language} onClick={() => handleLanguageChange(language)}>
                        {language}
                      </Dropdown.Item>
                    ))}
                  </Dropdown>

                  <button
                    className="border-2 border-yellow text-[12px] px-2 font-semibold py-1 rounded-[6px] w-[80px]"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </div>
                <div className='mt-20 w-[50%]'>
                  <button
                    className="bg-yellow text-[12px] px-2 font-semibold py-2 rounded-[6px] w-[100%]"
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
