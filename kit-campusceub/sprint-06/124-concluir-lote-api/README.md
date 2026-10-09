# Task — Não concluir lote sem destinação

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/124 |
| Quem | Davi |
| PBI | [#38](https://github.com/CAMPUSCEUB/EcoTrack/issues/38) US12 — um único pai |
| Milestone | Sprint 06 - Motorista, permissões e F12 |
| Branch | `feature/124-concluir-lote-api` |
| Commit | `feat: impede concluir lote sem destinacao` |
| Destino | só `src/backend` |
| Depende de | merge da #83 (`PATCH /lotes/:id/status`) e da #97 (tabela `destinacao`) |

A issue #124 já existe. Não crie outra. Pode ir em paralelo com a #122 e a #123: esta pasta só copia `loteController.js`.

Sem tela: o botão Concluir da Sprint 03 já exibe o erro da API.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/loteController.js`

Se o status alvo é `concluido`, todos os equipamentos do lote precisam ter destinação; senão 400. A checagem vale no `PATCH /lotes/:id/status` e no `PUT /lotes/:id`, para o PUT não furar a regra.

## PR

Título: `feat: impede concluir lote sem destinacao`

```text
Closes #124

O lote não conclui se algum equipamento estiver sem destinação.

Como validar: PATCH /lotes/:id/status com concluido num lote que tem item sem destinação → 400. Com destinação em todos → 200.
```

## Como validar

- PATCH `concluido` com equipamento sem destinação → 400.
- PATCH `concluido` com destinação em todos → 200.
- PUT com `status: "concluido"` segue a mesma regra.
- `atualizarStatusLote` consulta `destinacao`.
- Sem tela. Sem PDF.
