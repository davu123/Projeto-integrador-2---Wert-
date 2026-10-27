import { useEffect, useState } from 'react';
import { listarRotas, criarRota, atualizarRota, excluirRota } from '../services/rotaService';
import { listarAgencias } from '../services/agencyService';
import { listarLotes } from '../services/lotService';

const PARADA_INICIAL = { agencia_id: '', lote_id: '', ordem: 1 };
const FORM_INICIAL = { data: '', paradas: [{ ...PARADA_INICIAL }] };

const cardStyle = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' };
const inputStyle = { width: '100%', marginTop: '6px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' };
const primaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#15803d', color: '#fff', cursor: 'pointer' };
const secondaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' };
const dangerButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#b91c1c', color: '#fff', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #f1f5f9' };

function montarPayload(form) {
  return {
    data: form.data,
    paradas: form.paradas.map((parada, index) => ({
      agencia_id: parada.agencia_id ? Number(parada.agencia_id) : null,
      lote_id: parada.lote_id ? Number(parada.lote_id) : null,
      ordem: Number(parada.ordem) || index + 1,
    })),
  };
}

export default function RoutesPage() {
  const [rotas, setRotas] = useState([]);
  const [agencias, setAgencias] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function carregarTudo() {
    try {
      const [rotasData, agenciasData, lotesData] = await Promise.all([
        listarRotas(),
        listarAgencias(),
        listarLotes(),
      ]);
      setRotas(Array.isArray(rotasData) ? rotasData : []);
      setAgencias(Array.isArray(agenciasData) ? agenciasData : []);
      setLotes(Array.isArray(lotesData) ? lotesData : []);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar rotas.');
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleParadaChange(index, name, value) {
    setForm((prev) => {
      const paradas = prev.paradas.map((parada, i) => (
        i === index ? { ...parada, [name]: value } : parada
      ));
      return { ...prev, paradas };
    });
  }

  function adicionarParada() {
    setForm((prev) => ({
      ...prev,
      paradas: [...prev.paradas, { ...PARADA_INICIAL, ordem: prev.paradas.length + 1 }],
    }));
  }

  function removerParada(index) {
    setForm((prev) => ({
      ...prev,
      paradas: prev.paradas
        .filter((_, i) => i !== index)
        .map((parada, i) => ({ ...parada, ordem: i + 1 })),
    }));
  }

  function limparFormulario() {
    setForm(FORM_INICIAL);
    setEditandoId(null);
  }

  function iniciarEdicao(rota) {
    setMensagem('');
    setErro('');
    setEditandoId(rota.id);
    setForm({
      data: String(rota.data).slice(0, 10),
      paradas: (rota.paradas || []).map((parada) => ({
        agencia_id: parada.agencia_id ? String(parada.agencia_id) : '',
        lote_id: parada.lote_id ? String(parada.lote_id) : '',
        ordem: parada.ordem,
      })),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const payload = montarPayload(form);
      if (editandoId) {
        setMensagem((await atualizarRota(editandoId, payload)).message || 'Rota atualizada com sucesso.');
      } else {
        setMensagem((await criarRota(payload)).message || 'Rota criada com sucesso.');
      }
      limparFormulario();
      await carregarTudo();
    } catch (error) {
      setErro(error.message || 'Erro ao salvar rota.');
    }
  }

  async function handleExcluir(id) {
    setMensagem('');
    setErro('');
    try {
      setMensagem((await excluirRota(id)).message || 'Rota excluída com sucesso.');
      if (editandoId === id) {
        limparFormulario();
      }
      await carregarTudo();
    } catch (error) {
      setErro(error.message || 'Erro ao excluir rota.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Rotas</h1>
      <p style={{ margin: '0 0 24px', color: '#64748b' }}>
        Monte a rota com data, paradas e ordem. Sem mapa e sem atribuição automática.
      </p>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', alignItems: 'start' }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>{editandoId ? 'Editar rota' : 'Nova rota'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label>Data</label>
              <input type="date" name="data" value={form.data} onChange={handleChange} style={inputStyle} />
            </div>

            {form.paradas.map((parada, index) => (
              <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }}>
                <strong>Parada {parada.ordem}</strong>
                <div>
                  <label>Agência</label>
                  <select value={parada.agencia_id} onChange={(e) => handleParadaChange(index, 'agencia_id', e.target.value)} style={inputStyle}>
                    <option value="">Selecione</option>
                    {agencias.map((agencia) => (
                      <option key={agencia.id} value={agencia.id}>{agencia.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Lote (opcional)</label>
                  <select value={parada.lote_id} onChange={(e) => handleParadaChange(index, 'lote_id', e.target.value)} style={inputStyle}>
                    <option value="">Nenhum</option>
                    {lotes.map((lote) => (
                      <option key={lote.id} value={lote.id}>Lote {lote.id} — {lote.agencia_nome}</option>
                    ))}
                  </select>
                </div>
                {form.paradas.length > 1 && (
                  <button type="button" onClick={() => removerParada(index)} style={{ ...secondaryButtonStyle, marginTop: '10px' }}>
                    Remover parada
                  </button>
                )}
              </div>
            ))}

            {mensagem && <div style={{ background: '#dcfce7', color: '#166534', padding: 12, borderRadius: 10 }}>{mensagem}</div>}
            {erro && <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 10 }}>{erro}</div>}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" onClick={adicionarParada} style={secondaryButtonStyle}>Adicionar parada</button>
              <button type="submit" style={primaryButtonStyle}>{editandoId ? 'Atualizar' : 'Criar'}</button>
              <button type="button" onClick={limparFormulario} style={secondaryButtonStyle}>Limpar</button>
            </div>
          </form>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Lista de rotas</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Data</th>
                  <th style={thStyle}>Paradas</th>
                  <th style={thStyle}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rotas.map((rota) => (
                  <tr key={rota.id}>
                    <td style={tdStyle}>{rota.id}</td>
                    <td style={tdStyle}>{String(rota.data).slice(0, 10)}</td>
                    <td style={tdStyle}>{(rota.paradas || []).length}</td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button onClick={() => iniciarEdicao(rota)} style={secondaryButtonStyle}>Editar</button>
                        <button onClick={() => handleExcluir(rota.id)} style={dangerButtonStyle}>Excluir</button>
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
