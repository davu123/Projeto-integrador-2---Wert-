# Task #53 — Tela de agências

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/53 |
| Quem | Artur (catch-up Sprint 01) |
| PBI | #31 US05 |
| Milestone | Sprint 01 - Login e agências |
| Branch | `feature/53-tela-agencias` |
| Commit | `feat: adiciona tela de agencias` |
| Destino | só `src/frontend` |
| Depende de | merge da #51 e da #52 |

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/pages/AgenciesPage.jsx` (novo)
- `src/frontend/src/services/agencyService.js` (novo)

## PR

Título: `feat: adiciona tela de agencias`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #53

Página /agencias protegida, item no menu e CRUD na tela.

Como validar: logar, abrir Agências e criar/editar/listar/excluir no navegador.
```

## Como validar

- Menu exibe Agências.
- CRUD no browser com o usuário seed.
