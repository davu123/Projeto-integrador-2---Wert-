// Matriz F04 (RF04–RF06). Sem rota de motorista (isso é sprint 8).
// administrador: tudo
// gestor: operação (agências, lotes, equipamentos, destinações, dashboard, relatórios); não governa usuários
// tecnico: lotes, equipamentos, destinações; GET agências e usuários (form de lote)
// auditor: só GET operacional + GET/POST relatórios; sem POST/PUT/PATCH/DELETE de operação
// motorista: GET dashboard (menu mínimo)

function requirePerfil(...perfis) {
  return (req, res, next) => {
    const perfil = req.usuario && req.usuario.perfil;

    if (!perfil) {
      return res.status(401).json({ message: 'Token sem perfil.' });
    }

    if (!perfis.includes(perfil)) {
      return res.status(403).json({
        message: 'Perfil sem permissão para esta operação.'
      });
    }

    return next();
  };
}

module.exports = requirePerfil;
