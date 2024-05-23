import React, { useContext, useState } from 'react';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import '../styles/nav.css';
import Toggle from './Navbar/Toggle';
import Regiondropdown from './Navbar/Regiondropdown';
import { Buttoncomp } from './Button/Buttoncomp';
import { ModalAuth } from './modal/Modallogin';
import { AuthContext } from '../App';

export function Component() {
  const [openModal, setOpenModal] = useState(false);
  const [authValue, setAuthValue] = useContext(AuthContext);

  const handleLoginClick = () => {
    setOpenModal(true);
    setAuthValue('login');
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

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
            <input type="text" className="inputfield" placeholder="Search products" />
            <Buttoncomp children="search" className="navbutton rounded-none font-semibold text-small" />
          </div>
        </div>
        <div className="right">
          <NavbarToggle />
          <NavbarCollapse>
            <Toggle />
            <Regiondropdown />
            <button className="loginbutton" onClick={handleLoginClick}>
              Login
            </button>
          </NavbarCollapse>
        </div>
      </Navbar>

      {openModal && (
        <ModalAuth openModal={openModal} setOpenModal={setOpenModal} onClose={handleModalClose} />
      )}
    </div>
  );
}
