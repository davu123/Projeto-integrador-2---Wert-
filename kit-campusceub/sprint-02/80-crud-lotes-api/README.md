# Task #80 — CRUD de lotes na API (sem PATCH de status)

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/80 |
| Quem | Davi (catch-up Sprint 02) |
| PBI | [#32](https://github.com/CAMPUSCEUB/EcoTrack/issues/32) US06 |
| Milestone | Sprint 02 - Usuários e lotes |
| Branch | `feature/80-crud-lotes-api` |
| Commit | `feat: cadastra lotes na api` |
| Destino | só `src/backend` |
| Depende de | merge da #51 (agências na API; Sprint 01) |

## O que copiar (sobrescrever)

- `src/backend/src/controllers/loteController.js` (novo)
- `src/backend/src/routes/loteRoutes.js` (novo)
- `src/backend/src/app.js`
- `src/backend/src/config/schema.js`

JWT em todas as rotas `/lotes`. Tabela `dbo.lote` ligada a agência e técnico. Create grava status `pendente`. **GET/POST/PUT apenas.** Sem DELETE. Sem `PATCH /lotes/:id/status` (ciclo é a #83).

## PR

Título: `feat: cadastra lotes na api`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #80

CRUD /lotes (GET/POST/PUT) com JWT e tabela lote. Sem DELETE. Sem PATCH de status (ciclo na #83).

Como validar: GET /lotes sem token → 401; com token, criar e editar lote ligado a uma agência. loteRoutes.js não tem patch nem delete.
```

## Como validar

- GET/POST/PUT `/lotes` com token.
- Sem token → 401.
- `loteRoutes.js` não declara `patch` nem `delete`.
- Sem tela. Sem equipamentos. Sem ciclo de status.
