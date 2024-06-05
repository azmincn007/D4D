import React from 'react';
import avatar from '../../../assets/avatarboys.png';

function AvatarComponent({ height, width }) {
  return (
    <img
      style={{ height: `${height}px`, width: `${width}px` }}
      src={avatar}
      alt=""
    />
  );
}

AvatarComponent.defaultProps = {
  height: 50,
  width: 50,
};

export default AvatarComponent;