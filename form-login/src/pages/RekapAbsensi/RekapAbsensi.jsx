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

      {/* TABEL */}
      <Rekap students={filteredStudents} />
    </div>
  );
}

export default RekapAbsensi;
