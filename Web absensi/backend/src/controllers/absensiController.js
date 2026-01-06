/**
 * ABSENSI CONTROLLER
 * Menangani logika absensi
 * Menggunakan STACK untuk history absensi terbaru
 */

const Stack = require('../dataStructures/Stack');
const db = require('../database/db');

// Global stack untuk menyimpan history absensi (10 absensi terbaru)
const absensiHistoryStack = new Stack();
const MAX_HISTORY = 10;

// Submit absensi
const submitAbsensi = (req, res) => {
  try {
    const { date, status, keterangan } = req.body;
    const userId = req.userId;

    // Validasi input
    if (!date || !status) {
      return res.status(400).json({
        success: false,
        message: 'Date dan status diperlukan'
      });
    }

    // Validasi status
    const validStatus = ['Hadir', 'Sakit', 'Izin', 'Alpa'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid. Gunakan: Hadir, Sakit, Izin, atau Alpa'
      });
    }

    // Simpan ke database
    const absensiData = {
      userId,
      date,
      status,
      keterangan: keterangan || '',
      timestamp: new Date().toISOString()
    };

    const savedAbsensi = db.saveAbsensi(absensiData);

    // Tambahkan ke stack history (hanya 10 record terbaru)
    absensiHistoryStack.push(savedAbsensi);
    if (absensiHistoryStack.size() > MAX_HISTORY) {
      absensiHistoryStack.pop();
    }

    return res.status(201).json({
      success: true,
      message: 'Absensi berhasil disimpan',
      data: savedAbsensi
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Dapatkan history absensi (dari stack)
const getAbsensiHistory = (req, res) => {
  try {
    const history = absensiHistoryStack.getAll();
    
    return res.status(200).json({
      success: true,
      message: 'History absensi (10 terbaru)',
      data: history,
      totalHistory: history.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Dapatkan absensi user berdasarkan ID
const getMyAbsensi = (req, res) => {
  try {
    const userId = req.userId;
    const absensi = db.getAbsensiByUserId(userId);

    return res.status(200).json({
      success: true,
      message: 'Absensi user berhasil diambil',
      data: absensi,
      total: absensi.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Dapatkan semua absensi (untuk admin)
const getAllAbsensi = (req, res) => {
  try {
    // Hanya admin yang bisa akses
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Hanya admin yang dapat mengakses data ini'
      });
    }

    const absensi = db.getAllAbsensi();

    return res.status(200).json({
      success: true,
      message: 'Semua data absensi',
      data: absensi,
      total: absensi.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Dapatkan absensi berdasarkan tanggal
const getAbsensiByDate = (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Parameter date diperlukan'
      });
    }

    const absensi = db.getAbsensiByDate(date);

    return res.status(200).json({
      success: true,
      message: `Absensi tanggal ${date}`,
      data: absensi,
      total: absensi.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Dapatkan absensi bulan/tahun (untuk rekap)
const getAbsensiByMonthYear = (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: 'Parameter month dan year diperlukan'
      });
    }

    const monthNum = parseInt(month) - 1; // JavaScript month is 0-indexed
    const yearNum = parseInt(year);

    const absensi = db.getAbsensiByMonthYear(monthNum, yearNum);

    return res.status(200).json({
      success: true,
      message: `Rekap absensi ${month}/${year}`,
      data: absensi,
      total: absensi.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Update absensi
const updateAbsensi = (req, res) => {
  try {
    const { id } = req.params;
    const { status, keterangan } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status diperlukan'
      });
    }

    const validStatus = ['Hadir', 'Sakit', 'Izin', 'Alpa'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid'
      });
    }

    const updatedAbsensi = db.updateAbsensi(id, {
      status,
      keterangan: keterangan || ''
    });

    if (!updatedAbsensi) {
      return res.status(404).json({
        success: false,
        message: 'Absensi tidak ditemukan'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Absensi berhasil diupdate',
      data: updatedAbsensi
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Delete absensi
const deleteAbsensi = (req, res) => {
  try {
    const { id } = req.params;

    const deletedAbsensi = db.deleteAbsensi(id);
    if (!deletedAbsensi) {
      return res.status(404).json({
        success: false,
        message: 'Absensi tidak ditemukan'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Absensi berhasil dihapus',
      data: deletedAbsensi
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Dapatkan statistik absensi
const getStatistik = (req, res) => {
  try {
    const userId = req.userId;
    const userAbsensi = db.getAbsensiByUserId(userId);

    const statistik = {
      hadir: userAbsensi.filter(a => a.status === 'Hadir').length,
      sakit: userAbsensi.filter(a => a.status === 'Sakit').length,
      izin: userAbsensi.filter(a => a.status === 'Izin').length,
      alpa: userAbsensi.filter(a => a.status === 'Alpa').length,
      total: userAbsensi.length
    };

    return res.status(200).json({
      success: true,
      message: 'Statistik absensi',
      data: statistik
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

module.exports = {
  submitAbsensi,
  getAbsensiHistory,
  getMyAbsensi,
  getAllAbsensi,
  getAbsensiByDate,
  getAbsensiByMonthYear,
  updateAbsensi,
  deleteAbsensi,
  getStatistik
};
