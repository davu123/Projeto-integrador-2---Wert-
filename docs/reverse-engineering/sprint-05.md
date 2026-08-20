# Sprint 5 — F13, F15 (US13, US15)

Dashboard + listar/baixar PDFs. Encerra o núcleo de rastreabilidade.

## Copiar / adaptar

**API**

- `dashboardController.js`, `dashboardRoutes.js` — `GET /dashboard`
- `listarRelatorios` + `GET /relatorios`

**Front**

- `DashboardPage.jsx`; rota `/` deixa de ser placeholder
- Completar `Reports.jsx` / `reportsService.js`: lista e link de download (`VITE_API_URL` + `arquivo_pdf_url`)
- Sidebar: Dashboard

`api.js` na referência já tem `getDashboard` — copiar o helper se ainda não estiver no client do app.

## Não copiar

Rotas, motorista, RBAC, PUT equipamento.

## Aceite da sprint

Dashboard com totais/quebras; listar PDFs gerados na sprint 4 e baixar. `docker compose` em `app/` sobe.
