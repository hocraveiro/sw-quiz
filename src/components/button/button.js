import React from 'react';
import style from './button.scss';

const SwButton = ({children, onClick, className}) => {
  return (
    <button className={`${style.primary} ${className}`} onClick={onClick}>{children}</button>
  )
}

export default SwButton;