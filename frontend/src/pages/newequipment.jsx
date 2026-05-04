import { useState } from 'react';
import { cadastrarEquipamento } from '../services/equipmentService';

export default function NovoEquipamento() {
  const [form, setForm] = useState({
    lote_id: 1,
    tipo: '',
    marca: '',
    modelo: '',
    numero_serie: '',
    estado: 'bom',
  });

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'lote_id' ? Number(value) : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const response = await cadastrarEquipamento(form);
      setMensagem(response.message || 'Equipamento cadastrado com sucesso.');

      setForm({
        lote_id: 1,
        tipo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        estado: 'bom',
      });
    } catch (error) {
      setErro(
        error?.response?.data?.message || 'Erro ao cadastrar equipamento.'
      );
    }
  }

  return (
    <div>
      <h1>Novo Equipamento</h1>

      <form onSubmit={handleSubmit}>
        <input name="lote_id" type="number" value={form.lote_id} onChange={handleChange} />
        <input name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} />
        <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} />
        <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} />
        <input
          name="numero_serie"
          placeholder="Número de série"
          value={form.numero_serie}
          onChange={handleChange}
        />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="bom">bom</option>
          <option value="danificado">danificado</option>
          <option value="inutilizavel">inutilizavel</option>
        </select>

        <button type="submit">Salvar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
      {erro && <p>{erro}</p>}
    </div>
  );
}