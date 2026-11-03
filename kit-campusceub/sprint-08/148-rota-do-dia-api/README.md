# Task — Consultar a rota do dia na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/148 |
| Quem | Davi |
| PBI | [#45](https://github.com/CAMPUSCEUB/EcoTrack/issues/45) US19 — um único pai |
| Milestone | Sprint 08 - Rota do dia e recolhimento |
| Branch | `feature/148-rota-do-dia-api` |
| Commit | `feat: devolve a rota do dia do motorista na api` |
| Destino | só `src/backend` |
| Depende de | merge da Sprint 07 |

A issue #148 já existe. Não crie outra. Esta Task vem **antes** da API de recolhimento: as duas alteram `rotaController.js` e `rotaRoutes.js`.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que o `rotaController.js` da `main` tem `salvarRota`, `carregarRotas` e `atribuirMotorista`, e que o `rotaRoutes.js` tem `router.patch('/:id/motorista', ...)`. Se faltar algum, pare e avise o Code Review: copiar esta pasta por cima de outro arquivo apaga código da Sprint 07.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/rotaController.js`
- `src/backend/src/routes/rotaRoutes.js`

Os dois arquivos são os da `main` mais o bloco novo. Nada do que já existe muda.

- Controller: `listarMinhasRotas` devolve as rotas do usuário logado (`req.usuario.id`) na data pedida, com as paradas em ordem. `GET /rotas/minha?data=AAAA-MM-DD`. Sem `data`, usa o dia de hoje no horário de Brasília. Data inválida → 400. Devolve uma lista, que pode vir vazia.
- Rotas: `router.get('/minha', authMiddleware, requirePerfil('motorista'), ...)` fica **antes** do `router.use` de administrador e gestor. Se ficar depois, o motorista recebe 403.

Só o perfil `motorista` chama. Sem tela. Sem status de recolhimento. Sem GPS.

## PR

Título: `feat: devolve a rota do dia do motorista na api`

```text
Closes #148

GET /rotas/minha?data=AAAA-MM-DD devolve as rotas atribuídas ao motorista logado naquela data, com paradas em ordem. Só perfil motorista.

Como validar: gestor cria uma rota para hoje e atribui o motorista. Login do motorista, GET /rotas/minha → a rota aparece. Outro motorista → lista vazia. Gestor no /rotas/minha → 403.
```

## Como validar

- Motorista com rota atribuída hoje: `GET /rotas/minha` → 200 com a rota e as paradas em ordem.
- `GET /rotas/minha?data=` de outro dia traz só as rotas daquele dia. Dia sem rota → `[]`.
- Rota de outro motorista não aparece.
- `?data=2026-02-30` → 400.
- Gestor, administrador, técnico ou auditor no `/rotas/minha` → 403. Sem token → 401.
- Motorista no `GET /rotas` ou no `GET /rotas/:id` continua 403.
- O CRUD de rotas e o `PATCH /rotas/:id/motorista` continuam iguais para o gestor.
