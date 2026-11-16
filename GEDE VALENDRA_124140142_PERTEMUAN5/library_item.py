from abc import ABC, abstractmethod


# Abstract class sebagai dasar semua item perpustakaan.
class LibraryItem(ABC):
    def __init__(self, item_id, judul, tahun):
        self._item_id = item_id
        self._judul = judul
        self._tahun = tahun
        self.__dipinjam = False

    # Property untuk melihat status peminjaman item.
    @property
    def is_dipinjam(self):
        return self.__dipinjam

    # Mengubah status peminjaman item.
    def pinjam(self):
        if not self.__dipinjam:
            self.__dipinjam = True
            return True
        return False

    # Mengubah status item menjadi tersedia.
    def kembalikan(self):
        if self.__dipinjam:
            self.__dipinjam = False
            return True
        return False

    # Method abstract yang wajib dibuat oleh subclass.
    @abstractmethod
    def get_detail(self):
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        pass


# Class Book mewarisi LibraryItem.
class Book(LibraryItem):
    def __init__(self, item_id, judul, tahun, penulis):
        super().__init__(item_id, judul, tahun)
        self._penulis = penulis

    # Menampilkan detail buku.
    def get_detail(self):
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[Buku] ID: {self._item_id} | Judul: {self._judul} | "
            f"Penulis: {self._penulis} | Tahun: {self._tahun} | Status: {status}"
        )

    # Denda buku sebesar Rp1.000 per hari.
    def hitung_denda(self, hari_terlambat):
        return max(0, hari_terlambat) * 1000


# Class Magazine mewarisi LibraryItem.
class Magazine(LibraryItem):
    def __init__(self, item_id, judul, tahun, edisi):
        super().__init__(item_id, judul, tahun)
        self._edisi = edisi

    # Menampilkan detail majalah.
    def get_detail(self):
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[Majalah] ID: {self._item_id} | Judul: {self._judul} | "
            f"Edisi: {self._edisi} | Tahun: {self._tahun} | Status: {status}"
        )

    # Denda majalah sebesar Rp500 per hari.
    def hitung_denda(self, hari_terlambat):
        return max(0, hari_terlambat) * 500
