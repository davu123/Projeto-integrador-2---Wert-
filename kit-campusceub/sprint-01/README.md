# Sprint 01 — Login e agências

Milestone: [Sprint 01 - Login e agências](https://github.com/CAMPUSCEUB/EcoTrack/milestone/2)

Uma pasta = uma Task = uma branch = um PR. Copie **só** o `src/` da pasta da sua Task para o `src/` do EcoTrack.

## Ordem

| Ordem | Pasta | Issue | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|
| 0 | [55-cria-esqueleto-src](55-cria-esqueleto-src/README.md) | [#55](https://github.com/CAMPUSCEUB/EcoTrack/issues/55) | `feature/55-cria-esqueleto-src` | `chore: cria esqueleto docker em src` | merge da Sprint 00 (#48) e do planejamento (#49), se ainda abertos |
| 1 | [50-auth-login-api](50-auth-login-api/README.md) | [#50](https://github.com/CAMPUSCEUB/EcoTrack/issues/50) | `feature/50-auth-login-api` | `feat: autentica usuario com jwt` | #55 |
| 2a | [51-crud-agencias-api](51-crud-agencias-api/README.md) | [#51](https://github.com/CAMPUSCEUB/EcoTrack/issues/51) | `feature/51-crud-agencias-api` | `feat: cadastra agencias na api` | #50 |
| 2b | [52-tela-login-sessao](52-tela-login-sessao/README.md) | [#52](https://github.com/CAMPUSCEUB/EcoTrack/issues/52) | `feature/52-tela-login-sessao` | `feat: adiciona tela de login e sessao` | #50 |
| 3 | [53-tela-agencias](53-tela-agencias/README.md) | [#53](https://github.com/CAMPUSCEUB/EcoTrack/issues/53) | `feature/53-tela-agencias` | `feat: adiciona tela de agencias` | #51 e #52 |

#51 e #52 podem ir em paralelo **depois** do merge da #50.

Pais: US01 ([#27](https://github.com/CAMPUSCEUB/EcoTrack/issues/27)) nas Tasks #50 e #52; US05 ([#31](https://github.com/CAMPUSCEUB/EcoTrack/issues/31)) nas Tasks #51 e #53. A #55 não tem PBI (infra).

## O que não fazer

- Não usar `feat(1.1)` — isso é só neste repositório de trabalho.
- Não misturar API e tela no mesmo PR.
- Não criar `src/` de novo nas Tasks #50–#53: só copiar por cima.
- Não copiar Dashboard, usuários, lotes, equipamentos.
