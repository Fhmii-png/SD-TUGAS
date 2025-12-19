import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';   
import QuranLogo from '../assets/WhatsApp_Image_2025-12-07_at_15.20.24-removebg-preview.png';
import './rekap.css';

function Rekap() {
  const navigate = useNavigate();

  // Data dummy sesuai gambar
  const [dataAbsensi, setDataAbsensi] = useState([
    { tgl: '1 nov 2025', materi: 'juz 12', status: 'hadir', note: 'lancar membaca' },
    { tgl: '2 nov 2025', materi: 'juz 12', status: 'hadir', note: '-' },
    { tgl: '3 nov 2025', materi: 'juz 12', status: 'sakit', note: '-' },
  ]);

  const [stats, setStats] = useState({ hadir: 0, izin: 0, sakit: 0, alpa: 0, persen: 0 });

  // Fungsi untuk menghitung statistik secara otomatis
  useEffect(() => {
    const total = dataAbsensi.length;
    const h = dataAbsensi.filter((x) => x.status === 'hadir').length;
    const i = dataAbsensi.filter((x) => x.status === 'izin').length;
    const s = dataAbsensi.filter((x) => x.status === 'sakit').length;
    const a = dataAbsensi.filter((x) => x.status === 'alpa').length;
    
    const p = total > 0 ? Math.round((h / total) * 100) : 0;
    setStats({ hadir: h, izin: i, sakit: s, alpa: a, persen: p });
  }, [dataAbsensi]);

  function handleSimpan() {
    alert("Data rekap telah berhasil disimpan!");
  }

  function handleKembali() {
    console.log("Navigasi kembali...");
  }

  return (
    <div className="container-utama">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="icon-wrapper">
          <img src={QuranLogo} alt="logo" className="icon-book" />
        </div>
        <h2 className="sidebar-title">Absensi<br/>Mengaji</h2>
        
        <div className="menu-container">
          <button className="btn-menu">Mengisi Absensi</button>
          <button className="btn-menu active">Rekap Absensi</button>
          <button className="btn-menu">Cek Data Murid</button>
        </div>

        <button className="btn-logout">Logout</button>
      </aside>

      {/* Main Content Section */}
      <main className="main-content">
        <header className="top-header">
          <h1 className="header-title">Hasil Rekap Absensi</h1>
          <span className="current-date">07 Desember 2025</span>
        </header>

        <section className="rekap-panel">
          <div className="rekap-tbcolor">
            <p className="student-info">rekap kehadiran siswa: <strong>fiat</strong></p>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">total kehadiran</span>
              <span className="stat-value blue-text">{19}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">izin</span>
              <span className="stat-value light-blue-text">{1}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">sakit</span>
              <span className="stat-value green-text">{stats.sakit}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">alpa</span>
              <span className="stat-value red-text">{stats.alpa}</span>
            </div>
          </div>

          <div className="percent-box">
            <span className="percent-label">presentasi kehadiran</span>
            <span className="percent-value">90%</span>
          </div>

          <div className="table-wrapper">
            <table className="absensi-table">
              <thead>
                <tr>
                  <th>tanggal</th>
                  <th>materi</th>
                  <th>status</th>
                  <th>catatan guru</th>
                </tr>
              </thead>
              <tbody>
                {dataAbsensi.map((item, index) => (
                  <tr key={index}>
                    <td>{item.tgl}</td>
                    <td>{item.materi}</td>
                    <td className={item.status === 'sakit' ? 'green-text' : 'blue-text'}>
                      {item.status}
                    </td>
                    <td className="note-text">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
          </div>
           <div className="action-footer">
            <button className="btn-back" onClick={handleKembali}>Kembali</button>
            <button className="btn-save" onClick={handleSimpan}>Simpan</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Rekap;