import { useEffect, useState } from 'react';
import { listarAgencias, criarAgencia, atualizarAgencia, excluirAgencia } from '../services/agencyService';

const FORM_INICIAL = {
  nome: '', codigo_agencia: '', cidade: '', uf: '', responsavel: '', telefone: '',
  cep: '', endereco: '', latitude: '', longitude: '',
};
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
const dicaStyle = { margin: '6px 0 0', fontSize: '0.85rem', color: '#64748b' };

// Par copiado do Google Maps ("-15.793889, -47.882778"): preenche latitude e longitude.
const PAR_DE_COORDENADAS = /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/;

function formatarCep(cep) {
  return cep && cep.length === 8 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep || '';
}

// Campo vazio vira null. Aceita vírgula decimal ("-15,79") e manda com ponto.
function coordenadaDoCampo(valor) {
  const texto = valor.trim();
  return texto ? texto.replace(',', '.') : null;
}

export default function AgenciesPage() {
  const [agencias, setAgencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [form, setForm] = useState(FORM_INICIAL);
  const [editandoId, setEditandoId] = useState(null);

  async function carregarAgencias() {
    try {
      setLoading(true);
      setErro('');
      const data = await listarAgencias();
      setAgencias(data);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar agências.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregarAgencias(); }, []);

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

  function iniciarEdicao(agencia) {
    setMensagem('');
    setErro('');
    setEditandoId(agencia.id);
    setForm({
      nome: agencia.nome || '',
      codigo_agencia: agencia.codigo_agencia || '',
      cidade: agencia.cidade || '',
      uf: agencia.uf || '',
      responsavel: agencia.responsavel || '',
      telefone: agencia.telefone || '',
      cep: formatarCep(agencia.cep),
      endereco: agencia.endereco || '',
      latitude: agencia.latitude != null ? String(agencia.latitude) : '',
      longitude: agencia.longitude != null ? String(agencia.longitude) : '',
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const payload = {
        nome: form.nome,
        codigo_agencia: form.codigo_agencia,
        cidade: form.cidade,
        uf: form.uf.toUpperCase(),
        responsavel: form.responsavel,
        // Sem o telefone no corpo, a API apaga o que estava salvo.
        telefone: form.telefone.trim() || null,
        // Campo em branco apaga o valor salvo. Latitude e longitude vão juntas.
        cep: form.cep.trim() || null,
        endereco: form.endereco.trim() || null,
        latitude: coordenadaDoCampo(form.latitude),
        longitude: coordenadaDoCampo(form.longitude),
      };

      if (editandoId) {
        const response = await atualizarAgencia(editandoId, payload);
        setMensagem(response.message || 'Agência atualizada com sucesso.');
      } else {
        const response = await criarAgencia(payload);
        setMensagem(response.message || 'Agência criada com sucesso.');
      }

      limparFormulario();
      await carregarAgencias();
    } catch (error) {
      setErro(error.message || 'Erro ao salvar agência.');
    }
  }

  async function handleExcluir(id) {
    if (!window.confirm('Deseja realmente excluir esta agência?')) return;
    setMensagem('');
    setErro('');

    try {
      const response = await excluirAgencia(id);
      setMensagem(response.message || 'Agência excluída com sucesso.');
      await carregarAgencias();
    } catch (error) {
      setErro(error.message || 'Erro ao excluir agência.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Agências</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Cadastre e gerencie os pontos de coleta do Banco do Brasil.</p>
      </div>
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', alignItems: 'start' }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>{editandoId ? 'Editar agência' : 'Nova agência'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div><label>Nome</label><input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da agência" style={inputStyle} /></div>
            <div><label>Código da agência</label><input name="codigo_agencia" value={form.codigo_agencia} onChange={handleChange} placeholder="0001" style={inputStyle} /></div>
            <div><label>Cidade</label><input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Brasília" style={inputStyle} /></div>
            <div><label>UF</label><input name="uf" value={form.uf} onChange={handleChange} placeholder="DF" maxLength={2} style={inputStyle} /></div>
            <div><label>Responsável</label><input name="responsavel" value={form.responsavel} onChange={handleChange} placeholder="Nome do responsável" style={inputStyle} /></div>
            <div><label>Telefone</label><input name="telefone" type="tel" value={form.telefone} onChange={handleChange} placeholder="(61) 3000-0000" maxLength={20} style={inputStyle} /></div>
            <div><label>CEP</label><input name="cep" value={form.cep} onChange={handleChange} placeholder="70040-010" maxLength={10} inputMode="numeric" style={inputStyle} /></div>
            <div><label>Endereço</label><input name="endereco" value={form.endereco} onChange={handleChange} placeholder="SBS Quadra 1, Bloco A" maxLength={200} style={inputStyle} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label>Latitude</label><input name="latitude" value={form.latitude} onChange={handleChange} placeholder="-15.793889" inputMode="decimal" style={inputStyle} /></div>
              <div><label>Longitude</label><input name="longitude" value={form.longitude} onChange={handleChange} placeholder="-47.882778" inputMode="decimal" style={inputStyle} /></div>
            </div>
            <p style={dicaStyle}>
              Latitude e longitude em graus decimais, as duas juntas. No Google Maps, clique com o botão direito no local e copie as coordenadas: colar o par em Latitude preenche os dois campos.
            </p>
            {mensagem && <div style={sucessoStyle}>{mensagem}</div>}
            {erro && <div style={erroStyle}>{erro}</div>}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="submit" style={primaryButtonStyle}>{editandoId ? 'Atualizar' : 'Criar'}</button>
              <button type="button" onClick={limparFormulario} style={secondaryButtonStyle}>Limpar</button>
            </div>
          </form>
        </div>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Lista de agências</h2>
          {loading ? <p>Carregando...</p> : agencias.length === 0 ? <p>Nenhuma agência encontrada.</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Nome</th>
                    <th style={thStyle}>Código</th>
                    <th style={thStyle}>Cidade</th>
                    <th style={thStyle}>UF</th>
                    <th style={thStyle}>Responsável</th>
                    <th style={thStyle}>Telefone</th>
                    <th style={thStyle}>Endereço</th>
                    <th style={thStyle}>Coordenadas</th>
                    <th style={thStyle}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {agencias.map((agencia) => (
                    <tr key={agencia.id}>
                      <td style={tdStyle}>{agencia.id}</td>
                      <td style={tdStyle}>{agencia.nome}</td>
                      <td style={tdStyle}>{agencia.codigo_agencia}</td>
                      <td style={tdStyle}>{agencia.cidade}</td>
                      <td style={tdStyle}>{agencia.uf}</td>
                      <td style={tdStyle}>{agencia.responsavel || '-'}</td>
                      <td style={tdStyle}>{agencia.telefone || '-'}</td>
                      <td style={tdStyle}>
                        {agencia.endereco || '-'}
                        {agencia.cep && <div style={{ color: '#64748b' }}>CEP {formatarCep(agencia.cep)}</div>}
                      </td>
                      <td style={tdStyle}>
                        {agencia.latitude != null && agencia.longitude != null
                          ? `${agencia.latitude}, ${agencia.longitude}`
                          : <span style={{ color: '#64748b' }}>Sem coordenadas</span>}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button onClick={() => iniciarEdicao(agencia)} style={secondaryButtonStyle}>Editar</button>
                          <button onClick={() => handleExcluir(agencia.id)} style={dangerButtonStyle}>Excluir</button>
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
