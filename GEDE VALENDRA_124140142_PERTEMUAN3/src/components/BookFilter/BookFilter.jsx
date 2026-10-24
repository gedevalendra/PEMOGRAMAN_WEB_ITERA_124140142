import PropTypes from "prop-types";

export default function BookFilter({ search, onSearch, status, onStatusChange }) {
  return (
    <div className="filter-bar">
      <label className="search-field" htmlFor="search-book"><span>⌕</span>
        <input id="search-book" value={search} onChange={(event) => onSearch(event.target.value)}
          placeholder="Cari judul atau penulis..." />
      </label>
      <label className="filter-select-label" htmlFor="filter-status">Status
        <select id="filter-status" value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="semua">Semua buku</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang dibaca</option>
          <option value="beli">Wishlist</option>
        </select>
      </label>
    </div>
  );
}
BookFilter.propTypes = {
  search: PropTypes.string.isRequired, onSearch: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired, onStatusChange: PropTypes.func.isRequired
};