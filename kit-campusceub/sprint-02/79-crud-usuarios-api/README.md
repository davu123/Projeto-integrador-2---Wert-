# Task #79 — CRUD de usuários na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/79 |
| Quem | Davi (catch-up Sprint 02) |
| PBI | [#28](https://github.com/CAMPUSCEUB/EcoTrack/issues/28) US02 |
| Milestone | Sprint 02 - Usuários e lotes |
| Branch | `feature/79-crud-usuarios-api` |
| Commit | `feat: cadastra usuarios na api` |
| Destino | só `src/backend` |
| Depende de | merge da Sprint 01 |

Rebaseie em `main` **depois** do merge da Sprint 01.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/userController.js` (novo)
- `src/backend/src/routes/userRoutes.js` (novo)
- `src/backend/src/app.js`

JWT em todas as rotas `/usuarios`. Perfis válidos: `administrador`, `tecnico`, `gestor`, `auditor`. **Sem** `motorista`.

## PR

Título: `feat: cadastra usuarios na api`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #79

CRUD /usuarios com JWT. Perfis administrador, tecnico, gestor e auditor. Sem perfil motorista.

Como validar: GET /usuarios sem token → 401; com token, criar/listar/editar e PATCH de ativo.
```

## Como validar

- GET/POST/PUT `/usuarios` e PATCH `/usuarios/:id/status` com token.
- Sem token → 401.
- `PERFIS_VALIDOS` não inclui `motorista`.
- Sem tela.
