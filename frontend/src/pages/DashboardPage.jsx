export default function DashboardPage() {
  const metrics = [
    ['Equipamentos cadastrados', '1.248'],
    ['Lotes abertos', '32'],
    ['Agências ativas', '18'],
    ['Destinações concluídas', '245']
  ];

  return (
    <div className="page-grid">
      <section className="metrics-grid">
        {metrics.map(([label, value]) => (
          <article key={label} className="card metric-card">
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="card chart-card">
        <h2>Equipamentos por mês</h2>
        <div className="chart-placeholder">
          <div className="line-chart" />
        </div>
      </section>

      <section className="card chart-card">
        <h2>Equipamentos por estado</h2>
        <div className="donut-placeholder">
          <div className="donut" />
          <ul>
            <li>Bom</li>
            <li>Danificado</li>
            <li>Inutilizável</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
