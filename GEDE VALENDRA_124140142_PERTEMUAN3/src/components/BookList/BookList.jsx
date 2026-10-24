import PropTypes from "prop-types";

const STATUS_LABELS = { milik: "Dimiliki", baca: "Sedang dibaca", beli: "Wishlist" };

export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length) {
    return <div className="empty-state"><span className="empty-icon">⌕</span><h3>Belum ada buku di sini</h3><p>Coba ubah kata pencarian atau tambahkan buku pertamamu.</p></div>;
  }
  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <article className="book-card" key={book.id}>
          <div className={`book-cover cover-${index % 5}`}>
            <span className="cover-label">RUANGBACA / {String(index + 1).padStart(2, "0")}</span>
            <span className="cover-title">{book.title}</span>
            <span className="cover-author">{book.author}</span>
            <span className="cover-symbol">✳</span>
          </div>
          <div className="book-details">
            <span className={`status-pill status-${book.status}`}>{STATUS_LABELS[book.status]}</span>
            <h3>{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <div className="card-actions">
              <button type="button" className="text-button" onClick={() => onEdit(book)}>Edit</button>
              <button type="button" className="text-button delete-button" onClick={() => onDelete(book.id)}>Hapus</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired, title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired, status: PropTypes.oneOf(["milik", "baca", "beli"]).isRequired
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};