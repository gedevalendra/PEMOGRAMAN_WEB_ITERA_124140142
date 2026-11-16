from library_item import Book, Magazine
from library import Library


def main():
    perpustakaan = Library("Perpustakaan Sederhana")

    buku1 = Book("B001", "Bumi", 2014, "Tere Liye")
    buku2 = Book("B002", "Laut Bercerita", 2017, "Leila S. Chudori")

    majalah1 = Magazine("M001", "Amazing Lampung", 2021, "Edisi 1")
    majalah2 = Magazine("M002", "Bastera", 2025, "Edisi XIV")

    print("=== MENAMBAHKAN ITEM ===")
    perpustakaan.tambah_item(buku1)
    perpustakaan.tambah_item(buku2)
    perpustakaan.tambah_item(majalah1)
    perpustakaan.tambah_item(majalah2)

    perpustakaan.tampilkan_katalog()

    perpustakaan.cari_item("B001")
    perpustakaan.cari_item("National Geographic")

    print("\n=== STATUS PEMINJAMAN ===")
    print(f"Sebelum dipinjam: {buku1.is_dipinjam}")
    buku1.pinjam()
    print(f"Setelah dipinjam: {buku1.is_dipinjam}")

    perpustakaan.tampilkan_katalog()

    buku1.kembalikan()
    print("\nBuku berhasil dikembalikan.")
    perpustakaan.tampilkan_katalog()

    print("\n=== PERHITUNGAN DENDA ===")
    perpustakaan.tampilkan_denda("B001", 3)
    perpustakaan.tampilkan_denda("M001", 3)


if __name__ == "__main__":
    main()
