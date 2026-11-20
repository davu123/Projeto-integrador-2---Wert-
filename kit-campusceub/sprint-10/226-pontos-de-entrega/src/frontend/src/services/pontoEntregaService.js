import api from './api';

export const listarPontosEntrega = () => api.get('/pontos-entrega');
export const criarPontoEntrega = (data) => api.post('/pontos-entrega', data);
export const atualizarPontoEntrega = (id, data) => api.put(`/pontos-entrega/${id}`, data);
export const excluirPontoEntrega = (id) => api.delete(`/pontos-entrega/${id}`);
