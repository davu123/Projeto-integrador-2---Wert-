import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function EquipmentListPage() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getEquipamentos(token);
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  return (
    <section className="card">
      <div className="section-title">
        <h2>Equipamentos</h2>
        <p>Gerencie e acompanhe os itens cadastrados.</p>
      </div>

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
                  <td>{item.estado}</td>
                  <td>{item.agencia_nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
