import { useEffect, useState } from 'react';
import {
  listarDestinacoes,
  criarDestinacao,
  atualizarDestinacao,
  excluirDestinacao,
} from '../services/destinationService';
import api from '../services/api';
import { formatDestino } from '../utils/formatters';

const FORM_INICIAL = {
  equipamento_id: '',
  tipo_destino: 'reciclagem',
  empresa: '',
  data: '',
  certificado_url: '',
};

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  padding: '24px',
  border: '1px solid #e5e7eb',
};

const inputStyle = {
  width: '100%',
  marginTop: '6px',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  outline: 'none',
  boxSizing: 'border-box',
};

const primaryButtonStyle = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: 'none',
  background: '#15803d',
  color: '#fff',
  cursor: 'pointer',
};

const secondaryButtonStyle = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  background: '#fff',
  cursor: 'pointer',
};

const dangerButtonStyle = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: 'none',
  background: '#b91c1c',
  color: '#fff',
  cursor: 'pointer',
};

export default function DestinationsPage() {
  const [destinacoes, setDestinacoes] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);

  async function carregarTudo() {
    try {
      setLoading(true);
      setErro('');

      const [destResult, equipResult] = await Promise.allSettled([
        listarDestinacoes(),
        api.get('/equipamentos'),
      ]);

      if (destResult.status === 'fulfilled') {
        setDestinacoes(Array.isArray(destResult.value) ? destResult.value : []);
      } else {
        setDestinacoes([]);
      }

      if (equipResult.status === 'fulfilled') {
        setEquipamentos(Array.isArray(equipResult.value) ? equipResult.value : []);
      } else {
        setEquipamentos([]);
      }

      if (destResult.status === 'rejected' && equipResult.status === 'rejected') {
        setErro('Erro ao carregar destinações e equipamentos.');
      } else if (destResult.status === 'rejected') {
        setErro(destResult.reason?.message || 'Erro ao listar destinações.');
      } else if (equipResult.status === 'rejected') {
        setErro(equipResult.reason?.message || 'Erro ao listar equipamentos.');
      }
    } catch (error) {
      setErro(error.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function limparFormulario(options = {}) {
    const { clearFeedback = true } = options;
    setForm(FORM_INICIAL);
    setEditandoId(null);
    if (clearFeedback) {
      setMensagem('');
      setErro('');
    }
  }

  function iniciarEdicao(destinacao) {
    setMensagem('');
    setErro('');
    setEditandoId(destinacao.id);
    setForm({
      equipamento_id: String(destinacao.equipamento_id),
      tipo_destino: destinacao.tipo_destino || 'reciclagem',
      empresa: destinacao.empresa || '',
      data: destinacao.data ? String(destinacao.data).slice(0, 10) : '',
      certificado_url: destinacao.certificado_url || '',
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      if (!form.equipamento_id || !form.empresa || !form.data) {
        setErro('Preencha equipamento, empresa e data.');
        return;
      }

      const payload = {
        equipamento_id: Number(form.equipamento_id),
        tipo_destino: form.tipo_destino,
        empresa: form.empresa.trim(),
        data: form.data,
        certificado_url: form.certificado_url.trim() || null,
      };

      let response;
      if (editandoId) {
        response = await atualizarDestinacao(editandoId, payload);
        setMensagem(response.message || 'Destinação atualizada com sucesso.');
      } else {
        response = await criarDestinacao(payload);
        setMensagem(response.message || 'Destinação criada com sucesso.');
      }

      limparFormulario({ clearFeedback: false });
      await carregarTudo();
    } catch (error) {
      console.error('Erro detalhado ao salvar destinação:', error);
      setErro(error.message || 'Erro ao salvar destinação.');
    }
  }

  async function handleExcluir(id) {
    const confirmou = window.confirm('Deseja excluir esta destinação?');
    if (!confirmou) return;

    setMensagem('');
    setErro('');

    try {
      const response = await excluirDestinacao(id);
      setMensagem(response.message || 'Destinação excluída com sucesso.');
      await carregarTudo();
    } catch (error) {
      setErro(error.message || 'Erro ao excluir destinação.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Destinação</h1>
      <p style={{ margin: '0 0 24px', color: '#64748b' }}>
        Registre o destino final de cada equipamento.
      </p>

      <div
        className="responsive-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '24px',
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>
            {editandoId ? 'Editar destinação' : 'Nova destinação'}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label>Equipamento</label>
              <select
                name="equipamento_id"
                value={form.equipamento_id}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Selecione</option>
                {equipamentos.map((equipamento) => (
                  <option key={equipamento.id} value={equipamento.id}>
                    {equipamento.id} - {equipamento.tipo} {equipamento.marca} {equipamento.modelo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Tipo de destino</label>
              <select
                name="tipo_destino"
                value={form.tipo_destino}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="reciclagem">Reciclagem</option>
                <option value="reuso">Reuso</option>
                <option value="destruicao">Destruição</option>
              </select>
            </div>

            <div>
              <label>Empresa</label>
              <input
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Data</label>
              <input
                type="date"
                name="data"
                value={form.data}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Certificado (opcional)</label>
              <input
                name="certificado_url"
                value={form.certificado_url}
                onChange={handleChange}
                placeholder="Link do certificado, se houver"
                style={inputStyle}
              />
            </div>

            {mensagem && (
              <div style={{ background: '#dcfce7', color: '#166534', padding: 12, borderRadius: 10 }}>
                {mensagem}
              </div>
            )}

            {erro && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 10 }}>
                {erro}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="submit" style={primaryButtonStyle}>
                {editandoId ? 'Atualizar' : 'Criar'}
              </button>

              <button type="button" onClick={limparFormulario} style={secondaryButtonStyle}>
                Limpar
              </button>
            </div>
          </form>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Lista de destinações</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : destinacoes.length === 0 ? (
            <p>Nenhuma destinação encontrada.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Equip.</th>
                    <th style={thStyle}>Destino</th>
                    <th style={thStyle}>Empresa</th>
                    <th style={thStyle}>Certificado</th>
                    <th style={thStyle}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {destinacoes.map((destinacao) => (
                    <tr key={destinacao.id}>
                      <td style={tdStyle}>{destinacao.id}</td>
                      <td style={tdStyle}>{destinacao.equipamento_id}</td>
                      <td style={tdStyle}>{formatDestino(destinacao.tipo_destino)}</td>
                      <td style={tdStyle}>{destinacao.empresa}</td>
                      <td style={tdStyle}>{destinacao.certificado_url || '-'}</td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <button
                            onClick={() => iniciarEdicao(destinacao)}
                            style={secondaryButtonStyle}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleExcluir(destinacao.id)}
                            style={dangerButtonStyle}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
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

const thStyle = {
  textAlign: 'left',
  padding: 12,
  borderBottom: '1px solid #e5e7eb',
};

const tdStyle = {
  padding: 12,
  borderBottom: '1px solid #f1f5f9',
};
