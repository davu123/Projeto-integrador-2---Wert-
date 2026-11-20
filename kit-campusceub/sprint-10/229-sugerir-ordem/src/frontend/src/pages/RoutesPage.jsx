import { useEffect, useState } from 'react';
import { listarRotas, criarRota, atualizarRota, excluirRota, atribuirMotorista, sugerirOrdem } from '../services/rotaService';
import { listarAgencias } from '../services/agencyService';
import { listarLotes } from '../services/lotService';
import { listarUsuarios } from '../services/userService';
import { listarPontosEntrega } from '../services/pontoEntregaService';
import RouteDetails from '../components/RouteDetails';
import RouteMap from '../components/RouteMap';

const PARADA_INICIAL = { agencia_id: '', lote_id: '', ordem: 1 };
const FORM_INICIAL = { data: '', motorista_id: '', origem_id: '', destino_id: '', paradas: [{ ...PARADA_INICIAL }] };
const TIPOS_PONTO = { deposito: 'depósito', destinadora: 'destinadora' };

const cardStyle = { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' };
const inputStyle = { width: '100%', marginTop: '6px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', boxSizing: 'border-box' };
const primaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#15803d', color: '#fff', cursor: 'pointer' };
const secondaryButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' };
const dangerButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#b91c1c', color: '#fff', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '12px', borderBottom: '1px solid #e5e7eb' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #f1f5f9' };

// Pendente é a parada que o motorista ainda não marcou.
const RECOLHIMENTO = [
  { valor: 'recolhido', rotulo: 'Recolhidas', cor: '#15803d' },
  { valor: 'parcial', rotulo: 'Parciais', cor: '#b45309' },
  { valor: 'nao_recolhido', rotulo: 'Não recolhidas', cor: '#b91c1c' },
  { valor: null, rotulo: 'Pendentes', cor: '#64748b' },
];

function contarRecolhimento(paradas) {
  return RECOLHIMENTO.map((item) => ({
    ...item,
    total: (paradas || []).filter((parada) => (parada.status_recolhimento || null) === item.valor).length,
  }));
}

// Origem e destino: só pontos de entrega ativos. Na edição, o ponto que foi desativado
// continua na lista, marcado, para o gestor ver e trocar.
function opcoesDePonto(pontos, selecionado) {
  return pontos.filter((ponto) => ponto.ativo || String(ponto.id) === selecionado);
}

function rotuloDoPonto(ponto) {
  const tipo = TIPOS_PONTO[ponto.tipo] || ponto.tipo;
  return `${ponto.nome} (${tipo})${ponto.ativo ? '' : ' — inativo, escolha outro'}`;
}

// Sem a sugestão: tira a distância de cada parada (ela vale só para a ordem sugerida).
function semDistancia(parada, ordem) {
  return { agencia_id: parada.agencia_id, lote_id: parada.lote_id, ordem };
}

function formatarKm(valor) {
  return `${Number(valor).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km`;
}

// Aplica a ordem que a API sugeriu nas paradas do formulário, casando pelo lote e pela posição.
// A resposta traz o agencia_id resolvido pela agência do lote; ele não é copiado,
// para a parada só com lote continuar sem agência gravada.
function aplicarOrdemSugerida(paradasDoFormulario, sugeridas) {
  const usadas = new Set();
  const novas = [];
  for (const sugerida of sugeridas) {
    const indice = paradasDoFormulario.findIndex((parada, i) => {
      if (usadas.has(i)) return false;
      if (sugerida.lote_id != null) return Number(parada.lote_id) === sugerida.lote_id;
      return !parada.lote_id && Number(parada.agencia_id) === sugerida.agencia_id;
    });
    if (indice === -1) return null;
    usadas.add(indice);
    novas.push({
      ...semDistancia(paradasDoFormulario[indice], novas.length + 1),
      trecho_km: sugerida.distancia_trecho_km,
      sem_coordenada: sugerida.sem_coordenada,
    });
  }
  return novas.length === paradasDoFormulario.length ? novas : null;
}

// Rota montada com o que está no formulário, para a prévia no mapa antes de gravar.
function rotaDoFormulario(form, agencias, lotes, pontos) {
  const agenciaPorId = new Map(agencias.map((agencia) => [String(agencia.id), agencia]));
  const lotePorId = new Map(lotes.map((lote) => [String(lote.id), lote]));
  const pontoPorId = new Map(pontos.map((ponto) => [String(ponto.id), ponto]));
  return {
    origem: pontoPorId.get(form.origem_id) || null,
    destino: pontoPorId.get(form.destino_id) || null,
    paradas: form.paradas
      .filter((parada) => parada.agencia_id || parada.lote_id)
      .map((parada, indice) => {
        const lote = lotePorId.get(parada.lote_id);
        const agencia = agenciaPorId.get(parada.agencia_id) || (lote && agenciaPorId.get(String(lote.agencia_id)));
        return {
          id: `formulario-${indice}`,
          ordem: parada.ordem,
          agencia_nome: agencia?.nome,
          lote_id: parada.lote_id ? Number(parada.lote_id) : null,
          latitude: agencia?.latitude ?? null,
          longitude: agencia?.longitude ?? null,
        };
      }),
  };
}

function montarPayload(form) {
  return {
    data: form.data,
    origem_id: form.origem_id ? Number(form.origem_id) : null,
    destino_id: form.destino_id ? Number(form.destino_id) : null,
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
  const [motoristas, setMotoristas] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [rotaNoMapaId, setRotaNoMapaId] = useState(null);
  const [sugestao, setSugestao] = useState(null);

  async function carregarTudo() {
    try {
      const [rotasData, agenciasData, lotesData, usuariosData, pontosData] = await Promise.all([
        listarRotas(),
        listarAgencias(),
        listarLotes(),
        listarUsuarios(),
        listarPontosEntrega(),
      ]);
      setRotas(Array.isArray(rotasData) ? rotasData : []);
      setAgencias(Array.isArray(agenciasData) ? agenciasData : []);
      setLotes(Array.isArray(lotesData) ? lotesData : []);
      setMotoristas(Array.isArray(usuariosData) ? usuariosData.filter((u) => u.perfil === 'motorista' && u.ativo) : []);
      setPontos(Array.isArray(pontosData) ? pontosData : []);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar rotas.');
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  // Mudou a origem ou alguma parada: a distância da sugestão deixa de valer.
  function trocarParadas(prev, paradas) {
    return { ...prev, paradas: paradas.map((parada, i) => semDistancia(parada, i + 1)) };
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'origem_id') setSugestao(null);
    setForm((prev) => {
      const novo = { ...prev, [name]: value };
      return name === 'origem_id' ? trocarParadas(novo, novo.paradas) : novo;
    });
  }

  function handleParadaChange(index, name, value) {
    setSugestao(null);
    setForm((prev) => trocarParadas(prev, prev.paradas.map((parada, i) => (
      i === index ? { ...parada, [name]: value } : parada
    ))));
  }

  function adicionarParada() {
    setSugestao(null);
    setForm((prev) => trocarParadas(prev, [...prev.paradas, { ...PARADA_INICIAL }]));
  }

  function removerParada(index) {
    setSugestao(null);
    setForm((prev) => trocarParadas(prev, prev.paradas.filter((_, i) => i !== index)));
  }

  // Ajuste na mão, antes de gravar: sobe ou desce a parada uma posição.
  function moverParada(index, direcao) {
    setSugestao(null);
    setForm((prev) => {
      const destino = index + direcao;
      if (destino < 0 || destino >= prev.paradas.length) return prev;
      const paradas = [...prev.paradas];
      [paradas[index], paradas[destino]] = [paradas[destino], paradas[index]];
      return trocarParadas(prev, paradas);
    });
  }

  async function handleSugerir() {
    setMensagem('');
    setErro('');
    if (form.paradas.some((parada) => !parada.agencia_id && !parada.lote_id)) {
      setErro('Escolha a agência ou o lote de cada parada antes de sugerir a ordem.');
      return;
    }
    try {
      const resposta = await sugerirOrdem({
        origem_id: form.origem_id ? Number(form.origem_id) : null,
        paradas: montarPayload(form).paradas,
      });
      const paradas = aplicarOrdemSugerida(form.paradas, resposta.paradas || []);
      if (!paradas) {
        setErro('Não foi possível aplicar a ordem sugerida. Confira as paradas e tente de novo.');
        return;
      }
      setForm((prev) => ({ ...prev, paradas }));
      setSugestao({ total: resposta.distancia_total_km, avisos: resposta.avisos || [], comOrigem: Boolean(form.origem_id) });
      setMensagem(`Ordem sugerida aplicada. Ajuste se precisar e clique em ${editandoId ? 'Atualizar' : 'Criar'} para gravar.`);
    } catch (error) {
      setErro(error.message || 'Erro ao sugerir a ordem das paradas.');
    }
  }

  function limparFormulario() {
    setForm(FORM_INICIAL);
    setEditandoId(null);
    setSugestao(null);
  }

  function iniciarEdicao(rota) {
    setMensagem('');
    setErro('');
    setEditandoId(rota.id);
    setSugestao(null);
    setForm({
      data: String(rota.data).slice(0, 10),
      motorista_id: rota.motorista_id ? String(rota.motorista_id) : '',
      origem_id: rota.origem_id ? String(rota.origem_id) : '',
      destino_id: rota.destino_id ? String(rota.destino_id) : '',
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
      let rotaId = editandoId;
      if (editandoId) {
        setMensagem((await atualizarRota(editandoId, payload)).message || 'Rota atualizada com sucesso.');
      } else {
        const criada = await criarRota(payload);
        rotaId = criada.rota?.id;
        setMensagem(criada.message || 'Rota criada com sucesso.');
      }
      if (rotaId) {
        const atribuida = await atribuirMotorista(rotaId, form.motorista_id || null);
        if (form.motorista_id) {
          setMensagem(atribuida.message || 'Motorista atribuído à rota.');
        }
      }
      limparFormulario();
      await carregarTudo();
    } catch (error) {
      setErro(error.message || 'Erro ao salvar rota.');
    }
  }

  async function handleExcluir(id) {
    if (!window.confirm(`Excluir a rota #${id}? As paradas dela também serão excluídas.`)) return;
    setMensagem('');
    setErro('');
    try {
      setMensagem((await excluirRota(id)).message || 'Rota excluída com sucesso.');
      if (editandoId === id) {
        limparFormulario();
      }
      if (rotaNoMapaId === id) {
        setRotaNoMapaId(null);
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
        Monte a rota com data, paradas e ordem, e atribua o motorista na mão. Sugerir ordem propõe a sequência pela distância, e você ajusta antes de gravar. Em Ver no mapa, a rota aparece sobre o OpenStreetMap.
      </p>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', alignItems: 'start' }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>{editandoId ? 'Editar rota' : 'Nova rota'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label>Data</label>
              <input type="date" name="data" value={form.data} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label>Motorista</label>
              <select name="motorista_id" value={form.motorista_id} onChange={handleChange} style={inputStyle}>
                <option value="">Sem motorista</option>
                {motoristas.map((motorista) => (
                  <option key={motorista.id} value={motorista.id}>{motorista.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Origem (onde a rota começa)</label>
              <select name="origem_id" value={form.origem_id} onChange={handleChange} style={inputStyle}>
                <option value="">Sem origem</option>
                {opcoesDePonto(pontos, form.origem_id).map((ponto) => (
                  <option key={ponto.id} value={ponto.id}>{rotuloDoPonto(ponto)}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Destino (onde a rota termina)</label>
              <select name="destino_id" value={form.destino_id} onChange={handleChange} style={inputStyle}>
                <option value="">Sem destino</option>
                {opcoesDePonto(pontos, form.destino_id).map((ponto) => (
                  <option key={ponto.id} value={ponto.id}>{rotuloDoPonto(ponto)}</option>
                ))}
              </select>
              <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                Origem e destino são pontos de entrega ativos, cadastrados em Pontos de entrega.
              </p>
            </div>

            {form.paradas.map((parada, index) => (
              <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>Parada {parada.ordem}</strong>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="button" onClick={() => moverParada(index, -1)} disabled={index === 0} aria-label={`Subir a parada ${parada.ordem}`} style={{ ...secondaryButtonStyle, padding: '6px 10px' }}>Subir</button>
                    <button type="button" onClick={() => moverParada(index, 1)} disabled={index === form.paradas.length - 1} aria-label={`Descer a parada ${parada.ordem}`} style={{ ...secondaryButtonStyle, padding: '6px 10px' }}>Descer</button>
                  </div>
                </div>
                {parada.trecho_km != null && (
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                    {formatarKm(parada.trecho_km)} {index > 0 ? 'desde a parada anterior' : sugestao?.comOrigem ? 'desde a origem' : '(primeira parada, sem origem)'}
                  </p>
                )}
                {parada.sem_coordenada && (
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#b45309' }}>Sem coordenadas: fica no fim da rota.</p>
                )}
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

            {sugestao && (
              <div style={{ background: '#f1f5f9', color: '#334155', padding: 12, borderRadius: 10 }}>
                Distância em linha reta, só para ordenar: {formatarKm(sugestao.total)}
                {sugestao.comOrigem ? ' da origem até a última parada com coordenadas.' : ' entre as paradas com coordenadas.'}
                {sugestao.avisos.map((aviso) => <div key={aviso} style={{ marginTop: 6, color: '#b45309' }}>{aviso}</div>)}
              </div>
            )}

            <div>
              <strong>Prévia no mapa</strong>
              <p style={{ margin: '4px 0 8px', fontSize: '0.85rem', color: '#64748b' }}>Mostra a ordem do formulário, antes de gravar.</p>
              <RouteMap rota={rotaDoFormulario(form, agencias, lotes, pontos)} />
            </div>

            {mensagem && <div style={{ background: '#dcfce7', color: '#166534', padding: 12, borderRadius: 10 }}>{mensagem}</div>}
            {erro && <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 10 }}>{erro}</div>}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" onClick={adicionarParada} style={secondaryButtonStyle}>Adicionar parada</button>
              <button type="button" onClick={handleSugerir} style={secondaryButtonStyle}>Sugerir ordem</button>
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
                  <th style={thStyle}>Origem → destino</th>
                  <th style={thStyle}>Paradas</th>
                  <th style={thStyle}>Motorista</th>
                  <th style={thStyle}>Recolhimento</th>
                  <th style={thStyle}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rotas.map((rota) => (
                  <tr key={rota.id}>
                    <td style={tdStyle}>{rota.id}</td>
                    <td style={tdStyle}>{String(rota.data).slice(0, 10)}</td>
                    <td style={tdStyle}>{rota.origem?.nome || '—'} → {rota.destino?.nome || '—'}</td>
                    <td style={tdStyle}>{(rota.paradas || []).length}</td>
                    <td style={tdStyle}>{rota.motorista_nome || '—'}</td>
                    <td style={tdStyle}>
                      {contarRecolhimento(rota.paradas).map((item) => (
                        <div key={item.rotulo} style={{ color: item.cor, whiteSpace: 'nowrap' }}>
                          {item.rotulo}: <strong>{item.total}</strong>
                        </div>
                      ))}
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button onClick={() => setRotaNoMapaId(rota.id)} style={secondaryButtonStyle}>Ver no mapa</button>
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

      <RouteDetails rota={rotas.find((rota) => rota.id === rotaNoMapaId)} onFechar={() => setRotaNoMapaId(null)} />
    </div>
  );
}
