/**
 * ROUTES - USER/SISWA
 * Menggunakan LINKED LIST untuk data siswa
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

// Inisialisasi linked list saat pertama kali
userController.initializeSiswaList();

// Protected routes
router.get('/all', verifyToken, userController.getAllSiswa);
router.get('/search', verifyToken, userController.searchSiswa);
router.get('/:id', verifyToken, userController.getSiswaById);

// Admin routes
router.post('/add', verifyToken, userController.addSiswa);
router.put('/:id', verifyToken, userController.updateSiswa);
router.delete('/:id', verifyToken, userController.deleteSiswa);

module.exports = router;
