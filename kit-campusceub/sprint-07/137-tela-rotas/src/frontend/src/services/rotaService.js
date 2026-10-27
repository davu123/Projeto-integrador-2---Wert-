import api from './api';

export const listarRotas = () => api.get('/rotas');
export const buscarRotaPorId = (id) => api.get(`/rotas/${id}`);
export const criarRota = (data) => api.post('/rotas', data);
export const atualizarRota = (id, data) => api.put(`/rotas/${id}`, data);
export const excluirRota = (id) => api.delete(`/rotas/${id}`);
