import { Link, NavLink } from 'react-router-dom';

const items = [
  ['/', 'Dashboard'],
  ['/usuarios', 'Usuários'],
  ['/equipamentos/novo', 'Equipamentos'],
  ['/equipamentos', 'Listagem'],
  ['/agencias', 'Agências'],
  ['/lotes', 'Lotes'],
  ['/destinacoes', 'Destinação'],
  ['/relatorios', 'Relatórios']
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
        {items.map(([href, label]) =>
          href === '#' ? (
            <a key={label} href={href} className="nav-item nav-item-disabled" aria-disabled="true">
              {label}
            </a>
          ) : (
            <NavLink key={label} to={href} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
}
