import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import logoWert from '../assets/logo-wert.png';

export default function Header() {
  const { theme, toggleTheme, increaseFont, decreaseFont, highContrast, setHighContrast } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="page-header">
      <div className="header-brand">
        <span className="header-logo-frame">
          <img className="brand-logo" src={logoWert} alt="Wert Ambiental" />
        </span>
        <div>
          <h1>EcoTrack Wert</h1>
          <p>Gestão de descarte eletrônico com foco em rastreabilidade.</p>
        </div>
      </div>

      <div className="header-actions">
        <button type="button" className="ghost-btn" onClick={decreaseFont}>A-</button>
        <button type="button" className="ghost-btn" onClick={increaseFont}>A+</button>
        <button type="button" className="ghost-btn" onClick={() => setHighContrast(!highContrast)}>
          {highContrast ? 'Contraste normal' : 'Alto contraste'}
        </button>
        <button type="button" className="ghost-btn" onClick={toggleTheme}>
          {theme === 'light' ? 'Modo escuro' : 'Modo claro'}
        </button>
        <div className="user-pill">
          <span>{user?.nome || 'Usuário'}</span>
          <small>{user?.perfil || 'perfil'}</small>
        </div>
        <button type="button" className="ghost-btn" onClick={logout}>Sair</button>
      </div>
    </header>
  );
}
