import React from 'react';

const Logoutbutton = ({ onLogout }) => {
  return (
    <button 
      onClick={onLogout}
      style={{
        marginTop: 'auto',
        background: '#d6a5a5ff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '100%'
      }}
    >
      Keluar
    </button>
  );
};

export default Logoutbutton;