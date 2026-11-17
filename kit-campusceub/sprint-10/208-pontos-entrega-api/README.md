# Task — Pontos de entrega na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/208 |
| Quem | Davi |
| PBI | US27 [#184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/208-pontos-entrega-api` |
| Commit | `feat: cadastra os pontos de entrega na api` |
| Destino | só `src/backend` |
| Depende de | merge da #207 (CEP, endereço e coordenadas da agência) |

A issue #208 já existe. Não crie outra.

Começar **depois** do merge da #207, numa branch nova saindo da `main`. O `schema.js` desta pasta repete o bloco da #207; copiar antes do merge apaga a #207 da `main`.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/utils/localizacao.js` existe (a #207 está na `main`);
- `src/backend/src/config/schema.js` tem `CK_agencia_coordenadas`.

Se faltar, pare e espere o merge da #207.

## O que copiar

- `src/backend/src/config/schema.js` (sobrescrever)
- `src/backend/src/app.js` (sobrescrever)
- `src/backend/src/controllers/pontoEntregaController.js` (novo)
- `src/backend/src/routes/pontoEntregaRoutes.js` (novo)

Os dois primeiros são os da `main` com a #207 mais o bloco novo:

- **`schema.js`**: no fim da lista, a tabela `dbo.ponto_entrega` — `nome NVARCHAR(150)`, `tipo` (`deposito` ou `destinadora`), `cep CHAR(8)` opcional, `endereco NVARCHAR(200)`, `cidade NVARCHAR(100)`, `uf CHAR(2)`, `latitude` e `longitude DECIMAL(9,6)` obrigatórias, `ativo BIT` (padrão 1), `criado_em` e `atualizado_em`, com as restrições `CK_ponto_entrega_tipo`, `CK_ponto_entrega_cep` e `CK_ponto_entrega_coordenadas`.
- **`app.js`**: `app.use('/pontos-entrega', pontoEntregaRoutes)`, logo depois de `/rotas`.

Os novos:

- **`pontoEntregaRoutes.js`**: só **administrador e gestor** (`router.use` com `requirePerfil`), ID validado no `router.param`.
- **`pontoEntregaController.js`**:
  - `GET /pontos-entrega` (ativos primeiro, por nome) e `GET /pontos-entrega/:id` (404);
  - `POST` → 201 com `{ message, ponto_entrega }`. Nome, tipo, endereço, cidade, UF e as duas coordenadas são obrigatórios; o CEP é opcional. Usa o `utils/localizacao.js` da #207;
  - `PUT /pontos-entrega/:id` → 200, 404. Sem `ativo` no corpo, o ponto continua ativo ou inativo como estava. `"ativo": false` desativa;
  - `DELETE /pontos-entrega/:id` → 200, 404, e **409** quando o ponto é origem ou destino de uma rota (“Desative-o em vez de excluir.”). Essa ligação nasce na #209; até lá, o DELETE sempre exclui.

Ponto de entrega é o depósito da Wert ou a empresa que recebe o material. Ele é a origem e o destino da rota na #209. Não é a agência: a agência continua sendo o ponto de coleta.

Nenhuma resposta leva `error.message`; o erro vai para o `console.error('[pontos-entrega]', error)`.

## PR

Título: `feat: cadastra os pontos de entrega na api`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #208` e `Refs #184`.
- **Resumo**: tabela e rotas de pontos de entrega (depósito ou destinadora), com endereço e coordenadas, só para administrador e gestor.
- **Tipo de mudança**: Requisito.
- **Como validar** e **Evidências**: os casos abaixo, com as respostas.

## Como validar

- Técnico, auditor ou motorista em `GET /pontos-entrega` → 403. Sem token → 401.
- `POST /pontos-entrega` com `{ "nome": "Depósito Wert", "tipo": "deposito", "endereco": "SIA Trecho 1", "cidade": "Brasília", "uf": "DF", "latitude": -15.8, "longitude": -47.95 }` → 201, `ativo: true`.
- Sem endereço, sem coordenadas, `tipo` `galpao`, UF `DFX` ou `"ativo": "sim"` → 400.
- `PUT /pontos-entrega/abc` → 400. `PUT /pontos-entrega/999` → 404.
- `PUT` com `"ativo": false` → o `GET` mostra o ponto inativo, depois dos ativos.
- `DELETE` de ponto que existe → 200; de novo → 404.
- `down` e `up` sem `-v` → a tabela continua com os dados.
