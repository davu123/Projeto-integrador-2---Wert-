# Task — Listar PDFs na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/111 |
| Quem | Davi |
| PBI | [#41](https://github.com/CAMPUSCEUB/EcoTrack/issues/41) US15 — um único pai |
| Milestone | Sprint 05 - Dashboard e PDFs |
| Branch | `feature/111-listar-relatorios-api` |
| Commit | `feat: lista relatorios pdf na api` |
| Destino | só `src/backend` |
| Depende de | merge da #99 (`POST /relatorios/gerar` e tabela `relatorio`) |

A issue #111 já existe. Não crie outra. Esta Task vem **antes** da #112: as duas alteram `app.js`.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/reportController.js`
- `src/backend/src/routes/reportRoutes.js`
- `src/backend/src/app.js`

Acrescenta `GET /relatorios`. O `POST /relatorios/gerar` permanece. Publica `/uploads` com `express.static` para o navegador abrir o PDF. Sem tela. Sem dashboard.

## PR

Título: `feat: lista relatorios pdf na api`

```text
Closes #111

GET /relatorios devolve os PDFs já gerados. O POST /relatorios/gerar continua. A pasta /uploads fica pública.

Como validar: gerar um PDF, GET /relatorios com token e abrir o arquivo_pdf_url no navegador. Sem token → 401. reportRoutes.js tem get / e post /gerar.
```

## Como validar

- GET `/relatorios` com token lista `arquivo_pdf_url`.
- POST `/relatorios/gerar` continua funcionando.
- O arquivo em `/uploads/reports/...` abre no navegador (não 404).
- Sem token → 401.
- Sem tela. Sem rota `/dashboard`.
