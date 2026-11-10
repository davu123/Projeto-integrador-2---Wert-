import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { podeVerMenu } from '../auth/acesso';
import { listarEquipamentos, atualizarEquipamento } from '../services/equipmentApi';
import { formatEstado } from '../utils/formatters';

export default function EquipmentListPage() {
  const { user } = useAuth();
  // Quem cadastra equipamento também edita: administrador, gestor e técnico.
  const podeEditar = podeVerMenu(user?.perfil, '/equipamentos/novo');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function load() {
    try {
      const data = await listarEquipamentos();
      setItems(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Erro ao carregar equipamentos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function iniciarEdicao(item) {
    setMessage('');
    setFormError('');
    setEditando(item);
    setForm({
      tipo: item.tipo,
      marca: item.marca,
      modelo: item.modelo,
      numero_serie: item.numero_serie || '',
      estado: item.estado,
    });
  }

  function cancelarEdicao() {
    setEditando(null);
    setForm(null);
    setFormError('');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setFormError('');
    setSalvando(true);

    try {
      const resposta = await atualizarEquipamento(editando.id, {
        ...form,
        numero_serie: form.numero_serie.trim() || null,
      });
      setMessage(resposta.message || 'Equipamento atualizado com sucesso.');
      cancelarEdicao();
      await load();
    } catch (err) {
      setFormError(err.message || 'Erro ao atualizar equipamento.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <section className="card">
      <div className="section-title">
        <h2>Equipamentos</h2>
        <p>Gerencie e acompanhe os itens cadastrados.</p>
      </div>

      {editando && (
        <form className="form-grid" onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
          <p className="full-span" style={{ margin: 0 }}>
            Editando o equipamento #{editando.id}, do lote #{editando.lote_id} ({editando.agencia_nome}). O lote não muda.
          </p>
          <label>
            Tipo
            <input name="tipo" value={form.tipo} onChange={handleChange} required />
          </label>
          <label>
            Marca
            <input name="marca" value={form.marca} onChange={handleChange} required />
          </label>
          <label>
            Modelo
            <input name="modelo" value={form.modelo} onChange={handleChange} required />
          </label>
          <label>
            Número de série
            <input name="numero_serie" value={form.numero_serie} onChange={handleChange} />
          </label>
          <label>
            Estado
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="bom">Bom</option>
              <option value="danificado">Danificado</option>
              <option value="inutilizavel">Inutilizável</option>
            </select>
          </label>

          {formError && <div className="alert error full-span">{formError}</div>}

          <div className="form-actions full-span" style={{ gap: '0.75rem' }}>
            <button className="ghost-btn" type="button" onClick={cancelarEdicao}>
              Cancelar
            </button>
            <button className="primary-btn" type="submit" disabled={salvando}>
              Salvar
            </button>
          </div>
        </form>
      )}

      {message && <div className="alert success" style={{ marginBottom: '1rem' }}>{message}</div>}
      {loading && <p>Carregando...</p>}
      {error && <div className="alert error">{error}</div>}
      {!loading && !error && items.length === 0 && <p>Nenhum equipamento cadastrado ainda.</p>}

      {!loading && !error && items.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Nº série</th>
                <th>Estado</th>
                <th>Agência</th>
                {podeEditar && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.tipo}</td>
                  <td>{item.marca}</td>
                  <td>{item.modelo}</td>
                  <td>{item.numero_serie || '-'}</td>
                  <td>{formatEstado(item.estado)}</td>
                  <td>{item.agencia_nome}</td>
                  {podeEditar && (
                    <td>
                      <button className="ghost-btn" type="button" onClick={() => iniciarEdicao(item)}>
                        Editar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
