# AGENTS.md — Panduan untuk AI Coding Agent

Baca file ini **sebelum menulis atau mengubah kode apa pun**. Spesifikasi produk lengkap ada di [`PRD.md`](./PRD.md); bila ada konflik, ikuti PRD untuk perilaku fitur dan file ini untuk cara menulis kode.

## 1. Konteks Proyek

**MonoDesk** adalah personal dashboard mahasiswa (jadwal kuliah, tugas, catatan, cuaca ITERA) untuk **Tugas Praktikum** mata kuliah pemrograman web. Proyek ini **dinilai** berdasarkan: fungsionalitas (30%), fitur ES6+ (25%), localStorage (20%), UI/UX (15%), dokumentasi dan kerapian kode (10%). Setiap keputusan harus mempertimbangkan rubrik ini.

## 2. Tech Stack (jangan diubah)

- **HTML5 + CSS3 + JavaScript vanilla (ES6+)**.
- **Dilarang:** framework (React/Vue/Svelte/dll.), library UI/CSS (Bootstrap/Tailwind), jQuery, bundler/build tool, TypeScript, npm dependency untuk runtime.
- Tanpa ES modules (`import`/`export`) supaya `index.html` bisa dibuka langsung via `file://`. Muat file JS dengan `<script src="...">` biasa **dengan urutan**: `models.js` → `storage.js` → `weather.js` → `ui.js` → `app.js`.
- Penyimpanan hanya `localStorage`. Tanpa backend, tanpa cookie, tanpa IndexedDB.
- API eksternal hanya **Open-Meteo** (tanpa API key):
  `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true`

## 3. Struktur File

```
index.html
css/style.css
js/models.js     # class Course, Task, Note
js/storage.js    # class StorageManager
js/weather.js    # class WeatherService (async/await)
js/ui.js         # fungsi render + helper (escapeHtml, format tanggal)
js/app.js        # class DashboardApp (state, event, orkestrasi)
docs/screenshots/
README.md  PRD.md  AGENTS.md
```

Jangan membuat file/folder baru di luar struktur ini tanpa alasan kuat. Jangan memecah atau menggabung file tanpa diminta.

## 4. Aturan Kode JavaScript

### Wajib (fitur ES6+ yang dinilai)
1. **`const` secara default, `let` hanya bila nilai di-reassign. `var` DILARANG.**
2. **Arrow functions**: gunakan untuk callback (`map`, `filter`, `sort`, `forEach`, `find`), event handler, dan helper kecil. Target minimal 8 pemakaian, jelas terlihat.
3. **Template literals** untuk semua pembuatan HTML dinamis dan pesan teks. Jangan menyambung string dengan `+`.
4. **Async**: `WeatherService.fetchCurrent()` memakai `async/await` dengan `try/catch`. Cek `response.ok`. Jangan campur dengan `.then()` chain di tempat yang sama.
5. **Classes**: `Course`, `Task`, `Note`, `StorageManager`, `WeatherService`, `DashboardApp`. Gunakan `constructor`, method instance, dan setidaknya satu `static` method, serta getter bila relevan.

### Gaya
- `"use strict";` di awal tiap file JS.
- Nama: `camelCase` fungsi/variabel, `PascalCase` class, `UPPER_SNAKE_CASE` konstanta global (mis. `STORAGE_KEYS`).
- Satu fungsi satu tugas, maksimal ±40 baris. Hindari nesting > 3 level.
- Hindari variabel global selain konstanta dan instance `DashboardApp` yang dibuat di `app.js`.
- Komentar singkat berbahasa Indonesia untuk menjelaskan **mengapa**, bukan apa. Tambahkan komentar penanda bagian, mis. `// [ES6] Arrow function`, di tempat fitur ES6+ penting, agar mudah dipetakan ke README.
- Tidak ada `console.log` sisa debug pada kode akhir (`console.error` untuk error nyata boleh).
- Pakai `textContent` bila tidak butuh HTML; bila memakai `innerHTML`, **semua data pengguna wajib lewat `escapeHtml()`** (cegah XSS).
- Event handling: gunakan **event delegation** pada container daftar (`data-action`, `data-id`), bukan menempel listener ke tiap item.

## 5. Aturan localStorage

- Semua akses lewat `StorageManager`. **Jangan memanggil `localStorage` langsung di luar class itu.**
- Key (berversi):
  - `monodesk:v1:courses`
  - `monodesk:v1:tasks`
  - `monodesk:v1:notes`
  - `monodesk:v1:settings`
- Simpan JSON. Saat membaca: `try/catch` pada `JSON.parse`, validasi tipe (harus array/objek yang diharapkan), fallback ke nilai default bila rusak/kosong.
- Saat menyimpan: tangani error kuota/akses diblokir tanpa membuat aplikasi crash, dan tampilkan pesan ke pengguna.
- Simpan **setelah setiap** operasi tambah/edit/hapus/toggle. Rekonstruksi objek dari data tersimpan memakai `Class.from(obj)`.
- Jangan menyimpan objek `Date`; simpan string ISO.

## 6. Aturan Desain — MONOCHROME (KETAT)

**Hanya dua warna: hitam `#000000` dan putih `#FFFFFF`.**

- **Dilarang:** abu-abu (`#333`, `#ccc`, `gray`, `rgba` dengan transparansi untuk membuat abu-abu, `opacity` < 1 pada teks/blok), warna aksen apa pun (merah/hijau/biru), gradien, shadow berwarna, emoji berwarna.
- Semua warna lewat CSS variable. Jangan menulis hex/nama warna langsung di luar blok token:
  ```css
  :root { --bg: #fff; --fg: #000; }
  :root[data-theme="dark"] { --bg: #000; --fg: #fff; }
  ```
  Gunakan hanya `var(--bg)` dan `var(--fg)` untuk `color`, `background`, `border-color`, `fill`, `stroke`, `outline`.
- Hierarki visual lewat: ketebalan border (1/2/4px), garis solid vs `dashed`, blok inverse (teks `--bg` di latar `--fg`), ukuran/ketebalan font, spasi.
- Status: `TERLAMBAT` = blok inverse; selesai = `text-decoration: line-through`; aktif/berlangsung = border 4px; tombol hapus = border `dashed`.
- Gaya: `border-radius: 0`, tanpa shadow, kartu dengan border 2px solid. Hover/fokus = inversi warna. Fokus keyboard: `outline: 3px solid var(--fg); outline-offset: 2px`.
- Ikon: SVG inline dengan `currentColor`, atau karakter teks.
- Font: stack sistem. Monospace untuk angka/jam/label (`"Courier New", monospace`), sans-serif untuk isi. Tanpa font eksternal.
- Responsif: desktop grid 3 kolom, mobile (< 768px) satu kolom. Gunakan `rem`, flex/grid, tanpa ukuran piksel tetap untuk layout.
- Aksesibilitas: `aria-label` pada tombol ikon, `aria-live="polite"` pada status/error, `<label>` terhubung ke input, elemen semantik (`header`, `main`, `section`, `button`).

## 7. Fitur yang Harus Ada (ringkas)

1. **Jadwal kuliah** — CRUD (nama, hari, jam mulai/selesai, ruang); tampil kelas hari ini; penanda berlangsung/berikutnya.
2. **Tugas** — CRUD (judul, matkul, deadline, prioritas); toggle selesai; filter; urut deadline; penanda terlambat.
3. **Catatan** — CRUD (judul, isi).
4. **Cuaca & waktu ITERA** — jam real-time WIB, cuaca Open-Meteo dengan state loading/error/retry.
5. **Ringkasan** — kelas hari ini, tugas belum selesai, tugas ≤ 24 jam, jumlah catatan.
6. **Tema inverse** (opsional) — tersimpan di settings.

Setiap form wajib validasi (tidak kosong, jam selesai > jam mulai, deadline valid) dengan pesan jelas. Setiap daftar wajib punya **state kosong** yang informatif. Hapus meminta konfirmasi.

## 8. Cara Menjalankan & Verifikasi

- Jalankan: buka `index.html` di browser, atau pakai ekstensi Live Server di VS Code.
- Tidak ada build step dan tidak ada test runner. Verifikasi manual setelah setiap perubahan:
  1. Tambah, edit, hapus di ketiga modul; refresh halaman; data harus tetap ada.
  2. Rusak data di DevTools (isi key dengan teks acak) lalu refresh; aplikasi tidak boleh crash.
  3. Matikan jaringan (DevTools → Offline); cuaca menampilkan error, sisanya normal.
  4. Cek console: tidak boleh ada error/warning pada alur normal.
  5. Cek tampilan 360px dan 1280px.
  6. Cari `var `, warna selain `#fff`/`#000`, dan `localStorage` di luar `storage.js`; hasilnya harus nol.

## 9. Dokumentasi (README.md)

Saat fitur selesai, perbarui README dengan:
1. Deskripsi singkat aplikasi dan daftar fitur.
2. Screenshot di `docs/screenshots/` (tampilan utama, mode inverse, state kosong/error).
3. **Tabel fitur ES6+ dengan file dan nomor baris** (let/const, ≥3 arrow functions, template literals, async/await, classes). Nomor baris harus **akurat** terhadap kode terakhir; cek ulang setiap kali file JS berubah. Gunakan `grep -n` untuk mencarinya.
4. Cara menjalankan dan sumber API.

## 10. Batasan Perilaku Agent

- Kerjakan **per tahap** sesuai PRD §13; jangan membangun semuanya sekaligus tanpa bisa diverifikasi.
- Jangan menambah fitur di luar PRD, tidak menambah dependensi, tidak mengganti stack. Bila ragu, tanyakan.
- Jangan menulis ulang file yang tidak terkait dengan tugas saat ini. Ubah seminimal mungkin.
- Jangan menghapus komentar penanda `[ES6]`.
- Jangan mengarang nomor baris atau hasil uji di README; ukur dari kode asli.
- Pesan commit (jika diminta): bahasa Indonesia atau Inggris, singkat, imperatif, mis. `feat: tambah CRUD tugas`, `fix: validasi jam jadwal`, `docs: perbarui peta ES6+`.

## 11. Checklist Sebelum Menyatakan Selesai

- [ ] CRUD Jadwal, Tugas, Catatan berfungsi dan persisten
- [ ] Cuaca ITERA tampil; loading, error, dan retry berfungsi
- [ ] Tidak ada `var`; `let`/`const` tepat guna
- [ ] ≥ 3 arrow functions, template literals, async/await, dan classes terpakai nyata
- [ ] Semua data pengguna di-escape saat dirender
- [ ] Hanya `#000` dan `#fff`, tanpa abu-abu atau aksen
- [ ] Responsif dan dapat dipakai dengan keyboard
- [ ] Console bersih
- [ ] README lengkap: deskripsi, screenshot, tabel ES6+ dengan nomor baris akurat
