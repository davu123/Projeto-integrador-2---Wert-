import api from './api';

export const listarLotes = () => api.get('/lotes');
export const buscarLotePorId = (id) => api.get(`/lotes/${id}`);
export const criarLote = (data) => api.post('/lotes', data);
export const atualizarLote = (id, data) => api.put(`/lotes/${id}`, data);
