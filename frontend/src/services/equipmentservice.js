import api from './api';

export async function listarEquipamentos() {
  const response = await api.get('/equipamentos');
  return response.data;
}

export async function cadastrarEquipamento(data) {
  const response = await api.post('/equipamentos', data);
  return response.data;
}