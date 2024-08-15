import React from 'react';
import { NavbarComponent } from './Pages/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import NavbarFlyer from './Pages/Navbar/NavbarFlyer';

const routesWithoutNavbar = [
  '/loginadmin',
  '/signup',
  '/forgetpassword',
  '/verifyotp',
  '/signupupload',
  '/securepass',
  '/profileshow',
  '/subscription',
  '/Restorentdashboard'
];

function Layout({ children, onFavoriteClick }) {
  const location = useLocation();
  const flyersData = location.state?.flyers;

  const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && (
        location.pathname === '/flyer' ? (
          <NavbarFlyer flyersData={flyersData} />
        ) : (
          <NavbarComponent onFavoriteClick={onFavoriteClick} />
        )
      )}
      {children}
    </div>
  );
}

export default Layout;