import React from 'react';
import "./style.css"

interface AvatarProps {
  url?: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ url, alt }) => {
  return (
    <img
      src={url || 'public/avatar.png'}
      alt={alt || 'User Avatar'}
      className="avatar"
    />
  );
};

export default Avatar;