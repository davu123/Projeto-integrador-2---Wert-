# Sprint 03 — Equipamentos e status

Milestone: [Sprint 03 - Equipamentos e status](https://github.com/CAMPUSCEUB/EcoTrack/milestone/4)

Uma pasta = uma Task = uma issue = uma branch = um PR. Copie **só** o `src/` da pasta para o `src/` do EcoTrack. No PR, o corpo traz `Closes #<n>` do README.

Catch-up: **Eduardo** faz as duas Tasks, um PR por vez, **depois** do merge da Sprint 02. Siga **esta tabela**, não o grafo solto.

## Ordem

| Ordem | Pasta | Issue | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|
| 1 | [83-status-e-equipamentos-api](83-status-e-equipamentos-api/README.md) | [#83](https://github.com/CAMPUSCEUB/EcoTrack/issues/83) | Eduardo | `feature/83-status-e-equipamentos-api` | `feat: atualiza status do lote e cadastra equipamentos na api` | #80 (API de lotes) |
| 2 | [84-telas-status-e-equipamentos](84-telas-status-e-equipamentos/README.md) | [#84](https://github.com/CAMPUSCEUB/EcoTrack/issues/84) | Eduardo | `feature/84-telas-status-e-equipamentos` | `feat: adiciona telas de status do lote e equipamentos` | #83 e #82 |

A `#83` só precisa da API de lotes (`#80`). A `#84` sobrepõe a tela de lotes (`#82`) e chama o PATCH/POST da `#83`.

Pais: US07 ([#33](https://github.com/CAMPUSCEUB/EcoTrack/issues/33)), US08 ([#34](https://github.com/CAMPUSCEUB/EcoTrack/issues/34)) e US09 ([#35](https://github.com/CAMPUSCEUB/EcoTrack/issues/35)) nas duas Tasks.

## O que não fazer

- Não criar issue nova: #83 e #84 já existem.
- Não inventar nome de branch: copie o README.
- Não usar `feat(3.1)` — isso é só neste repositório de trabalho.
- Não misturar API e tela no mesmo PR.
- Não criar `src/` de novo: só copiar por cima do que a Sprint 02 já mergeou.
- Não copiar destinação, PDF, dashboard, `PUT /equipamentos/:id`, `newequipment.jsx` nem perfil `motorista`. Editar equipamento é da Sprint 09.
- Não recusar `concluido` por falta de destinação: isso é da Sprint 06 (F12).
- Não abrir o PR sem `Closes #<n>` no corpo.
