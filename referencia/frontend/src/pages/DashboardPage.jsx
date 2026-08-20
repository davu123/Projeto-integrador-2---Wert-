import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { formatDashboardLabel } from '../utils/formatters';

const labels = {
  equipamentos: 'Equipamentos cadastrados',
  lotes: 'Lotes cadastrados',
  agencias: 'Ag\u00eancias ativas',
  destinacoes: 'Destina\u00e7\u00f5es registradas',
};

function DataList({ title, rows }) {
  const max = Math.max(...rows.map((row) => row.total), 1);

  return (
    <section className="card chart-card">
      <h2>{title}</h2>
      {rows.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <div className="dashboard-bars">
          {rows.map((row) => (
            <div className="dashboard-bar-row" key={row.label}>
              <div className="dashboard-bar-label">
                <span>{formatDashboardLabel(row.label)}</span>
                <strong>{row.total}</strong>
              </div>
              <div className="dashboard-bar-track">
                <span style={{ width: `${(row.total / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setLoading(true);
        setError('');
        setData(await api.getDashboard());
      } catch (err) {
        setError(err.message || 'Erro ao carregar dashboard.');
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  const metrics = useMemo(() => {
    const indicadores = data?.indicadores || {};
    return Object.entries(labels).map(([key, label]) => ({
      key,
      label,
      value: indicadores[key] || 0,
    }));
  }, [data]);

  if (loading) {
    return <p>Carregando indicadores...</p>;
  }

  if (error) {
    return <div className="alert error">{error}</div>;
  }

  return (
    <div className="dashboard-page">
      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.key} className="card metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <div className="dashboard-grid">
        <DataList title="Lotes por status" rows={data?.lotesPorStatus || []} />
        <DataList title="Equipamentos por tipo" rows={data?.equipamentosPorTipo || []} />
        <DataList title="Equipamentos por estado" rows={data?.equipamentosPorEstado || []} />
        <DataList title={'Destina\u00e7\u00e3o final'} rows={data?.destinacoesPorTipo || []} />
      </div>
    </div>
  );
}
