import logoWert from './assets/logo-wert.png';

export default function App() {
  return (
    <main style={{ padding: '2rem', maxWidth: '40rem' }}>
      <span className="brand-logo-frame" style={{ display: 'inline-grid', width: '5.7rem', height: '2.7rem', padding: '0.32rem' }}>
        <img className="brand-logo" src={logoWert} alt="Wert Ambiental" />
      </span>
      <h1>EcoTrack Wert</h1>
      <p>Reconstrução em sprints. Neste esqueleto só o health da API está no ar.</p>
      <p>
        API: <code>http://127.0.0.1:3001/health</code>
      </p>
    </main>
  );
}
