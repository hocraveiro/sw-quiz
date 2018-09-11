import React from 'react';
import style from './container.scss';

const Container = ({children, className}) => {
  return (
    <div className={`${style.container} ${className}`}>
      {children}
    </div>
  )
}

export default Container;