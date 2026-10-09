# Task — Perfil motorista no select de usuários

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/125 |
| Quem | Eduardo |
| PBI | [#29](https://github.com/CAMPUSCEUB/EcoTrack/issues/29) US03 — um único pai |
| Milestone | Sprint 06 - Motorista, permissões e F12 |
| Branch | `feature/125-tela-perfil-motorista` |
| Commit | `feat: adiciona motorista no select de usuarios` |
| Destino | só `src/frontend` |
| Depende de | merge da API de motorista |

A issue #125 já existe. Não crie outra. Pode ir em paralelo com a #126 depois do merge da #122.

Não copia `App.jsx` nem `Sidebar.jsx`.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/UsersPage.jsx`

O select de perfil ganha a opção Motorista.

## PR

Título: `feat: adiciona motorista no select de usuarios`

```text
Closes #125

A tela de usuários cadastra o perfil motorista.

Como validar: logar como admin, abrir Usuários, criar um motorista e vê-lo na lista.
```

## Como validar

- O select tem a opção `motorista`.
- Criar um usuário motorista pela tela.
- Sem filtro de menu.
