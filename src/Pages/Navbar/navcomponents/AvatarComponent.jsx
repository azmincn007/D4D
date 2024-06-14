import React from 'react';
import avatar from '../../../assets/avatarboys.png';
import avt2 from '../../../assets/avt2.png';

function AvatarComponent({ height, width, showAvatar }) {
  const avatarImage = showAvatar ? avt2 : avatar;

  return (
    <img
      style={{ height: `${height}px`, width: `${width}px` }}
      src={avatarImage}
      alt=""
    />
  );
}

AvatarComponent.defaultProps = {
  height: 50,
  width: 50,
  showAvatar: false, // Set default value to false if not provided
};

export default AvatarComponent;