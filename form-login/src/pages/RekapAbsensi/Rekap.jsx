import { useState } from "react";
import "./Rekap.css";


function Rekap({ students }) {
  return (
    <div className="rekap-container" style={{ marginTop: '20px' }}>
      <table className="absensi-table1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#4CAF50', color: 'white' }}>
            <th style={{ padding: '10px' }}>No</th>
            <th style={{ padding: '10px' }}>Nama</th>
            <th style={{ padding: '10px' }}>NIS</th>
            <th style={{ padding: '10px' }}>Jilid/Kelas</th>
            <th style={{ padding: '10px' }}>Kehadiran (Simulasi)</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '10px' }}>{student.nama}</td>
                <td style={{ padding: '10px' }}>{student.nim || student.id}</td>
                <td style={{ padding: '10px' }}>{student.jurusan || '-'}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  {/* Simulasi data kehadiran acak untuk demo rekap */}
                  {Math.random() > 0.2 ? "Hadir" : "Izin"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Tidak ada data siswa
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Rekap;
