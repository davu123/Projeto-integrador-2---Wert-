# Sprint 08 — Rota do dia e recolhimento

Milestone: **Sprint 08 - Rota do dia e recolhimento**. Período oficial: 03/11/2026 a 16/11/2026.

Uma pasta = uma Task = uma branch = um PR. Cada Task tem **um** PBI pai. Um PBI tem tantas Tasks quantas o escopo pedir. Copie **só** o `src/` da pasta para o `src/` do EcoTrack.

Não criar issue nova: #148–#151 já existem. Não juntar US19 e US20 na mesma Task.

**Davi** só API. **Eduardo** só tela. Começar **depois** do merge da Sprint 07. Código novo. Os arquivos partem do que está na `main` depois da Sprint 07 (rotas, atribuição de motorista e tela de rotas).

## Ordem

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [148-rota-do-dia-api](148-rota-do-dia-api/README.md) | [#148](https://github.com/CAMPUSCEUB/EcoTrack/issues/148) | [US19 #45](https://github.com/CAMPUSCEUB/EcoTrack/issues/45) | Davi | `feature/148-rota-do-dia-api` | `feat: devolve a rota do dia do motorista na api` | Sprint 07 |
| 2 | [149-tela-rota-do-dia](149-tela-rota-do-dia/README.md) | [#149](https://github.com/CAMPUSCEUB/EcoTrack/issues/149) | [US19 #45](https://github.com/CAMPUSCEUB/EcoTrack/issues/45) | Eduardo | `feature/149-tela-rota-do-dia` | `feat: adiciona tela da rota do dia do motorista` | #148 |
| 3 | [150-status-recolhimento-api](150-status-recolhimento-api/README.md) | [#150](https://github.com/CAMPUSCEUB/EcoTrack/issues/150) | [US20 #46](https://github.com/CAMPUSCEUB/EcoTrack/issues/46) | Davi | `feature/150-status-recolhimento-api` | `feat: registra status de recolhimento da parada na api` | #148 |
| 4 | [151-tela-status-recolhimento](151-tela-status-recolhimento/README.md) | [#151](https://github.com/CAMPUSCEUB/EcoTrack/issues/151) | [US20 #46](https://github.com/CAMPUSCEUB/EcoTrack/issues/46) | Eduardo | `feature/151-tela-status-recolhimento` | `feat: marca recolhimento na tela da rota do dia` | #150 e #149 |

Quem mexe em cada arquivo:

| Arquivo | #148 | #149 | #150 | #151 |
|---|---|---|---|---|
| `backend/src/controllers/rotaController.js` | altera | | altera | |
| `backend/src/routes/rotaRoutes.js` | altera | | altera | |
| `backend/src/config/schema.js` | | | altera | |
| `frontend/src/App.jsx` | | altera | | |
| `frontend/src/auth/acesso.js` | | altera | | |
| `frontend/src/services/rotaService.js` | | altera | | altera |
| `frontend/src/pages/DriverRoutePage.jsx` | | cria | | altera |

A API da rota do dia vem **antes** da API de recolhimento: as duas alteram `rotaController.js` e `rotaRoutes.js`. Depois da #148, a #149 e a #150 podem ir em paralelo, porque não mexem nos mesmos arquivos. A #151 espera as duas: precisa do `PATCH` da #150 e altera a página e o service da #149.

O status de recolhimento fica na **parada** da rota (`recolhido`, `nao_recolhido` ou `parcial`). Só o motorista atribuído à rota marca. Depois que alguma parada tem status, a rota está começada e o gestor não mexe mais nela: `PUT /rotas/:id`, `DELETE /rotas/:id` e `PATCH /rotas/:id/motorista` devolvem 409. Na tela de rotas, os botões Atualizar e Excluir mostram essa mensagem. Rota sem nada marcado continua podendo ser editada, excluída e ter o motorista trocado.

Features: F19 ([#24](https://github.com/CAMPUSCEUB/EcoTrack/issues/24)) só nas Tasks da US19; F20 ([#25](https://github.com/CAMPUSCEUB/EcoTrack/issues/25)) só nas Tasks da US20. O PR fecha a Task. O PBI e a Feature fecham manualmente quando as Tasks daquele PBI estiverem na `main`.

## O que não fazer

- Não começar estas Tasks antes do merge da Sprint 07.
- Não juntar US19 e US20 na mesma Task.
- Não criar issue nova: #148–#151 já existem.
- Não usar `feat(8.1)`.
- Não misturar API e tela no mesmo PR.
- Não copiar GPS, mapa, otimização, tela do gestor para ver o recolhimento (US21, Sprint 09), status no lote nem rota/motorista no PDF.
- Não abrir o PR sem `Closes #<n>` no corpo.
