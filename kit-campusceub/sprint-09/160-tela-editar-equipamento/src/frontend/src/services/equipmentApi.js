import api from './api';

export async function listarEquipamentos() {
  return await api.get('/equipamentos');
}

export async function cadastrarEquipamento(data) {
  return await api.post('/equipamentos', data);
}

export async function atualizarEquipamento(id, data) {
  return await api.put(`/equipamentos/${id}`, data);
}
