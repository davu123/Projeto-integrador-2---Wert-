import { useEffect, useState } from 'react';
import api from '../services/api';

const FORM_INICIAL = {
  lote_id: '',
};

export default function ReportsPage() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [lotes, setLotes] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function carregarDados() {
    try {
      setLoading(true);
      setErro('');

      const [lotesData, relatoriosData] = await Promise.all([
        api.get('/lotes').catch(() => []),
        api.get('/relatorios').catch(() => []),
      ]);

      setLotes(Array.isArray(lotesData) ? lotesData : []);
      setRelatorios(Array.isArray(relatoriosData) ? relatoriosData : []);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar relatórios.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem('');
    setErro('');

    try {
      if (!form.lote_id) {
        setErro('Selecione um lote para gerar o relatório.');
        return;
      }

      const response = await api.post('/relatorios/gerar', {
        lote_id: Number(form.lote_id),
      });

      setMensagem(response.message || 'Relatório gerado com sucesso.');
      setForm(FORM_INICIAL);
      await carregarDados();
    } catch (error) {
      setErro(error.message || 'Erro ao gerar relatório.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Relatórios</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Gere e acompanhe relatórios de conformidade ambiental.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Gerar relatório</h2>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label>Lote</label>
              <select
                name="lote_id"
                value={form.lote_id}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Selecione</option>
                {lotes.map((lote) => (
                  <option key={lote.id} value={lote.id}>
                    Lote #{lote.id} - {lote.agencia_nome || 'Agência'} - {lote.status}
                  </option>
                ))}
              </select>
            </div>

            {mensagem && <div style={sucessoStyle}>{mensagem}</div>}
            {erro && <div style={erroStyle}>{erro}</div>}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" style={primaryButtonStyle}>
                Gerar PDF
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm(FORM_INICIAL);
                  setErro('');
                  setMensagem('');
                }}
                style={secondaryButtonStyle}
              >
                Limpar
              </button>
            </div>
          </form>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Lista de relatórios</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : relatorios.length === 0 ? (
            <p>Nenhum relatório encontrado.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Lote</th>
                    <th style={thStyle}>Gerado em</th>
                    <th style={thStyle}>Arquivo</th>
                  </tr>
                </thead>
                <tbody>
                  {relatorios.map((relatorio) => (
                    <tr key={relatorio.id}>
                      <td style={tdStyle}>{relatorio.id}</td>
                      <td style={tdStyle}>{relatorio.lote_id}</td>
                      <td style={tdStyle}>
                        {relatorio.data_geracao
                          ? new Date(relatorio.data_geracao).toLocaleString('pt-BR')
                          : '-'}
                      </td>
                      <td style={tdStyle}>
                        {relatorio.arquivo_pdf_url ? (
                          <a
                            href={`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000'}${relatorio.arquivo_pdf_url}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#15803d', fontWeight: 600 }}
                          >
                            Baixar PDF
                          </a>
                        ) : (
                          '-'
                        )}
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

const sucessoStyle = {
  background: '#dcfce7',
  color: '#166534',
  padding: '12px',
  borderRadius: '10px',
};

const erroStyle = {
  background: '#fee2e2',
  color: '#991b1b',
  padding: '12px',
  borderRadius: '10px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  textAlign: 'left',
  padding: '12px',
  borderBottom: '1px solid #e5e7eb',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #f1f5f9',
};
