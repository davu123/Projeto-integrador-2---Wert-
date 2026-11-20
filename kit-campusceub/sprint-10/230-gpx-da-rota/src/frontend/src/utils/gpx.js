import { pontosDaRota } from './navegacao';

// Arquivo GPX 1.1 da rota: um ponto (wpt) para cada local e a rota (rte) na ordem.
// O GPX só leva coordenadas: ponto que tem só endereço fica de fora.

function escaparXml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function pontosDoGpx(rota) {
  const { pontos, semLocal } = pontosDaRota(rota);
  const comCoordenada = pontos.filter((ponto) => ponto.latitude != null && ponto.longitude != null);
  const foraDoGpx = [
    ...pontos.filter((ponto) => ponto.latitude == null || ponto.longitude == null).map((ponto) => `${ponto.rotulo} — ${ponto.nome}`),
    ...semLocal,
  ];
  return { comCoordenada, foraDoGpx };
}

export function gerarGpx(rota) {
  const { comCoordenada } = pontosDoGpx(rota);
  const nomeDaRota = `Rota ${rota.id} - ${String(rota.data).slice(0, 10)}`;
  const nome = (ponto) => escaparXml(`${ponto.rotulo} - ${ponto.nome}`);
  const atributos = (ponto) => `lat="${ponto.latitude.toFixed(6)}" lon="${ponto.longitude.toFixed(6)}"`;

  const linhas = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<gpx version="1.1" creator="EcoTrack Wert" xmlns="http://www.topografix.com/GPX/1/1">',
    `  <metadata><name>${escaparXml(nomeDaRota)}</name></metadata>`,
    ...comCoordenada.map((ponto) => `  <wpt ${atributos(ponto)}><name>${nome(ponto)}</name></wpt>`),
    '  <rte>',
    `    <name>${escaparXml(nomeDaRota)}</name>`,
    ...comCoordenada.map((ponto) => `    <rtept ${atributos(ponto)}><name>${nome(ponto)}</name></rtept>`),
    '  </rte>',
    '</gpx>',
    '',
  ];
  return linhas.join('\n');
}

export function baixarGpx(rota) {
  const blob = new Blob([gerarGpx(rota)], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `rota-${rota.id}-${String(rota.data).slice(0, 10)}.gpx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
