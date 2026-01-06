/**
 * API SERVICE - Frontend React
 * Diletakkan di: src/services/api.js
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Helper function untuk melakukan fetch dengan error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Jika ada token, tambahkan ke Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    // Jika response tidak ok, throw error
    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

/**
 * AUTH ENDPOINTS
 */
export const authAPI = {
  /**
   * Register user baru
   * @param {string} email - Email user
   * @param {string} password - Password
   * @param {string} name - Nama lengkap
   */
  register: (email, password, name) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    }),

  /**
   * Login dan dapatkan token
   * @param {string} email - Email user
   * @param {string} password - Password
   */
  login: (email, password) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  /**
   * Dapatkan profile user (protected)
   */
  getProfile: () =>
    fetchAPI('/auth/profile'),

  /**
   * Update password user
   * @param {string} oldPassword - Password lama
   * @param {string} newPassword - Password baru
   */
  updatePassword: (oldPassword, newPassword) =>
    fetchAPI('/auth/update-password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword })
    })
};

/**
 * ABSENSI ENDPOINTS
 */
export const absensiAPI = {
  /**
   * Submit absensi baru
   * @param {string} date - Tanggal (format: YYYY-MM-DD)
   * @param {string} status - Status (Hadir, Sakit, Izin, Alpa)
   * @param {string} keterangan - Keterangan tambahan (optional)
   */
  submit: (date, status, keterangan = '') =>
    fetchAPI('/absensi/submit', {
      method: 'POST',
      body: JSON.stringify({ date, status, keterangan })
    }),

  /**
   * Dapatkan absensi user
   */
  getMyAbsensi: () =>
    fetchAPI('/absensi/my-absensi'),

  /**
   * Dapatkan history absensi (10 terbaru dari STACK)
   */
  getHistory: () =>
    fetchAPI('/absensi/history'),

  /**
   * Dapatkan statistik absensi user
   */
  getStatistik: () =>
    fetchAPI('/absensi/statistik'),

  /**
   * Dapatkan absensi berdasarkan tanggal
   * @param {string} date - Tanggal (format: YYYY-MM-DD)
   */
  getByDate: (date) =>
    fetchAPI(`/absensi/by-date?date=${date}`),

  /**
   * Dapatkan rekap absensi bulan/tahun
   * @param {number} month - Bulan (1-12)
   * @param {number} year - Tahun
   */
  getByMonthYear: (month, year) =>
    fetchAPI(`/absensi/by-month-year?month=${month}&year=${year}`),

  /**
   * Dapatkan semua absensi (admin only)
   */
  getAll: () =>
    fetchAPI('/absensi/all'),

  /**
   * Update absensi (admin only)
   * @param {string} id - ID absensi
   * @param {string} status - Status baru
   * @param {string} keterangan - Keterangan baru
   */
  update: (id, status, keterangan) =>
    fetchAPI(`/absensi/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, keterangan })
    }),

  /**
   * Hapus absensi (admin only)
   * @param {string} id - ID absensi
   */
  delete: (id) =>
    fetchAPI(`/absensi/${id}`, { method: 'DELETE' })
};

/**
 * USER/SISWA ENDPOINTS
 * Menggunakan LINKED LIST untuk data siswa
 */
export const userAPI = {
  /**
   * Dapatkan semua siswa dari LINKED LIST (admin only)
   */
  getAllSiswa: () =>
    fetchAPI('/user/all'),

  /**
   * Dapatkan data siswa berdasarkan ID
   * @param {string} id - ID siswa
   */
  getSiswaById: (id) =>
    fetchAPI(`/user/${id}`),

  /**
   * Cari siswa berdasarkan keyword
   * @param {string} keyword - Keyword pencarian (nama atau email)
   */
  searchSiswa: (keyword) =>
    fetchAPI(`/user/search?keyword=${keyword}`),

  /**
   * Tambah siswa baru (admin only)
   * @param {string} email - Email siswa
   * @param {string} password - Password awal
   * @param {string} name - Nama siswa
   */
  addSiswa: (email, password, name) =>
    fetchAPI('/user/add', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    }),

  /**
   * Update data siswa
   * @param {string} id - ID siswa
   * @param {string} name - Nama baru
   * @param {string} email - Email baru
   */
  updateSiswa: (id, name, email) =>
    fetchAPI(`/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, email })
    }),

  /**
   * Hapus siswa (admin only)
   * @param {string} id - ID siswa
   */
  deleteSiswa: (id) =>
    fetchAPI(`/user/${id}`, { method: 'DELETE' })
};

/**
 * Export default untuk kebutuhan lain
 */
export default fetchAPI;
