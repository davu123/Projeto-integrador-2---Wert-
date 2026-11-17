export const MENU = [
  { href: '/', label: 'Dashboard', perfis: ['administrador', 'gestor', 'tecnico', 'auditor', 'motorista'] },
  { href: '/agencias', label: 'Agências', perfis: ['administrador', 'gestor'] },
  { href: '/usuarios', label: 'Usuários', perfis: ['administrador'] },
  { href: '/lotes', label: 'Lotes', perfis: ['administrador', 'gestor', 'tecnico', 'auditor'] },
  { href: '/equipamentos/novo', label: 'Equipamentos', perfis: ['administrador', 'gestor', 'tecnico'] },
  { href: '/equipamentos', label: 'Listagem', perfis: ['administrador', 'gestor', 'tecnico', 'auditor'] },
  { href: '/destinacoes', label: 'Destinação', perfis: ['administrador', 'gestor', 'tecnico', 'auditor'] },
  { href: '/relatorios', label: 'Relatórios', perfis: ['administrador', 'gestor', 'auditor'] },
  { href: '/rotas', label: 'Rotas', perfis: ['administrador', 'gestor'] },
  { href: '/rota-do-dia', label: 'Rota do dia', perfis: ['motorista'] },
  { href: '/minha-conta', label: 'Minha conta', perfis: ['administrador', 'gestor', 'tecnico', 'auditor', 'motorista'] },
];

export function perfisDaRota(pathname) {
  const item = MENU.find((entrada) => entrada.href === pathname);
  return item ? item.perfis : [];
}

export function podeVerMenu(perfil, href) {
  return perfisDaRota(href).includes(perfil);
}

// Página aberta depois do login. O motorista começa pela Rota do dia; o Dashboard continua no menu.
export function paginaInicial(perfil) {
  return perfil === 'motorista' ? '/rota-do-dia' : '/';
}

// Quem grava lotes e destinações: os mesmos perfis do POST, PUT, PATCH e DELETE da API.
// O auditor só consulta.
const PERFIS_ESCRITA = ['administrador', 'gestor', 'tecnico'];

export function podeEscrever(perfil) {
  return PERFIS_ESCRITA.includes(perfil);
}
