import React from 'react';

import logo from '../../sw-logo.svg';

const Loader = ({className}) => {
  return (<img src={logo} className={className} alt="logo" />)
}

export default Loader;
