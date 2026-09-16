import api from './api';

export async function listarEquipamentos() {
  return await api.get('/equipamentos');
}

export async function cadastrarEquipamento(data) {
  return await api.post('/equipamentos', data);
}
