// 1. Membuat variabel untuk menyimpan data diri menggunakan const dan let
const nama = "Valendra";
let umur = 21;
let kotaAsal = "Jakarta";

console.log("=== 1. Data Diri ===");
console.log(`Nama: ${nama}`);
console.log(`Umur: ${umur} tahun`);
console.log(`Kota Asal: ${kotaAsal}`);
console.log("");

// 2. Program pengecekan kelulusan dengan syarat nilai >= 70
let nilaiUjian = 75;
console.log("=== 2. Pengecekan Kelulusan ===");
console.log(`Nilai Ujian: ${nilaiUjian}`);
if (nilaiUjian >= 70) {
    console.log("Status: Lulus");
} else {
    console.log("Status: Tidak Lulus");
}
console.log("");

// 3. Program pengecekan kategori umur
// (anak: <12, remaja: 12-17, dewasa: 18-59, lansia: >=60)
console.log("=== 3. Kategori Umur ===");
console.log(`Umur saat ini: ${umur}`);
let kategoriUmur = "";
if (umur < 12) {
    kategoriUmur = "Anak-anak";
} else if (umur >= 12 && umur <= 17) {
    kategoriUmur = "Remaja";
} else if (umur >= 18 && umur <= 59) {
    kategoriUmur = "Dewasa";
} else {
    kategoriUmur = "Lansia";
}
console.log(`Kategori Umur: ${kategoriUmur}`);
console.log("");

// 4. Switch-case konversi angka hari (1-7) ke nama hari dalam bahasa Inggris
console.log("=== 4. Konversi Angka Hari ke Bahasa Inggris ===");
let angkaHari = 3; // Contoh: 3 (Wednesday)
let namaHari = "";

switch (angkaHari) {
    case 1:
        namaHari = "Monday";
        break;
    case 2:
        namaHari = "Tuesday";
        break;
    case 3:
        namaHari = "Wednesday";
        break;
    case 4:
        namaHari = "Thursday";
        break;
    case 5:
        namaHari = "Friday";
        break;
    case 6:
        namaHari = "Saturday";
        break;
    case 7:
        namaHari = "Sunday";
        break;
    default:
        namaHari = "Angka hari tidak valid (harus 1-7)";
}
console.log(`Hari ke-${angkaHari} adalah: ${namaHari}`);
console.log("");

// 5. Kalkulator sederhana grade nilai dengan ternary operator
console.log("=== 5. Grade Nilai dengan Ternary Operator ===");
let nilaiSiswa = 85;
let grade = nilaiSiswa >= 85 ? "A" :
            nilaiSiswa >= 75 ? "B" :
            nilaiSiswa >= 65 ? "C" :
            nilaiSiswa >= 50 ? "D" : "E";

console.log(`Nilai Angka: ${nilaiSiswa}`);
console.log(`Grade: ${grade}`);
