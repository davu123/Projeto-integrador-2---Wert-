# Mapa código → funcionalidade → sprint

Fonte da cópia: `referencia/` (depois do freeze). Até a tarefa 0.1, os mesmos paths existem na raiz (`backend/`, `frontend/`).

Não copiar: `newequipment.jsx`, `reportsPage.jsx`, `frontend/src/.dockerfile`, `backend/src/dockerfile`, `authservice.js`, `equipmentservice.js`.

## Infra (fase 0 — não é US)

| Destino em `app/` | Origem |
|---|---|
| Compose, dockerfiles, package.json dos dois lados | `docker-compose.yml`, `backend/dockerfile`, `frontend/dockerfile`, `package.json` / lock |
| Casca API | `backend/src/server.js`, `app.js` (só `/health`), `config/database.js` |
| Casca front | `index.html`, `vite.config.js`, `main.jsx`, casca `App.jsx`, `Layout`, `Header`, `Sidebar` (sem links de sprint futura), `ThemeContext`, `styles/*`, `assets/logo-wert.png` |

Schema (`config/schema.js`) **cresce** nas sprints 1–5 (e 6–9 no app). Não copiar o arquivo inteiro na fase 0.

## Núcleo (sprints 1–5) — copiar da referência

| ID | US | Sprint | Backend (referência) | Frontend (referência) |
|---|---|---|---|---|
| F01 | US01 | 1 | `authController.js`, `authRoutes.js`, `authMiddleware.js`; tabela `usuario` (login) + seed admin | `LoginPage.jsx`, `AuthContext.jsx`, `ProtectedRoute.jsx`, `api.js` (client + login), `authApi.js` se a tela usar |
| F05 | US05 | 1 | `agencyController.js`, `agencyRoutes.js`; tabela `agencia` | `AgenciesPage.jsx`, `agencyService.js` |
| F02 | US02 | 2 | `userController.js`, `userRoutes.js` (CHECK **sem** `motorista`) | `usersPage.jsx`, `userService.js` |
| F06 | US06 | 2 | `loteController.js` GET/POST/PUT; `loteRoutes.js` sem PATCH; tabela `lote` | `LotsPage.jsx` sem `alterarStatus`; `lotService.js` sem PATCH |
| F07 | US07 | 3 | `atualizarStatusLote` + `PATCH /lotes/:id/status` | `alterarStatus` em `LotsPage.jsx` / `lotService.js` |
| F08 | US08 | 3 | `cadastrarEquipamento` POST; tabela `equipamento` | `EquipmentFormPage.jsx`, `equipmentApi.js` criar |
| F09 | US09 | 3 | `listarEquipamentos` GET | `EquipmentListPage.jsx` |
| F11 | US11 | 4 | `destinacaoController.js`, `destinacaoRoutes.js`; tabela `destinacao` | `DestinationsPage.jsx`, `destinationService.js` |
| F14 | US14 | 4 | `gerarRelatorio` POST `/relatorios/gerar`; tabela `relatorio`; static `/uploads` | botão gerar em `Reports.jsx` |
| F13 | US13 | 5 | `dashboardController.js`, `dashboardRoutes.js` | `DashboardPage.jsx` |
| F15 | US15 | 5 | `listarRelatorios` GET `/relatorios` | lista/download em `Reports.jsx`, `reportsService.js` |

`utils/formatters.js` entra na primeira tela que formatar status/estado/destino (lotes na sprint 2 ou 3).

## Complemento e expansão (sprints 6–9) — código novo

| ID | US | Sprint | O que criar em `app/` (não existe na referência) |
|---|---|---|---|
| F03 | US03 | 6 | Valor `motorista` no CHECK, `PERFIS_VALIDOS`, select de usuários |
| F04 | US04 | 6 | `requirePerfil` (ou equivalente) na API; `ProtectedRoute` + `Sidebar` por perfil |
| F12 | US12 | 6 | Recusar `concluido` se equipamento sem destinação |
| F17 | US17 | 7 | Tabelas rota/parada; CRUD; tela do Marcos |
| F18 | US18 | 7 | Atribuir `usuario` motorista à rota (manual) |
| F19 | US19 | 8 | GET rota do dia filtrada pelo usuário logado; tela na base |
| F20 | US20 | 8 | Status `recolhido` / `nao_recolhido` / `parcial` |
| F10 | US10 | 9 | `PUT /equipamentos/:id` + tela de edição |
| F16 | US16 | 9 | Rota e motorista no PDF quando existirem |
| F21 | US21 | 9 | Indicador de coletas no dashboard / lista do gestor |

Detalhe operacional: `sprint-01.md` … `sprint-09.md`.
