import React, { useContext, useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import '../../styles/nav.css';
import Toggle from './navcomponents/Toggle';
import Regiondropdown from './navcomponents/Regiondropdown';
import { ModalAuth } from '../../Components/modal/Modallogin';
import { AuthContext } from '../../App';
import { AiOutlineLogin } from "react-icons/ai";
import AvatarComponent from './navcomponents/AvatarComponent';
import { CgProfile } from "react-icons/cg";
import FlowbiteNav from '../../Themes/FlowbiteNav';
import Categories from '../../Components/Home/Categories';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Search from './navcomponents/Search';
import ProfileModal from '../../Components/modal/Profilemodal';

export function NavbarComponent({ hideToggle }) {
  const [openModal, setOpenModal] = useState(false);
  const [authValue, setAuthValue] = useContext(AuthContext);
  const [Tabscreen, setTabscreen] = useState(window.innerWidth <= 820);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleProfileModalOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleLoginClick = () => {
    setOpenModal(true);
    setAuthValue('login');
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
    console.log('User logged out. Token removed.');
  };

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setOpenModal(false);
    console.log('Login successful. Token:', token);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
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
                  <div className='watchtime w-[177px] py-[4px] Tab:mt-[-15px] bg-[#232F3E] text-center text-white rounded-[1000px] Tab:w-[100px]'>
                    <p className='text-small Tab:text-xs'>Watch Time</p>
                    <p className='text-xs Tab:text-[6px]'>Last update yesterday 12:00 AM</p>
                  </div>
                )}
              </div>
            </div>
            <div className="searchs flex items-center mr-2 TabS:hidden">
              <Search />
            </div>
          </div>

          <div className="right flex items-center">
            {!hideToggle && <div className='mr-[20px] Tab:mr-[0px]'><Toggle /></div>}
            <Regiondropdown />
            <div className='log SmMobile:hidden'>
              {isLoggedIn ? (
                <div onClick={handleProfileModalOpen}>
                  <AvatarComponent />
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
                      <AvatarComponent className='h-[30px] w-[30px] my-3' />
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
            <Search />
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
        />
      )}
    </div>
  );
}