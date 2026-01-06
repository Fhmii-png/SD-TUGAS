/**
 * MIDDLEWARE AUTENTIKASI
 * Menggunakan JWT untuk validasi token
 */

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'No token provided'
    });
  }

  // Hapus "Bearer " dari token jika ada
  const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to authenticate token'
      });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = verifyToken;
