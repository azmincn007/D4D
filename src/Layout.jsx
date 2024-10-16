import React from 'react';
import { NavbarComponent } from './Pages/Navbar/Navbar';
import { useLocation, matchPath } from 'react-router-dom';
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
  '/Restorentdashboard',
  '/404error'
];

function Layout({ children, onFavoriteClick }) {
  const location = useLocation();
  const flyersData = location.state?.flyers;

  const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);
  const isFlyerRoute = matchPath("/Shop-page/:productId/flyer/:id", location.pathname);

  return (
    <div className='h-[100%]'>
      {shouldShowNavbar && (
        isFlyerRoute ? (
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