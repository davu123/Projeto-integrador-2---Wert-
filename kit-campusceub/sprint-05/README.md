# Sprint 05 — Dashboard e arquivo de PDFs

Milestone: [Sprint 05 - Dashboard e arquivo de PDFs](https://github.com/CAMPUSCEUB/EcoTrack/milestone/6). Período oficial: 29/09/2026 a 05/10/2026.

Uma pasta = uma Task = uma issue = uma branch = um PR. Cada Task tem **um** PBI pai. Um PBI tem tantas Tasks quantas o escopo pedir. Aqui são duas histórias, e cada uma se divide em API e tela porque são escopos e papéis diferentes. Copie **só** o `src/` da pasta para o `src/` do EcoTrack. No PR, o corpo traz `Closes #<n>` do README.

Não juntar US13 e US15 na mesma Task. Não criar issue nova: #111–#114 já existem.

**Davi** só API. **Eduardo** só tela. A Sprint 04 já está na `main`. Cada pasta ainda espera o merge indicado em Depende de.

## Ordem

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [111-listar-relatorios-api](111-listar-relatorios-api/README.md) | [#111](https://github.com/CAMPUSCEUB/EcoTrack/issues/111) | [US15 #41](https://github.com/CAMPUSCEUB/EcoTrack/issues/41) | Davi | `feature/111-listar-relatorios-api` | `feat: lista relatorios pdf na api` | #99 |
| 2 | [112-dashboard-api](112-dashboard-api/README.md) | [#112](https://github.com/CAMPUSCEUB/EcoTrack/issues/112) | [US13 #39](https://github.com/CAMPUSCEUB/EcoTrack/issues/39) | Davi | `feature/112-dashboard-api` | `feat: expoe indicadores no dashboard da api` | #111 e #97 |
| 3a | [113-tela-dashboard](113-tela-dashboard/README.md) | [#113](https://github.com/CAMPUSCEUB/EcoTrack/issues/113) | [US13 #39](https://github.com/CAMPUSCEUB/EcoTrack/issues/39) | Eduardo | `feature/113-tela-dashboard` | `feat: adiciona tela de dashboard` | #112 e #100 |
| 3b | [114-tela-listar-pdf](114-tela-listar-pdf/README.md) | [#114](https://github.com/CAMPUSCEUB/EcoTrack/issues/114) | [US15 #41](https://github.com/CAMPUSCEUB/EcoTrack/issues/41) | Eduardo | `feature/114-tela-listar-pdf` | `feat: lista e baixa pdfs na tela` | #111 e #100 |

A #111 vem **antes** da #112: as duas alteram `app.js`. Nela entra `GET /relatorios` **e** a publicação de `/uploads`, para o Baixar PDF não depender da US13. Depois da #111, a #114 e a #112 podem ir em paralelo. A #113 espera a #112.

Features: F13 ([#18](https://github.com/CAMPUSCEUB/EcoTrack/issues/18)) só nas Tasks da US13; F15 ([#20](https://github.com/CAMPUSCEUB/EcoTrack/issues/20)) só nas Tasks da US15. O PR fecha a Task. O PBI e a Feature fecham manualmente quando as Tasks daquele PBI estiverem na `main`.

## O que não fazer

- Não começar estas Tasks antes do merge da Sprint 04 que a pasta indica.
- Não juntar US13 e US15 na mesma Task.
- Não criar issue nova: #111–#114 já existem.
- Não usar `feat(5.1)`.
- Não misturar API e tela no mesmo PR.
- Não copiar rota, motorista, permissão por perfil nem `PUT` de equipamento.
- Não incluir indicador de coleta no dashboard (isso é da Sprint 09).
- Não abrir o PR sem `Closes #<n>` no corpo.
- Não publicar `/uploads` só no `app.js` do dashboard: a tela de download espera a API de listagem.
