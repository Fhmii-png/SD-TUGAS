import { useState } from "react";
import "./tabelK-rekap.css";

function TabelK() {
  const [data, setData] = useState([
    { id: 1, nama: "Muhammad Rizal", nomor: "001", status: "hadir" },
    { id: 2, nama: "Ali Bin Abu Tholib", nomor: "002", status: "izin" },
  ]);

  const ubahStatus = (id, statusBaru) => {
    setData(
      data.map((row) =>
        row.id === id ? { ...row, status: statusBaru } : row
      )
    );
  };

  return (
    <div className="absensi-box">
      <table className="absensi-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>ID</th>
            <th>Status Kehadiran</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.nama}</td>
              <td>{row.nomor}</td>
              <td>
                <select
                  className={`status-select ${row.status}`}
                  value={row.status}
                  onChange={(e) =>
                    ubahStatus(row.id, e.target.value)
                  }
                >
                  <option value="hadir">Hadir</option>
                  <option value="izin">Izin</option>
                  <option value="sakit">Sakit</option>
                  <option value="alpha">Alpha</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelK;
