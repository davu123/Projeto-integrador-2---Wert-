# Sprint 04 — Destinação e PDF

Milestone: [Sprint 04 - Destinação e PDF](https://github.com/CAMPUSCEUB/EcoTrack/milestone/5)

Uma pasta = uma Task = uma issue = uma branch = um PR. Cada Task tem **um** PBI pai. O PBI tem tantas Tasks quantas o escopo pedir. Nesta sprint o trabalho se divide em API e tela porque são escopos diferentes e papéis diferentes, não porque todo PBI tenha exatamente duas Tasks. Copie **só** o `src/` da pasta para o `src/` do EcoTrack. No PR, o corpo traz `Closes #<n>` do README.

Não juntar US11 e US14 na mesma Task. Não criar issue nova: #97–#100 já existem.

A partir desta sprint o código segue o papel: **Davi** só API, **Eduardo** só tela.

## Ordem

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [97-destinacao-api](97-destinacao-api/README.md) | [#97](https://github.com/CAMPUSCEUB/EcoTrack/issues/97) | [US11 #37](https://github.com/CAMPUSCEUB/EcoTrack/issues/37) | Davi | `feature/97-destinacao-api` | `feat: registra destinacao na api` | #83 |
| 2a | [98-tela-destinacao](98-tela-destinacao/README.md) | [#98](https://github.com/CAMPUSCEUB/EcoTrack/issues/98) | [US11 #37](https://github.com/CAMPUSCEUB/EcoTrack/issues/37) | Eduardo | `feature/98-tela-destinacao` | `feat: adiciona tela de destinacao` | #97 e #84 |
| 2b | [99-gerar-pdf-api](99-gerar-pdf-api/README.md) | [#99](https://github.com/CAMPUSCEUB/EcoTrack/issues/99) | [US14 #40](https://github.com/CAMPUSCEUB/EcoTrack/issues/40) | Davi | `feature/99-gerar-pdf-api` | `feat: gera pdf de conformidade do lote` | #97 |
| 3 | [100-tela-gerar-pdf](100-tela-gerar-pdf/README.md) | [#100](https://github.com/CAMPUSCEUB/EcoTrack/issues/100) | [US14 #40](https://github.com/CAMPUSCEUB/EcoTrack/issues/40) | Eduardo | `feature/100-tela-gerar-pdf` | `feat: adiciona geracao de pdf na tela` | #99 e #98 |

A #98 e a #99 podem ir em paralelo **depois** do merge da #97. A #100 espera as duas, porque o `App.jsx` acumula o menu.

Features: F11 ([#16](https://github.com/CAMPUSCEUB/EcoTrack/issues/16)) só nas Tasks da US11; F14 ([#19](https://github.com/CAMPUSCEUB/EcoTrack/issues/19)) só nas Tasks da US14. O PR fecha a Task (`Closes #<n>`). Não fecha o PBI nem a Feature: isso é manual, quando as Tasks daquele PBI estiverem na `main`.

## O que não fazer

- Não repetir o corte da Sprint 03 (várias histórias na mesma Task).
- Não criar issue nova: #97–#100 já existem.
- Não usar `feat(4.1)` — isso é só neste repositório de trabalho.
- Não misturar API e tela no mesmo PR.
- Não misturar US11 e US14 no mesmo PR.
- Não criar `src/` de novo: só copiar por cima do que a Sprint 03 já mergeou.
- Não copiar `GET /relatorios`, listagem/download de PDF, dashboard nem a regra de recusar `concluido` sem destinação (Sprint 06).
- Não abrir o PR sem `Closes #<n>` no corpo.
