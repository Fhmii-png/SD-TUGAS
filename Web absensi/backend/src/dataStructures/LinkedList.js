/**
 * LINKED LIST DATA STRUCTURE
 * Digunakan untuk menyimpan data siswa/murid
 * Setiap node berisi data siswa dan pointer ke node berikutnya
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Menambahkan node baru di akhir linked list
  append(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
    return newNode;
  }

  // Menambahkan node baru di awal linked list
  prepend(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
    return newNode;
  }

  // Menyisipkan node pada posisi tertentu
  insertAt(data, index) {
    if (index < 0 || index > this.size) {
      return false;
    }
    const newNode = new Node(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous;
      let count = 0;
      while (count < index) {
        previous = current;
        current = current.next;
        count++;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.size++;
    return true;
  }

  // Menghapus node pada index tertentu
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let previous;
      let count = 0;
      while (count < index) {
        previous = current;
        current = current.next;
        count++;
      }
      previous.next = current.next;
    }
    this.size--;
    return current.data;
  }

  // Menghapus node berdasarkan nilai tertentu
  remove(data) {
    if (this.head === null) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    let previous = null;

    while (current) {
      if (current.data === data) {
        previous.next = current.next;
        this.size--;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }

  // Mencari node berdasarkan properti
  findBy(property, value) {
    let current = this.head;
    while (current) {
      if (current.data[property] === value) {
        return current.data;
      }
      current = current.next;
    }
    return null;
  }

  // Mencari index dari data tertentu
  indexOf(data) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // Mendapatkan node pada index tertentu
  getAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    let count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return current.data;
  }

  // Memeriksa apakah linked list kosong
  isEmpty() {
    return this.size === 0;
  }

  // Mengembalikan ukuran linked list
  getSize() {
    return this.size;
  }

  // Mengembalikan seluruh data sebagai array
  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }

  // Membersihkan linked list
  clear() {
    this.head = null;
    this.size = 0;
  }

  // Print linked list (untuk debugging)
  print() {
    let current = this.head;
    let result = '';
    while (current) {
      result += JSON.stringify(current.data) + ' -> ';
      current = current.next;
    }
    result += 'null';
    console.log(result);
  }
}

module.exports = LinkedList;
