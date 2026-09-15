import { Link, NavLink } from 'react-router-dom';
import logoWert from '../assets/logo-wert.png';

const items = [['/', 'Início']];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/" className="brand brand-side">
        <span className="brand-logo-frame">
          <img className="brand-logo" src={logoWert} alt="Wert Ambiental" />
        </span>
        <span className="brand-copy">
          <strong>EcoTrack Wert</strong>
          <span>Gestão ambiental</span>
        </span>
      </Link>

      <nav className="nav-menu" aria-label="Menu principal">
        {items.map(([href, label]) => (
          <NavLink key={label} to={href} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
