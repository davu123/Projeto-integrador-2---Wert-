import api from './api';

export async function listarDestinacoes() {
  return await api.get('/destinacoes');
}

export async function buscarDestinacaoPorId(id) {
  return await api.get(`/destinacoes/${id}`);
}

export async function criarDestinacao(data) {
  return await api.post('/destinacoes', data);
}

export async function atualizarDestinacao(id, data) {
  return await api.put(`/destinacoes/${id}`, data);
}

export async function excluirDestinacao(id) {
  return await api.delete(`/destinacoes/${id}`);
}
