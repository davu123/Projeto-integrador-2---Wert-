# Sprint 02 — Usuários e lotes

Milestone: [Sprint 02 - Usuários e lotes](https://github.com/CAMPUSCEUB/EcoTrack/milestone/3)

Uma pasta = uma Task = uma issue = uma branch = um PR. Copie **só** o `src/` da pasta para o `src/` do EcoTrack. No PR, o corpo traz `Closes #<n>` do README.

Catch-up: **Davi** faz as quatro Tasks, um PR por vez, **depois** do merge da Sprint 01.

## Ordem

| Ordem | Pasta | Issue | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|
| 1 | [79-crud-usuarios-api](79-crud-usuarios-api/README.md) | [#79](https://github.com/CAMPUSCEUB/EcoTrack/issues/79) | Davi | `feature/79-crud-usuarios-api` | `feat: cadastra usuarios na api` | merge da Sprint 01 |
| 2a | [80-crud-lotes-api](80-crud-lotes-api/README.md) | [#80](https://github.com/CAMPUSCEUB/EcoTrack/issues/80) | Davi | `feature/80-crud-lotes-api` | `feat: cadastra lotes na api` | #51 (agências na API) |
| 2b | [81-tela-usuarios](81-tela-usuarios/README.md) | [#81](https://github.com/CAMPUSCEUB/EcoTrack/issues/81) | Davi | `feature/81-tela-usuarios` | `feat: adiciona tela de usuarios` | #79 |
| 3 | [82-tela-lotes](82-tela-lotes/README.md) | [#82](https://github.com/CAMPUSCEUB/EcoTrack/issues/82) | Davi | `feature/82-tela-lotes` | `feat: adiciona tela de lotes` | #80, #81 e #53 |

No catch-up, Davi segue **esta tabela**, não o grafo solto. `#80` e `#81` podem ir em paralelo depois da Sprint 01 (`#80` só precisa da `#51`; `#81` precisa da `#79`). A `#82` espera API de lotes, tela de usuários (`userService`) e tela de agências (`agencyService`).

Pais: US02 ([#28](https://github.com/CAMPUSCEUB/EcoTrack/issues/28)) nas Tasks #79 e #81; US06 ([#32](https://github.com/CAMPUSCEUB/EcoTrack/issues/32)) nas Tasks #80 e #82.

## O que não fazer

- Não criar issue nova: #79–#82 já existem.
- Não inventar nome de branch: copie o README.
- Não usar `feat(2.1)` — isso é só neste repositório de trabalho.
- Não misturar API e tela no mesmo PR.
- Não criar `src/` de novo: só copiar por cima do que a Sprint 01 já mergeou.
- Não copiar `PATCH /lotes/:id/status`, botão Concluir, DELETE de lote, equipamentos, destinação, dashboard nem perfil `motorista`. O ciclo de status é da Sprint 03 (#83/#84).
- Não abrir o PR sem `Closes #<n>` no corpo.
