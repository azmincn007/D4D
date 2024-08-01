import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'flowbite-react';
import { modalthemeNational } from '../../Themes/Modaltheme';
import { IoIosClose } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import AvatarComponent from '../../Pages/Navbar/navcomponents/AvatarComponent';
import LanguageModal from './LanguageModal';
import { LanguageContext } from '../../App';
import { useQuery } from 'react-query';
import axios from 'axios';
import EditProfile from './EditProfile';
import ChangePasswordModal from './ChangePassword';

const fetchUserProfile = async () => {
  const token = localStorage.getItem('usertoken');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await axios.get('https://hezqa.com/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data.data.profile);
  return response.data.data.profile;
};

const ProfileModal = ({ isOpen, onClose, handleLogout }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(isOpen);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);

  const { data: userProfile, isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: isProfileModalOpen,
  });

  useEffect(() => {
    setIsProfileModalOpen(isOpen);
  }, [isOpen]);

  const handleLogoutClick = () => {
    handleLogout();
    handleProfileModalClose();
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
    onClose();
  };

  const handleLanguageModalOpen = () => {
    setIsLanguageModalOpen(true);
  };

  const handleLanguageModalClose = () => {
    setIsLanguageModalOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
    setIsProfileModalOpen(false);
  };

  const handleChangePasswordClick = () => {
    setIsChangePasswordModalOpen(true);
    setIsProfileModalOpen(false);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileModalOpen(false);
    setIsProfileModalOpen(true);
  };

  const handleChangePasswordClose = () => {
    setIsChangePasswordModalOpen(false);
    setIsProfileModalOpen(true);
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
                {isLoading ? (
                  <p>Loading profile...</p>
                ) : isError ? (
                  <p>Error loading profile</p>
                ) : (
                  <>
                    <div className="flex items-center mt-2">
                      <p className="text-[16px] font-semibold">{userProfile?.name || 'Name'}</p>
                      <div className="mx-2 w-[1px] h-4 bg-[#7A7A78]"></div>
                      <p className="text-[10px] text-[#7A7A78]">{userProfile?.country || 'Location'}</p>
                      <IoLocationOutline className="text-yellow" />
                    </div>
                    <p className="text-[10px] text-[#7A7A78] mb-3">{userProfile?.email || 'Email'}</p>
                  </>
                )}
                <div className='flex items-center space-x-2 prf'>
                  <button
                    onClick={handleLanguageModalOpen}
                    style={{
                      backgroundColor: '#F1F1F1',
                      maxWidth: '145px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '4px',
                      color: '#6D6D6D',
                      padding: '0 10px'
                    }}
                  >
                    <span>{selectedLanguage}</span>
                    <IoMdArrowDropdown />
                  </button>
                  <button
                    className="border-2 border-yellow text-[12px] px-2 font-semibold py-1 rounded-[6px] w-[80px]"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </div>
                <div className='mt-20 w-[50%]'>
                  <button
                    className="bg-yellow text-[12px] px-2 font-semibold py-2 rounded-[6px] w-[100%] mb-2"
                    onClick={handleEditProfileClick}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="bg-yellow text-[12px] px-2 font-semibold py-2 rounded-[6px] w-[100%]"
                    onClick={handleChangePasswordClick}
                  >
                    Change Password
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
      <LanguageModal 
        isOpen={isLanguageModalOpen} 
        onClose={handleLanguageModalClose} 
        onSelect={handleLanguageSelect}
      />
      <EditProfile 
        isOpen={isEditProfileModalOpen}
        onClose={handleEditProfileClose}
        initialValues={userProfile}
      />
      <ChangePasswordModal 
        isOpen={isChangePasswordModalOpen}
        onClose={handleChangePasswordClose}
      />
    </>
  );
};

export default ProfileModal;