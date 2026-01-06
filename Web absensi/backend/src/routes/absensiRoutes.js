/**
 * ROUTES - ABSENSI
 */

const express = require('express');
const router = express.Router();
const absensiController = require('../controllers/absensiController');
const verifyToken = require('../middleware/auth');

// Protected routes - memerlukan autentikasi
router.post('/submit', verifyToken, absensiController.submitAbsensi);
router.get('/my-absensi', verifyToken, absensiController.getMyAbsensi);
router.get('/history', verifyToken, absensiController.getAbsensiHistory);
router.get('/statistik', verifyToken, absensiController.getStatistik);

// Query based routes
router.get('/by-date', verifyToken, absensiController.getAbsensiByDate);
router.get('/by-month-year', verifyToken, absensiController.getAbsensiByMonthYear);

// Admin routes
router.get('/all', verifyToken, absensiController.getAllAbsensi);
router.put('/:id', verifyToken, absensiController.updateAbsensi);
router.delete('/:id', verifyToken, absensiController.deleteAbsensi);

module.exports = router;
