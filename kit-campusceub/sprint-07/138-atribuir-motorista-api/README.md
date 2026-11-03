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

Os dois arquivos partem do que está na `main` depois do merge da #136 (PR #144): `salvarRota` para POST e PUT, `carregarRotas`, `inteiroPositivo`, `dataValida`, `normalizarParadas`, o `router.use` de perfil e o `router.param('id')`. Nada disso muda. A pasta só acrescenta `atribuirMotorista` no controller e `router.patch('/:id/motorista', ...)` nas rotas. Só administrador e gestor chamam. Só aceita usuário com perfil `motorista`. O PUT da rota continua sem mexer no motorista. Sem algoritmo. Sem tela.

**Antes de copiar:** depois de `git checkout main && git pull`, confira que o `rotaController.js` e o `rotaRoutes.js` da `main` exportam e usam `salvarRota` (código do PR #144). Se ainda aparecer `criarRota` ou `atualizarRota`, pare e avise o Code Review: copiar esta pasta por cima de outro arquivo apaga as validações da rota.

## PR

Título: `feat: atribui motorista a rota manualmente`

```text
Closes #138

PATCH /rotas/:id/motorista atribui na mão um usuário com perfil motorista. motorista_id null remove a atribuição. Técnico, gestor, auditor ou admin no campo motorista_id → 400. Rota inexistente → 404.

Como validar: criar uma rota, PATCH com id de motorista → 200. PATCH com id de tecnico → 400. PATCH com null → 200 e a rota fica sem motorista. CRUD /rotas continua.
```

## Como validar

- PATCH com `motorista_id` de perfil `motorista` → 200, resposta `{ message, rota }` com `motorista_id` e `motorista_nome`.
- PATCH com técnico, gestor, auditor ou admin → 400.
- PATCH com id de usuário que não existe, motorista inativo, texto ou campo ausente → 400.
- `motorista_id: null` remove a atribuição → 200.
- PATCH em rota que não existe → 404. ID inválido na URL → 400.
- Técnico, auditor ou motorista chamando o PATCH → 403.
- PUT da rota não muda o motorista. GET `/rotas` continua listando. Sem tela. Sem GPS.
