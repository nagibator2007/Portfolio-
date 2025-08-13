import React from 'react';
import './style.css'

interface LogoProps {
  name?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ name = 'Eats'}) => {
  return (
    <a href="/" className='header__logo'>
      {name}
    </a>
  );
};

export default Logo;