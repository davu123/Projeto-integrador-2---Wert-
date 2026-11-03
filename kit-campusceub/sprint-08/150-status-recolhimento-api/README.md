# Task — Registrar status de recolhimento na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/150 |
| Quem | Davi |
| PBI | [#46](https://github.com/CAMPUSCEUB/EcoTrack/issues/46) US20 — um único pai |
| Milestone | Sprint 08 - Rota do dia e recolhimento |
| Branch | `feature/150-status-recolhimento-api` |
| Commit | `feat: registra status de recolhimento da parada na api` |
| Destino | só `src/backend` |
| Depende de | merge da API da rota do dia (#148) |

A issue #150 já existe. Não crie outra. **Depois** do merge da API da rota do dia: as duas alteram `rotaController.js` e `rotaRoutes.js`.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que o `rotaController.js` da `main` já tem `listarMinhasRotas` e que o `rotaRoutes.js` tem `router.get('/minha', ...)`. Se faltar, a API da rota do dia ainda não entrou: pare e espere o merge.

## O que copiar (sobrescrever)

- `src/backend/src/config/schema.js`
- `src/backend/src/controllers/rotaController.js`
- `src/backend/src/routes/rotaRoutes.js`

Os três arquivos são os da `main` mais o bloco novo.

- Schema: na tabela `parada`, as colunas `status_recolhimento NVARCHAR(20) NULL` e `status_atualizado_em DATETIME2 NULL`, e o CHECK com `recolhido`, `nao_recolhido` ou `parcial`. Nulo quer dizer que ainda não foi marcado. O resto do `schema.js` é o da `main`: não troque por um schema antigo.
- Controller:
  - `registrarRecolhimento`: `PATCH /rotas/paradas/:paradaId/recolhimento` com `{ "status_recolhimento": "recolhido" }`. Só o motorista atribuído à rota daquela parada. Pode remarcar. Responde `{ message, rota }`.
  - `carregarRotas` passa a devolver `status_recolhimento` e `status_atualizado_em` em cada parada, para o status reaparecer no `GET /rotas/minha`.
  - Rota começada (alguma parada com status) fica travada para o gestor: `PUT /rotas/:id` (`salvarRota`), `DELETE /rotas/:id` (`excluirRota`) e `PATCH /rotas/:id/motorista` (`atribuirMotorista`) devolvem 409 com a mesma mensagem. O PUT apagaria e recriaria as paradas, o DELETE apagaria as paradas junto com a rota, e o PATCH trocaria o motorista de uma rota já começada. A conferência fica em `contarParadasMarcadas`, que trava a rota até o fim da transação. Rota sem nada marcado continua podendo ser editada, excluída e ter o motorista trocado.
- Rotas: o `router.patch('/paradas/:paradaId/recolhimento', ...)` fica **antes** do `router.use` de administrador e gestor, junto com o `/minha`.

Status na parada, não no lote. O gestor não tem tela para ver o recolhimento nesta sprint (US21, Sprint 09). Sem tela. Sem GPS.

## PR

Título: `feat: registra status de recolhimento da parada na api`

```text
Closes #150

PATCH /rotas/paradas/:paradaId/recolhimento grava recolhido, nao_recolhido ou parcial na parada. Só o motorista atribuído à rota. Rota com parada já marcada não pode ser editada, excluída nem ter o motorista trocado: PUT, DELETE e PATCH do motorista devolvem 409.

Como validar: login do motorista, PATCH numa parada da rota dele com recolhido → 200, e o GET /rotas/minha mostra o status. Parada de outro motorista → 403. Status inválido → 400. Gestor tenta PUT, DELETE ou trocar o motorista nessa rota → 409.
```

## Como validar

- Motorista atribuído: PATCH com `recolhido`, `nao_recolhido` ou `parcial` → 200. O `GET /rotas/minha` mostra o status.
- Remarcar a mesma parada troca o status.
- Status fora dos três valores, ausente ou `null` → 400. ID de parada inválido → 400. Parada que não existe → 404.
- Parada de rota de outro motorista, ou de rota sem motorista → 403.
- Gestor, administrador, técnico ou auditor no PATCH → 403. Sem token → 401.
- Rota com parada marcada: `PUT /rotas/:id`, `DELETE /rotas/:id` e `PATCH /rotas/:id/motorista` (inclusive com `null`) → 409. A rota, as paradas, os status e o motorista continuam como estavam.
- Rota sem nada marcado continua podendo ser editada, excluída e ter o motorista trocado. Rota que não existe continua 404.
- Subir a API duas vezes não duplica as colunas nem o CHECK.
