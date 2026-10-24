import PropTypes from "prop-types";
import { useBooks } from "../../context/BookContext";
import { useBookStats } from "../../hooks/useBookStats";

function Metric({ label, value, description }) {
  return <article className="metric-card"><span>{label}</span><strong>{value}</strong><p>{description}</p></article>;
}
Metric.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.number.isRequired, description: PropTypes.string.isRequired };

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);
  const readingPercent = stats.total ? Math.round(stats.reading / stats.total * 100) : 0;
  return (
    <section className="stats-page">
      <p className="eyebrow">CATATAN PERJALANAN MEMBACA</p>
      <h1>Angka kecil,<br /><em>cerita besar.</em></h1>
      <p className="page-intro">Lihat ringkasan sederhana dari koleksi buku yang kamu simpan.</p>
      <div className="metrics-grid">
        <Metric label="Semua buku" value={stats.total} description="Jumlah buku dalam koleksi." />
        <Metric label="Sudah dimiliki" value={stats.owned} description="Buku yang sudah menjadi milikmu." />
        <Metric label="Sedang dibaca" value={stats.reading} description="Bacaan yang sedang berjalan." />
        <Metric label="Ingin dibeli" value={stats.wishlist} description="Buku yang masuk daftar keinginan." />
      </div>
      <div className="progress-panel">
        <div><p className="eyebrow">PROGRES BACAAN</p><h2>Terus buka halaman berikutnya.</h2></div>
        <div className="progress-number">{readingPercent}<span>%</span></div>
        <div className="progress-track"><div style={{ width: `${readingPercent}%` }} /></div>
        <p>{stats.reading} dari {stats.total} buku berstatus sedang dibaca.</p>
      </div>
    </section>
  );
}