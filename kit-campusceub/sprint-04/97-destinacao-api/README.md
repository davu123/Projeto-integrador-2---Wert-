# Task — Destinação na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/97 |
| Quem | Davi |
| PBI | [#37](https://github.com/CAMPUSCEUB/EcoTrack/issues/37) US11 — um único pai |
| Milestone | Sprint 04 - Destinação e PDF |
| Branch | `feature/97-destinacao-api` |
| Commit | `feat: registra destinacao na api` |
| Destino | só `src/backend` |
| Depende de | merge da API de equipamentos da Sprint 03 (#83) |

A issue #97 já existe. Não crie outra.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/destinacaoController.js` (novo)
- `src/backend/src/routes/destinacaoRoutes.js` (novo)
- `src/backend/src/app.js`
- `src/backend/src/config/schema.js`

JWT em `/destinacoes`. Tabela `dbo.destinacao`: uma destinação por equipamento (`reciclagem`, `reuso` ou `destruicao`). `certificado_url` é opcional.

## PR

Título: `feat: registra destinacao na api`

```text
Closes #97

CRUD /destinacoes com JWT e tabela destinacao. Uma destinação por equipamento.

Como validar: GET /destinacoes sem token → 401; com token, registrar destinação de um equipamento da Sprint 03.
```

## Como validar

- GET/POST/PUT/DELETE `/destinacoes` com token.
- Sem token → 401.
- Sem tela. Sem PDF.
