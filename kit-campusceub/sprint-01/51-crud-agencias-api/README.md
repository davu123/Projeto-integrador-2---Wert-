# Task #51 — CRUD de agências na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/51 |
| PBI | #31 US05 |
| Milestone | Sprint 01 - Login e agências |
| Branch | `feature/51-crud-agencias-api` |
| Commit | `feat: cadastra agencias na api` |
| Destino | só `src/backend` |
| Depende de | merge da #50 |

## O que copiar (sobrescrever)

- `src/backend/src/controllers/agencyController.js` (novo)
- `src/backend/src/routes/agencyRoutes.js` (novo)
- `src/backend/src/app.js`
- `src/backend/src/config/schema.js`

JWT em todas as rotas `/agencias`.

## PR

Título: `feat: cadastra agencias na api`

```text
Closes #51

CRUD /agencias com JWT e tabela agencia.

Como validar: GET /agencias sem token → 401; com token, criar/listar/editar/remover agência.
```

## Como validar

- GET/POST/PUT/DELETE `/agencias` com token.
- Sem token → 401.
- Sem tela.
