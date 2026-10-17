# TokSir - Mini POS (Point of Sale) Web Application

**TokSir** (Toko Kasir) adalah aplikasi kasir berbasis web sederhana yang dirancang untuk membantu pengelolaan transaksi penjualan barang secara cepat dan efisien. Aplikasi ini dibangun menggunakan teknologi web dasar (HTML, CSS, dan JavaScript) dengan fokus pada kemudahan penggunaan dan antarmuka yang responsif.

## 🚀 Fitur Utama

- **Input Barang Cepat (Preset Items)**: Tersedia tombol pilihan cepat untuk barang-barang umum seperti Air Mineral, Buku Tulis, Mie Ayam, dll.
- **Manajemen Keranjang Belanja**: 
  - Menambah barang secara manual dengan validasi input (Nama, Harga, Jumlah).
  - Menghapus barang dari keranjang.
  - Perhitungan subtotal otomatis per item.
- **Sistem Promo & Diskon**:
  - **Diskon Otomatis**: Potongan harga otomatis untuk total belanja di atas Rp 50.000.
  - **Kode Promo**: Dukungan penggunaan kode promo (Contoh: `HEMAT10`) untuk mendapatkan diskon tambahan.
- **Kalkulator Pembayaran**: Menghitung total akhir setelah diskon dan menghitung uang kembalian pelanggan secara *real-time*.
- **Persistensi Data (LocalStorage)**: Data keranjang belanja tetap tersimpan meskipun halaman di-refresh atau browser ditutup.
- **Antarmuka Responsif & Modern**: Desain bersih dengan skema warna yang nyaman dan dukungan modal kustom untuk notifikasi.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik aplikasi.
- **CSS3**: Styling kustom dengan variabel CSS untuk kemudahan kustomisasi tema.
- **JavaScript (Vanilla JS)**: Logika bisnis, manipulasi DOM, dan pengelolaan state.
- **LocalStorage API**: Untuk penyimpanan data lokal di sisi klien.

## 📂 Struktur Proyek

```text
M1/
├── index.html    # Halaman utama aplikasi
├── style.css     # File styling (Layout, Warna, Animasi)
├── script.js    # Logika aplikasi (State, Event Handlers, Validasi)
└── README.md     # Dokumentasi proyek
```

## 📖 Cara Penggunaan

1. **Menambah Barang**:
   - Klik salah satu tombol di bagian "Pilih Cepat Barang" untuk mengisi form secara otomatis.
   - Atau isi Nama Barang, Harga, dan Jumlah secara manual pada form "Input Barang".
   - Klik tombol **Tambah ke Keranjang**.
2. **Menggunakan Promo**:
   - Masukkan kode promo (misal: `HEMAT10`) pada kolom Kode Promo dan klik **Pakai**.
3. **Pembayaran**:
   - Masukkan jumlah uang yang dibayarkan pelanggan pada kolom "Bayar (Rp)".
   - Aplikasi akan menampilkan jumlah kembalian atau peringatan jika uang tidak mencukupi.
4. **Reset Transaksi**:
   - Klik tombol **Reset Transaksi** untuk mengosongkan keranjang dan memulai transaksi baru.

## 📝 Catatan Pengembangan
Aplikasi ini dikembangkan sebagai bagian dari **Praktikum Pengembangan Aplikasi Web (PAW)** untuk mendemonstrasikan pemahaman tentang manipulasi DOM, penanganan event, dan logika dasar JavaScript.

---
© 2026 TokSir Project - Praktikum PAW
