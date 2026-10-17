# PRD — MonoDesk: Personal Dashboard Mahasiswa

> Tugas Praktikum — Aplikasi personal dashboard berbasis JavaScript ES6+
> Versi dokumen: 1.0 · Status: Draft siap implementasi

---

## 1. Ringkasan

**MonoDesk** adalah dashboard personal satu halaman untuk mahasiswa yang menggabungkan **jadwal kuliah, daftar tugas, catatan cepat, dan cuaca/waktu kampus** dalam satu tampilan. Seluruh data pengguna disimpan di `localStorage`, tanpa backend dan tanpa login. Tampilan sepenuhnya **monochrome (hitam dan putih saja)**.

### Tantangan Kreatif (jawaban)
Mahasiswa sehari-hari memegang banyak informasi yang tercecer: jadwal di screenshot, tugas di chat grup, catatan di berbagai aplikasi. MonoDesk menjawab kebutuhan spesifik: **"Hari ini ada kelas apa, tugas apa yang paling dekat deadline-nya, dan apakah perlu bawa jas hujan ke kampus?"** — dijawab dalam satu layar.

## 2. Tujuan & Non-Tujuan

### Tujuan
1. Memenuhi seluruh persyaratan tugas praktikum (interaktif, localStorage, fitur ES6+, dokumentasi).
2. Memberi nilai guna nyata untuk produktivitas harian mahasiswa ITERA.
3. Kode bersih, modular, dan mudah dijelaskan saat demo/asistensi.

### Non-Tujuan
- Tidak ada backend, database, autentikasi, atau sinkronisasi antar perangkat.
- Tidak memakai framework (React/Vue/dll.) maupun library UI/CSS (Bootstrap/Tailwind).
- Tidak ada notifikasi push atau fitur kolaborasi.

## 3. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| Mahasiswa S1 Teknik Informatika | Melihat jadwal hari ini, mencatat tugas + deadline, menyimpan catatan singkat |
| Dosen/asisten penilai | Memverifikasi fitur ES6+, CRUD, localStorage, dan kerapian kode dengan cepat |

## 4. Ruang Lingkup Fitur

### F1 — Jadwal Kuliah (CRUD)
- Tambah, edit, hapus mata kuliah: **nama, hari, jam mulai, jam selesai, ruang**.
- Tampilan default menampilkan **kelas hari ini**, urut berdasarkan jam; tab/filter untuk melihat per hari.
- Penanda "BERLANGSUNG" atau "BERIKUTNYA" untuk kelas terdekat berdasarkan jam sekarang.

### F2 — Daftar Tugas (CRUD)
- Tambah, edit, hapus tugas: **judul, mata kuliah (opsional), deadline, prioritas (Rendah/Sedang/Tinggi)**.
- Toggle selesai/belum (checkbox).
- Filter: Semua / Belum selesai / Selesai. Urut otomatis berdasarkan deadline terdekat.
- Penanda "TERLAMBAT" bila deadline lewat dan tugas belum selesai.

### F3 — Catatan Cepat (CRUD)
- Tambah, edit, hapus catatan: **judul singkat dan isi**.
- Tampil sebagai kartu; catatan terbaru di atas.

### F4 — Widget Cuaca & Waktu Kampus (Async)
- Jam dan tanggal real-time (update tiap detik), zona WIB.
- Cuaca saat ini di kampus ITERA dari **Open-Meteo** (tanpa API key).
- Endpoint: `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true`
- Tampilkan suhu, kecepatan angin, dan deskripsi teks dari `weathercode`.
- Ada state **loading**, **error** (dengan tombol "Coba lagi"), dan tombol refresh manual.

### F5 — Ringkasan Hari Ini
- Kartu statistik: jumlah kelas hari ini, tugas belum selesai, tugas mendekati deadline (≤ 24 jam), jumlah catatan.

### F6 — Tema Balik Warna (opsional, nilai tambah UI/UX)
- Toggle antara "putih di atas hitam" dan "hitam di atas putih". Pilihan disimpan di localStorage.

## 5. Pemetaan ke Persyaratan & Kriteria Penilaian

| Persyaratan tugas | Implementasi di MonoDesk |
|---|---|
| Interaktif (tambah/edit/hapus) | F1, F2, F3 |
| Penyimpanan lokal | `StorageManager` membungkus `localStorage` untuk semua data |
| `let` dan `const` tepat | `const` default, `let` hanya untuk nilai yang berubah; **tanpa `var`** |
| Minimal 3 arrow function | `map`/`filter`/`sort`/event handler/callback di banyak tempat (target ≥ 8) |
| Template literals | Seluruh render kartu/daftar HTML dan pesan dinamis |
| Fungsi asinkron | `async/await` + `try/catch` pada `WeatherService.fetchCurrent()` |
| Classes | `Course`, `Task`, `Note`, `StorageManager`, `WeatherService`, `DashboardApp` |

| Aspek | Bobot | Strategi |
|---|---|---|
| Fungsionalitas & interaktivitas | 30% | CRUD lengkap di 3 modul + cuaca + ringkasan |
| Implementasi ES6+ | 25% | Semua fitur wajib hadir dan dipetakan di README (dengan nomor baris) |
| localStorage & pengelolaan data | 20% | Class terpusat, key berversi, validasi + fallback saat data rusak |
| Desain UI & UX | 15% | Monochrome konsisten, responsif, state kosong/loading/error jelas |
| Dokumentasi & kerapian kode | 10% | README lengkap, komentar singkat, struktur file rapi |

## 6. Model Data

Semua disimpan sebagai JSON array di localStorage.

| Key | Isi |
|---|---|
| `monodesk:v1:courses` | `[{ id, name, day, start, end, room }]` — `day`: 0–6 (Minggu–Sabtu), `start`/`end`: `"HH:MM"` |
| `monodesk:v1:tasks` | `[{ id, title, course, deadline, priority, done, createdAt }]` — `deadline`: ISO string |
| `monodesk:v1:notes` | `[{ id, title, body, createdAt, updatedAt }]` |
| `monodesk:v1:settings` | `{ theme: "dark" \| "light", taskFilter: "all" \| "open" \| "done" }` |

`id` dibuat dengan `crypto.randomUUID()` (fallback: `Date.now().toString(36)`).

## 7. Arsitektur Kode

Tanpa build tool dan tanpa ES modules, supaya bisa dibuka langsung dengan `index.html` (protokol `file://`). File JS dimuat sebagai script biasa secara berurutan.

```
monodesk/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── models.js      # class Course, Task, Note
│   ├── storage.js     # class StorageManager
│   ├── weather.js     # class WeatherService (async/await)
│   ├── ui.js          # fungsi render (template literals) + helper
│   └── app.js         # class DashboardApp (controller + event binding)
├── docs/
│   └── screenshots/   # gambar untuk README
├── README.md
├── PRD.md
└── AGENTS.md
```

### Tanggung jawab class
- **Course / Task / Note** — representasi data + method kecil (mis. `Task#isOverdue()`, `Course#isOngoing(now)`), serta `toJSON()`/`static from(obj)`.
- **StorageManager** — `load(key, fallback)`, `save(key, value)`, `remove(key)`; semua dibungkus `try/catch`, validasi hasil `JSON.parse`.
- **WeatherService** — `async fetchCurrent()`, `static describe(code)`; menangani error jaringan/HTTP.
- **DashboardApp** — menyimpan state, memanggil render, mengikat event, dan menyinkronkan state ke StorageManager.

## 8. Desain UI/UX — Monochrome

### Aturan warna (ketat)
- **Hanya dua warna: hitam `#000000` dan putih `#FFFFFF`.** Tanpa abu-abu, tanpa warna aksen, tanpa emoji berwarna.
- Hierarki visual dibuat lewat: **ketebalan border (1px/2px/4px), garis solid vs putus-putus, blok inverse (teks putih di latar hitam), ukuran dan ketebalan font, serta whitespace**.
- Ikon: SVG inline dengan `fill`/`stroke: currentColor`, atau karakter teks (`+`, `×`, `✓`, `→`).

### Token CSS
```css
:root { --bg: #fff; --fg: #000; }
:root[data-theme="dark"] { --bg: #000; --fg: #fff; }
```

### Gaya
- Tipografi: font monospace untuk angka/jam/label (mis. `"JetBrains Mono", "Courier New", monospace`), sans-serif untuk isi. Gunakan font sistem agar tanpa dependensi.
- Kartu: border 2px solid, sudut tajam (radius 0), tanpa shadow berwarna. Hover/fokus: inversi warna.
- Tombol utama: fill penuh; tombol sekunder: outline; tombol bahaya (hapus): outline putus-putus.
- Status: `TERLAMBAT` = blok inverse; `SELESAI` = teks dicoret; `BERLANGSUNG` = border 4px.

### Layout
- Desktop: grid 12 kolom — header (jam + cuaca) di atas, lalu Jadwal | Tugas | Catatan.
- Mobile (< 768px): satu kolom, navigasi tab bawah/atas untuk pindah modul.
- Edit/tambah memakai form inline atau dialog (`<dialog>`), dengan label jelas dan validasi.

### Aksesibilitas
- Kontras maksimum otomatis. Fokus keyboard terlihat jelas (outline 3px solid).
- Semua tombol ikon punya `aria-label`. Elemen status memakai `aria-live="polite"`.

## 9. Alur Pengguna Utama
1. Buka aplikasi → lihat jam, cuaca ITERA, ringkasan, dan kelas hari ini.
2. Tambah tugas baru → isi form → tersimpan otomatis → daftar terurut ulang.
3. Centang tugas selesai → ringkasan diperbarui → state tetap setelah refresh halaman.
4. Edit jadwal/catatan → ubah → simpan; hapus → konfirmasi → hilang.
5. Cuaca gagal dimuat → pesan error + tombol "Coba lagi".

## 10. Kasus Tepi & Penanganan Error
- localStorage kosong → tampilkan state kosong ("Belum ada tugas") dengan ajakan menambah.
- Data localStorage rusak/tidak valid → fallback ke array kosong, tidak crash.
- localStorage penuh/diblokir → tampilkan pesan, aplikasi tetap berjalan dengan data di memori.
- Input kosong, jam selesai ≤ jam mulai, atau deadline tidak valid → ditolak dengan pesan validasi.
- Teks pengguna dirender via template literal → **wajib di-escape** (cegah XSS).
- Offline → cuaca menampilkan error, fitur lain tetap berfungsi penuh.

## 11. Kebutuhan Non-Fungsional
- Berjalan di Chrome, Firefox, Edge versi terbaru, dan mobile browser.
- Tanpa dependensi eksternal wajib (boleh berjalan offline kecuali cuaca).
- Waktu muat < 1 detik pada koneksi normal; total ukuran < 100 KB di luar screenshot.
- Satu fungsi satu tugas; hindari fungsi > 40 baris.

## 12. Dokumentasi (README wajib)
1. Deskripsi singkat aplikasi dan fitur-fiturnya.
2. Screenshot antarmuka (minimal: tampilan utama, mode inverse, state error/kosong) di `docs/screenshots/`.
3. **Tabel fitur ES6+ beserta nomor baris** (file + baris), contoh:

| Fitur ES6+ | Lokasi | Baris |
|---|---|---|
| `let` / `const` | `js/app.js` | … |
| Arrow functions (≥3) | `js/ui.js`, `js/app.js` | … |
| Template literals | `js/ui.js` | … |
| Async/await | `js/weather.js` | … |
| Classes | `js/models.js`, `js/storage.js`, … | … |

4. Cara menjalankan (buka `index.html` atau Live Server) dan sumber API.

## 13. Rencana Pengerjaan

| Tahap | Pekerjaan | Hasil |
|---|---|---|
| 1 | Struktur file, CSS token monochrome, layout kosong | Kerangka tampil |
| 2 | `models.js` + `storage.js` | Data tersimpan dan terbaca |
| 3 | Modul Tugas (CRUD) + render | Modul inti jalan |
| 4 | Modul Jadwal dan Catatan | CRUD lengkap |
| 5 | `weather.js` + jam + ringkasan | Widget async jalan |
| 6 | Polish UI, responsif, validasi, tema inverse | UI/UX final |
| 7 | README, screenshot, peta ES6+ | Siap kumpul |

## 14. Definition of Done
- [ ] CRUD berfungsi untuk Jadwal, Tugas, dan Catatan
- [ ] Data bertahan setelah refresh dan dapat dihapus
- [ ] Cuaca ITERA tampil dari Open-Meteo, dengan state loading/error
- [ ] Semua fitur ES6+ wajib terimplementasi; **tidak ada `var`**
- [ ] UI hanya memakai `#000` dan `#fff`
- [ ] Responsif (desktop dan mobile)
- [ ] Tidak ada error di console pada alur normal
- [ ] README lengkap dengan screenshot dan nomor baris ES6+
