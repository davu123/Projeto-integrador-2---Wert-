# Task — CRUD de rotas na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/136 |
| Quem | Davi |
| PBI | [#43](https://github.com/CAMPUSCEUB/EcoTrack/issues/43) US17 — um único pai |
| Milestone | Sprint 07 - Rotas e atribuição de motorista |
| Branch | `feature/136-rotas-api` |
| Commit | `feat: cadastra rotas de coleta na api` |
| Destino | só `src/backend` |
| Depende de | merge da Sprint 06 |

A issue #136 já existe. Não crie outra. Esta Task vem **antes** da API de atribuição: as duas alteram `rotaController.js` e `rotaRoutes.js`.

## O que copiar (sobrescrever)

- `src/backend/src/config/schema.js`
- `src/backend/src/controllers/rotaController.js` (novo)
- `src/backend/src/routes/rotaRoutes.js` (novo)
- `src/backend/src/app.js`

Tabelas `rota` e `parada` (data, ordem, FK agência e/ou lote, `motorista_id` nulo). Sem colunas GPS. CRUD com paradas ordenadas. JWT + perfil gestor/admin. POST/PUT **não** atribuem motorista.

## PR

Título: `feat: cadastra rotas de coleta na api`

```text
Closes #136

GET/POST/PUT/DELETE /rotas com paradas ordenadas. Sem atribuição de motorista. Sem GPS.

Como validar: POST /rotas com data e duas paradas, token de gestor. Sem token → 401. Técnico → 403. Schema sem lat/lng.
```

## Como validar

- POST `/rotas` com gestor cria a rota e devolve `paradas` em ordem.
- GET `/rotas` lista. DELETE remove a rota e as paradas.
- Técnico ou motorista → 403. Sem token → 401.
- Grep `lat`/`gps` no `schema.js` — ausente.
- Sem tela. Sem `PATCH /rotas/:id/motorista`.
