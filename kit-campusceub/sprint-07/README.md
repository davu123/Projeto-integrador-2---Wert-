# Sprint 07 — Rotas e atribuição manual

Milestone: **Sprint 07 - Rotas e atribuição de motorista**. Período oficial: 20/10/2026 a 02/11/2026.

Uma pasta = uma Task = uma branch = um PR. Cada Task tem **um** PBI pai. Um PBI tem tantas Tasks quantas o escopo pedir. Copie **só** o `src/` da pasta para o `src/` do EcoTrack.

Não criar issue nova: #136–#139 já existem. Não juntar US17 e US18 na mesma Task.

**Davi** só API. **Eduardo** só tela. Começar **depois** do merge da Sprint 06. Código **novo**: não há fonte na `referencia/` para esta sprint.

## Ordem

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [136-rotas-api](136-rotas-api/README.md) | [#136](https://github.com/CAMPUSCEUB/EcoTrack/issues/136) | [US17 #43](https://github.com/CAMPUSCEUB/EcoTrack/issues/43) | Davi | `feature/136-rotas-api` | `feat: cadastra rotas de coleta na api` | Sprint 06 |
| 2 | [138-atribuir-motorista-api](138-atribuir-motorista-api/README.md) | [#138](https://github.com/CAMPUSCEUB/EcoTrack/issues/138) | [US18 #44](https://github.com/CAMPUSCEUB/EcoTrack/issues/44) | Davi | `feature/138-atribuir-motorista-api` | `feat: atribui motorista a rota manualmente` | #136 e #122 |
| 3 | [137-tela-rotas](137-tela-rotas/README.md) | [#137](https://github.com/CAMPUSCEUB/EcoTrack/issues/137) | [US17 #43](https://github.com/CAMPUSCEUB/EcoTrack/issues/43) | Eduardo | `feature/137-tela-rotas` | `feat: adiciona tela de planejamento de rotas` | #136 |
| 4 | [139-tela-atribuir-motorista](139-tela-atribuir-motorista/README.md) | [#139](https://github.com/CAMPUSCEUB/EcoTrack/issues/139) | [US18 #44](https://github.com/CAMPUSCEUB/EcoTrack/issues/44) | Eduardo | `feature/139-tela-atribuir-motorista` | `feat: atribui motorista na tela de rotas` | #138 e #137 |

A API de rotas vem **antes** da API de atribuição: as duas alteram `rotaController.js` e `rotaRoutes.js`. O `app.js` só entra na primeira. A tela de rotas pode ir em paralelo com a API de atribuição, depois da API de rotas. A tela de atribuição espera as duas: o select vive na mesma `RoutesPage.jsx`.

Features: F17 ([#22](https://github.com/CAMPUSCEUB/EcoTrack/issues/22)) só nas Tasks da US17; F18 ([#23](https://github.com/CAMPUSCEUB/EcoTrack/issues/23)) só nas Tasks da US18. O PR fecha a Task. O PBI e a Feature fecham manualmente quando as Tasks daquele PBI estiverem na `main`.

## O que não fazer

- Não começar estas Tasks antes do merge da Sprint 06.
- Não juntar US17 e US18 na mesma Task.
- Não criar issue nova: #136–#139 já existem.
- Não usar `feat(7.1)`.
- Não misturar API e tela no mesmo PR.
- Não copiar GPS, mapa, otimização, tela do Paulo, status de recolhimento, `PUT` de equipamento nem rota/motorista no PDF.
- Não abrir o PR sem `Closes #<n>` no corpo.
