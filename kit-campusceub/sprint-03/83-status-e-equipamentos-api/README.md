# Task #83 — Status do lote e equipamentos na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/83 |
| Quem | Eduardo (catch-up Sprint 03) |
| PBI | [#33](https://github.com/CAMPUSCEUB/EcoTrack/issues/33) US07; também cobre [#34](https://github.com/CAMPUSCEUB/EcoTrack/issues/34) US08 e [#35](https://github.com/CAMPUSCEUB/EcoTrack/issues/35) US09 |
| Milestone | Sprint 03 - Equipamentos e status |
| Branch | `feature/83-status-e-equipamentos-api` |
| Commit | `feat: atualiza status do lote e cadastra equipamentos na api` |
| Destino | só `src/backend` |
| Depende de | merge da #80 (API de lotes) |

Rebaseie em `main` **depois** do merge da #80 (e do restante da Sprint 02, se ainda aberto).

## O que copiar (sobrescrever)

- `src/backend/src/controllers/loteController.js`
- `src/backend/src/routes/loteRoutes.js`
- `src/backend/src/controllers/equipmentController.js` (novo)
- `src/backend/src/routes/equipmentRoutes.js` (novo)
- `src/backend/src/app.js`
- `src/backend/src/config/schema.js`

JWT em `/lotes/:id/status` e em `/equipamentos`. Tabela `dbo.equipamento`. GET e POST de equipamentos **sem** PUT. PATCH de status **sem** regra de destinação.

## PR

Título: `feat: atualiza status do lote e cadastra equipamentos na api`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #83

PATCH /lotes/:id/status (pendente, em_triagem, concluido) e GET/POST /equipamentos. Sem PUT de equipamento. Sem destinação.

Como validar: autenticar, criar lote, PATCH de status, POST de equipamento e GET da lista. equipmentRoutes.js só tem get e post.
```

## Como validar

- PATCH `/lotes/:id/status` com token; valores `pendente`, `em_triagem`, `concluido`.
- GET/POST `/equipamentos` com token.
- Sem token → 401.
- Sem tela. Sem destinação. Sem PUT.
