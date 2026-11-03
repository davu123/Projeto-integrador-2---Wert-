import { useEffect, useState } from 'react';
import { listarMinhasRotas, marcarRecolhimento } from '../services/rotaService';

const STATUS = [
  { valor: 'recolhido', rotulo: 'Recolhido', cor: '#15803d' },
  { valor: 'parcial', rotulo: 'Parcial', cor: '#b45309' },
  { valor: 'nao_recolhido', rotulo: 'Não recolhido', cor: '#b91c1c' },
];

const cardStyle = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' };
const inputStyle = { marginTop: '6px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #f1f5f9' };

function botaoStatusStyle(status, atual) {
  const marcado = status.valor === atual;
  return {
    padding: '8px 12px',
    borderRadius: '10px',
    border: `1px solid ${status.cor}`,
    background: marcado ? status.cor : '#fff',
    color: marcado ? '#fff' : status.cor,
    cursor: 'pointer',
  };
}

function rotuloStatus(valor) {
  return STATUS.find((status) => status.valor === valor)?.rotulo || 'Não marcado';
}

function hojeLocal() {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

function descreverParada(parada) {
  const partes = [];
  if (parada.agencia_id) partes.push(parada.agencia_nome || `Agência #${parada.agencia_id}`);
  if (parada.lote_id) partes.push(`Lote #${parada.lote_id}`);
  return partes.join(' · ');
}

export default function DriverRoutePage() {
  const [data, setData] = useState(hojeLocal());
  const [rotas, setRotas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [salvandoId, setSalvandoId] = useState(null);

  async function handleStatus(parada, status) {
    setMensagem('');
    setErro('');
    setSalvandoId(parada.id);
    try {
      const resposta = await marcarRecolhimento(parada.id, status);
      if (resposta?.rota) {
        setRotas((atuais) => atuais.map((rota) => (rota.id === resposta.rota.id ? resposta.rota : rota)));
      }
      setMensagem(resposta?.message || 'Recolhimento registrado.');
    } catch (error) {
      setErro(error.message || 'Erro ao registrar recolhimento.');
    } finally {
      setSalvandoId(null);
    }
  }

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setErro('');
      setMensagem('');
      if (!data) {
        setRotas([]);
        return;
      }
      setCarregando(true);
      try {
        const resposta = await listarMinhasRotas(data);
        if (ativo) setRotas(Array.isArray(resposta) ? resposta : []);
      } catch (error) {
        if (ativo) {
          setRotas([]);
          setErro(error.message || 'Erro ao carregar a rota do dia.');
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [data]);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Rota do dia</h1>
      <p style={{ margin: '0 0 24px', color: '#64748b' }}>
        Paradas da rota atribuída a você, na ordem. Marque o recolhimento de cada parada. Sem mapa.
      </p>

      <div style={{ ...cardStyle, marginBottom: '24px' }}>
        <label>Data</label>
        <div>
          <input type="date" value={data} onChange={(event) => setData(event.target.value)} style={inputStyle} />
        </div>
      </div>

      {mensagem && <div style={{ background: '#dcfce7', color: '#166534', padding: 12, borderRadius: 10, marginBottom: 24 }}>{mensagem}</div>}
      {erro && <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 10, marginBottom: 24 }}>{erro}</div>}
      {carregando && <p style={{ color: '#64748b' }}>Carregando...</p>}
      {!carregando && !erro && rotas.length === 0 && (
        <div style={cardStyle}>Nenhuma rota atribuída a você nesta data.</div>
      )}

      {rotas.map((rota) => (
        <div key={rota.id} style={{ ...cardStyle, marginBottom: '24px' }}>
          <h2 style={{ marginTop: 0 }}>Rota #{rota.id} — {String(rota.data).slice(0, 10)}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Ordem</th>
                  <th style={thStyle}>Parada</th>
                  <th style={thStyle}>Recolhimento</th>
                  <th style={thStyle}>Marcar</th>
                </tr>
              </thead>
              <tbody>
                {(rota.paradas || []).map((parada) => (
                  <tr key={parada.id}>
                    <td style={tdStyle}>{parada.ordem}</td>
                    <td style={tdStyle}>{descreverParada(parada)}</td>
                    <td style={tdStyle}>{rotuloStatus(parada.status_recolhimento)}</td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {STATUS.map((status) => (
                          <button
                            key={status.valor}
                            type="button"
                            disabled={salvandoId === parada.id}
                            onClick={() => handleStatus(parada, status.valor)}
                            style={botaoStatusStyle(status, parada.status_recolhimento)}
                          >
                            {status.rotulo}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
