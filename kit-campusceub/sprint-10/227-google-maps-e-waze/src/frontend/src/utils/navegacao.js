// Links para abrir a rota no Google Maps e no Waze, sem chave de API.

// O link de rota do Google Maps leva origem, destino e até 9 paradas intermediárias.
// Rota maior sai em trechos: cada trecho começa onde o anterior termina.
export const MAX_INTERMEDIARIAS_GOOGLE = 9;

const COORDENADA = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;

function temCoordenada(ponto) {
  return Boolean(ponto) && ponto.latitude != null && ponto.longitude != null
    && Number.isFinite(Number(ponto.latitude)) && Number.isFinite(Number(ponto.longitude));
}

function enderecoEmTexto(ponto) {
  if (!ponto?.endereco) return '';
  const cidade = [ponto.cidade, ponto.uf].filter(Boolean).join(' - ');
  return [ponto.endereco, cidade].filter(Boolean).join(', ');
}

// Local que os aplicativos entendem: "latitude,longitude", ou o endereço em texto quando faltam as coordenadas.
export function localDoPonto(ponto) {
  if (temCoordenada(ponto)) return `${Number(ponto.latitude)},${Number(ponto.longitude)}`;
  return enderecoEmTexto(ponto) || null;
}

export function nomeDaParada(parada) {
  const partes = [];
  if (parada.agencia_nome) partes.push(parada.agencia_nome);
  else if (parada.agencia_id) partes.push(`Agência #${parada.agencia_id}`);
  if (parada.lote_id) partes.push(`Lote #${parada.lote_id}`);
  return partes.join(' · ') || 'Parada';
}

function paradasEmOrdem(rota) {
  return [...(rota?.paradas || [])].sort((a, b) => a.ordem - b.ordem);
}

// Origem, paradas e destino na ordem. O que não tem endereço nem coordenada fica em semLocal.
export function pontosDaRota(rota) {
  const pontos = [];
  const semLocal = [];

  function adicionar(ponto, rotulo, nome) {
    const local = localDoPonto(ponto);
    if (!local) {
      semLocal.push(`${rotulo} — ${nome}`);
      return;
    }
    pontos.push({
      rotulo,
      nome,
      local,
      latitude: temCoordenada(ponto) ? Number(ponto.latitude) : null,
      longitude: temCoordenada(ponto) ? Number(ponto.longitude) : null,
    });
  }

  if (rota?.origem) adicionar(rota.origem, 'Origem', rota.origem.nome);
  paradasEmOrdem(rota).forEach((parada) => adicionar(parada, `Parada ${parada.ordem}`, nomeDaParada(parada)));
  if (rota?.destino) adicionar(rota.destino, 'Destino', rota.destino.nome);

  return { pontos, semLocal };
}

function urlGoogle(origem, destino, intermediarias) {
  const parametros = new URLSearchParams({ api: '1' });
  if (origem) parametros.set('origin', origem);
  parametros.set('destination', destino);
  if (intermediarias.length) parametros.set('waypoints', intermediarias.join('|'));
  parametros.set('travelmode', 'driving');
  return `https://www.google.com/maps/dir/?${parametros.toString()}`;
}

// Um link por trecho, com no máximo 9 paradas intermediárias em cada um.
export function linksGoogleMaps(pontos) {
  if (pontos.length === 0) return [];
  if (pontos.length === 1) {
    // Um ponto só: o Google Maps traça a partir da localização do aparelho.
    return [{ url: urlGoogle(null, pontos[0].local, []), de: 'Sua localização', ate: pontos[0].rotulo }];
  }

  const links = [];
  let inicio = 0;
  while (inicio < pontos.length - 1) {
    const fim = Math.min(inicio + MAX_INTERMEDIARIAS_GOOGLE + 1, pontos.length - 1);
    const trecho = pontos.slice(inicio, fim + 1);
    links.push({
      url: urlGoogle(trecho[0].local, trecho[trecho.length - 1].local, trecho.slice(1, -1).map((ponto) => ponto.local)),
      de: trecho[0].rotulo,
      ate: trecho[trecho.length - 1].rotulo,
    });
    inicio = fim;
  }
  return links;
}

// O Waze navega até um destino por link.
export function linkWaze(local) {
  if (!local) return null;
  return COORDENADA.test(local)
    ? `https://waze.com/ul?ll=${local}&navigate=yes`
    : `https://waze.com/ul?q=${encodeURIComponent(local)}&navigate=yes`;
}

// Próxima parada sem recolhimento marcado. Sem parada pendente, o destino da rota.
export function proximoDestino(rota) {
  const pendente = paradasEmOrdem(rota).find((parada) => !parada.status_recolhimento && localDoPonto(parada));
  if (pendente) {
    return { rotulo: `Próxima parada (${pendente.ordem})`, nome: nomeDaParada(pendente), local: localDoPonto(pendente) };
  }
  if (rota?.destino && localDoPonto(rota.destino)) {
    return { rotulo: 'Destino', nome: rota.destino.nome, local: localDoPonto(rota.destino) };
  }
  return null;
}
