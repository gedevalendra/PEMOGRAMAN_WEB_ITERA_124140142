import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useBooks } from "../../context/BookContext";
import { useBookStats } from "../../hooks/useBookStats";
import BookForm from "../../components/BookForm/BookForm";
import BookList from "../../components/BookList/BookList";
import BookFilter from "../../components/BookFilter/BookFilter";

function StatChip({ label, value }) {
  return <div className="stat-chip"><span>{label}</span><strong>{value}</strong></div>;
}
StatChip.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.number.isRequired };

export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const stats = useBookStats(books);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("semua");
  const [editingBook, setEditingBook] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredBooks = useMemo(() => books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase().trim());
    return matchesSearch && (status === "semua" || book.status === status);
  }), [books, search, status]);

  function submitBook(book) {
    if (editingBook) {
      updateBook(editingBook.id, book);
      setNotice("Perubahan buku berhasil disimpan.");
      setEditingBook(null);
    } else {
      addBook(book);
      setNotice("Buku berhasil ditambahkan ke koleksi.");
    }
    window.setTimeout(() => setNotice(""), 2800);
  }

  function removeBook(id) {
    if (window.confirm("Yakin ingin menghapus buku ini?")) {
      deleteBook(id);
      if (editingBook?.id === id) setEditingBook(null);
      setNotice("Buku telah dihapus.");
      window.setTimeout(() => setNotice(""), 2800);
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">PERPUSTAKAAN PERSONAL / 2026</p>
          <h1>Setiap buku punya<br /><em>tempatnya.</em></h1>
          <p className="hero-description">Catat bacaan, simpan daftar keinginan, dan rawat perjalanan membaca dalam satu ruang.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-sun" /><div className="art-book book-one" /><div className="art-book book-two" /><div className="art-book book-three" /><span className="art-star">✳</span>
        </div>
      </section>

      <section className="stats-row" aria-label="Ringkasan koleksi">
        <StatChip label="Total koleksi" value={stats.total} />
        <StatChip label="Sudah dimiliki" value={stats.owned} />
        <StatChip label="Sedang dibaca" value={stats.reading} />
        <StatChip label="Daftar keinginan" value={stats.wishlist} />
      </section>

      {notice && <p className="notice" role="status">{notice}</p>}

      <section className="library-layout">
        <aside className="form-panel"><BookForm onSubmit={submitBook} editingBook={editingBook}
          onCancel={() => setEditingBook(null)} /></aside>
        <div className="collection-panel">
          <div className="section-heading">
            <div><p className="eyebrow">RAK BUKU</p><h2>Koleksimu <span className="count-badge">{filteredBooks.length}</span></h2></div>
            <span className="small-caption">Disimpan di perangkat ini</span>
          </div>
          <BookFilter search={search} onSearch={setSearch} status={status} onStatusChange={setStatus} />
          <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={removeBook} />
        </div>
      </section>
    </>
  );
}