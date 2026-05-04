import api from './api';

export async function listarUsuarios() {
  return await api.get('/usuarios');
}

export async function buscarUsuarioPorId(id) {
  return await api.get(`/usuarios/${id}`);
}

export async function criarUsuario(data) {
  return await api.post('/usuarios', data);
}

export async function atualizarUsuario(id, data) {
  return await api.put(`/usuarios/${id}`, data);
}

export async function atualizarStatusUsuario(id, ativo) {
  return await api.patch(`/usuarios/${id}/status`, { ativo });
}