import React from "react";
import "./navbar-rekap.css";
import logo from "../../componnets/assest/logo.png";
import Logoutbutton from "./Logoutbutton-rekap";

function Navbar({ onLogout, setDashboardPage }) {
  return (
    <div className="sidebar">
      <img src={logo} alt="logo" width={100} />
      <p>
        Absensi <br /> Mengaji
      </p>

      <button onClick={() => setDashboardPage("mengisi")}>
        Mengisi Absensi
      </button>

      <button onClick={() => setDashboardPage("rekap")}>
        Rekap Absensi
      </button>

      <button onClick={() => setDashboardPage("murid")}>
        Cek Data Murid
      </button>
<div className="logout1">
  
      <Logoutbutton onLogout={onLogout} />
</div>
    </div>

  );
}

export default Navbar;
