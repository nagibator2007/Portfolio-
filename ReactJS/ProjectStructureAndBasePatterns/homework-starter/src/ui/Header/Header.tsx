import React from 'react';
import Logo from '../Logo/Logo';
import Avatar from '../Avatar/Avatar';
import './style.css';

interface HeaderProps {
  userAvatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ userAvatarUrl }) => {
  return (
    <header className="header">
      <Logo />
      <Avatar url={userAvatarUrl} alt="User Avatar" />
    </header>
  );
};

export default Header;