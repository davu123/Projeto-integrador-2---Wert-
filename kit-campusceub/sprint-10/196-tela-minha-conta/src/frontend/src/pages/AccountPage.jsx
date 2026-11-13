import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { alterarSenha } from '../services/authService';

const SENHA_MINIMA = 8;
const FORM_INICIAL = { senha_atual: '', nova_senha: '', confirmacao: '' };

export default function AccountPage() {
  const { user } = useAuth();
  const [form, setForm] = useState(FORM_INICIAL);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [salvando, setSalvando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    if (form.nova_senha.length < SENHA_MINIMA) {
      setError(`A nova senha deve ter pelo menos ${SENHA_MINIMA} caracteres.`);
      return;
    }

    if (form.nova_senha !== form.confirmacao) {
      setError('A confirmação não é igual à nova senha.');
      return;
    }

    if (form.nova_senha === form.senha_atual) {
      setError('A nova senha deve ser diferente da atual.');
      return;
    }

    setSalvando(true);
    try {
      const resposta = await alterarSenha(form.senha_atual, form.nova_senha);
      setMessage(resposta.message || 'Senha alterada com sucesso.');
      setForm(FORM_INICIAL);
    } catch (err) {
      setError(err.message || 'Erro ao alterar senha.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <section className="card form-card">
      <div className="section-title">
        <h2>Minha conta</h2>
        <p>{user?.nome} ({user?.email}). Troque a sua senha de acesso.</p>
      </div>

      <form className="form-grid form-single-col" onSubmit={handleSubmit}>
        <label>
          Senha atual
          <input
            name="senha_atual"
            type="password"
            autoComplete="current-password"
            value={form.senha_atual}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nova senha
          <input
            name="nova_senha"
            type="password"
            autoComplete="new-password"
            minLength={SENHA_MINIMA}
            value={form.nova_senha}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirme a nova senha
          <input
            name="confirmacao"
            type="password"
            autoComplete="new-password"
            minLength={SENHA_MINIMA}
            value={form.confirmacao}
            onChange={handleChange}
            required
          />
        </label>

        <p style={{ margin: 0 }}>A nova senha precisa ter pelo menos {SENHA_MINIMA} caracteres.</p>

        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert error">{error}</div>}

        <div className="form-actions">
          <button className="primary-btn" type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Alterar senha'}
          </button>
        </div>
      </form>
    </section>
  );
}
