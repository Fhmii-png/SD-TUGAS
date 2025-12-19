// src/componnets/login/login2.jsx (LOGIN FORM)

import React, { useState } from 'react';
import { 
  User, Lock, LogIn, Eye, EyeOff, AlertCircle 
} from 'lucide-react';

import logo from '../../componnets/assest/logo.png';
import './Login.css'; 

// Menerima prop onSwitchToRegister DAN onSwitchToForgotPassword
export default function LoginForm({ onSwitchToRegister, onSwitchToForgotPassword }) { 
  // ... (State & Logika Lainnya sama seperti sebelumnya) ...
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const validUsers = { 'admin': '123' };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Isi username dan password terlebih dahulu');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (validUsers[username] !== password) {
        setError('Username atau Password salah!');
      } else {
        console.log('Login Berhasil:', { username, rememberMe });
        alert(`Login berhasil! Assalamualaikum, ${username}!`);
        setUsername('');
        setPassword('');
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="form-card">
        
        {/* ... (Header dan Judul) ... */}
        <div className="icon-container">
          <div className="icon-box">
            <img src={logo} alt="Logo" className="icon-box-image" />
          </div>
        </div>
        
        <h1 className="main-title">Absensi<br/>Mengaji</h1>
        
        <p className="arabic-text" dir="rtl">
          بسم الله الرحمن الرحيم
        </p>

        <div className="decorative-line">
          <div className="dot"></div>
          <div className="line"></div>
          <div className="dot"></div>
        </div>

        {error && (
          <div className="error-message shake">
            <AlertCircle className="error-icon" />
            <span className="error-text">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="input-label" htmlFor="login-username">Username</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                id="login-username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                className="input-field"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="input-label" htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="input-field"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-btn"
                disabled={isLoading}
              >
                {showPassword ? ( <EyeOff className="icon" /> ) : ( <Eye className="icon" /> )}
              </button>
            </div>
          </div>
          
          {/* Ingat Saya & Lupa Password (Tombol Lupa Password) */}
          <div className="form-options">
            <label className="remember-me-label" htmlFor="remember-me-checkbox">
              <input
                id="remember-me-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
                disabled={isLoading}
              />
              <span>Ingat saya</span>
            </label>
            {/* PENTING: Menghubungkan ke Form Lupa Password */}
            <button 
                type="button" 
                className="forgot-password-btn" 
                disabled={isLoading}
                onClick={onSwitchToForgotPassword} // <-- PUSH VIEW_FORGOT_PASSWORD
            >
              Lupa Password ?
            </button>
          </div>

          {/* Tombol Masuk & Daftar Akun Baru */}
          <button type="submit" disabled={isLoading} className={`main-btn ${isLoading ? 'loading' : ''}`}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <LogIn className="btn-icon" />
                <span>Masuk</span>
              </>
            )}
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Atau</span>
            <div className="divider-line"></div>
          </div>

          <button 
            type="button" 
            className="secondary-btn" 
            disabled={isLoading}
            onClick={onSwitchToRegister} 
          >
            Daftar Akun Baru
          </button>
        </form>
      </div>
    </div>
  );
}