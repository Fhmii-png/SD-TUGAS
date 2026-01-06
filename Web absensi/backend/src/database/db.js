/**
 * DATABASE FILE-BASED (JSON)
 * Menggunakan file system untuk menyimpan data
 * Data struktur:
 * - Users (Siswa & Admin)
 * - Absensi records
 */

const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '../data');
const usersFile = path.join(dbDir, 'users.json');
const absensiFile = path.join(dbDir, 'absensi.json');

// Inisialisasi direktori data jika belum ada
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Template data awal
const defaultUsers = [
  {
    id: '1',
    email: 'admin@school.com',
    password: '$2a$10$YourHashedPasswordHere',
    name: 'Admin School',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

const defaultAbsensi = [];

// Inisialisasi file jika belum ada
const initializeDb = () => {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify(defaultUsers, null, 2));
  }
  if (!fs.existsSync(absensiFile)) {
    fs.writeFileSync(absensiFile, JSON.stringify(defaultAbsensi, null, 2));
  }
};

// Baca semua users
const getAllUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Baca user berdasarkan email
const getUserByEmail = (email) => {
  const users = getAllUsers();
  return users.find(user => user.email === email);
};

// Baca user berdasarkan ID
const getUserById = (id) => {
  const users = getAllUsers();
  return users.find(user => user.id === id);
};

// Simpan user baru
const saveUser = (user) => {
  const users = getAllUsers();
  user.id = Date.now().toString();
  user.createdAt = new Date().toISOString();
  users.push(user);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  return user;
};

// Update user
const updateUser = (id, updates) => {
  let users = getAllUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return users[index];
  }
  return null;
};

// Hapus user
const deleteUser = (id) => {
  let users = getAllUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    const deleted = users.splice(index, 1);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return deleted[0];
  }
  return null;
};

// Baca semua absensi
const getAllAbsensi = () => {
  try {
    const data = fs.readFileSync(absensiFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading absensi:', error);
    return [];
  }
};

// Simpan absensi baru
const saveAbsensi = (absensiData) => {
  const absensi = getAllAbsensi();
  absensiData.id = Date.now().toString();
  absensiData.timestamp = new Date().toISOString();
  absensi.push(absensiData);
  fs.writeFileSync(absensiFile, JSON.stringify(absensi, null, 2));
  return absensiData;
};

// Dapatkan absensi berdasarkan user ID
const getAbsensiByUserId = (userId) => {
  const absensi = getAllAbsensi();
  return absensi.filter(a => a.userId === userId);
};

// Dapatkan absensi berdasarkan tanggal
const getAbsensiByDate = (date) => {
  const absensi = getAllAbsensi();
  return absensi.filter(a => a.date === date);
};

// Dapatkan absensi berdasarkan bulan/tahun
const getAbsensiByMonthYear = (month, year) => {
  const absensi = getAllAbsensi();
  return absensi.filter(a => {
    const date = new Date(a.timestamp);
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

// Update absensi
const updateAbsensi = (id, updates) => {
  let absensi = getAllAbsensi();
  const index = absensi.findIndex(a => a.id === id);
  if (index !== -1) {
    absensi[index] = { ...absensi[index], ...updates };
    fs.writeFileSync(absensiFile, JSON.stringify(absensi, null, 2));
    return absensi[index];
  }
  return null;
};

// Hapus absensi
const deleteAbsensi = (id) => {
  let absensi = getAllAbsensi();
  const index = absensi.findIndex(a => a.id === id);
  if (index !== -1) {
    const deleted = absensi.splice(index, 1);
    fs.writeFileSync(absensiFile, JSON.stringify(absensi, null, 2));
    return deleted[0];
  }
  return null;
};

module.exports = {
  initializeDb,
  getAllUsers,
  getUserByEmail,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
  getAllAbsensi,
  saveAbsensi,
  getAbsensiByUserId,
  getAbsensiByDate,
  getAbsensiByMonthYear,
  updateAbsensi,
  deleteAbsensi
};
