import api from './api';

export async function gerarRelatorio(payload) {
  return await api.post('/relatorios/gerar', payload);
}
