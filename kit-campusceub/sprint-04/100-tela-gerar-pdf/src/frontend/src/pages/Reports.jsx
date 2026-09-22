import { useEffect, useState } from 'react';
import { listarLotes } from '../services/lotService';
import { gerarRelatorio } from '../services/reportsService';
import { formatStatus } from '../utils/formatters';

const FORM_INICIAL = { lote_id: '' };

const cardStyle = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' };
const inputStyle = { width: '100%', marginTop: '6px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' };
const primaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#15803d', color: '#fff', cursor: 'pointer' };
const secondaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' };
const sucessoStyle = { background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '10px' };
const erroStyle = { background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '10px' };

export default function ReportsPage() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [lotes, setLotes] = useState([]);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregarLotes() {
      try {
        setErro('');
        const data = await listarLotes();
        setLotes(Array.isArray(data) ? data : []);
      } catch (error) {
        setErro(error.message || 'Erro ao carregar lotes.');
      }
    }

    carregarLotes();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

      const response = await gerarRelatorio({ lote_id: Number(form.lote_id) });
      setMensagem(response.message || 'Relatório gerado com sucesso.');
      setForm(FORM_INICIAL);
    } catch (error) {
      setErro(error.message || 'Erro ao gerar relatório.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Relatórios</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Gere o PDF de conformidade de um lote. A listagem e o download entram na sprint seguinte.
        </p>
      </div>

      <div style={{ ...cardStyle, maxWidth: '520px' }}>
        <h2 style={{ marginTop: 0 }}>Gerar relatório</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
          <div>
            <label>Lote</label>
            <select name="lote_id" value={form.lote_id} onChange={handleChange} style={inputStyle}>
              <option value="">Selecione</option>
              {lotes.map((lote) => (
                <option key={lote.id} value={lote.id}>
                  Lote #{lote.id} - {lote.agencia_nome || 'Agência'} - {formatStatus(lote.status)}
                </option>
              ))}
            </select>
          </div>

          {mensagem && <div style={sucessoStyle}>{mensagem}</div>}
          {erro && <div style={erroStyle}>{erro}</div>}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={primaryButtonStyle}>Gerar PDF</button>
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
    </div>
  );
}
