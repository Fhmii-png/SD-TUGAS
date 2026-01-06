/**
 * AUTH CONTROLLER
 * Menangani login, register, dan logout
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

// Register user baru
const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Validasi input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, dan name diperlukan'
      });
    }

    // Cek apakah user sudah ada
    const existingUser = db.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = db.saveUser({
      email,
      password: hashedPassword,
      name,
      role: role || 'siswa'
    });

    return res.status(201).json({
      success: true,
      message: 'Register berhasil',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
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

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password diperlukan'
      });
    }

    // Cari user
    const user = db.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Verifikasi password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
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

// Get user profile
const getProfile = (req, res) => {
  try {
    const user = db.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
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

// Update password
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Old password dan new password diperlukan'
      });
    }

    const user = db.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Verifikasi old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Password lama salah'
      });
    }

    // Hash password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const updatedUser = db.updateUser(req.userId, {
      password: hashedNewPassword
    });

    return res.status(200).json({
      success: true,
      message: 'Password berhasil diubah',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name
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

module.exports = {
  register,
  login,
  getProfile,
  updatePassword
};
