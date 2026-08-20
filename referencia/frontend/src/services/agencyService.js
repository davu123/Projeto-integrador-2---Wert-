import api from './api';

export const listarAgencias = () => api.get('/agencias');
export const buscarAgenciaPorId = (id) => api.get(`/agencias/${id}`);
export const criarAgencia = (data) => api.post('/agencias', data);
export const atualizarAgencia = (id, data) => api.put(`/agencias/${id}`, data);
export const excluirAgencia = (id) => api.delete(`/agencias/${id}`);
