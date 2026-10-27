# Task — Atribuir motorista à rota na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/138 |
| Quem | Davi |
| PBI | [#44](https://github.com/CAMPUSCEUB/EcoTrack/issues/44) US18 — um único pai |
| Milestone | Sprint 07 - Rotas e atribuição de motorista |
| Branch | `feature/138-atribuir-motorista-api` |
| Commit | `feat: atribui motorista a rota manualmente` |
| Destino | só `src/backend` |
| Depende de | merge da API de rotas e da #122 (perfil `motorista`) |

A issue #138 já existe. Não crie outra. **Depois** do merge da #136: as duas alteram o mesmo controller e as mesmas rotas. O `app.js` desta pasta **não** entra, para não brigar com o mount de `/rotas`.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/rotaController.js`
- `src/backend/src/routes/rotaRoutes.js`

O arquivo **repete** o CRUD da Task de rotas para o merge não apagar GET/POST/PUT/DELETE. Acrescenta `PATCH /rotas/:id/motorista`. Só aceita usuário com perfil `motorista`. Sem algoritmo. Sem tela.

## PR

Título: `feat: atribui motorista a rota manualmente`

```text
Closes #138

PATCH /rotas/:id/motorista atribui na mão um usuário com perfil motorista. Técnico ou gestor no campo motorista_id → 400.

Como validar: criar uma rota, PATCH com id de motorista → 200. PATCH com id de tecnico → 400. CRUD /rotas continua.
```

## Como validar

- PATCH com `motorista_id` de perfil `motorista` → 200.
- PATCH com técnico, gestor, auditor ou admin → 400.
- `motorista_id` nulo remove a atribuição.
- GET `/rotas` continua listando. Sem tela. Sem GPS.
