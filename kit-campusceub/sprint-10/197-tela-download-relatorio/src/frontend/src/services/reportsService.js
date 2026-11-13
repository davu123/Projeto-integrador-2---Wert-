import api from './api';

export async function gerarRelatorio(payload) {
  return await api.post('/relatorios/gerar', payload);
}

export async function listarRelatorios() {
  return await api.get('/relatorios');
}

export async function baixarRelatorio(id) {
  return await api.download(`/relatorios/${id}/arquivo`);
}
