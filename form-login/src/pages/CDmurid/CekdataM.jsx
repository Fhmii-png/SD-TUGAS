import "./cekdataM.css";
import { useState } from "react";

import SearchBar from "../RekapAbsensi/Searchbar.jsx";
import logo from "./bocil.png";
import Buttonedit from "./buttonedit.jsx";

function CekdataM() {

 const studentsData = [
   
  ];

    const [searchQuery, setSearchQuery] = useState("");
      const filteredStudents = studentsData.filter(student =>
student.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        placeholder="Cari Nama Murid..."  />
      </div>
        <div className="kotak">
       
            <div className="baris">
            <span className="label">Nama</span>
            <span className="titik">: .... </span>
            </div>

            <div className="baris">
            <span className="label">Umur</span>
            <span className="titik">: .... </span>
            </div>

            <div className="baris">
            <span className="label">Tanggal Lahir</span>
            <span className="titik">: .... </span>
            </div>

            <div className="baris">
            <span className="label">Alamat</span>
            <span className="titik">: .... </span>
            </div>

            <div className="baris">
            <span className="label">Jenis Kelamin</span>
            <span className="titik">: .... </span>
            </div>

            <img src={logo} alt="Bocil" className="gambar" />

            <div className="baris2">
                <span className="label2">Nama Orang tua</span>
                <span className="titik2">: ...</span>
            </div>

            <div className="baris2">   
                <span className="label2">No Telp</span>
                <span className="titik2">: ...</span>
            </div> 

        </div>

        <div className="tomboledit">
          <Buttonedit />
        </div>

    </div>
  );
}
export default CekdataM;