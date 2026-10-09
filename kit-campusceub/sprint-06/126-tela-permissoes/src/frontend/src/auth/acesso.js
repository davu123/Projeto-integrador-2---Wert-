export const MENU = [
  { href: '/', label: 'Dashboard', perfis: ['administrador', 'gestor', 'tecnico', 'auditor', 'motorista'] },
  { href: '/agencias', label: 'Agências', perfis: ['administrador', 'gestor'] },
  { href: '/usuarios', label: 'Usuários', perfis: ['administrador'] },
  { href: '/lotes', label: 'Lotes', perfis: ['administrador', 'gestor', 'tecnico', 'auditor'] },
  { href: '/equipamentos/novo', label: 'Equipamentos', perfis: ['administrador', 'gestor', 'tecnico'] },
  { href: '/equipamentos', label: 'Listagem', perfis: ['administrador', 'gestor', 'tecnico', 'auditor'] },
  { href: '/destinacoes', label: 'Destinação', perfis: ['administrador', 'gestor', 'tecnico', 'auditor'] },
  { href: '/relatorios', label: 'Relatórios', perfis: ['administrador', 'gestor', 'auditor'] },
];

export function perfisDaRota(pathname) {
  const item = MENU.find((entrada) => entrada.href === pathname);
  return item ? item.perfis : [];
}

export function podeVerMenu(perfil, href) {
  return perfisDaRota(href).includes(perfil);
}
