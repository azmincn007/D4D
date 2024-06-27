import React, { useRef } from 'react';
import { FaCamera } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const ProfileBanner = ({ circleImage, showEditIcon, onImageChange }) => {
  const fileInputRef = useRef(null);

  const circleStyle = circleImage
    ? {
        backgroundImage: `url(https://hezqa.com/${circleImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
    : { backgroundColor: '#F1F1F1' };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bgprofilemodal relative">
      <div className="absolute inset-0 flex items-center justify-center"></div>
      <div
        className="circle-image flex items-center justify-center relative"
        style={circleStyle}
      >
        {!circleImage && <FaCamera className="w-[30px] h-[30px]" />}
        {showEditIcon && (
          <div
            className="absolute bottom-[10px] right-[-10px] bg-yellow rounded-full p-1 cursor-pointer"
            onClick={handleIconClick}
          >
            <FiEdit2 className="w-[16px] h-[16px] text-gray-600" />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png, image/jpeg"
        onChange={onImageChange}
      />
    </div>
  );
};

export default ProfileBanner;