/**
 * STACK DATA STRUCTURE
 * Digunakan untuk menyimpan history/riwayat absensi
 * Prinsip LIFO (Last In First Out)
 * Berguna untuk tracking perubahan status absensi terkini
 */

class Stack {
  constructor() {
    this.items = [];
  }

  // Menambahkan element ke dalam stack
  push(element) {
    this.items.push(element);
  }

  // Menghapus dan mengembalikan element teratas dari stack
  pop() {
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items.pop();
  }

  // Melihat element teratas tanpa menghapusnya
  peek() {
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // Memeriksa apakah stack kosong
  isEmpty() {
    return this.items.length === 0;
  }

  // Mengembalikan ukuran stack
  size() {
    return this.items.length;
  }

  // Mengosongkan stack
  clear() {
    this.items = [];
  }

  // Mengembalikan seluruh isi stack sebagai array
  getAll() {
    return [...this.items];
  }

  // Print stack (untuk debugging)
  print() {
    console.log(this.items.toString());
  }
}

module.exports = Stack;
