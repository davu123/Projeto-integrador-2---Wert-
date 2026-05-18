import { useState } from 'react';
import { api } from '../services/api';

const initialForm = {
  lote_id: 1,
  tipo: '',
  marca: '',
  modelo: '',
  numero_serie: '',
  estado: 'bom'
};

export default function EquipmentFormPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.createEquipamento({
        ...form,
        lote_id: Number(form.lote_id)
      });

      setMessage('Equipamento cadastrado com sucesso.');
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="card form-card">
      <div className="section-title">
        <h2>Novo Equipamento</h2>
        <p>Preencha os dados para cadastrar um item recebido.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Lote ID
          <input name="lote_id" value={form.lote_id} onChange={handleChange} required />
        </label>
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

        {message && <div className="alert success full-span">{message}</div>}
        {error && <div className="alert error full-span">{error}</div>}

        <div className="form-actions full-span">
          <button className="primary-btn" type="submit">Salvar</button>
        </div>
      </form>
    </section>
  );
}