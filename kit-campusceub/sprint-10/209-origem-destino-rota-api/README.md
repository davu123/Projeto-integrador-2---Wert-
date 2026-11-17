# Task — Origem, destino e coordenadas das paradas na rota

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/209 |
| Quem | Davi |
| PBI | US28 [#185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/209-origem-destino-rota-api` |
| Commit | `feat: adiciona origem, destino e coordenadas das paradas na rota` |
| Destino | só `src/backend` |
| Depende de | merge da #208 (pontos de entrega) |

A issue #209 já existe. Não crie outra.

Começar **depois** do merge da #208, numa branch nova saindo da `main`. O `schema.js` desta pasta repete os blocos da #207 e da #208.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/config/schema.js` cria `dbo.ponto_entrega` (a #208 está na `main`);
- `src/backend/src/controllers/rotaController.js` tem `salvarRota`, `contarParadasMarcadas` e `registrarRecolhimento`, e não tem `origem_id`.

Se faltar, pare e espere o merge da #208.

## O que copiar (sobrescrever)

- `src/backend/src/config/schema.js`
- `src/backend/src/controllers/rotaController.js`

O `rotaRoutes.js` não muda nesta Task.

Os dois são os da `main` mais o bloco novo:

- **`schema.js`**: `dbo.rota` ganha `origem_id` e `destino_id`, opcionais, com `FK_rota_origem` e `FK_rota_destino` para `dbo.ponto_entrega`.
- **`rotaController.js`**:
  - **POST e PUT `/rotas`** aceitam `origem_id` e `destino_id`: o ID de um ponto de entrega **ativo**, ou `null`. Ponto que não existe ou está inativo → 400 “Ponto de entrega de origem ou destino não encontrado ou inativo.”. Texto no lugar do ID → 400. Origem e destino podem ser o mesmo ponto (sai do depósito e volta para ele).
  - No PUT, campo que **não veio** no corpo fica como está. A tela de rotas de hoje não manda origem nem destino, e salvar pela tela não apaga o que foi gravado. `"origem_id": null` tira a origem.
  - A trava da rota começada continua: PUT em rota com recolhimento marcado → 409, antes de olhar a origem.
  - **GET `/rotas`, `/rotas/:id` e `/rotas/minha`** devolvem `origem_id`, `destino_id`, os objetos `origem` e `destino` (`id`, `nome`, `tipo`, `endereco`, `cidade`, `uf`, `latitude`, `longitude`, ou `null`) e, em cada parada, `endereco`, `cidade`, `uf`, `latitude` e `longitude` da agência.
  - **Parada só com lote**: a agência agora vem do lote. O `agencia_nome`, o endereço e as coordenadas da parada são os da agência do lote. O `agencia_id` da parada continua como foi gravado (nulo). Antes, essa parada vinha sem agência.

Exemplo de um item do `GET /rotas`:

```json
{
  "id": 12, "data": "2026-11-20", "motorista_id": 5, "motorista_nome": "Paulo",
  "origem_id": 1, "destino_id": 1,
  "origem": { "id": 1, "nome": "Depósito Wert", "tipo": "deposito", "endereco": "SIA Trecho 1", "cidade": "Brasília", "uf": "DF", "latitude": -15.8, "longitude": -47.95 },
  "destino": { "id": 1, "nome": "Depósito Wert", "...": "..." },
  "paradas": [
    { "id": 30, "agencia_id": null, "agencia_nome": "Agência Norte", "lote_id": 7, "ordem": 1,
      "endereco": "SCN Quadra 2", "cidade": "Brasília", "uf": "DF", "latitude": -15.78, "longitude": -47.88,
      "status_recolhimento": null, "status_atualizado_em": null }
  ]
}
```

Fora desta Task: sugerir a ordem (#210), campos na tela de rotas e exportação (kit 4).

## PR

Título: `feat: adiciona origem, destino e coordenadas das paradas na rota`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #209` e `Refs #185`.
- **Resumo**: rota com origem e destino em pontos de entrega ativos; GET com os dois pontos e o endereço e as coordenadas de cada parada, inclusive a parada só com lote.
- **Tipo de mudança**: Requisito.
- **Como validar** e **Evidências**: os casos abaixo, com as respostas.

## Como validar

Precisa de um ponto de entrega ativo (#208) e de uma agência com coordenadas (#207).

- `POST /rotas` com `origem_id` e `destino_id` de pontos ativos → 201, e a resposta traz `origem` e `destino` preenchidos.
- `origem_id` de ponto inativo ou inexistente → 400. `"origem_id": "x"` → 400.
- `POST /rotas` sem origem e sem destino → 201, com `origem: null` e `destino: null`, como antes.
- Editar a rota pela tela (trocar a data) → o `GET /rotas/:id` continua com a origem e o destino.
- `PUT /rotas/:id` com `"origem_id": null` → origem nula, destino mantido.
- Rota com uma parada só com lote → a parada vem com `agencia_nome`, endereço e coordenadas da agência do lote.
- Rota começada (motorista marcou uma parada) → PUT com `origem_id` dá 409.
- `DELETE /pontos-entrega/:id` de um ponto usado como origem → 409; com `"ativo": false` no PUT, ele sai das opções da rota (400 ao gravar).
- `GET /rotas/minha` do motorista também traz `origem`, `destino` e as coordenadas.
