import React from "react";
import "./navbar.css";
// Jalur logo disesuaikan dengan folder assets Anda
import logo from "../../componnets/assest/logo.png"; 

// GUNAKAN HURUF KECIL 'l' agar sesuai dengan nama file fisik Anda
import Logoutbutton from './logoutbutton.jsx'; 

function Navbar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="logo" width={100} /> {/* Pastikan logo digunakan agar warning hilang */}
        <p>Absensi <br /> Mengaji</p>
      </div>
      {/* ... links lainnya ... */}
      <Logoutbutton onLogout={onLogout} />
    </div>
  );
}
export default Navbar;