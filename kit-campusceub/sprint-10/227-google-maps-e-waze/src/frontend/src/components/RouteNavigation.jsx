import { MAX_INTERMEDIARIAS_GOOGLE, linkWaze, linksGoogleMaps, pontosDaRota, proximoDestino } from '../utils/navegacao';

// Abrir a rota nos aplicativos de navegação: Google Maps (em trechos) e Waze (um destino por vez).
const caixaStyle = { border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', marginTop: '16px', display: 'grid', gap: '10px' };
const linhaStyle = { display: 'flex', gap: '10px', flexWrap: 'wrap' };
const linkStyle = { display: 'inline-block', textDecoration: 'none' };
const notaStyle = { margin: 0, fontSize: '0.85rem', color: 'var(--muted)' };

export default function RouteNavigation({ rota }) {
  const { pontos, semLocal } = pontosDaRota(rota);
  const trechos = linksGoogleMaps(pontos);
  const proximo = proximoDestino(rota);

  return (
    <div style={caixaStyle}>
      <h3 style={{ margin: 0 }}>Navegar</h3>

      {trechos.length === 0 ? (
        <p style={notaStyle}>Nenhum ponto desta rota tem endereço ou coordenadas.</p>
      ) : (
        <div style={linhaStyle}>
          {trechos.map((trecho, indice) => (
            <a key={trecho.url} href={trecho.url} target="_blank" rel="noopener noreferrer" className="primary-btn" style={linkStyle}>
              {trechos.length === 1
                ? 'Abrir rota no Google Maps'
                : `Google Maps, trecho ${indice + 1}: ${trecho.de} → ${trecho.ate}`}
            </a>
          ))}
        </div>
      )}
      {trechos.length > 1 && (
        <p style={notaStyle}>
          O Google Maps abre até {MAX_INTERMEDIARIAS_GOOGLE} paradas intermediárias por link. Abra os trechos na ordem: cada um começa onde o anterior termina.
        </p>
      )}

      {proximo && (
        <div style={linhaStyle}>
          <a href={linkWaze(proximo.local)} target="_blank" rel="noopener noreferrer" className="ghost-btn" style={linkStyle}>
            Waze: {proximo.rotulo} — {proximo.nome}
          </a>
        </div>
      )}

      {semLocal.length > 0 && (
        <p style={notaStyle}>Sem endereço nem coordenadas, fora dos links: {semLocal.join('; ')}.</p>
      )}
    </div>
  );
}
