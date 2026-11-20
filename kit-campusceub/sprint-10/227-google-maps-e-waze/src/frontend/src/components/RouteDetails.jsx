import RouteMap from './RouteMap';
import RouteNavigation from './RouteNavigation';
import { linkWaze, localDoPonto } from '../utils/navegacao';

// Rota aberta na tela de Rotas: origem, destino, mapa e paradas com endereço.
const cardStyle = { background: 'var(--panel)', color: 'var(--text)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', marginTop: '24px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '10px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' };
const tdStyle = { padding: '10px', borderBottom: '1px solid var(--border)' };

const RECOLHIMENTO = { recolhido: 'Recolhido', parcial: 'Parcial', nao_recolhido: 'Não recolhido' };

export function descreverPonto(ponto) {
  if (!ponto) return 'Não definido';
  const local = [ponto.endereco, [ponto.cidade, ponto.uf].filter(Boolean).join(' - ')].filter(Boolean).join(', ');
  return local ? `${ponto.nome} — ${local}` : ponto.nome;
}

export function enderecoDaParada(parada) {
  const cidade = [parada.cidade, parada.uf].filter(Boolean).join(' - ');
  return [parada.endereco, cidade].filter(Boolean).join(', ') || '—';
}

function nomeDaParada(parada) {
  const partes = [];
  if (parada.agencia_nome) partes.push(parada.agencia_nome);
  if (parada.lote_id) partes.push(`Lote #${parada.lote_id}`);
  return partes.join(' · ') || '—';
}

export default function RouteDetails({ rota, onFechar }) {
  if (!rota) return null;
  const paradas = [...(rota.paradas || [])].sort((a, b) => a.ordem - b.ordem);

  return (
    <section style={cardStyle} aria-label={`Rota ${rota.id} no mapa`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'baseline' }}>
        <h2 style={{ margin: 0 }}>Rota #{rota.id} — {String(rota.data).slice(0, 10)}</h2>
        <button type="button" className="ghost-btn" onClick={onFechar}>Fechar mapa</button>
      </div>
      <p style={{ margin: '12px 0 4px' }}><strong>Origem:</strong> {descreverPonto(rota.origem)}</p>
      <p style={{ margin: '0 0 4px' }}><strong>Destino:</strong> {descreverPonto(rota.destino)}</p>
      <p style={{ margin: '0 0 16px' }}><strong>Motorista:</strong> {rota.motorista_nome || 'Sem motorista'}</p>

      <RouteMap rota={rota} />
      <RouteNavigation rota={rota} />

      <div style={{ overflowX: 'auto', marginTop: '16px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Ordem</th>
              <th style={thStyle}>Parada</th>
              <th style={thStyle}>Endereço</th>
              <th style={thStyle}>Recolhimento</th>
              <th style={thStyle}>Navegar</th>
            </tr>
          </thead>
          <tbody>
            {paradas.map((parada) => (
              <tr key={parada.id}>
                <td style={tdStyle}>{parada.ordem}</td>
                <td style={tdStyle}>{nomeDaParada(parada)}</td>
                <td style={tdStyle}>{enderecoDaParada(parada)}</td>
                <td style={tdStyle}>{RECOLHIMENTO[parada.status_recolhimento] || 'Pendente'}</td>
                <td style={tdStyle}>
                  {linkWaze(localDoPonto(parada))
                    ? <a href={linkWaze(localDoPonto(parada))} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Waze</a>
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
