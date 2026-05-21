import { useEffect, useState } from 'react';
import { listarLotes, criarLote, atualizarLote, atualizarStatusLote } from '../services/lotService';
import { listarAgencias } from '../services/agencyService';
import { listarUsuarios } from '../services/userService';
import { formatStatus } from '../utils/formatters';

const FORM_INICIAL = { data_coleta: '', agencia_id: '', tecnico_id: '', status: 'pendente', observacoes: '' };
const cardStyle = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' };
const inputStyle = { width: '100%', marginTop: '6px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' };
const primaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#15803d', color: '#fff', cursor: 'pointer' };
const secondaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #f1f5f9' };

export default function LotsPage() {
  const [lotes, setLotes] = useState([]);
  const [agencias, setAgencias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function carregarTudo() {
    try {
      const [lotesData, agenciasData, usuariosData] = await Promise.all([
        listarLotes(),
        listarAgencias(),
        listarUsuarios(),
      ]);
      setLotes(lotesData);
      setAgencias(agenciasData);
      setUsuarios(usuariosData.filter((u) => u.perfil === 'tecnico' || u.perfil === 'administrador'));
    } catch (error) {
      setErro(error.message || 'Erro ao carregar dados.');
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function limparFormulario() {
    setForm(FORM_INICIAL);
    setEditandoId(null);
  }

  function iniciarEdicao(lote) {
    setEditandoId(lote.id);
    setForm({
      data_coleta: String(lote.data_coleta).slice(0, 10),
      agencia_id: String(lote.agencia_id),
      tecnico_id: String(lote.tecnico_id),
      status: lote.status,
      observacoes: lote.observacoes || '',
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');
    setErro('');

    const payload = {
      ...form,
      agencia_id: Number(form.agencia_id),
      tecnico_id: Number(form.tecnico_id),
    };

    try {
      if (editandoId) {
        setMensagem((await atualizarLote(editandoId, payload)).message || 'Lote atualizado com sucesso.');
      } else {
        setMensagem((await criarLote(payload)).message || 'Lote criado com sucesso.');
      }

      limparFormulario();
      await carregarTudo();
    } catch (error) {
      setErro(error.message || 'Erro ao salvar lote.');
    }
  }

  async function alterarStatus(id, status) {
    try {
      setMensagem((await atualizarStatusLote(id, status)).message || 'Status atualizado com sucesso.');
      await carregarTudo();
    } catch (error) {
      setErro(error.message || 'Erro ao alterar status.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Lotes</h1>
      <p style={{ margin: '0 0 24px', color: '#64748b' }}>
        Gerencie lotes vinculando agência, técnico e status do processo.
      </p>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px' }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>{editandoId ? 'Editar lote' : 'Novo lote'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label>Data de coleta</label>
              <input type="date" name="data_coleta" value={form.data_coleta} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label>Agência</label>
              <select name="agencia_id" value={form.agencia_id} onChange={handleChange} style={inputStyle}>
                <option value="">Selecione</option>
                {agencias.map((agencia) => (
                  <option key={agencia.id} value={agencia.id}>{agencia.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Técnico</label>
              <select name="tecnico_id" value={form.tecnico_id} onChange={handleChange} style={inputStyle}>
                <option value="">Selecione</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                <option value="pendente">Pendente</option>
                <option value="em_triagem">Em triagem</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
            <div>
              <label>Observações</label>
              <input name="observacoes" value={form.observacoes} onChange={handleChange} style={inputStyle} />
            </div>

            {mensagem && <div style={{ background: '#dcfce7', color: '#166534', padding: 12, borderRadius: 10 }}>{mensagem}</div>}
            {erro && <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 10 }}>{erro}</div>}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="submit" style={primaryButtonStyle}>{editandoId ? 'Atualizar' : 'Criar'}</button>
              <button type="button" onClick={limparFormulario} style={secondaryButtonStyle}>Limpar</button>
            </div>
          </form>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Lista de lotes</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Data</th>
                  <th style={thStyle}>Agência</th>
                  <th style={thStyle}>Técnico</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {lotes.map((lote) => (
                  <tr key={lote.id}>
                    <td style={tdStyle}>{lote.id}</td>
                    <td style={tdStyle}>{String(lote.data_coleta).slice(0, 10)}</td>
                    <td style={tdStyle}>{lote.agencia_nome}</td>
                    <td style={tdStyle}>{lote.tecnico_nome}</td>
                    <td style={tdStyle}>{formatStatus(lote.status)}</td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button onClick={() => iniciarEdicao(lote)} style={secondaryButtonStyle}>Editar</button>
                        <button onClick={() => alterarStatus(lote.id, 'concluido')} style={primaryButtonStyle}>Concluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
