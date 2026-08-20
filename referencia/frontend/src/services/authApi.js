import api from './api';

export async function login(email, senha) {
  const response = await api.post('/auth/login', { email, senha }, { withAuth: false });

  const { token, usuario } = response;

  localStorage.setItem('ecotrack-token', token);
  localStorage.setItem('token', token);
  localStorage.setItem('ecotrack-user', JSON.stringify(usuario));
  localStorage.setItem('usuario', JSON.stringify(usuario));

  return response;
}

export function logout() {
  localStorage.removeItem('ecotrack-token');
  localStorage.removeItem('token');
  localStorage.removeItem('ecotrack-user');
  localStorage.removeItem('usuario');
}

export function getUsuarioLogado() {
  const usuario =
    localStorage.getItem('ecotrack-user') || localStorage.getItem('usuario');

  if (!usuario) {
    return null;
  }

  try {
    return JSON.parse(usuario);
  } catch {
    logout();
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(
    localStorage.getItem('ecotrack-token') || localStorage.getItem('token')
  );
}
