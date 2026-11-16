# Class Library 
class Library:
    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = []  
        
    # Menambahkan item ke koleksi 
    def tambah_item(self, item):
        for data in self.__koleksi:
            if data._item_id == item._item_id:
                print(f"Item dengan ID {item._item_id} sudah ada.")
                return
        self.__koleksi.append(item)
        print(f"Item '{item._judul}' berhasil ditambahkan.")

    # Menampilkan semua item yang ada
    def tampilkan_katalog(self):
        print(f"\n=== KATALOG {self.nama.upper()} ===")
        item_tersedia = [item for item in self.__koleksi if not item.is_dipinjam]

        if not item_tersedia:
            print("Tidak ada item yang tersedia.")
            return

        for item in item_tersedia:
            # Polymorphism
            print(item.get_detail())

    def cari_item(self, kata_kunci):
        hasil = []
        kata_kunci = str(kata_kunci).lower()

        for item in self.__koleksi:
            if (kata_kunci == str(item._item_id).lower()
                    or kata_kunci in item._judul.lower()):
                hasil.append(item)

        if hasil:
            print(f"\nHasil pencarian '{kata_kunci}':")
            for item in hasil:
                print(item.get_detail())
        else:
            print(f"\nItem '{kata_kunci}' tidak ditemukan.")

        return hasil

    def tampilkan_denda(self, item_id, hari_terlambat):
        for item in self.__koleksi:
            if item._item_id == item_id:
                denda = item.hitung_denda(hari_terlambat)
                print(f"Denda keterlambatan: Rp{denda:,}")
                return denda

        print("Item tidak ditemukan.")
        return None
