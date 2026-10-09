# Task — Filtrar menu e rotas por perfil

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/126 |
| Quem | Eduardo |
| PBI | [#30](https://github.com/CAMPUSCEUB/EcoTrack/issues/30) US04 — um único pai |
| Milestone | Sprint 06 - Motorista, permissões e F12 |
| Branch | `feature/126-tela-permissoes` |
| Commit | `feat: filtra menu e rotas por perfil` |
| Destino | só `src/frontend` |
| Depende de | merge da API de permissão |

A issue #126 já existe. Não crie outra. Pode ir em paralelo com a #125 depois do merge da #123.

## O que copiar (sobrescrever)

- `src/frontend/src/auth/acesso.js` (novo)
- `src/frontend/src/components/ProtectedRoute.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/App.jsx`

`ProtectedRoute` aceita lista de perfis. O menu deixa de ser a mesma lista para todos. Motorista vê só o Dashboard. Auditor não vê Usuários nem cadastro de agência. Sem tela de rota.

## PR

Título: `feat: filtra menu e rotas por perfil`

```text
Closes #126

O menu e as rotas seguem o perfil do usuário logado.

Como validar: logar como auditor — não aparece Usuários; POST de agência continua bloqueado na API. Logar como motorista — só Dashboard.
```

## Como validar

- Auditor não vê o item Usuários. Abrir `/usuarios` redireciona para `/`.
- Motorista vê só Dashboard.
- Admin continua vendo o menu inteiro.
- Sem tela de rota.
