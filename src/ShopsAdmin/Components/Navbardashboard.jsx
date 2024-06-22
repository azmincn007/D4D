import React from "react";
import Logo from "../Assets/Logo.png";
import Regiondropdown from "../../Pages/Navbar/navcomponents/Regiondropdown";
import AvatarComponent from "../../Pages/Navbar/navcomponents/AvatarComponent";
import { Link } from "react-router-dom";

function Navbardashboard({ onAvatarClick }) {
  const showAvatar = true;

  return (
    <div className="navbardashboard bg-[#131921] flex justify-between">
      <div>
        <Link to={'/Restorentdashboard'}>
          <img className="w-[80px] h-[80px]" src={Logo} alt="" />
        </Link>
      </div>
      <div className="flex items-center px-10">
       
        <div onClick={onAvatarClick}>
          <AvatarComponent showAvatar={showAvatar} />
        </div>
      </div>
    </div>
  );
}

export default Navbardashboard;