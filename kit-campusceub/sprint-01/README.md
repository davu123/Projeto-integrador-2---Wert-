# Sprint 01 — Login e agências

Milestone: [Sprint 01 - Login e agências](https://github.com/CAMPUSCEUB/EcoTrack/milestone/2)

Uma pasta = uma Task = uma issue = uma branch = um PR. Nas Tasks de código, copie **só** o `src/` da pasta para o `src/` do EcoTrack. No PR, o corpo traz `Closes #<n>` do README. Na #56, siga o README da pasta (PDF, sem `src/`).

## Ordem

| Ordem | Pasta | Issue | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|
| 0 | [55-cria-esqueleto-src](55-cria-esqueleto-src/README.md) | [#55](https://github.com/CAMPUSCEUB/EcoTrack/issues/55) | — (já mergeada) | `feature/55-cria-esqueleto-src` | `chore: cria esqueleto docker em src` | merge da Sprint 00 (#48) e do planejamento (#49), se ainda abertos |
| 1 | [50-auth-login-api](50-auth-login-api/README.md) | [#50](https://github.com/CAMPUSCEUB/EcoTrack/issues/50) | Artur | `feature/50-auth-login-api` | `feat: autentica usuario com jwt` | #55 |
| 2a | [51-crud-agencias-api](51-crud-agencias-api/README.md) | [#51](https://github.com/CAMPUSCEUB/EcoTrack/issues/51) | Artur | `feature/51-crud-agencias-api` | `feat: cadastra agencias na api` | #50 |
| 2b | [52-tela-login-sessao](52-tela-login-sessao/README.md) | [#52](https://github.com/CAMPUSCEUB/EcoTrack/issues/52) | Artur | `feature/52-tela-login-sessao` | `feat: adiciona tela de login e sessao` | #50 |
| 3 | [53-tela-agencias](53-tela-agencias/README.md) | [#53](https://github.com/CAMPUSCEUB/EcoTrack/issues/53) | Artur | `feature/53-tela-agencias` | `feat: adiciona tela de agencias` | #51 e #52 |
| docs | [56-pdfs-lean-inception](56-pdfs-lean-inception/README.md) | [#56](https://github.com/CAMPUSCEUB/EcoTrack/issues/56) | Artur | `docs/56-pdfs-lean-inception` | `docs: publica pdfs formais da lean inception` | depois de #50–#53 |

Catch-up sequencial (treino do workflow): **Artur** faz `#50`–`#53`, um PR por Task. `#51` e `#52` podem ir em paralelo depois da `#50` se ele preferir; a `#53` espera as duas. A `#56` espera o fim das Tasks de código desta sprint.

Pais: US01 ([#27](https://github.com/CAMPUSCEUB/EcoTrack/issues/27)) nas Tasks #50 e #52; US05 ([#31](https://github.com/CAMPUSCEUB/EcoTrack/issues/31)) nas Tasks #51 e #53. A #55 não tem PBI (infra). A #56 não tem PBI (documentação).

## O que não fazer

- Não criar issue nova: use o número do README (`Closes #<n>`).
- Não inventar nome de branch.
- Não usar `feat(1.1)` — isso é só neste repositório de trabalho.
- Não misturar API e tela no mesmo PR.
- Não criar `src/` de novo nas Tasks #50–#53: só copiar por cima.
- Não copiar Dashboard, usuários, lotes, equipamentos.
- Não abrir o PR sem `Closes #<n>` no corpo.
- Na #56: não versionar Markdown das etapas no EcoTrack; só PDF.
