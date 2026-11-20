import { useEffect, useState } from 'react';
import {
  listarPontosEntrega, criarPontoEntrega, atualizarPontoEntrega, excluirPontoEntrega,
} from '../services/pontoEntregaService';

// Pontos de entrega: depósito ou destinadora, onde a rota começa ou termina.
// Só administrador e gestor (os mesmos perfis da API).

const FORM_INICIAL = { nome: '', tipo: 'deposito', cep: '', endereco: '', cidade: '', uf: '', latitude: '', longitude: '' };
const TIPOS = { deposito: 'Depósito', destinadora: 'Destinadora' };

const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '10px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' };
const tdStyle = { padding: '10px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' };
const botaoPequeno = { padding: '0.5rem 0.9rem' };

// Par copiado do Google Maps ("-15.793889, -47.882778"): preenche latitude e longitude.
const PAR_DE_COORDENADAS = /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/;

function formatarCep(cep) {
  return cep && cep.length === 8 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep || '';
}

// Aceita vírgula decimal ("-15,79") e manda com ponto.
function coordenadaDoCampo(valor) {
  const texto = valor.trim();
  return texto ? texto.replace(',', '.') : null;
}

export default function DeliveryPointsPage() {
  const [pontos, setPontos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function carregarPontos() {
    try {
      setCarregando(true);
      const data = await listarPontosEntrega();
      setPontos(Array.isArray(data) ? data : []);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar os pontos de entrega.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregarPontos(); }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    const par = (name === 'latitude' || name === 'longitude') && value.match(PAR_DE_COORDENADAS);
    if (par) {
      setForm((prev) => ({ ...prev, latitude: par[1], longitude: par[2] }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function limparFormulario() {
    setForm(FORM_INICIAL);
    setEditandoId(null);
  }

  function iniciarEdicao(ponto) {
    setMensagem('');
    setErro('');
    setEditandoId(ponto.id);
    setForm({
      nome: ponto.nome || '',
      tipo: ponto.tipo || 'deposito',
      cep: formatarCep(ponto.cep),
      endereco: ponto.endereco || '',
      cidade: ponto.cidade || '',
      uf: ponto.uf || '',
      latitude: ponto.latitude != null ? String(ponto.latitude) : '',
      longitude: ponto.longitude != null ? String(ponto.longitude) : '',
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem('');
    setErro('');

    const payload = {
      nome: form.nome,
      tipo: form.tipo,
      cep: form.cep.trim() || null,
      endereco: form.endereco,
      cidade: form.cidade,
      uf: form.uf.trim().toUpperCase(),
      latitude: coordenadaDoCampo(form.latitude),
      longitude: coordenadaDoCampo(form.longitude),
    };

    try {
      if (editandoId) {
        await atualizarPontoEntrega(editandoId, payload);
        setMensagem('Ponto de entrega atualizado.');
      } else {
        await criarPontoEntrega(payload);
        setMensagem('Ponto de entrega cadastrado.');
      }
      limparFormulario();
      await carregarPontos();
    } catch (error) {
      setErro(error.message || 'Erro ao salvar o ponto de entrega.');
    }
  }

  async function alternarAtivo(ponto) {
    setMensagem('');
    setErro('');
    try {
      await atualizarPontoEntrega(ponto.id, { ativo: !ponto.ativo });
      setMensagem(ponto.ativo ? `${ponto.nome} desativado. Ele não aparece mais como origem ou destino de rota nova.` : `${ponto.nome} reativado.`);
      await carregarPontos();
    } catch (error) {
      setErro(error.message || 'Erro ao alterar o ponto de entrega.');
    }
  }

  async function handleExcluir(ponto) {
    if (!window.confirm(`Excluir o ponto de entrega ${ponto.nome}? Para tirá-lo de uso sem apagar, use Desativar.`)) return;
    setMensagem('');
    setErro('');
    try {
      const resposta = await excluirPontoEntrega(ponto.id);
      setMensagem(resposta?.message || 'Ponto de entrega excluído.');
      if (editandoId === ponto.id) limparFormulario();
      await carregarPontos();
    } catch (error) {
      if (error.status === 409) {
        setErro(`${ponto.nome} é origem ou destino de uma rota e não pode ser excluído. Use Desativar.`);
      } else {
        setErro(error.message || 'Erro ao excluir o ponto de entrega.');
      }
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Pontos de entrega</h1>
      <p style={{ margin: '0 0 24px', color: 'var(--muted)' }}>
        Depósitos e destinadoras onde as rotas começam ou terminam. Endereço e coordenadas são obrigatórios.
      </p>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', alignItems: 'start' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ marginTop: 0 }}>{editandoId ? 'Editar ponto de entrega' : 'Novo ponto de entrega'}</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <label className="full-span">Nome
              <input name="nome" value={form.nome} onChange={handleChange} maxLength={120} placeholder="Depósito Wert" />
            </label>
            <label>Tipo
              <select name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="deposito">Depósito</option>
                <option value="destinadora">Destinadora</option>
              </select>
            </label>
            <label>CEP
              <input name="cep" value={form.cep} onChange={handleChange} maxLength={10} inputMode="numeric" placeholder="71200-010" />
            </label>
            <label className="full-span">Endereço
              <input name="endereco" value={form.endereco} onChange={handleChange} maxLength={200} placeholder="SIA Trecho 1, Lote 10" />
            </label>
            <label>Cidade
              <input name="cidade" value={form.cidade} onChange={handleChange} maxLength={100} placeholder="Brasília" />
            </label>
            <label>UF
              <input name="uf" value={form.uf} onChange={handleChange} maxLength={2} placeholder="DF" />
            </label>
            <label>Latitude
              <input name="latitude" value={form.latitude} onChange={handleChange} inputMode="decimal" placeholder="-15.793889" />
            </label>
            <label>Longitude
              <input name="longitude" value={form.longitude} onChange={handleChange} inputMode="decimal" placeholder="-47.882778" />
            </label>
            <p className="full-span" style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
              No Google Maps, clique com o botão direito no local e copie as coordenadas: colar o par em Latitude preenche os dois campos.
            </p>

            {mensagem && <div className="alert success full-span">{mensagem}</div>}
            {erro && <div className="alert error full-span">{erro}</div>}

            <div className="full-span" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="submit" className="primary-btn">{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
              <button type="button" className="ghost-btn" onClick={limparFormulario}>Limpar</button>
            </div>
          </form>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ marginTop: 0 }}>Lista de pontos de entrega</h2>
          {carregando ? <p>Carregando...</p> : pontos.length === 0 ? <p>Nenhum ponto de entrega cadastrado.</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Nome</th>
                    <th style={thStyle}>Tipo</th>
                    <th style={thStyle}>Endereço</th>
                    <th style={thStyle}>Coordenadas</th>
                    <th style={thStyle}>Situação</th>
                    <th style={thStyle}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pontos.map((ponto) => (
                    <tr key={ponto.id}>
                      <td style={tdStyle}>{ponto.nome}</td>
                      <td style={tdStyle}>{TIPOS[ponto.tipo] || ponto.tipo}</td>
                      <td style={tdStyle}>
                        {ponto.endereco}
                        <div style={{ color: 'var(--muted)' }}>
                          {ponto.cidade} - {ponto.uf}{ponto.cep ? ` · CEP ${formatarCep(ponto.cep)}` : ''}
                        </div>
                      </td>
                      <td style={tdStyle}>{ponto.latitude}, {ponto.longitude}</td>
                      <td style={tdStyle}>{ponto.ativo ? 'Ativo' : 'Inativo'}</td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button type="button" className="ghost-btn" style={botaoPequeno} onClick={() => iniciarEdicao(ponto)}>Editar</button>
                          <button type="button" className="ghost-btn" style={botaoPequeno} onClick={() => alternarAtivo(ponto)}>
                            {ponto.ativo ? 'Desativar' : 'Reativar'}
                          </button>
                          <button type="button" className="ghost-btn" style={{ ...botaoPequeno, color: 'var(--error)' }} onClick={() => handleExcluir(ponto)}>Excluir</button>
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
