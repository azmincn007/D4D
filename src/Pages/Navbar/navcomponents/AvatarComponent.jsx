import React from 'react';
import avatar from '../../../assets/avatarboys.png';
import avt2 from '../../../assets/avt2.png';
import { API_BASE_URL } from '../../../config/config';

function AvatarComponent({ height, width, showAvatar, profileLogo, src }) {
  let avatarImage;

  


  if (src) {
    avatarImage = src;
  } else if (profileLogo) {
    avatarImage = `${API_BASE_URL}${profileLogo}`;
  } else {
    avatarImage = showAvatar ? avt2 : avatar;
  }


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
        onError={(e) => {
          console.error('Error loading image:', e);
          e.target.src = showAvatar ? avt2 : avatar;
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
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