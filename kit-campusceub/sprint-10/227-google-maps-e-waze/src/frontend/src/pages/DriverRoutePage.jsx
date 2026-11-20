import { useEffect, useState } from 'react';
import { listarMinhasRotas, marcarRecolhimento } from '../services/rotaService';
import RouteMap from '../components/RouteMap';
import RouteNavigation from '../components/RouteNavigation';
import { linkWaze, localDoPonto } from '../utils/navegacao';
import { descreverPonto, enderecoDaParada } from '../components/RouteDetails';

const STATUS = [
  { valor: 'recolhido', rotulo: 'Recolhido', cor: '#15803d' },
  { valor: 'parcial', rotulo: 'Parcial', cor: '#b45309' },
  { valor: 'nao_recolhido', rotulo: 'Não recolhido', cor: '#b91c1c' },
];

// Cores do tema (global.css), para a página ficar legível no modo claro e no escuro.
const cardStyle = { background: 'var(--panel)', color: 'var(--text)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)' };
const inputStyle = { marginTop: '6px', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--panel-2)', color: 'var(--text)', boxSizing: 'border-box' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '12px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' };
const tdStyle = { padding: '12px', borderBottom: '1px solid var(--border)' };

function botaoStatusStyle(status, atual) {
  const marcado = status.valor === atual;
  return {
    padding: '8px 12px',
    borderRadius: '10px',
    border: `2px solid ${status.cor}`,
    background: marcado ? status.cor : 'var(--panel)',
    color: marcado ? '#fff' : 'var(--text)',
    fontWeight: marcado ? 600 : 400,
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
  // Na parada só com lote, o agencia_nome é o da agência do lote, quando a API devolve.
  const agencia = parada.agencia_nome || (parada.agencia_id ? `Agência #${parada.agencia_id}` : '');
  if (agencia) partes.push(agencia);
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
      <p style={{ margin: '0 0 24px', color: 'var(--muted)' }}>
        Paradas da rota atribuída a você, na ordem, no mapa e na lista. Marque o recolhimento de cada parada.
      </p>

      <div style={{ ...cardStyle, marginBottom: '24px' }}>
        <label htmlFor="data-rota">Data</label>
        <div>
          <input id="data-rota" type="date" value={data} onChange={(event) => setData(event.target.value)} style={inputStyle} />
        </div>
      </div>

      {mensagem && <div style={{ background: '#dcfce7', color: '#166534', padding: 12, borderRadius: 10, marginBottom: 24 }}>{mensagem}</div>}
      {erro && <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 10, marginBottom: 24 }}>{erro}</div>}
      {carregando && <p style={{ color: 'var(--muted)' }}>Carregando...</p>}
      {!carregando && !erro && rotas.length === 0 && (
        <div style={cardStyle}>Nenhuma rota atribuída a você nesta data.</div>
      )}

      {rotas.map((rota) => (
        <div key={rota.id} style={{ ...cardStyle, marginBottom: '24px' }}>
          <h2 style={{ marginTop: 0 }}>Rota #{rota.id} — {String(rota.data).slice(0, 10)}</h2>
          <p style={{ margin: '0 0 4px' }}><strong>Saída:</strong> {descreverPonto(rota.origem)}</p>
          <p style={{ margin: '0 0 16px' }}><strong>Entrega:</strong> {descreverPonto(rota.destino)}</p>
          <RouteMap rota={rota} />
          <RouteNavigation rota={rota} />
          <div style={{ overflowX: 'auto', marginTop: '16px' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Ordem</th>
                  <th style={thStyle}>Parada</th>
                  <th style={thStyle}>Endereço</th>
                  <th style={thStyle}>Recolhimento</th>
                  <th style={thStyle}>Marcar</th>
                  <th style={thStyle}>Navegar</th>
                </tr>
              </thead>
              <tbody>
                {(rota.paradas || []).map((parada) => (
                  <tr key={parada.id}>
                    <td style={tdStyle}>{parada.ordem}</td>
                    <td style={tdStyle}>{descreverParada(parada)}</td>
                    <td style={tdStyle}>{enderecoDaParada(parada)}</td>
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
                    <td style={tdStyle}>
                      {linkWaze(localDoPonto(parada))
                        ? <a href={linkWaze(localDoPonto(parada))} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Waze</a>
                        : '—'}
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
