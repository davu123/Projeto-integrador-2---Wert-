# Sprint 2 — F02, F06 (US02, US06)

CRUD de usuários (sem perfil motorista) + CRUD de lotes **sem** mudança de status.

## Copiar / adaptar

**Schema:** tabela `dbo.lote` (FKs agência e técnico). CHECK de perfil em `usuario` permanece `administrador`, `tecnico`, `gestor`, `auditor`.

**API**

- `userController.js`, `userRoutes.js` (GET/POST/PUT, PATCH status ativo)
- De `loteController.js` / `loteRoutes.js`: `listarLotes`, `buscarLotePorId`, `criarLote`, `atualizarLote`. **Não** montar `PATCH /:id/status` nem exportar `atualizarStatusLote`.

**Front**

- `usersPage.jsx`, `userService.js`
- `LotsPage.jsx` e `lotService.js` sem `alterarStatus` / `atualizarStatusLote`. Status inicial `pendente` no create é aceitável.
- `formatters.js` se a lista de lotes formatar status.
- Sidebar: Usuários, Lotes.

## Não copiar

PATCH de status, equipamentos, destinação, dashboard.

## Aceite da sprint

Criar/editar/desativar usuário; criar/editar lote ligado a uma agência da sprint 1. Não há botão de ciclo pendente → triagem → concluído (isso é sprint 3).
