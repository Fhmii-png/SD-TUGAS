import React from "react";
import "./navbar.css";
import logo from "./logo.png";
import Logoutbutton from "./Logoutbutton";

function Navbar() {
  return (
    <div className="sidebar">
      <img src={logo} alt="logo" width={106} height={90.36} />

      <p>Absensi <br /> Mengaji</p>

      <a href="#">Mengisi Absensi</a>
      <a href="#">Rekap Absensi</a>
      <a href="#">Cek Data Murid</a>

      <Logoutbutton />
    </div>
  );
}

export default Navbar;
