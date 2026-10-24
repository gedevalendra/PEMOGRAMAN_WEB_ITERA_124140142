# RuangBaca — Aplikasi Manajemen Buku Pribadi

RuangBaca adalah aplikasi React untuk mencatat koleksi buku yang sudah dimiliki, sedang dibaca, dan ingin dibeli. Data disimpan di `localStorage`, sehingga tetap tersedia ketika halaman dimuat ulang pada browser yang sama.

## Fitur
- Menambahkan buku dengan judul, penulis, dan status.
- Mengedit serta menghapus buku.
- Mencari buku berdasarkan judul atau penulis.
- Memfilter koleksi berdasarkan status.
- Halaman statistik koleksi dan progres bacaan.
- Validasi kolom wajib isi dengan pesan kesalahan.
- Penyimpanan lokal menggunakan `localStorage`.

## Teknologi React yang digunakan
- **Functional Components dan Hooks:** `useState`, `useEffect`, dan `useMemo`.
- **Reusable Components:** `BookForm`, `BookList`, `BookFilter`, dan `StatChip`/`Metric`.
- **Context API:** `BookContext` membagikan data dan fungsi pengelolaan buku ke halaman.
- **React Router:** navigasi antara halaman Perpustakaan (`/`) dan Statistik (`/stats`).
- **Custom Hooks:** `useLocalStorage` untuk penyimpanan lokal dan `useBookStats` untuk menghitung ringkasan koleksi.
- **PropTypes:** validasi tipe props pada komponen.

## Persyaratan
- Node.js versi 18 atau lebih baru
- npm

## Instalasi dan menjalankan aplikasi
1. Buka terminal di folder proyek.
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
4. Buka alamat lokal yang ditampilkan oleh Vite di terminal.

## Menjalankan unit test
Jalankan semua pengujian sekali:
```bash
npm run test:run
```
Mode interaktif:
```bash
npm test
```

## Struktur folder
```text
src/
├── components/
│   ├── BookForm/BookForm.jsx
│   ├── BookList/BookList.jsx
│   └── BookFilter/BookFilter.jsx
├── pages/
│   ├── Home/Home.jsx
│   └── Stats/Stats.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useBookStats.js
├── context/BookContext.jsx
├── test/
│   ├── setup.js
│   ├── BookForm.test.jsx
│   └── BookList.test.jsx
├── App.jsx
├── main.jsx
└── styles.css
```

## Screenshot antarmuka
Tambahkan screenshot hasil menjalankan aplikasi ke folder `screenshots/`, lalu sisipkan gambar di bawah. Contoh path yang digunakan:

```markdown
![Halaman Perpustakaan](screenshots/perpustakaan.png)
![Halaman Statistik](screenshots/statistik.png)
```

Screenshot belum disertakan karena aplikasi perlu dijalankan terlebih dahulu pada perangkat lokal.

## Laporan testing
Pengujian unit mencakup:
1. Validasi pesan error jika judul dan penulis kosong.
2. Pengiriman data buku yang valid dari form.
3. Tampilan judul, penulis, dan status buku.
4. Pemanggilan fungsi edit pada buku yang dipilih.
5. Tampilan empty state ketika daftar buku kosong.

Simpan screenshot hasil `npm run test:run` sebagai bukti eksekusi pengujian sebelum pengumpulan.

## Catatan sebelum dikumpulkan
- Ubah nama folder `NAMA_NIM_pertemuan3` sesuai nama dan NIM sendiri.
- Jalankan `npm install`, `npm run test:run`, dan `npm run build`.
- Tambahkan screenshot aplikasi dan hasil pengujian ke laporan/README.
