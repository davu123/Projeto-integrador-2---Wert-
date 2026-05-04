import { Link, NavLink } from 'react-router-dom';

const items = [
  ['/', 'Dashboard'],
  ['/equipamentos/novo', 'Equipamentos'],
  ['/equipamentos', 'Listagem'],
  ['#', 'Agências'],
  ['#', 'Destinação'],
  ['#', 'Relatórios']
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/" className="brand brand-side">
        <div className="brand-icon">🌿</div>
        <div>
          <strong>EcoTrack</strong>
          <span>Wert</span>
        </div>
      </Link>

      <nav className="nav-menu" aria-label="Menu principal">
        {items.map(([href, label]) => (
          href === '#'
            ? <a key={label} href={href} className="nav-item nav-item-disabled" aria-disabled="true">{label}</a>
            : <NavLink key={label} to={href} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>{label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}
