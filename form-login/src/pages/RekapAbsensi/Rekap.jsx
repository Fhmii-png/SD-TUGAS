import { useState } from "react";
import "./Rekap.css";

function Rekap() {
  const [periode, setPeriode] = useState("minggu");

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filter Rekap Absensi Siswa</h2>

      <label className="filter-label">Pilih Periode Waktu</label>

      <div className="filter-controls">
        <select
          className="filter-select"
          value={periode}
          onChange={(e) => setPeriode(e.target.value)}
        >
          <option value="hari">hari ini</option>
          <option value="minggu">minggu ini</option>
          <option value="bulan">bulan ini</option>
        </select>

        <button className="filter-button">
          tampilkan rekap <span className="icon">📊</span>
        </button>
      </div>

  
    </div>
  );
}

export default Rekap;
