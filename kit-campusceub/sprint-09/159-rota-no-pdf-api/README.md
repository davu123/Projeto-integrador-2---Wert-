# Task — Rota e motorista no PDF do lote

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/159 |
| Quem | Davi |
| PBI | [#42](https://github.com/CAMPUSCEUB/EcoTrack/issues/42) US16 — um único pai |
| Milestone | Sprint 09 - Fechamento da visão |
| Branch | `feature/159-rota-no-pdf-api` |
| Commit | `feat: inclui rota e motorista no pdf do lote` |
| Destino | só `src/backend` |
| Depende de | merge da Sprint 08 |

A issue #159 já existe. Não crie outra.

Pode ir em paralelo com a API de edição de equipamento: as duas não mexem nos mesmos arquivos.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que o `reportController.js` da `main` exporta `listarRelatorios` e `gerarRelatorio`, e que o PDF é montado ali mesmo, com `new PDFDocument({ margin: 40 })`. Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/reportController.js`

O arquivo é o da `main` mais o bloco novo. O resto do PDF, a gravação em `dbo.relatorio` e a resposta não mudam.

- Depois de buscar os equipamentos, o `gerarRelatorio` busca a rota mais recente (por `data`, depois `id`) que tem motorista atribuído e uma parada com o `lote_id` do lote.
- Se achar, o PDF ganha a seção **Rota de coleta**, entre os dados do lote e os equipamentos, com o número da rota, a data da rota e o nome do motorista.
- Se não achar, o PDF sai como hoje, sem a seção.

Não mexer no `services/reportPdfService.js`: o `POST /relatorios/gerar` não usa esse arquivo. Sem tela. Sem status de recolhimento no PDF. Sem mapa.

## PR

Título: `feat: inclui rota e motorista no pdf do lote`

```text
Closes #159

O PDF do lote mostra a rota mais recente com motorista que passa pelo lote: número, data e motorista. Sem rota assim, o PDF sai como antes.

Como validar: gestor cria uma rota com uma parada do lote e atribui o motorista. Gerar o PDF do lote → seção Rota de coleta. PDF de um lote sem rota → igual ao de antes.
```

## Como validar

- Lote numa parada de rota com motorista: `POST /relatorios/gerar` → 201 e o PDF mostra **Rota de coleta** com rota, data e motorista.
- Lote em duas rotas com motorista: o PDF mostra a de data mais recente (na mesma data, o maior id).
- Lote só em rota sem motorista, ou fora de qualquer rota: o PDF sai sem a seção.
- Lote que não existe → 404. Sem `lote_id` → 400. Técnico → 403.
- `GET /relatorios` continua igual.
