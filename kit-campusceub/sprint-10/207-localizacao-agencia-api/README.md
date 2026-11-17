# Task — CEP, endereço e coordenadas da agência na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/207 |
| Quem | Davi |
| PBI | US27 [#184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/207-localizacao-agencia-api` |
| Commit | `feat: registra cep, endereco e coordenadas da agencia na api` |
| Destino | só `src/backend` |
| Depende de | kit 1 da Sprint 10 na `main` (#194 a #198, já mergeadas) |

A issue #207 já existe. Não crie outra.

Primeira Task do kit 2. As Tasks de API do kit 2 vão **em série** (#207 → #208 → #209 → #210), porque dividem o `schema.js` e o `rotaController.js`. Cada branch sai da `main` depois do merge da anterior.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/config/schema.js` cria `dbo.agencia` com `telefone NVARCHAR(20)` e não tem `cep` nem `latitude`;
- `src/backend/src/controllers/agencyController.js` tem `console.error('[agencias]', error)` nos `catch` (veio da #195).

Se estiver diferente, pare e avise o Code Review.

## O que copiar

- `src/backend/src/config/schema.js` (sobrescrever)
- `src/backend/src/controllers/agencyController.js` (sobrescrever)
- `src/backend/src/utils/localizacao.js` (novo; a pasta `utils/` também é nova)

Os dois primeiros são os da `main` mais o bloco novo:

- **`schema.js`**: depois do `CREATE TABLE dbo.agencia`, quatro colunas opcionais — `cep CHAR(8)`, `endereco NVARCHAR(200)`, `latitude DECIMAL(9,6)` e `longitude DECIMAL(9,6)` — e duas restrições: `CK_agencia_cep` (8 dígitos) e `CK_agencia_coordenadas` (as duas juntas ou nenhuma; latitude de -90 a 90, longitude de -180 a 180; a restrição exige `IS NOT NULL` nas duas no ramo com valores, porque uma comparação com `NULL` fica desconhecida e o CHECK deixaria passar um par incompleto). Cada bloco confere se já existe antes de criar, então a subida em banco que já tem dados não perde nada.
- **`agencyController.js`**: o GET devolve os quatro campos; o POST e o PUT aceitam os quatro e validam com o `utils/localizacao.js`.

O novo:

- **`utils/localizacao.js`**: `lerCep` (aceita `70040-010`, `70.040-010` ou `70040010` e guarda só os 8 dígitos), `lerEndereco` (até 200 caracteres) e `lerCoordenadas` (número com ponto decimal, as duas juntas, arredondadas em 6 casas; mandar só uma das duas, inclusive `null`, é 400). A Task seguinte usa o mesmo arquivo.

Regra do PUT: campo que **não veio** no corpo fica como está. A tela de agências de hoje não manda CEP, endereço nem coordenadas, e salvar pela tela não apaga o que foi cadastrado pela API. Para apagar as coordenadas, o corpo manda `"latitude": null, "longitude": null`, as duas juntas; só uma delas, mesmo `null`, devolve 400 e não apaga o par.

Fora desta Task: busca do endereço pelo CEP, geocodificação automática, mapa e campos na tela de agências (kit 4).

## PR

Título: `feat: registra cep, endereco e coordenadas da agencia na api`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #207` e, na linha de baixo, `Refs #184`.
- **Resumo**: agência ganha CEP, endereço, latitude e longitude, opcionais e validados; o PUT só altera os campos que vieram no corpo.
- **Tipo de mudança**: Requisito.
- **Como validar**: os itens abaixo que você testou.
- **Evidências**: as respostas do Postman (ou `curl`) dos casos abaixo.

## Como validar

Com o `docker compose up --build`, login de administrador ou gestor e o token no `Authorization: Bearer`:

- `POST /agencias` com `"cep": "70.040-010"`, `"endereco": "SBS Quadra 1"`, `"latitude": -15.7975`, `"longitude": -47.8919` → 201, e o `GET /agencias` devolve `cep` `70040010` e as coordenadas.
- `POST /agencias` sem os quatro campos → 201, como antes.
- Só `latitude` (ou só `longitude`, mesmo `null`) → 400 “Informe a latitude e a longitude juntas, ou deixe as duas em branco.”, no POST e no PUT.
- `latitude` 95 → 400. `"latitude": "-15,79"` (vírgula) → 400. CEP com 4 dígitos → 400.
- Editar a agência pela tela (nome, por exemplo) → o `GET` continua com CEP e coordenadas.
- `PUT /agencias/:id` com `"latitude": null, "longitude": null` → as duas ficam nulas, e CEP e endereço continuam.
- Direto no banco, `UPDATE dbo.agencia SET latitude = NULL WHERE id = ...` em agência com coordenadas → a restrição recusa o par incompleto.
- `docker compose down` e `up` sem `-v` → os dados continuam e a API sobe sem erro de schema.
