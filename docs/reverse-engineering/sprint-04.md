# Sprint 4 — F11, F14 (US11, US14)

Destinação por equipamento + **gerar** PDF (ainda sem listar arquivo).

## Copiar / adaptar

**Schema:** `dbo.destinacao`, `dbo.relatorio`.

**API**

- `destinacaoController.js`, `destinacaoRoutes.js`
- De `reportController.js`: só `gerarRelatorio`; `POST /relatorios/gerar`. Static `/uploads` em `app.js`.
- **Não** montar `GET /relatorios` ainda.

**Front**

- `DestinationsPage.jsx`, `destinationService.js`
- `Reports.jsx`: formulário/botão gerar PDF por `lote_id`. Sem tabela de downloads (sprint 5).
- Sidebar: Destinação, Relatórios.

## Não copiar

`listarRelatorios`, `DashboardPage`, download.

## Aceite da sprint

Registrar destinação; gerar PDF do lote; arquivo em `app/backend/uploads/reports/`. Concluir lote sem destinação ainda é possível (F12 é sprint 6).
