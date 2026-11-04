dt_mhs = [
    {"NAMA": "Gede", "NIM": "124140142", "NILAI_UTS": 80, "NILAI_UAS": 90, "NILAI_TUGAS": 85},
    {"NAMA": "Valendra", "NIM": "124140143", "NILAI_UTS": 75, "NILAI_UAS": 85, "NILAI_TUGAS": 80},
    {"NAMA": "Frichintia", "NIM": "124140144", "NILAI_UTS": 90, "NILAI_UAS": 85, "NILAI_TUGAS": 90},
    {"NAMA": "Niken", "NIM": "124140144", "NILAI_UTS": 90, "NILAI_UAS": 65, "NILAI_TUGAS": 90},
    {"NAMA": "Gita", "NIM": "124140144", "NILAI_UTS": 93, "NILAI_UAS": 89, "NILAI_TUGAS": 90},
    {"NAMA": "Natasyah", "NIM": "124140144", "NILAI_UTS": 92, "NILAI_UAS": 84, "NILAI_TUGAS": 90},
]

hasil_mahasiswa = []

for mhs in dt_mhs:
    nilai_akhir = (0.30 * mhs["NILAI_UTS"]) + (0.40 * mhs["NILAI_UAS"]) + (0.30 * mhs["NILAI_TUGAS"])
    
    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"
        
    hasil_mahasiswa.append({
        "nama": mhs["NAMA"],
        "nim": mhs["NIM"],
        "nilai_akhir": nilai_akhir,
        "grade": grade
    })

print("\n" + "="*57)
print(f"{'DAFTAR NILAI MAHASISWA':^57}")
print("="*57)
print(f"{'Nama':<18} | {'NIM':<10} | {'Nilai Akhir':^12} | {'Grade':^5}")
print("-"*57)

for mhs in hasil_mahasiswa:
    print(f"{mhs['nama']:<18} | {mhs['nim']:<10} | {mhs['nilai_akhir']:^12.2f} | {mhs['grade']:^5}")

print("="*57 + "\n")

mahasiswa_tertinggi = max(hasil_mahasiswa, key=lambda x: x["nilai_akhir"])
mahasiswa_terendah = min(hasil_mahasiswa, key=lambda x: x["nilai_akhir"])

print("STATISTIK NILAI:")
print(f"🥇 Nilai Tertinggi : {mahasiswa_tertinggi['nama']} ({mahasiswa_tertinggi['nim']}) dengan Nilai {mahasiswa_tertinggi['nilai_akhir']:.2f} (Grade {mahasiswa_tertinggi['grade']})")
print(f"🥈 Nilai Terendah  : {mahasiswa_terendah['nama']} ({mahasiswa_terendah['nim']}) dengan Nilai {mahasiswa_terendah['nilai_akhir']:.2f} (Grade {mahasiswa_terendah['grade']})")
