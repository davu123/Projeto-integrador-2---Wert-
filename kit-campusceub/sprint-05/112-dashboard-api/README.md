# Task — Indicadores do dashboard na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/112 |
| Quem | Davi |
| PBI | [#39](https://github.com/CAMPUSCEUB/EcoTrack/issues/39) US13 — um único pai |
| Milestone | Sprint 05 - Dashboard e PDFs |
| Branch | `feature/112-dashboard-api` |
| Commit | `feat: expoe indicadores no dashboard da api` |
| Destino | só `src/backend` |
| Depende de | merge da #97 (tabela `destinacao`) e da API de listagem (mesmo `app.js`, já com `/uploads`) |

A issue #112 já existe. Não crie outra. **Depois** do merge da #111: as duas alteram `app.js`.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/dashboardController.js` (novo)
- `src/backend/src/routes/dashboardRoutes.js` (novo)
- `src/backend/src/app.js`

`GET /dashboard` com JWT. Totais de equipamentos, lotes, agências e destinações. Quebras por status do lote, tipo, estado e tipo de destino. Sem indicador de coleta. O `app.js` desta pasta **repete** `/uploads` e `/relatorios` para não apagar o que a Task de listagem mergeou.

## PR

Título: `feat: expoe indicadores no dashboard da api`

```text
Closes #112

GET /dashboard com totais e quebras. Sem tela.

Como validar: GET /dashboard sem token → 401; com token, os totais batem com as tabelas.
```

## Como validar

- `GET /dashboard` com token devolve `indicadores` e as quatro quebras.
- Sem token → 401.
- Sem tela.
