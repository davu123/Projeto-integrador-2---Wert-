import api from './api';

export const listarUsuarios = () => api.get('/usuarios');
export const buscarUsuarioPorId = (id) => api.get(`/usuarios/${id}`);
export const criarUsuario = (data) => api.post('/usuarios', data);
export const atualizarUsuario = (id, data) => api.put(`/usuarios/${id}`, data);
export const atualizarStatusUsuario = (id, ativo) => api.patch(`/usuarios/${id}/status`, { ativo });
