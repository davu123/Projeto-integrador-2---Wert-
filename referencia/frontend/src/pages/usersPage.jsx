import { useEffect, useState } from 'react';
import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  atualizarStatusUsuario,
} from '../services/userService';

const FORM_INICIAL = { nome: '', email: '', senha: '', perfil: 'tecnico', ativo: true };

const cardStyle = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' };
const inputStyle = { width: '100%', marginTop: '6px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' };
const primaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#15803d', color: '#fff', cursor: 'pointer' };
const secondaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' };
const dangerButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#b91c1c', color: '#fff', cursor: 'pointer' };
const sucessoStyle = { background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '10px' };
const erroStyle = { background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '10px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #f1f5f9' };

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);

  async function carregarUsuarios() {
    try {
      setLoading(true);
      setErro('');
      const data = await listarUsuarios();
      setUsuarios(data);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregarUsuarios(); }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function limparFormulario() { setForm(FORM_INICIAL); setEditandoId(null); }

  function iniciarEdicao(usuario) {
    setMensagem('');
    setErro('');
    setEditandoId(usuario.id);
    setForm({ nome: usuario.nome, email: usuario.email, senha: '', perfil: usuario.perfil, ativo: usuario.ativo });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem('');
    setErro('');
    try {
      if (editandoId) {
        const payload = { nome: form.nome, email: form.email, perfil: form.perfil, ativo: form.ativo };
        if (form.senha) payload.senha = form.senha;
        const response = await atualizarUsuario(editandoId, payload);
        setMensagem(response.message || 'Usuário atualizado com sucesso.');
      } else {
        const response = await criarUsuario(form);
        setMensagem(response.message || 'Usuário criado com sucesso.');
      }
      limparFormulario();
      await carregarUsuarios();
    } catch (error) {
      setErro(error.message || 'Erro ao salvar usuário.');
    }
  }

  async function handleAlterarStatus(usuario) {
    setMensagem('');
    setErro('');
    try {
      const response = await atualizarStatusUsuario(usuario.id, !usuario.ativo);
      setMensagem(response.message || 'Status atualizado com sucesso.');
      await carregarUsuarios();
    } catch (error) {
      setErro(error.message || 'Erro ao alterar status do usuário.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Usuários</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Gerencie administradores, técnicos, gestores e auditores.</p>
      </div>
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', alignItems: 'start' }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>{editandoId ? 'Editar usuário' : 'Novo usuário'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div><label>Nome</label><input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" style={inputStyle} /></div>
            <div><label>E-mail</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@wert.com.br" style={inputStyle} /></div>
            <div><label>{editandoId ? 'Nova senha (opcional)' : 'Senha'}</label><input name="senha" type="password" value={form.senha} onChange={handleChange} placeholder="Digite a senha" style={inputStyle} /></div>
            <div>
              <label>Perfil</label>
              <select name="perfil" value={form.perfil} onChange={handleChange} style={inputStyle}>
                <option value="administrador">Administrador</option>
                <option value="tecnico">Técnico</option>
                <option value="gestor">Gestor</option>
                <option value="auditor">Auditor</option>
              </select>
            </div>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><input type="checkbox" name="ativo" checked={form.ativo} onChange={handleChange} />Usuário ativo</label>
            {mensagem && <div style={sucessoStyle}>{mensagem}</div>}
            {erro && <div style={erroStyle}>{erro}</div>}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="submit" style={primaryButtonStyle}>{editandoId ? 'Atualizar' : 'Criar'}</button>
              <button type="button" onClick={limparFormulario} style={secondaryButtonStyle}>Limpar</button>
            </div>
          </form>
        </div>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Lista de usuários</h2>
          {loading ? <p>Carregando...</p> : usuarios.length === 0 ? <p>Nenhum usuário encontrado.</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead><tr><th style={thStyle}>ID</th><th style={thStyle}>Nome</th><th style={thStyle}>E-mail</th><th style={thStyle}>Perfil</th><th style={thStyle}>Status</th><th style={thStyle}>Ações</th></tr></thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td style={tdStyle}>{usuario.id}</td><td style={tdStyle}>{usuario.nome}</td><td style={tdStyle}>{usuario.email}</td><td style={tdStyle}>{usuario.perfil}</td>
                      <td style={tdStyle}><span style={{ padding: '6px 10px', borderRadius: '999px', fontSize: '12px', background: usuario.ativo ? '#dcfce7' : '#fee2e2', color: usuario.ativo ? '#166534' : '#991b1b' }}>{usuario.ativo ? 'Ativo' : 'Inativo'}</span></td>
                      <td style={tdStyle}><div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}><button onClick={() => iniciarEdicao(usuario)} style={secondaryButtonStyle}>Editar</button><button onClick={() => handleAlterarStatus(usuario)} style={usuario.ativo ? dangerButtonStyle : primaryButtonStyle}>{usuario.ativo ? 'Inativar' : 'Ativar'}</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
