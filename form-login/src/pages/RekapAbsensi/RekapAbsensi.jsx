import "./dashboard.css";
import Navbar from "./Navbar";
import Logoutbutton from "./Logoutbutton";
import Judul from "./Judul";
import TabelK from "./TabelK";


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