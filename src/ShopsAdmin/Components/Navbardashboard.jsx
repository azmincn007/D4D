import React from "react";
import Logo from "../Assets/Logo.png";
import AvatarComponent from "../../Pages/Navbar/navcomponents/AvatarComponent";
import { Link } from "react-router-dom";

function Navbardashboard({ onAvatarClick, profileLogo, isLoading }) {
  const showAvatar = true;

  const ShimmerEffect = () => (
    <div className="animate-pulse bg-gradient-to-r from-gray-700 to-gray-800 h-[80px] w-full" />
  );

  if (isLoading) {
    return <ShimmerEffect />;
  }

  return (
    <div className="navbardashboard bg-[#131921] flex justify-between h-[80px]">
      <div>
        <Link to={'/Restorentdashboard'}>
          <img className="w-[80px] h-[80px]" src={Logo} alt="" />
        </Link>
      </div>
      <div className="flex items-center px-10">
        <div onClick={onAvatarClick}>
          <AvatarComponent showAvatar={showAvatar} profileLogo={profileLogo} />
        </div>
      </div>
    </div>
  );
}

export default Navbardashboard;