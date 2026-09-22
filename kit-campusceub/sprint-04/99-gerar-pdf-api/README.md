# Task — Gerar PDF na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/99 |
| Quem | Davi |
| PBI | [#40](https://github.com/CAMPUSCEUB/EcoTrack/issues/40) US14 — um único pai |
| Milestone | Sprint 04 - Destinação e PDF |
| Branch | `feature/99-gerar-pdf-api` |
| Commit | `feat: gera pdf de conformidade do lote` |
| Destino | só `src/backend` |
| Depende de | merge da Task de destinação na API |

A issue #99 já existe. Não crie outra. Pode ir em paralelo com a #98 depois do merge da #97.

`pdfkit` já entra no `package.json` do esqueleto. Não substitua o `package.json` inteiro.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/reportController.js` (novo)
- `src/backend/src/routes/reportRoutes.js` (novo)
- `src/backend/src/app.js`
- `src/backend/src/config/schema.js`

Só `POST /relatorios/gerar`. Tabela `dbo.relatorio`. Arquivos estáticos em `/uploads`. **Não** há `GET /relatorios`.

## PR

Título: `feat: gera pdf de conformidade do lote`

```text
Closes #99

POST /relatorios/gerar grava o PDF do lote e a linha em dbo.relatorio. Sem GET de listagem.

Como validar: autenticar, POST /relatorios/gerar com lote_id e conferir o arquivo em uploads/reports. reportRoutes.js só tem post /gerar.
```

## Como validar

- POST `/relatorios/gerar` com token devolve 201 e `arquivo_pdf_url`.
- Sem token → 401.
- `reportRoutes.js` não declara `get`.
- Sem tela.
