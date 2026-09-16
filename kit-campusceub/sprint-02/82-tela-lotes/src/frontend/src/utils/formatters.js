const STATUS_LABELS = {
  pendente: 'Pendente',
  em_triagem: 'Em triagem',
  concluido: 'Conclu\u00eddo',
};

export function formatStatus(value) {
  return STATUS_LABELS[value] || value || '-';
}
