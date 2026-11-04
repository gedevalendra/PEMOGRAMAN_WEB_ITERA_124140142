1. Program Penghitung BMI (Body Mass Index) Sederhana
Bobot: 30%
Buatlah sebuah program Python (simpan dengan nama berkas tugas1_bmi.py) dengan ketentuan:

Buatlah variabel untuk menyimpan berat badan (dalam kilogram / kg) dan tinggi badan (dalam meter / m). Data dapat diisi secara langsung atau melalui fungsi input().
Hitung nilai BMI menggunakan rumus:
BMI = berat / (tinggi * tinggi)
Gunakan struktur percabangan if-elif-else untuk menentukan dan menampilkan kategori BMI:
BMI < 18.5: Berat badan kurang
18.5 ≤ BMI < 25: Berat badan normal
25 ≤ BMI < 30: Berat badan berlebih
BMI ≥ 30: Obesitas
Cetak hasil perhitungan nilai BMI (diformat dengan 2 angka desimal menggunakan f-string) beserta kategori status berat badannya ke konsol terminal.
2. Program Pengelolaan Data Nilai Mahasiswa
Bobot: 40%
Buatlah sebuah program Python (simpan dengan nama berkas tugas2_nilai_mahasiswa.py) dengan ketentuan:

Buat sebuah list yang memuat minimal 5 dictionary data mahasiswa. Setiap dictionary memiliki kunci: nama, nim, nilai_uts, nilai_uas, dan nilai_tugas.
Hitung nilai akhir setiap mahasiswa berdasarkan bobot persentase berikut:
Nilai Akhir = (30% * UTS) + (40% * UAS) + (30% * Tugas)
Tentukan grade nilai setiap mahasiswa berdasarkan kriteria:
A: Nilai akhir 80 atau lebih (≥ 80)
B: Nilai akhir 70 sampai 79 (70 ≤ nilai < 80)
C: Nilai akhir 60 sampai 69 (60 ≤ nilai < 70)
D: Nilai akhir 50 sampai 59 (50 ≤ nilai < 60)
E: Nilai akhir kurang dari 50 (< 50)
Tampilkan seluruh data mahasiswa secara lengkap (Nama, NIM, Nilai Akhir, dan Grade) dalam format tabel yang rapi di terminal (dapat menggunakan perataan f-string atau library tabulasi).
Cari dan tampilkan informasi mahasiswa yang memperoleh nilai akhir tertinggi dan nilai akhir terendah.
3. Modul Matematika Python & Program Penggunaannya
Bobot: 30%
Buatlah dua berkas kode Python terpisah: modul matematika dan berkas skrip pemanggilnya:

A. Berkas math_operations.py (Modul):

Fungsi untuk menghitung luas dan keliling bentuk geometri (minimal 3 bentuk geometri: persegi, persegi panjang, dan lingkaran).
Fungsi untuk konversi temperatur suhu (minimal 2 fungsi konversi: Celsius ke Fahrenheit, dan Celsius ke Kelvin).
Minimal 1 variabel konstanta (misalnya: PI = 3.14159).
B. Berkas main.py (Program Utama):

Mengimpor modul math_operations yang telah dibuat.
Menggunakan seluruh fungsi dari modul tersebut dengan memberikan berbagai nilai input pengujian.
Menampilkan hasil kalkulasi ke konsol dengan format yang rapi dan terstruktur.
Menerapkan minimal 2 cara berbeda untuk mengimpor modul/fungsi (misalnya menggunakan import math_operations dan from math_operations import ...).


Struktur folder yang disarankan di dalam repositori Anda:
[NAMA]_[NIM]_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
└── main.py