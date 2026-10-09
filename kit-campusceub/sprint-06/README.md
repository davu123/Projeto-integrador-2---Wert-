# Sprint 06 — Motorista, permissões e conformidade

Milestone: [Sprint 06 - Perfis, permissões e consistência](https://github.com/CAMPUSCEUB/EcoTrack/milestone/7). Período oficial: 06/10/2026 a 19/10/2026.

Uma pasta = uma Task = uma issue = uma branch = um PR. Cada Task tem **um** PBI pai. Um PBI tem tantas Tasks quantas o escopo pedir. Copie **só** o `src/` da pasta para o `src/` do EcoTrack. No PR, o corpo traz `Closes #<n>` do README.

Não juntar US03, US04 e US12 na mesma Task. Não criar issue nova: #122–#126 já existem.

**Davi** só API. **Eduardo** só tela. Começar **depois** do merge da Sprint 05. Código **novo**: não há fonte na `referencia/` para esta sprint.

## Ordem

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1a | [122-perfil-motorista-api](122-perfil-motorista-api/README.md) | [#122](https://github.com/CAMPUSCEUB/EcoTrack/issues/122) | [US03 #29](https://github.com/CAMPUSCEUB/EcoTrack/issues/29) | Davi | `feature/122-perfil-motorista-api` | `feat: inclui perfil motorista no cadastro` | Sprint 05 |
| 1b | [123-permissao-api](123-permissao-api/README.md) | [#123](https://github.com/CAMPUSCEUB/EcoTrack/issues/123) | [US04 #30](https://github.com/CAMPUSCEUB/EcoTrack/issues/30) | Davi | `feature/123-permissao-api` | `feat: restringe rotas da api por perfil` | Sprint 05 |
| 1c | [124-concluir-lote-api](124-concluir-lote-api/README.md) | [#124](https://github.com/CAMPUSCEUB/EcoTrack/issues/124) | [US12 #38](https://github.com/CAMPUSCEUB/EcoTrack/issues/38) | Davi | `feature/124-concluir-lote-api` | `feat: impede concluir lote sem destinacao` | #83 e #97 |
| 2a | [125-tela-perfil-motorista](125-tela-perfil-motorista/README.md) | [#125](https://github.com/CAMPUSCEUB/EcoTrack/issues/125) | [US03 #29](https://github.com/CAMPUSCEUB/EcoTrack/issues/29) | Eduardo | `feature/125-tela-perfil-motorista` | `feat: adiciona motorista no select de usuarios` | #122 |
| 2b | [126-tela-permissoes](126-tela-permissoes/README.md) | [#126](https://github.com/CAMPUSCEUB/EcoTrack/issues/126) | [US04 #30](https://github.com/CAMPUSCEUB/EcoTrack/issues/30) | Eduardo | `feature/126-tela-permissoes` | `feat: filtra menu e rotas por perfil` | #123 |

As três APIs podem ir em paralelo: não alteram o mesmo arquivo. As duas telas podem ir em paralelo depois das suas APIs. US12 não tem tela: o botão Concluir da Sprint 03 já mostra o 400.

A API de permissão e a de concluir lote mexem em arquivos diferentes (`*Routes.js` vs `loteController.js`). Podem mergear em qualquer ordem.

Features: F03 ([#8](https://github.com/CAMPUSCEUB/EcoTrack/issues/8)) só nas Tasks da US03; F04 ([#9](https://github.com/CAMPUSCEUB/EcoTrack/issues/9)) só nas Tasks da US04; F12 ([#17](https://github.com/CAMPUSCEUB/EcoTrack/issues/17)) só na Task da US12. O PR fecha a Task. O PBI e a Feature fecham manualmente quando as Tasks daquele PBI estiverem na `main`.

## Matriz (F04)

| Recurso | admin | gestor | tecnico | auditor | motorista |
|---|---|---|---|---|---|
| Dashboard | sim | sim | sim | sim | sim (menu mínimo) |
| Agências (tela / escrita) | sim | sim | não | não | não |
| Agências GET | sim | sim | sim | sim | não |
| Usuários (tela / escrita) | sim | não | não | não | não |
| Usuários GET | sim | sim | sim | sim | não |
| Lotes / equipamentos / destinação GET | sim | sim | sim | sim | não |
| Lotes / equipamentos / destinação escrita | sim | sim | sim | não | não |
| Relatórios GET e gerar PDF | sim | sim | não | sim | não |

## O que não fazer

- Não começar estas Tasks antes do merge da Sprint 05.
- Não juntar US03, US04 e US12 na mesma Task.
- Não criar issue nova: #122–#126 já existem.
- Não usar `feat(6.1)`.
- Não misturar API e tela no mesmo PR.
- Não copiar rota, parada, atribuição de motorista, tela do Paulo, GPS, `PUT` de equipamento nem indicador de coleta.
- Não abrir o PR sem `Closes #<n>` no corpo.
