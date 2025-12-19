// src/App.js

import React, { useState } from 'react';
import LoginForm from './pages/LoginPage/LoginPage.jsx';
import RegisterForm from './pages/RegisterPage/RegisterPage.jsx';
import LupapasswordForm from './pages/ForgotPasswordPage/LupaPasswordPage.jsx';


// Konstanta untuk tampilan
const VIEW_LOGIN = 'login';
const VIEW_REGISTER = 'register';
const VIEW_FORGOT_PASSWORD = 'forgot_password'; 

function App() {
  const [viewStack, setViewStack] = useState([VIEW_LOGIN]);

  const pushView = (newView) => {
    setViewStack(prevStack => [...prevStack, newView]);
  };

  const popView = () => {
    if (viewStack.length > 1) {
      setViewStack(prevStack => prevStack.slice(0, prevStack.length - 1));
    }
  };

  const currentView = viewStack[viewStack.length - 1];

  // Fungsi Aksi
  const switchToRegister = () => { pushView(VIEW_REGISTER); };
  const switchToForgotPassword = () => { pushView(VIEW_FORGOT_PASSWORD); }; 
  const switchToLogin = () => { popView(); }; 

  let activeComponent = null;

  switch (currentView) {
    case VIEW_LOGIN:
      activeComponent = (
        <LoginForm 
            onSwitchToRegister={switchToRegister} 
            onSwitchToForgotPassword={switchToForgotPassword}
        />
      );
      break;
    case VIEW_REGISTER:
      activeComponent = <RegisterForm onSwitchToLogin={switchToLogin} />;
      break;
    case VIEW_FORGOT_PASSWORD:
      // PENTING: Gunakan NAMA KOMPONEN YANG DI-IMPORT (LupapasswordForm)
      activeComponent = <LupapasswordForm onSwitchToLogin={switchToLogin} />; // <-- Penggunaan yang BENAR
      break;
    default:
      activeComponent = <LoginForm onSwitchToRegister={switchToRegister} onSwitchToForgotPassword={switchToForgotPassword} />;
  }

  return (
    <div className="App">
      <div key={currentView} className="view-transition-container"> 
        {activeComponent}
      </div>
    </div>
  );
}

export default App;