import { useState } from "react";
import "./dashboard-rekap.css";
import Judul from "./Judul-rekap";
import Rekap from "./Rekap";
import SearchBar from "./Searchbar";


function RekapAbsensi({ setDashboardPage }) {

  // DATA CONTOH (sesuaikan dengan data aslimu)
  const studentsData = [
    { id: 1, name: "Ahmad Fauzi", kelas: "Iqra 3" },
    { id: 2, name: "Fatimah Azzahra", kelas: "Iqra 4" },
    { id: 3, name: "Muhammad Rizki", kelas: "Iqra 2" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [periode, setPeriode] = useState("minggu");
  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Judul />

      {/* SEARCH BAR */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari nama murid..."
      />
      
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
        
        <button className="filter-button" onClick={() => setDashboardPage("rekap1")}>
          tampilkan rekap <span className="icon">📊</span>
        </button>
      <Rekap students={filteredStudents} setDashboardPage={setDashboardPage} />
        
      </div>
    </div>


    </div>
  );
}

export default RekapAbsensi;
