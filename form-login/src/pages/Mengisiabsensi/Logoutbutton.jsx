import React from 'react';
import './button.css';

const Logoutbutton = ({ onLogout }) => {
  return (
    <button className='logout1' onClick={onLogout}>
      Logou
    </button>
  );
};

export default Logoutbutton;