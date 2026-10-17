// ==========================================
// PANDUAN PRAKTIKUM - LATIHAN ARRAY & OBJEK (DATA MAHASISWA)
// ==========================================

// 1. Array berisi minimal 5 objek mahasiswa
let daftarMahasiswa = [
    { nim: "21001", nama: "Adit", jurusan: "Informatika", nilai: 85 },
    { nim: "21002", nama: "Budi", jurusan: "Sistem Informasi", nilai: 72 },
    { nim: "21003", nama: "Citra", jurusan: "Teknik Komputer", nilai: 90 },
    { nim: "21004", nama: "Dewi", jurusan: "Informatika", nilai: 65 },
    { nim: "21005", nama: "Eko", jurusan: "Sistem Informasi", nilai: 78 }
];

// Fungsi untuk menghasilkan representasi tabel HTML
function renderHTMLTable(data) {
    let html = "<table border='1' cellpadding='8' cellspacing='0'>\n";
    html += "  <thead>\n    <tr><th>NIM</th><th>Nama</th><th>Jurusan</th><th>Nilai</th></tr>\n  </thead>\n";
    html += "  <tbody>\n";
    data.forEach(mhs => {
        html += `    <tr><td>${mhs.nim}</td><td>${mhs.nama}</td><td>${mhs.jurusan}</td><td>${mhs.nilai}</td></tr>\n`;
    });
    html += "  </tbody>\n</table>";
    return html;
}

console.log("=== 1. Data Mahasiswa (Tabel HTML) ===");
console.log(renderHTMLTable(daftarMahasiswa));
console.log("");

// 2. Fungsi mencari mahasiswa dengan nilai tertinggi menggunakan method reduce
function getMahasiswaNilaiTertinggi(data) {
    if (!data || data.length === 0) return null;
    return data.reduce((tertinggi, mhs) => (mhs.nilai > tertinggi.nilai ? mhs : tertinggi));
}

console.log("=== 2. Mahasiswa dengan Nilai Tertinggi ===");
const mhsTertinggi = getMahasiswaNilaiTertinggi(daftarMahasiswa);
console.log(`Nama: ${mhsTertinggi.nama} (${mhsTertinggi.nim}), Nilai: ${mhsTertinggi.nilai}`);
console.log("");

// 3. Filter dan tampilkan mahasiswa dengan nilai di atas rata-rata
function getMahasiswaDiatasRataRata(data) {
    if (!data || data.length === 0) return { rataRata: 0, mahasiswa: [] };
    const totalNilai = data.reduce((acc, curr) => acc + curr.nilai, 0);
    const rataRata = totalNilai / data.length;
    const hasil = data.filter(mhs => mhs.nilai > rataRata);
    return { rataRata, hasil };
}

console.log("=== 3. Mahasiswa di Atas Rata-rata ===");
const { rataRata, hasil: mhsDiatasRataRata } = getMahasiswaDiatasRataRata(daftarMahasiswa);
console.log(`Nilai Rata-rata: ${rataRata.toFixed(2)}`);
console.log("Daftar Mahasiswa di Atas Rata-rata:");
mhsDiatasRataRata.forEach(m => console.log(`- ${m.nama} (${m.nilai})`));
console.log("");

// 4. Fungsi mengurutkan mahasiswa berdasarkan nama (ascending/descending)
function sortMahasiswaByNama(data, order = "asc") {
    // Clone array agar tidak memutasi array asli
    return [...data].sort((a, b) => {
        return order.toLowerCase() === "desc"
            ? b.nama.localeCompare(a.nama)
            : a.nama.localeCompare(b.nama);
    });
}

console.log("=== 4. Pengurutan Berdasarkan Nama ===");
console.log("Ascending (A-Z):", sortMahasiswaByNama(daftarMahasiswa, "asc").map(m => m.nama));
console.log("Descending (Z-A):", sortMahasiswaByNama(daftarMahasiswa, "desc").map(m => m.nama));
console.log("");

// 5. Fitur CRUD sederhana (Create, Read, Update, Delete)
console.log("=== 5. Fitur CRUD Mahasiswa ===");

// CREATE
function createMahasiswa(mhsBaru) {
    const exists = daftarMahasiswa.some(m => m.nim === mhsBaru.nim);
    if (exists) {
        return { success: false, message: `Mahasiswa dengan NIM ${mhsBaru.nim} sudah ada.` };
    }
    daftarMahasiswa.push(mhsBaru);
    return { success: true, message: `Mahasiswa ${mhsBaru.nama} berhasil ditambahkan.` };
}

// READ
function readMahasiswa(nim = null) {
    if (nim) {
        return daftarMahasiswa.find(m => m.nim === nim) || null;
    }
    return daftarMahasiswa;
}

// UPDATE
function updateMahasiswa(nim, dataBaru) {
    const index = daftarMahasiswa.findIndex(m => m.nim === nim);
    if (index === -1) {
        return { success: false, message: `Mahasiswa dengan NIM ${nim} tidak ditemukan.` };
    }
    daftarMahasiswa[index] = { ...daftarMahasiswa[index], ...dataBaru };
    return { success: true, message: `Data mahasiswa NIM ${nim} berhasil diperbarui.` };
}

// DELETE
function deleteMahasiswa(nim) {
    const index = daftarMahasiswa.findIndex(m => m.nim === nim);
    if (index === -1) {
        return { success: false, message: `Mahasiswa dengan NIM ${nim} tidak ditemukan.` };
    }
    const [deleted] = daftarMahasiswa.splice(index, 1);
    return { success: true, message: `Mahasiswa ${deleted.nama} (NIM: ${nim}) berhasil dihapus.` };
}

// Uji coba CRUD:
console.log(createMahasiswa({ nim: "21006", nama: "Farhan", jurusan: "Informatika", nilai: 88 }).message);
console.log(updateMahasiswa("21002", { nilai: 80 }).message);
console.log(deleteMahasiswa("21004").message);
console.log("Jumlah mahasiswa saat ini:", readMahasiswa().length);

// Contoh Integrasi Event Handler di Browser:
/*
document.getElementById("formTambahMhs")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const nim = document.getElementById("inputNim").value;
    const nama = document.getElementById("inputNama").value;
    const jurusan = document.getElementById("inputJurusan").value;
    const nilai = parseFloat(document.getElementById("inputNilai").value);
    
    const result = createMahasiswa({ nim, nama, jurusan, nilai });
    alert(result.message);
    // render ulang tabel
    // document.getElementById("containerTabel").innerHTML = renderHTMLTable(readMahasiswa());
});
*/
