import React from "react";
import { useState } from "react";
import "./navbar.css";
import "./buttonmenu.css";
import logo from "../../componnets/assest/logo.png";
import Logoutbutton from "./Logoutbutton";

function Navbar({ onLogout, setDashboardPage }) {

  const [active, setActive] = useState(""); // default aktif
    // fungsi untuk ganti halaman + set active
  const handleClick = (page) => {
    setDashboardPage(page); // ganti halaman utama
    setActive(page);        // set button aktif
  };

  return (
    <div className="sidebar1">
      <img src={logo} alt="logo" width={100} />
      <p>
        Absensi <br /> Mengaji
      </p>

      <button 
        className={active === "mengisi" ? "menubutton active" : "menubutton"} 
        onClick={() => handleClick("mengisi")}
      >
        Mengisi Absensi
      </button>

      <button 
        className={active === "rekap" ? "menubutton active" : "menubutton"} 
        onClick={() => handleClick("rekap")}
      >
        Rekap Absensi
      </button>

      <button 
        className={active === "murid" ? "menubutton active" : "menubutton"} 
        onClick={() => handleClick("murid")}
      >
        Cek Data Murid
      </button>

      <Logoutbutton onLogout={onLogout} />
    </div>

  );
}

export default Navbar;
