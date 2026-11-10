# Sprint 09 — Fechamento da visão

Milestone: **Sprint 09 - Fechamento da visão**. Período oficial: 17/11/2026 a 01/12/2026.

Uma pasta = uma Task = uma branch = um PR. Cada Task tem **um** PBI pai. Um PBI tem tantas Tasks quantas o escopo pedir. Copie **só** o `src/` da pasta para o `src/` do EcoTrack.

Não criar issue nova: #158–#161 já existem. Não juntar US10, US16 e US21 na mesma Task.

**Davi** só API. **Eduardo** só tela. Começar **depois** do merge da Sprint 08. Os arquivos partem do que está na `main` depois da Sprint 08 (rota do dia e recolhimento).

## Ordem

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [158-editar-equipamento-api](158-editar-equipamento-api/README.md) | [#158](https://github.com/CAMPUSCEUB/EcoTrack/issues/158) | [US10 #36](https://github.com/CAMPUSCEUB/EcoTrack/issues/36) | Davi | `feature/158-editar-equipamento-api` | `feat: edita equipamento na api` | Sprint 08 |
| 1 | [159-rota-no-pdf-api](159-rota-no-pdf-api/README.md) | [#159](https://github.com/CAMPUSCEUB/EcoTrack/issues/159) | [US16 #42](https://github.com/CAMPUSCEUB/EcoTrack/issues/42) | Davi | `feature/159-rota-no-pdf-api` | `feat: inclui rota e motorista no pdf do lote` | Sprint 08 |
| 1 | [161-tela-recolhimento-rotas](161-tela-recolhimento-rotas/README.md) | [#161](https://github.com/CAMPUSCEUB/EcoTrack/issues/161) | [US21 #47](https://github.com/CAMPUSCEUB/EcoTrack/issues/47) | Eduardo | `feature/161-tela-recolhimento-rotas` | `feat: mostra o recolhimento por rota na tela de rotas` | Sprint 08 |
| 2 | [160-tela-editar-equipamento](160-tela-editar-equipamento/README.md) | [#160](https://github.com/CAMPUSCEUB/EcoTrack/issues/160) | [US10 #36](https://github.com/CAMPUSCEUB/EcoTrack/issues/36) | Eduardo | `feature/160-tela-editar-equipamento` | `feat: edita equipamento na listagem` | #158 |

Quem mexe em cada arquivo:

| Arquivo | #158 | #159 | #160 | #161 |
|---|---|---|---|---|
| `backend/src/controllers/equipmentController.js` | altera | | | |
| `backend/src/routes/equipmentRoutes.js` | altera | | | |
| `backend/src/controllers/reportController.js` | | altera | | |
| `frontend/src/services/equipmentApi.js` | | | altera | |
| `frontend/src/pages/EquipmentListPage.jsx` | | | altera | |
| `frontend/src/pages/RoutesPage.jsx` | | | | altera |

Nenhum arquivo é alterado por duas Tasks. A #158, a #159 e a #161 podem ir em paralelo desde o primeiro dia. A #160 espera o merge da #158, porque a tela chama o `PUT /equipamentos/:id`. O Davi faz a #158 e a #159 em branches separadas, cada uma saindo da `main`.

- **US10**: o `PUT /equipamentos/:id` edita tipo, marca, modelo, número de série e estado, com as regras e os perfis do cadastro (administrador, técnico e gestor). O lote não muda. A edição fica na própria listagem, sem rota nova no `App.jsx`.
- **US16**: o PDF do lote mostra a rota mais recente com motorista que tem uma parada do lote: número, data e motorista. Sem rota assim, o PDF sai como antes. Só API.
- **US21**: a tela de rotas mostra, por rota, quantas paradas foram recolhidas, parciais, não recolhidas e pendentes. Só tela, sobre o `GET /rotas` que já existe.

Features: F10 ([#15](https://github.com/CAMPUSCEUB/EcoTrack/issues/15)) só nas Tasks da US10; F16 ([#21](https://github.com/CAMPUSCEUB/EcoTrack/issues/21)) só na Task da US16; F21 ([#26](https://github.com/CAMPUSCEUB/EcoTrack/issues/26)) só na Task da US21. O PR fecha a Task. O PBI e a Feature fecham manualmente quando as Tasks daquele PBI estiverem na `main`.

## O que não fazer

- Não começar estas Tasks antes do merge da Sprint 08.
- Não juntar US10, US16 e US21 na mesma Task.
- Não criar issue nova: #158–#161 já existem.
- Não usar `feat(9.1)`.
- Não misturar API e tela no mesmo PR.
- Não criar rota `/equipamentos/:id/editar` no `App.jsx`.
- Não mexer no `services/reportPdfService.js`.
- Não copiar `DELETE` de equipamento, trava de lote concluído, status de recolhimento no PDF, indicador de coleta no dashboard, mapa ou GPS.
- Não abrir o PR sem `Closes #<n>` no corpo.
