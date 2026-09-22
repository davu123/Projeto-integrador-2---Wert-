const STATUS_LABELS = {
  pendente: 'Pendente',
  em_triagem: 'Em triagem',
  concluido: 'Conclu\u00eddo',
};

const ESTADO_LABELS = {
  bom: 'Bom',
  danificado: 'Danificado',
  inutilizavel: 'Inutiliz\u00e1vel',
};

const DESTINO_LABELS = {
  reciclagem: 'Reciclagem',
  reuso: 'Reuso',
  destruicao: 'Destrui\u00e7\u00e3o',
};

export function formatStatus(value) {
  return STATUS_LABELS[value] || value || '-';
}

export function formatEstado(value) {
  return ESTADO_LABELS[value] || value || '-';
}

export function formatDestino(value) {
  return DESTINO_LABELS[value] || value || '-';
}
