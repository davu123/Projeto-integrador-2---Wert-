import { useEffect } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './RouteMap.css';

// Mapa da rota sobre o OpenStreetMap, sem chave de API.
// Origem (O), paradas numeradas na ordem e destino (D), ligados em linha reta.
// O caminho pelas ruas fica com o Google Maps e o Waze.

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATRIBUICAO = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const CENTRO_PADRAO = [-15.7939, -47.8828];

function temCoordenada(ponto) {
  return Boolean(ponto) && ponto.latitude != null && ponto.longitude != null
    && Number.isFinite(Number(ponto.latitude)) && Number.isFinite(Number(ponto.longitude));
}

function posicao(ponto) {
  return [Number(ponto.latitude), Number(ponto.longitude)];
}

function nomeDaParada(parada) {
  const partes = [];
  if (parada.agencia_nome) partes.push(parada.agencia_nome);
  else if (parada.agencia_id) partes.push(`Agência #${parada.agencia_id}`);
  if (parada.lote_id) partes.push(`Lote #${parada.lote_id}`);
  return partes.join(' · ') || 'Parada';
}

// O ícone padrão do Leaflet não carrega no build do Vite. Todos os marcadores são divIcon.
function icone(texto, variante) {
  return L.divIcon({
    className: `mapa-rota-marcador mapa-rota-marcador--${variante}`,
    html: `<span>${texto}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
  });
}

// Pontos da rota na ordem: origem, paradas e destino. Parada sem coordenada fica de fora.
export function pontosDoMapa(rota) {
  const pontos = [];
  const semCoordenada = [];

  if (temCoordenada(rota?.origem)) {
    pontos.push({ chave: 'origem', texto: 'O', variante: 'origem', titulo: `Origem: ${rota.origem.nome}`, posicao: posicao(rota.origem) });
  }

  const paradas = [...(rota?.paradas || [])].sort((a, b) => a.ordem - b.ordem);
  paradas.forEach((parada, indice) => {
    const numero = parada.ordem ?? indice + 1;
    if (!temCoordenada(parada)) {
      semCoordenada.push(`Parada ${numero} — ${nomeDaParada(parada)}`);
      return;
    }
    pontos.push({
      chave: `parada-${parada.id ?? indice}`,
      texto: String(numero),
      variante: parada.status_recolhimento ? 'feita' : 'parada',
      titulo: `Parada ${numero}: ${nomeDaParada(parada)}`,
      posicao: posicao(parada),
    });
  });

  if (temCoordenada(rota?.destino)) {
    pontos.push({ chave: 'destino', texto: 'D', variante: 'destino', titulo: `Destino: ${rota.destino.nome}`, posicao: posicao(rota.destino) });
  }

  return { pontos, semCoordenada };
}

function Enquadrar({ posicoes }) {
  const mapa = useMap();
  const chave = JSON.stringify(posicoes);

  useEffect(() => {
    if (posicoes.length === 1) mapa.setView(posicoes[0], 15);
    else if (posicoes.length > 1) mapa.fitBounds(posicoes, { padding: [32, 32] });
    // A chave muda quando algum ponto muda.
  }, [mapa, chave]);

  return null;
}

export default function RouteMap({ rota }) {
  const { pontos, semCoordenada } = pontosDoMapa(rota);
  const posicoes = pontos.map((ponto) => ponto.posicao);

  return (
    <div className="mapa-rota">
      {pontos.length === 0 ? (
        <p className="mapa-rota-vazio">
          Nenhum ponto desta rota tem coordenadas. Cadastre a latitude e a longitude em Agências e em Pontos de entrega.
        </p>
      ) : (
        <>
          <MapContainer
            center={posicoes[0] || CENTRO_PADRAO}
            zoom={13}
            scrollWheelZoom={false}
            className="mapa-rota-mapa"
          >
            <TileLayer url={TILE_URL} attribution={ATRIBUICAO} />
            <Polyline positions={posicoes} pathOptions={{ color: '#0d3538', weight: 3, dashArray: '6 6' }} />
            {pontos.map((ponto) => (
              <Marker key={ponto.chave} position={ponto.posicao} icon={icone(ponto.texto, ponto.variante)} title={ponto.titulo}>
                <Tooltip>{ponto.titulo}</Tooltip>
              </Marker>
            ))}
            <Enquadrar posicoes={posicoes} />
          </MapContainer>
          <p className="mapa-rota-legenda">
            O: origem · 1, 2, 3…: paradas na ordem · D: destino. Linhas retas entre os pontos, não o caminho pelas ruas.
          </p>
        </>
      )}
      {semCoordenada.length > 0 && (
        <div className="mapa-rota-aviso" role="status">
          Fora do mapa, sem coordenadas: {semCoordenada.join('; ')}.
        </div>
      )}
    </div>
  );
}
