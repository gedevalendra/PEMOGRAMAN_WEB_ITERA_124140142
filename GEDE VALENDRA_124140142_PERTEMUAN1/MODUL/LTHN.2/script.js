// ==========================================
// PANDUAN PRAKTIKUM - LATIHAN JAVASCRIPT LANJUTAN
// ==========================================

// 1. Loop untuk mencetak tabel perkalian dari 1 sampai 10 untuk angka pilihan
console.log("=== 1. Tabel Perkalian ===");
const angkaPilihan = 7;
console.log(`Tabel Perkalian untuk angka: ${angkaPilihan}`);
for (let i = 1; i <= 10; i++) {
    console.log(`${angkaPilihan} x ${i} = ${angkaPilihan * i}`);
}
console.log("");

// 2. Implementasikan fungsi untuk menghitung faktorial dari sebuah angka
console.log("=== 2. Fungsi Faktorial ===");
function hitungFaktorial(n) {
    if (n < 0) return "Angka harus positif";
    if (n === 0 || n === 1) return 1;
    let hasil = 1;
    for (let i = 2; i <= n; i++) {
        hasil *= i;
    }
    return hasil;
}
const angkaFaktorial = 5;
console.log(`Faktorial dari ${angkaFaktorial} adalah: ${hitungFaktorial(angkaFaktorial)}`);
console.log("");

// 3. Buat fungsi untuk memeriksa apakah sebuah angka adalah bilangan prima
console.log("=== 3. Cek Bilangan Prima ===");
function isPrima(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
const angkaCekPrima = 17;
console.log(`Apakah ${angkaCekPrima} bilangan prima? ${isPrima(angkaCekPrima) ? "Ya" : "Tidak"}`);
console.log("");

// 4. Buat kalkulator BMI (Body Mass Index) dengan fungsi dan event handler
console.log("=== 4. Kalkulator BMI ===");
function hitungBMI(berat, tinggiCm) {
    const tinggiM = tinggiCm / 100;
    const bmi = berat / (tinggiM * tinggiM);
    
    let kategori = "";
    if (bmi < 18.5) kategori = "Kekurangan berat badan";
    else if (bmi < 25) kategori = "Normal (ideal)";
    else if (bmi < 30) kategori = "Kelebihan berat badan";
    else kategori = "Kegemukan (Obesitas)";
    
    return { bmi: bmi.toFixed(2), kategori: kategori };
}

// Contoh penggunaan fungsi
const hasilBMI = hitungBMI(70, 175);
console.log(`BMI: ${hasilBMI.bmi} (${hasilBMI.kategori})`);

// Mock Event Handler (Asumsi ada elemen HTML dengan ID terkait)
/*
document.getElementById("btnHitungBMI")?.addEventListener("click", function() {
    const berat = parseFloat(document.getElementById("inputBerat").value);
    const tinggi = parseFloat(document.getElementById("inputTinggi").value);
    const hasil = hitungBMI(berat, tinggi);
    document.getElementById("displayHasil").innerText = `BMI Anda: ${hasil.bmi} - ${hasil.kategori}`;
});
*/
console.log("");

// 5. Implementasikan program FizzBuzz (1-100)
console.log("=== 5. Program FizzBuzz ===");
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
