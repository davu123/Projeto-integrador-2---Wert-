import api from './api';

export async function login(email, senha) {
  const response = await api.post('/auth/login', { email, senha });

  const { token, usuario } = response.data;

  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));

  return response.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

export function getUsuarioLogado() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}