import React from "react";
import "./navbar.css";
import "./buttonmenu.css";
import logo from "../../componnets/assest/logo.png";
import Logoutbutton from "./Logoutbutton";

function Navbar({ onLogout, setDashboardPage }) {
  return (
    <div className="sidebar1">
      <img src={logo} alt="logo" width={100} />
      <p>
        Absensi <br /> Mengaji
      </p>

      <button className='menubutton' onClick={() => setDashboardPage("mengisi")}>
        Mengisi Absensi
      </button>

      <button className='menubutton' onClick={() => setDashboardPage("rekap")}>
        Rekap Absensi
      </button>

      <button className='menubutton' onClick={() => setDashboardPage("murid")}>
        Cek Data Murid
      </button>
      <Logoutbutton onLogout={onLogout} />
    </div>

  );
}

export default Navbar;
