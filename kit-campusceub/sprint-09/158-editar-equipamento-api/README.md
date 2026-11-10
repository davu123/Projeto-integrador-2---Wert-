# Task — Editar equipamento na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/158 |
| Quem | Davi |
| PBI | [#36](https://github.com/CAMPUSCEUB/EcoTrack/issues/36) US10 — um único pai |
| Milestone | Sprint 09 - Fechamento da visão |
| Branch | `feature/158-editar-equipamento-api` |
| Commit | `feat: edita equipamento na api` |
| Destino | só `src/backend` |
| Depende de | merge da Sprint 08 |

A issue #158 já existe. Não crie outra.

Pode ir em paralelo com a API do PDF: as duas não mexem nos mesmos arquivos. A tela de edição espera esta Task.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que o `equipmentController.js` da `main` exporta `listarEquipamentos` e `cadastrarEquipamento`, e que o `equipmentRoutes.js` tem o `GET /` e o `POST /` com `requirePerfil`. Se estiver diferente, pare e avise o Code Review: copiar esta pasta por cima de outro arquivo apaga código.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/equipmentController.js`
- `src/backend/src/routes/equipmentRoutes.js`

Os dois arquivos são os da `main` mais o bloco novo. O `GET` e o `POST` não mudam.

- Controller: `atualizarEquipamento` edita `tipo`, `marca`, `modelo`, `numero_serie` e `estado`, com as mesmas regras do cadastro: `tipo`, `marca`, `modelo` e `estado` obrigatórios, `estado` em `bom`, `danificado` ou `inutilizavel`, número de série vazio vira `null`, número de série de outro equipamento → 409. Atualiza `atualizado_em`. Id inválido → 400. Equipamento que não existe → 404.
- O `lote_id` não muda. Se vier no corpo, é ignorado.
- Rotas: `router.put('/:id', authMiddleware, requirePerfil('administrador', 'tecnico', 'gestor'), atualizarEquipamento)`. Os mesmos perfis do `POST`.

Sem tela. Sem trava para lote concluído. Sem `DELETE`.

## PR

Título: `feat: edita equipamento na api`

```text
Closes #158

PUT /equipamentos/:id edita tipo, marca, modelo, número de série e estado, com as regras do cadastro. O lote não muda. Perfis administrador, tecnico e gestor.

Como validar: técnico edita o modelo de um equipamento → 200 e o GET /equipamentos mostra o novo modelo. Número de série de outro equipamento → 409. Auditor → 403.
```

## Como validar

- Técnico, gestor ou administrador: `PUT /equipamentos/1` com `tipo`, `marca`, `modelo`, `numero_serie` e `estado` → 200 com `{ message, equipamento }`.
- `GET /equipamentos` mostra os dados novos.
- Manter o próprio número de série → 200. Número de série de outro equipamento → 409.
- Número de série vazio → salva `null`.
- Sem `tipo`, `marca`, `modelo` ou `estado` → 400. Estado fora da lista → 400.
- `PUT /equipamentos/abc` ou `/0` → 400. Id que não existe → 404.
- `lote_id` diferente no corpo → o lote continua o mesmo.
- Auditor ou motorista → 403. Sem token → 401.
- O `POST /equipamentos` continua igual (201, 409 para série repetida).
