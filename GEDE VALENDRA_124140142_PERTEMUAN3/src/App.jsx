import { NavLink, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="RuangBaca beranda">
          <span className="brand-mark">rb.</span>
          <span>RuangBaca</span>
        </NavLink>
        <nav className="navigation" aria-label="Navigasi utama">
          <NavLink to="/" end>Perpustakaan</NavLink>
          <NavLink to="/stats">Statistik</NavLink>
        </nav>
        <span className="topbar-note">Koleksi pribadimu</span>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">RuangBaca <span>•</span> ruang kecil untuk cerita besar.</footer>
    </div>
  );
}
Layout.propTypes = { children: PropTypes.node.isRequired };

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}