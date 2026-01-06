/**
 * USER CONTROLLER
 * Menangani data user/siswa
 * Menggunakan LINKED LIST untuk menyimpan daftar siswa
 */

const LinkedList = require('../dataStructures/LinkedList');
const db = require('../database/db');

// Global linked list untuk menyimpan data siswa
const siswalist = new LinkedList();

// Inisialisasi linked list dari database
const initializeSiswaList = () => {
  const users = db.getAllUsers();
  users.forEach(user => {
    siswalist.append(user);
  });
};

// Dapatkan semua siswa (dari linked list)
const getAllSiswa = (req, res) => {
  try {
    // Validasi hanya admin yang bisa
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Hanya admin yang dapat mengakses data ini'
      });
    }

    const siswaArray = siswalist.toArray();
    const filteredSiswa = siswaArray
      .filter(s => s.role === 'siswa')
      .map(s => ({
        id: s.id,
        name: s.name,
        email: s.email,
        role: s.role,
        createdAt: s.createdAt
      }));

    return res.status(200).json({
      success: true,
      message: 'Data semua siswa (dari Linked List)',
      data: filteredSiswa,
      total: filteredSiswa.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Dapatkan siswa berdasarkan ID
const getSiswaById = (req, res) => {
  try {
    const { id } = req.params;

    const siswa = siswalist.findBy('id', id);
    if (!siswa || siswa.role !== 'siswa') {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data siswa berhasil diambil',
      data: {
        id: siswa.id,
        name: siswa.name,
        email: siswa.email,
        role: siswa.role,
        createdAt: siswa.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Tambah siswa baru (dan ke linked list)
const addSiswa = (req, res) => {
  try {
    // Validasi hanya admin
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Hanya admin yang dapat menambah siswa'
      });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, dan name diperlukan'
      });
    }

    // Cek email sudah ada
    const existingUser = db.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Simpan ke database
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newSiswa = db.saveUser({
      email,
      password: hashedPassword,
      name,
      role: 'siswa'
    });

    // Tambah ke linked list
    siswalist.append(newSiswa);

    return res.status(201).json({
      success: true,
      message: 'Siswa berhasil ditambahkan',
      data: {
        id: newSiswa.id,
        name: newSiswa.name,
        email: newSiswa.email,
        role: newSiswa.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Update siswa
const updateSiswa = (req, res) => {
  try {
    // Validasi hanya admin atau user sendiri
    if (req.userRole !== 'admin' && req.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk update data ini'
      });
    }

    const { id } = req.params;
    const { name, email } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;

    const updatedSiswa = db.updateUser(id, updates);
    if (!updatedSiswa) {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Siswa berhasil diupdate',
      data: {
        id: updatedSiswa.id,
        name: updatedSiswa.name,
        email: updatedSiswa.email,
        role: updatedSiswa.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Hapus siswa
const deleteSiswa = (req, res) => {
  try {
    // Validasi hanya admin
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Hanya admin yang dapat menghapus siswa'
      });
    }

    const { id } = req.params;

    // Hapus dari database
    const deletedSiswa = db.deleteUser(id);
    if (!deletedSiswa) {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }

    // Hapus dari linked list
    siswalist.remove(deletedSiswa);

    return res.status(200).json({
      success: true,
      message: 'Siswa berhasil dihapus',
      data: {
        id: deletedSiswa.id,
        name: deletedSiswa.name,
        email: deletedSiswa.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// Cari siswa berdasarkan nama
const searchSiswa = (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: 'Keyword pencarian diperlukan'
      });
    }

    const siswaArray = siswalist.toArray();
    const results = siswaArray.filter(s =>
      s.role === 'siswa' &&
      (s.name.toLowerCase().includes(keyword.toLowerCase()) ||
        s.email.toLowerCase().includes(keyword.toLowerCase()))
    ).map(s => ({
      id: s.id,
      name: s.name,
      email: s.email,
      role: s.role
    }));

    return res.status(200).json({
      success: true,
      message: `Hasil pencarian untuk "${keyword}"`,
      data: results,
      total: results.length
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
  initializeSiswaList,
  getAllSiswa,
  getSiswaById,
  addSiswa,
  updateSiswa,
  deleteSiswa,
  searchSiswa
};
