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
        borderRadius: '50%', // This makes the container circular
        overflow: 'hidden', // This ensures the image doesn't spill outside the circular container
      }}
    >
      <img
        src={avatarImage}
        alt="User Avatar"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // This makes the image cover the container
          objectPosition: 'center', // This centers the image within the container
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