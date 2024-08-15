import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import '../../styles/nav.css';
import Toggle from './navcomponents/Toggle';
import Regiondropdown from './navcomponents/Regiondropdown';
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
import WatchTime from './navcomponents/WatchTime';
import Loginpopup from '../Authentication/Loginpopup';
import SignupPopup from '../Authentication/SignupPopup';
import ForgotPasswordModal from '../Authentication/Forgetpassword';
import { useQuery, useQueryClient } from 'react-query';

export function NavbarComponent({ hideToggle, onFavoriteClick }) {
  const [openModal, setOpenModal] = useState(false);
  const [Tabscreen, setTabscreen] = useState(window.innerWidth <= 820);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // const [userProfile, setUserProfile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useContext(LanguageContext);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [Userid, setUserid] = useContext(UseridContext);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useContext(Countrycontext);
  const [selectedRegion, setSelectedRegion] = useContext(RegionContext);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  


  const handleOpenForgotPasswordModal = () => {
    setOpenModal(false); // Close the login modal
    setIsForgotPasswordModalOpen(true);
  };
 
  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
    setOpenModal(false); // Close the login modal if it's open
  };
  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);
    setIsRegionModalOpen(true);
  };

  const handleRegionModalClose = () => {
    setIsRegionModalOpen(false);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setIsRegionModalOpen(false);
  };

  const handleFeedbackClick = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
  };

  const useUserProfile = () => {
    const [, setUserid] = useContext(UseridContext);
  
    return useQuery('userProfile', async () => {
      const token = localStorage.getItem('usertoken');
      if (!token) throw new Error('No token found');
  
      const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data.profile;
    }, {
    
      onSuccess: (data) => {
        if (data && data.id) {
          setUserid(data.id);
          localStorage.setItem('userId', data.id.toString());
        }
      },
      enabled: !!localStorage.getItem('usertoken')
    });
  };

  const { data: userProfile, isLoading, isError } = useUserProfile();

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
    localStorage.removeItem('userId');  // Add this line
    setIsLoggedIn(false);
    setUserid(0);  // Reset the Userid state to 0
    console.log('User logged out. Token and userId removed.');
  };

  const queryClient = useQueryClient();

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setOpenModal(false);
    queryClient.invalidateQueries('userProfile');
    console.log('Login successful. Token:', token);
    
    // Fetch the user profile immediately after login
    axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      const userId = response.data.data.profile.id;
      localStorage.setItem('userId', userId.toString());
      setUserid(userId);
      // Invalidate and refetch any queries that depend on the userId
      queryClient.invalidateQueries('filter-products');
    }).catch(error => {
      console.error('Error fetching user profile:', error);
    });
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
                 <WatchTime/>
                )}
              </div>
            </div>
            <div className="searchs flex items-center mr-2 TabS:hidden relative w-full max-w-md">
              <Search onSearch={handleSearch} />
            </div>
          </div>

          <div className="right flex items-center gap-10 Mobile::gap-4">
            {!isLoggedIn && (
              <button
                onClick={handleLanguageModalOpen}
                className="mr-2"
                style={{
                  backgroundColor: 'transparant',
                  maxWidth: '145px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '4px',
                  color: 'white',
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
            {isLoggedIn && (
              <div>
                <FavoriteCounter onClick={onFavoriteClick} />
              </div>
            )}
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
          <div className="search items-center justify-center w-[100%] mx-auto TabS:flex hidden">
            <Search onSearch={handleSearch} />
          </div>
        </div>
      </Navbar>
      {openModal && (
 <Loginpopup 
 isOpen={openModal} 
 onClose={() => setOpenModal(false)}
 onLoginSuccess={handleLoginSuccess}
 onOpenSignup={handleOpenSignupModal}
 onOpenForgotPassword={handleOpenForgotPasswordModal}
/>
)}

{isSignupModalOpen && (
 <SignupPopup 
 isOpen={isSignupModalOpen}
 onClose={() => setIsSignupModalOpen(false)}
 onSignupSuccess={() => {
   setIsSignupModalOpen(false);
   // Add any additional logic for successful signup
 }}
/>
)}

<ForgotPasswordModal 
  isOpen={isForgotPasswordModalOpen}
  onClose={() => setIsForgotPasswordModalOpen(false)}
  onSubmit={(email, otp) => {
    // Handle the successful OTP generation
    console.log('OTP sent to', email);
    setIsForgotPasswordModalOpen(false);
    // You might want to open another modal for OTP verification here
  }}
/>

      {isProfileModalOpen && (
       <ProfileModal
       isOpen={isProfileModalOpen}
       onClose={handleProfileModalClose}
       handleLogout={handleLogout}
       userProfile={userProfile}
       refreshUserProfile={() => queryClient.invalidateQueries('userProfile')}
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