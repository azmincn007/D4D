import React from 'react';
import avatar from '../../../assets/avatarboys.png';
import avt2 from '../../../assets/avt2.png';

function AvatarComponent({ height, width, showAvatar, profileLogo }) {
  let avatarImage;

  if (profileLogo) {
    avatarImage = `https://hezqa.com${profileLogo}`;
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
        alt=""
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
};

export default AvatarComponent;