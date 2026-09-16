# Task #81 — Tela de usuários

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/81 |
| Quem | Davi (catch-up Sprint 02) |
| PBI | [#28](https://github.com/CAMPUSCEUB/EcoTrack/issues/28) US02 |
| Milestone | Sprint 02 - Usuários e lotes |
| Branch | `feature/81-tela-usuarios` |
| Commit | `feat: adiciona tela de usuarios` |
| Destino | só `src/frontend` |
| Depende de | merge da #79 |

Pode ir em paralelo com a #80 (lotes na API).

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/pages/UsersPage.jsx` (novo)
- `src/frontend/src/services/userService.js` (novo)

Rota `/usuarios`. Select de perfil **sem** `motorista`. Home continua placeholder.

## PR

Título: `feat: adiciona tela de usuarios`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #81

Página /usuarios protegida, item no menu e CRUD na tela. Sem perfil motorista.

Como validar: logar, abrir Usuários e criar/editar/ativar-inativar no navegador. O select não lista motorista.
```

## Como validar

- Menu exibe Usuários (além de Início e Agências).
- CRUD no browser com o usuário seed.
- Não há opção `motorista`.
