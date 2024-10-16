import React, { useState, useEffect } from 'react';
import avatar from '../../../assets/avatarboys.png';
import avt2 from '../../../assets/avt2.png';
import { API_BASE_URL } from '../../../config/config';

function AvatarComponent({ height, width, showAvatar, profileLogo, src }) {
  const [avatarImage, setAvatarImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let newAvatarImage;
    if (src) {
      newAvatarImage = src;
    } else if (profileLogo) {
      newAvatarImage = `${API_BASE_URL}${profileLogo}`;
    } else {
      newAvatarImage = showAvatar ? avt2 : avatar;
    }
    setAvatarImage(newAvatarImage);
    setImageError(false);
  }, [src, profileLogo, showAvatar]);

  const handleImageError = () => {
    console.error('Error loading image:', avatarImage);
    setImageError(true);
    setAvatarImage(showAvatar ? avt2 : avatar);
  };

  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <img
        src={avatarImage}
        alt="User Avatar"
        onError={handleImageError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      {imageError && <div style={{ color: 'red', fontSize: '10px' }}>Failed to load image</div>}
    </div>
  );
}

AvatarComponent.defaultProps = {
  height: 50,
  width: 50,
  showAvatar: false,
  profileLogo: null,
  src: null,
};

export default AvatarComponent;