import React from 'react';
import style from './index.scss';

const SwButton = ({children, onClick, className}) => {
  return (
    <button className={`${style.primary} ${className}`} onClick={onClick}>{children}</button>
  )
}

export default SwButton;