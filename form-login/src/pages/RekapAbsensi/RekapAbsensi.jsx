import "./dashboard-rekap.css";
import Navbar from "./Navbar-rekap";
import Logoutbutton from "./Logoutbutton-rekap";
import Judul from "./Judul-rekap";
import TabelK from "./TabelK-rekap";


function RekapAbsensi() {
  return (
    <div className="gambar">

    <div className="dashboard">
       
      <div className="dashboard-content">
        <Judul/>

        <TabelK />
      </div>
    </div>
    </div>
  );
}export default RekapAbsensi;