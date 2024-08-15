import React, { useRef } from 'react';
import { FaCamera } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { API_BASE_URL } from '../../config/config';

const ProfileBanner = ({ circleImage, backgroundImage, showEditIcon, onImageChange, onBackgroundImageChange }) => {
  const circleInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  const circleStyle = circleImage
    ? {
        backgroundImage: `url(${typeof circleImage === 'string' && !circleImage.startsWith('blob:') ? `${API_BASE_URL}/${circleImage}` : circleImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
    : { backgroundColor: '#F1F1F1' };

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${typeof backgroundImage === 'string' && !backgroundImage.startsWith('blob:') ? `${API_BASE_URL}/${backgroundImage}` : backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
    : { backgroundImage: 'url("../Assets/restdashbg.png")' };

  const handleCircleIconClick = () => {
    circleInputRef.current.click();
  };

  const handleBackgroundIconClick = () => {
    backgroundInputRef.current.click();
  };

  return (
    <div className="bgprofilemodal relative" style={backgroundStyle}>
      <div className="absolute inset-0 flex items-center justify-center">
        {showEditIcon && (
          <div
            className="absolute cursor-pointer"
            onClick={handleBackgroundIconClick}
          >
            <FaCamera className="w-[60px] h-[60px] text-black opacity-70" />
          </div>
        )}
      </div>
      <div
        className="circle-image flex items-center justify-center relative"
        style={circleStyle}
      >
        {!circleImage && <FaCamera className="w-[30px] h-[30px]" />}
        {showEditIcon && (
          <div
            className="absolute bottom-[10px] right-[-10px] bg-yellow rounded-full p-1 cursor-pointer"
            onClick={handleCircleIconClick}
          >
            <FiEdit2 className="w-[16px] h-[16px] text-gray-600" />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={circleInputRef}
        style={{ display: 'none' }}
        accept="image/png, image/jpeg"
        onChange={onImageChange}
      />
      <input
        type="file"
        ref={backgroundInputRef}
        style={{ display: 'none' }}
        accept="image/png, image/jpeg"
        onChange={onBackgroundImageChange}
      />
    </div>
  );
};

export default ProfileBanner;