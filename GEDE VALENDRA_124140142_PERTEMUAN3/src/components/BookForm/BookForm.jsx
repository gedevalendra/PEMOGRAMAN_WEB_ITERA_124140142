import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const EMPTY_FORM = { title: "", author: "", status: "milik" };

export default function BookForm({ onSubmit, editingBook, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(editingBook ? {
      title: editingBook.title,
      author: editingBook.author,
      status: editingBook.status
    } : EMPTY_FORM);
    setErrors({});
  }, [editingBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (value.trim()) setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Judul buku wajib diisi.";
    if (!form.author.trim()) nextErrors.author = "Nama penulis wajib diisi.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSubmit({ title: form.title.trim(), author: form.author.trim(), status: form.status });
    setForm(EMPTY_FORM);
    setErrors({});
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{editingBook ? "PERBARUI KOLEKSI" : "TAMBAHKAN KOLEKSI"}</p>
          <h2>{editingBook ? "Edit buku" : "Buku baru"}</h2>
        </div>
        {editingBook && <button className="text-button" type="button" onClick={onCancel}>Batal</button>}
      </div>
      <label htmlFor="title">Judul buku</label>
      <input id="title" name="title" value={form.title} onChange={handleChange}
        placeholder="Contoh: Laut Bercerita" aria-invalid={Boolean(errors.title)} />
      {errors.title && <p className="field-error" role="alert">{errors.title}</p>}
      <label htmlFor="author">Nama penulis</label>
      <input id="author" name="author" value={form.author} onChange={handleChange}
        placeholder="Contoh: Leila S. Chudori" aria-invalid={Boolean(errors.author)} />
      {errors.author && <p className="field-error" role="alert">{errors.author}</p>}
      <label htmlFor="status">Status buku</label>
      <select id="status" name="status" value={form.status} onChange={handleChange}>
        <option value="milik">Sudah dimiliki</option>
        <option value="baca">Sedang dibaca</option>
        <option value="beli">Ingin dibeli</option>
      </select>
      <button className="primary-button form-submit" type="submit">{editingBook ? "Simpan perubahan" : "Tambah buku"} <span>↗</span></button>
    </form>
  );
}
BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.string, title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired, status: PropTypes.string.isRequired
  }),
  onCancel: PropTypes.func.isRequired
};
BookForm.defaultProps = { editingBook: null };