import "./cekdataM.css";
import { useState, useEffect } from "react";

import SearchBar from "../RekapAbsensi/Searchbar.jsx";
import logo from "./bocil.png";
import Buttonedit from "./buttonedit.jsx";

function CekdataM() {

  const [studentsData, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/mahasiswa");
        const result = await response.json();
        if (result.status === "success") {
          setStudentsData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // Poll updates
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredStudents = studentsData.filter(student =>
    (student.nama || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="atas">
        <div className="judul-cekdata">
          Cek Data Murid
        </div>
      </div>

      <div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari Nama Murid..." />
      </div>
      <div className="list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div className="kotak" key={index} style={{ marginBottom: '20px' }}>
              <div className="baris">
                <span className="label">Nama</span>
                <span className="titik">: {student.nama}</span>
              </div>

              <div className="baris">
                <span className="label">NIS</span>
                <span className="titik">: {student.nim}</span>
              </div>

              <div className="baris">
                <span className="label">Jilid/Kelas</span>
                <span className="titik">: {student.jurusan || "Iqra/Al-Quran"}</span>
              </div>

              <div className="baris">
                <span className="label">Alamat</span>
                <span className="titik">: - </span>
              </div>

              <img src={logo} alt="Bocil" className="gambar" />
            </div>
          ))
        ) : (
          <div className="kotak">
            <p style={{ textAlign: "center", padding: "20px" }}>Data tidak ditemukan atau belum ada</p>
          </div>
        )}
      </div>

      <div className="tomboledit">
        <Buttonedit />
      </div>

    </div>
  );
}
export default CekdataM;