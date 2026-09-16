# Task #82 — Tela de lotes (sem ciclo de status)

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/82 |
| Quem | Davi (catch-up Sprint 02) |
| PBI | [#32](https://github.com/CAMPUSCEUB/EcoTrack/issues/32) US06 |
| Milestone | Sprint 02 - Usuários e lotes |
| Branch | `feature/82-tela-lotes` |
| Commit | `feat: adiciona tela de lotes` |
| Destino | só `src/frontend` |
| Depende de | merge da #80 e da #81 |

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/pages/LotsPage.jsx` (novo)
- `src/frontend/src/services/lotService.js` (novo)
- `src/frontend/src/utils/formatters.js` (novo)

Rota `/lotes`. Create grava status `pendente`. **Não** há botão de ciclo nem chamada a `/lotes/:id/status`.

## PR

Título: `feat: adiciona tela de lotes`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #82

Página /lotes protegida, item no menu e CRUD na tela. Status inicial pendente. Sem ciclo pendente → triagem → concluído.

Como validar: logar, abrir Lotes, criar um lote ligado a uma agência da Sprint 01 e editar. Não deve existir botão Concluir nem PATCH de status.
```

## Como validar

- Menu exibe Lotes.
- Criar/editar lote no browser (agência + técnico).
- Status aparece na lista; não há `atualizarStatusLote` no frontend.
