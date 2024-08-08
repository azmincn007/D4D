import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import '../../styles/nav.css';
import Toggle from './navcomponents/Toggle';
import Regiondropdown from './navcomponents/Regiondropdown';
import { ModalAuth } from '../../Components/modal/Modallogin';
import { Countrycontext, LanguageContext, LoginContext, RegionContext, UseridContext } from '../../App';
import { AiOutlineLogin } from "react-icons/ai";
import AvatarComponent from './navcomponents/AvatarComponent';
import { CgProfile } from "react-icons/cg";
import FlowbiteNav from '../../Themes/FlowbiteNav';
import Categories from '../../Components/Home/Categories';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Search from './navcomponents/Search';
import ProfileModal from '../../Components/modal/Profilemodal';
import { IoMdArrowDropdown } from 'react-icons/io';
import LanguageModal from '../../Components/modal/LanguageModal';
import FavoriteCounter from '../../ShopsAdmin/Components/Favoratecount';
import { API_BASE_URL } from '../../config/config';
import { MdOutlineFeedback } from "react-icons/md";
import FeedbackModal from '../../Components/modal/FeedbackModal';
import RegionModal from '../../Components/modal/RegionModal';

export function NavbarComponent({ hideToggle, onFavoriteClick }) {
  const [openModal, setOpenModal] = useState(false);
  const [Tabscreen, setTabscreen] = useState(window.innerWidth <= 820);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [Userid, setUserid] = useContext(UseridContext);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);


  


  
 

  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);
    setIsRegionModalOpen(true);
  };

  const handleRegionModalClose = () => {
    setIsRegionModalOpen(false);
  };

  const handleRegionSelect = (region) => {
    console.log("hiiii");
    setSelectedRegion(region);
    setIsRegionModalOpen(false);
  };

  const handleFeedbackClick = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('usertoken');
    if (!token) return;
  
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data.profile);
      
      setUserProfile(response.data.data.profile);
      
      if (response.data.data.profile && response.data.data.profile.id) {
        setUserid(response.data.data.profile.id);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleLoginClick = () => {
    setOpenModal(true);
    setIsNavbarOpen(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleResize = () => {
    setTabscreen(window.innerWidth <= 820);
    if (window.innerWidth > 770) {
      setIsNavbarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    setIsLoggedIn(false);
    setUserProfile(null);
    console.log('User logged out. Token removed.');
    localStorage.removeItem('userLanguageSelected');
    
  };

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setOpenModal(false);
    fetchUserProfile();
    console.log('Login successful. Token:', token);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLanguageModalOpen = () => {
    setIsLanguageModalOpen(true);
  };

  const handleLanguageModalClose = () => {
    setIsLanguageModalOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageModalOpen(false);
  };

  const handleSearch = (searchKey) => {
    console.log('Search button clicked. Search key:', searchKey);
    // Add your search logic here
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('usertoken');
    if (storedToken) {
      setIsLoggedIn(true);
      fetchUserProfile();
      console.log('Stored Token:', storedToken);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Navbar theme={FlowbiteNav} fluid rounded className="navbar bg-Navbarbg sm:px-10 font-inter">
        <div className='flex justify-between w-[100%] items-center'>
          <div className="left flex items-center SmMobile:w-[70px] mb-[5px]">
            <div className="logo mr-10 SmMobile:mr-0 Tab:mr-2 flex items-center">
              <div className='flex flex-col items-center'>
                <div>
                  <NavbarBrand as={Link} to="/">
                    <img src={Logo} className="logo SmMobile:w-[70px] SmMobile:h-[70px]" alt="Logo" />
                  </NavbarBrand>
                </div>
                {isLoggedIn && (
                  <div className='watchtime w-[177px] py-[4px] Tab:mt-[-15px] bg-[#232F3E] text-center text-white rounded-[1000px] Tab:w-[100px]'>
                    <p className='text-small Tab:text-xs'>Watch Time</p>
                    <p className='text-xs Tab:text-[6px]'>Last update yesterday 12:00 AM</p>
                  </div>
                )}
              </div>
            </div>
            <div className="searchs flex items-center mr-2 TabS:hidden relative w-full max-w-md">
              <Search onSearch={handleSearch} />
            </div>
          </div>

          <div className="right flex items-center gap-10">
            {!isLoggedIn && (
              <button
                onClick={handleLanguageModalOpen}
                className="mr-2"
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
            )}
            <div>
            <Regiondropdown onRegionSelect={handleRegionSelect} />
            </div>
            <div onClick={handleFeedbackClick} className="cursor-pointer">    
                        <MdOutlineFeedback className='text-white heart-icon' /> {/* Add the feedback icon here */}
            </div>
            <div>
              <FavoriteCounter onClick={onFavoriteClick} />
            </div>
            <div className='log SmMobile:hidden'>
              {isLoggedIn ? (
                <div onClick={handleProfileModalOpen}>
                  <AvatarComponent 
                    height={60}
                    width={60}
                    src={userProfile?.photo ? `${API_BASE_URL}${userProfile.photo}` : null}
                  />
                </div>
              ) : (
                Tabscreen ? (
                  <AiOutlineLogin className='text-yellow flex items-center h-[30px] w-[30px]' onClick={handleLoginClick} />
                ) : (
                  <button className="loginbutton px-2 py-2 rounded-[4px]" onClick={handleLoginClick}>
                    Login
                  </button>
                )
              )}
            </div>
            <NavbarToggle className='bg-transparent text-yellow placeholder:' onClick={toggleNavbar} />

            {isNavbarOpen && (
              <NavbarCollapse className="fixed top-0 right-0 bottom-0 min-w-[250px] w-[50%] bg-darkblue z-[10000] flex flex-col overflow-y-auto">
                <div className="auth bg-[#2C3B4F] text-white py">
                  {isLoggedIn ? (
                    <div className='loged py-5 w-[90%] mx-auto text-inter text-sm Mobile:text-small'>
                      <AvatarComponent 
                        className='h-[30px] w-[30px] my-3' 
                        src={userProfile?.photo ? `${API_BASE_URL}${userProfile.photo}` : null}
                      />
                      <button
                        className="my-2 loginbutton px-2 py-2 rounded-[4px] bg-red-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className='log py-5 w-[90%] mx-auto text-inter text-sm Mobile:text-small'>
                      <CgProfile className='h-[30px] w-[30px] my-3' />
                      <p className='leading-4 my-2'>If you don't have an account yet, please login here.</p>
                      <button
                        className="my-2 loginbutton px-2 py-2 rounded-[4px] text-black"
                        onClick={handleLoginClick}
                      >
                        Login
                      </button>
                    </div>
                  )}

                  <Categories
                    selectedValue="Supermarket"
                    onOptionClick={() => {}}
                    showInNavbar={true}
                  />
                  <div className='absolute right-2 top-2 text-yellow'><AiOutlineCloseCircle onClick={() => setIsNavbarOpen(false)} /></div>
                </div>
              </NavbarCollapse>
            )}
          </div>
        </div>
        <div className='midle mx-auto '>
          <div className="search items-center justify-center TabS:flex hidden">
            <Search onSearch={handleSearch} />
          </div>
        </div>
      </Navbar>
      {openModal && (
        <ModalAuth
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClose={handleModalClose}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={handleProfileModalClose}
          handleLogout={handleLogout}
          userProfile={userProfile}
          refreshUserProfile={fetchUserProfile}
        />
      )}

      <LanguageModal 
        isOpen={isLanguageModalOpen} 
        onClose={handleLanguageModalClose} 
        onSelect={handleLanguageSelect}
      />

<FeedbackModal
      isOpen={isFeedbackModalOpen}
      onClose={handleFeedbackModalClose}
    />

<RegionModal
  isOpen={isRegionModalOpen}
  onClose={handleRegionModalClose}
  onSelect={handleRegionSelect}
  setIsOpen={setIsRegionModalOpen}  // Add this line
/>
    </div>
  );
}