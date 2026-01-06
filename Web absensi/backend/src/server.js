/**
 * MAIN SERVER FILE
 * Express.js Server dengan fitur:
 * - Authentication (JWT)
 * - Absensi Management
 * - User/Siswa Management
 * - Data Structures: Stack & Linked List
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const absensiRoutes = require('./routes/absensiRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inisialisasi database
db.initializeDb();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Web Absensi Backend API Documentation',
    version: '1.0.0',
    dataStructures: {
      stack: 'Digunakan untuk menyimpan history absensi (10 record terbaru)',
      linkedList: 'Digunakan untuk menyimpan data siswa'
    },
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
        updatePassword: 'PUT /api/auth/update-password'
      },
      absensi: {
        submit: 'POST /api/absensi/submit',
        myAbsensi: 'GET /api/absensi/my-absensi',
        history: 'GET /api/absensi/history',
        statistik: 'GET /api/absensi/statistik',
        byDate: 'GET /api/absensi/by-date?date=YYYY-MM-DD',
        byMonthYear: 'GET /api/absensi/by-month-year?month=1&year=2024',
        all: 'GET /api/absensi/all (admin)',
        update: 'PUT /api/absensi/:id (admin)',
        delete: 'DELETE /api/absensi/:id (admin)'
      },
      user: {
        getAllSiswa: 'GET /api/user/all (admin)',
        searchSiswa: 'GET /api/user/search?keyword=nama',
        getSiswaById: 'GET /api/user/:id',
        addSiswa: 'POST /api/user/add (admin)',
        updateSiswa: 'PUT /api/user/:id',
        deleteSiswa: 'DELETE /api/user/:id (admin)'
      }
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/absensi', absensiRoutes);
app.use('/api/user', userRoutes);

// Error handling - 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    path: req.originalUrl
  });
});

// Error handling - Server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║         WEB ABSENSI - BACKEND SERVER                  ║
║                                                       ║
║  Server berjalan di: http://localhost:${PORT}           ║
║  Environment: ${process.env.NODE_ENV}                    ║
║                                                       ║
║  📚 Data Structures:                                   ║
║    - Stack: History absensi (LIFO)                     ║
║    - Linked List: Data siswa                           ║
║                                                       ║
║  📖 Dokumentasi: http://localhost:${PORT}/api/docs      ║
╚═══════════════════════════════════════════════════════╝
  `);
});
