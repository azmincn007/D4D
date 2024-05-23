import React, { useContext, useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import '../styles/nav.css';
import Toggle from './Navbar/Toggle';
import Regiondropdown from './Navbar/Regiondropdown';
import { Buttoncomp } from './Button/Buttoncomp';
import { ModalAuth } from './modal/Modallogin';
import { AuthContext } from '../App';
import { AiOutlineLogin } from "react-icons/ai";

export function NavbarComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [authValue, setAuthValue] = useContext(AuthContext);
  const [Tabscreen, setTabscreen] = useState(window.innerWidth < 770);

  const handleLoginClick = () => {
    setOpenModal(true);
    setAuthValue('login');
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleResize = () => {
    setTabscreen(window.innerWidth <= 770);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Navbar fluid rounded className="navbar bg-Navbarbg sm:px-10 font-inter">
        <div className="left flex items-center">
          <div className="logo mr-10">
            <NavbarBrand as={Link} to="/">
              <img src={Logo} className="logo" alt="Logo" />
            </NavbarBrand>
          </div>
          <div className="search flex items-center">
            <input type="text" className="inputfield" placeholder={!Tabscreen ? "Search products" : ""} />
            <button className='navbutton text-black text-semibold'> Search</button>
          </div>
        </div>
        <div className="right flex items-center">
          <div className='mr-[20px]'><Toggle /></div>
          
          <Regiondropdown />
          {Tabscreen ? (
           <AiOutlineLogin className='text-yellow flex items-center h-[30px] w-[30px]' onClick={handleLoginClick}/>
          ) : (
            <button className="loginbutton" onClick={handleLoginClick}>
              Login
            </button>
          )}
          <NavbarToggle />
          <NavbarCollapse></NavbarCollapse>
        </div>
      </Navbar>
      {openModal && (
        <ModalAuth openModal={openModal} setOpenModal={setOpenModal} onClose={handleModalClose} />
      )}
    </div>
  );
}