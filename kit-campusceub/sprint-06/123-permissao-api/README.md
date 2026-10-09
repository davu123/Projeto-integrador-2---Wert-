# Task — Autorização por perfil na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/123 |
| Quem | Davi |
| PBI | [#30](https://github.com/CAMPUSCEUB/EcoTrack/issues/30) US04 — um único pai |
| Milestone | Sprint 06 - Motorista, permissões e F12 |
| Branch | `feature/123-permissao-api` |
| Commit | `feat: restringe rotas da api por perfil` |
| Destino | só `src/backend` |
| Depende de | merge da Sprint 05 |

A issue #123 já existe. Não crie outra. Pode ir em paralelo com a #122 e a #124.

## O que copiar (sobrescrever)

- `src/backend/src/middlewares/requirePerfil.js` (novo)
- `src/backend/src/routes/userRoutes.js`
- `src/backend/src/routes/agencyRoutes.js`
- `src/backend/src/routes/loteRoutes.js`
- `src/backend/src/routes/equipmentRoutes.js`
- `src/backend/src/routes/destinacaoRoutes.js`
- `src/backend/src/routes/reportRoutes.js`
- `src/backend/src/routes/dashboardRoutes.js`

Middleware lê `req.usuario.perfil`. Auditor só GET em agências/lotes/equipamentos/destinações; POST de usuários só admin. Relatórios (GET e gerar) para admin, gestor e auditor. Motorista só GET `/dashboard`. A matriz está no comentário de `requirePerfil.js` e no README da sprint. Sem tela. Sem rota de coleta.

## PR

Título: `feat: restringe rotas da api por perfil`

```text
Closes #123

As rotas da API recusam operação fora do perfil do token.

Como validar: token de auditor em POST /agencias → 403; GET /lotes com o mesmo token → 200. POST /usuarios só com administrador.
```

## Como validar

- POST `/agencias` com auditor → 403.
- GET `/lotes` com auditor → 200.
- POST `/usuarios` com gestor → 403; com administrador → 201.
- GET `/dashboard` com motorista → 200; POST `/lotes` com motorista → 403.
- Sem tela.
