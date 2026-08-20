# Sprint 6 — F03, F04, F12 (US03, US04, US12)

**Sem fonte na referência.** Código novo no estilo Express/React/SQL da referência.

## Implementar

1. **F03** — Incluir `motorista` no `CK_usuario_perfil`, `PERFIS_VALIDOS` e no select de `usersPage.jsx`.
2. **F04** — Middleware de autorização por perfil nas rotas da API; `ProtectedRoute` e `Sidebar` filtram por `usuario.perfil`. Matriz mínima (ajustável na tarefa, sem inventar regra que o backlog contradiga):
   - administrador: tudo
   - gestor: operação (agências, lotes, dashboard, rotas quando existirem), não precisa governar usuários se a matriz disser o contrário — **gravar a matriz no código ou num comentário curto na tarefa**
   - tecnico: lotes, equipamentos, destinação
   - auditor: consulta + relatórios, sem POST/PUT/PATCH/DELETE de operação
   - motorista: ainda sem tela de rota (sprint 8); menu mínimo
3. **F12** — `PATCH` lote `concluido` retorna 400 se algum equipamento do lote não tiver destinação.

## Não fazer

GPS, telas de rota (sprint 7), PUT equipamento.

## Aceite da sprint

Criar usuário motorista; auditor autenticado não cria agência; lote com item sem destinação não conclui.
