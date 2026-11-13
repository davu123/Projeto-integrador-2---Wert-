import api from './api';

export const alterarSenha = (senha_atual, nova_senha) => api.put('/auth/senha', { senha_atual, nova_senha });
