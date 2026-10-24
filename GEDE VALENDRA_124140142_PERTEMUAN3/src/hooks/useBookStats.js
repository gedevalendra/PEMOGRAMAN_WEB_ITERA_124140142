import { useMemo } from "react";

// Menghitung ringkasan jumlah buku untuk halaman statistik.
export function useBookStats(books) {
  return useMemo(() => ({
    total: books.length,
    owned: books.filter((book) => book.status === "milik").length,
    reading: books.filter((book) => book.status === "baca").length,
    wishlist: books.filter((book) => book.status === "beli").length
  }), [books]);
}