import React, { useState } from 'react';
// Import CSS Dashboard (Pastikan file ini sudah dibuat di folder src/pages/)
import './pages/Mengisiabsensi/dashboard.css'; 

import LoginForm from './pages/LoginPage/LoginPage.jsx'; 
import Mengisiabsensi from './pages/Mengisiabsensi/Navbar.jsx';

// ... sisa kode App.js ...
import RegisterForm from './pages/RegisterPage/RegisterPage.jsx';
import LupapasswordForm from './pages/ForgotPasswordPage/LupaPasswordPage.jsx';


// Konstanta untuk tampilan
const VIEW_LOGIN = 'login';
const VIEW_REGISTER = 'register';
const VIEW_FORGOT_PASSWORD = 'forgot_password'; 


function App() {
  const [view, setView] = useState('login');

  const handleLoginSuccess = () => setView('dashboard');
  const handleLogout = () => setView('login');

  return (
    <div className="App">
      {view === 'dashboard' ? (
        <div className="dashboard-layout">
          <Mengisiabsensi onLogout={handleLogout} />
          <div className="dashboard-content">
            <h1>Assalamualaikum!</h1>
            <p>Selamat datang di sistem Absensi Mengaji.</p>
          </div>
        </div>
      ) : (
        <div className="auth-container">
          {view === 'login' && (
            <LoginForm 
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setView('register')}
              onSwitchToForgotPassword={() => setView('forgot_password')}
            />
          )}
          {view === 'register' && <RegisterForm onSwitchToLogin={() => setView('login')} />}
          {view === 'forgot_password' && <LupapasswordForm onSwitchToLogin={() => setView('login')} />}
        </div>
      )}
    </div>
  );
}

export default App;