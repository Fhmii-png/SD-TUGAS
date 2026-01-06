import { useState, useEffect } from "react";
import "./tabelK.css";

function TabelK() {
  const [data, setData] = useState([]);
  const [newStudent, setNewStudent] = useState({ nama: "", nim: "" });

  // Fetch data dari backend saat komponen dimuat
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/mahasiswa");
      const result = await response.json();
      if (result.status === "success") {
        setData(result.data); // Asumsi data adalah array dari Linked List backend
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll data setiap 2 detik agar update otomatis (simpel realtime)
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.nama || !newStudent.nim) return alert("Isi semua data!");

    try {
      const response = await fetch("http://localhost:5001/api/mahasiswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: newStudent.nama,
          nim: newStudent.nim,
          jurusan: "Umum" // Default
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setNewStudent({ nama: "", nim: "" });
        fetchData(); // Refresh data
        alert("Santri berhasil ditambahkan!");
      }
    } catch (error) {
      alert("Gagal menambah santri");
    }
  };

  const handleDelete = async (nim) => {
    try {
      const response = await fetch(`http://localhost:5001/api/mahasiswa/${nim}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.status === "success") {
        fetchData(); // Refresh data
        alert("Data Santri dihapus!");
      }
    } catch (error) {
      alert("Gagal menghapus santri");
    }
  };

  return (
    <div className="absensi-box1">
      {/* Form Tambah Santri Sederhana */}
      <div style={{ marginBottom: "20px", padding: "10px", background: "#f0f0f0", borderRadius: "8px" }}>
        <h3>Tambah Santri (Linked List)</h3>
        <form onSubmit={handleAddStudent} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="NIS"
            value={newStudent.nim}
            onChange={(e) => setNewStudent({ ...newStudent, nim: e.target.value })}
            style={{ padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Nama"
            value={newStudent.nama}
            onChange={(e) => setNewStudent({ ...newStudent, nama: e.target.value })}
            style={{ padding: "5px" }}
          />
          <button type="submit" style={{ padding: "5px 15px", background: "#4CAF50", color: "white", border: "none" }}>
            Tambah
          </button>
        </form>
      </div>

      <table className="absensi-table1">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NIS</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: "center" }}>Belum ada data santri</td></tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.nama}</td>
                <td>{row.nim || row.id}</td> {/* Backend pakai nim/id */}
                <td>
                  <button
                    onClick={() => handleDelete(row.nim || row.id)}
                    style={{ background: "#ff4444", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelK;
