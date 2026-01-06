import { useState, useEffect } from "react";
import "./dashboard-rekap.css";
import Judul from "./Judul-rekap";
import Rekap from "./Rekap";
import SearchBar from "./Searchbar";


function RekapAbsensi({ setDashboardPage }) {

  // State untuk data
  const [studentsData, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [periode, setPeriode] = useState("minggu");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/mahasiswa");
        const result = await response.json();
        if (result.status === "success") {
          setStudentsData(result.data);
        }
      } catch (error) {
        console.error("Gagal ambil data rekap:", error);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = studentsData.filter(student =>
    (student.nama || "").toLowerCase().includes(searchQuery.toLowerCase())
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
