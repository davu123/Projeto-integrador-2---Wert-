# Task — Perfil motorista na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/122 |
| Quem | Davi |
| PBI | [#29](https://github.com/CAMPUSCEUB/EcoTrack/issues/29) US03 — um único pai |
| Milestone | Sprint 06 - Motorista, permissões e F12 |
| Branch | `feature/122-perfil-motorista-api` |
| Commit | `feat: inclui perfil motorista no cadastro` |
| Destino | só `src/backend` |
| Depende de | merge da Sprint 05 |

A issue #122 já existe. Não crie outra. Pode ir em paralelo com a #123 e a #124.

## O que copiar (sobrescrever)

- `src/backend/src/config/schema.js`
- `src/backend/src/controllers/userController.js`

Inclui `motorista` no `CK_usuario_perfil` (CREATE e ALTER idempotente) e em `PERFIS_VALIDOS`. Sem tela. Sem `requirePerfil`.

## PR

Título: `feat: inclui perfil motorista no cadastro`

```text
Closes #122

O cadastro de usuário aceita o perfil motorista. O CHECK do banco e o PERFIS_VALIDOS passam a incluir motorista.

Como validar: POST /usuarios com perfil motorista e token de admin. Perfil inválido continua 400.
```

## Como validar

- POST `/usuarios` com `perfil: "motorista"` cria o usuário.
- `PERFIS_VALIDOS` e `CK_usuario_perfil` incluem `motorista`.
- Sem tela. Sem middleware de perfil.
