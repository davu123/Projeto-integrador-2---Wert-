import { Link, NavLink } from 'react-router-dom';
import logoWert from '../assets/logo-wert.png';
import { useAuth } from '../context/AuthContext';
import { MENU, podeVerMenu } from '../auth/acesso';

export default function Sidebar() {
  const { user } = useAuth();
  const itens = MENU.filter((item) => podeVerMenu(user?.perfil, item.href));

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
        {itens.map(({ href, label }) => (
          <NavLink
            key={label}
            to={href}
            end={href === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
