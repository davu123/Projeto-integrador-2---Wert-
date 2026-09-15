import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import logoWert from '../assets/logo-wert.png';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@wert.com.br');
  const [senha, setSenha] = useState('ecotrack2025');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.login({ email, senha });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <section className="login-hero">
        <div className="hero-inner">
          <div className="logo-block login-brand">
            <span className="login-logo-frame">
              <img className="brand-logo" src={logoWert} alt="Wert Ambiental" />
            </span>
            <strong>EcoTrack Wert</strong>
          </div>
          <h2>Tecnologia e sustentabilidade caminhando juntas.</h2>
          <p>Rastreie equipamentos, acompanhe lotes e tenha mais controle da operação.</p>
        </div>
      </section>

      <section className="login-card card">
        <h1>Bem-vindo de volta!</h1>
        <p>Acesse sua conta para continuar.</p>

        <form onSubmit={handleSubmit} className="form-grid form-single-col">
          <label>
            E-mail
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>

          <label>
            Senha
            <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" required />
          </label>

          {error && <div className="alert error">{error}</div>}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </section>
    </div>
  );
}
