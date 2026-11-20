# Task — Baixar a rota em GPX

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/230 |
| Quem | Eduardo |
| PBI | US29 [#186](https://github.com/CAMPUSCEUB/EcoTrack/issues/186) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/230-gpx-da-rota` |
| Commit | `feat: baixa a rota em gpx` |
| Destino | só `src/frontend` |
| Depende de | [#227](https://github.com/CAMPUSCEUB/EcoTrack/issues/227) (Google Maps e Waze) |

A issue #230 já existe. Não crie outra.

Altera `RouteNavigation.jsx`, criado na Task do Google Maps e do Waze. A branch sai da `main` **depois** do merge dela. É a última Task do kit e a primeira a ficar de fora se a sprint apertar.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- existe `src/frontend/src/components/RouteNavigation.jsx` e `src/frontend/src/utils/navegacao.js` (a Task do Google Maps e do Waze está na `main`);
- não existe `src/frontend/src/utils/gpx.js`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar

Criar:

- `src/frontend/src/utils/gpx.js`

Sobrescrever:

- `src/frontend/src/components/RouteNavigation.jsx`

O `RouteNavigation.jsx` é o da `main` mais o bloco novo.

- **`gpx.js`**: arquivo GPX 1.1 da rota, montado no navegador, sem API nova.
  - Um `wpt` para cada ponto e a rota (`rte`) com os mesmos pontos na ordem: origem, paradas e destino.
  - Nome dos pontos com o rótulo e o nome (`Parada 3 - Agência Asa Sul`), texto escapado para XML.
  - Só pontos com coordenadas. Ponto só com endereço fica de fora: o GPX não aceita endereço.
  - Arquivo `rota-<id>-<data>.gpx`, tipo `application/gpx+xml`.
- **`RouteNavigation.jsx`**: botão **Baixar GPX** no quadro **Navegar**, em Rotas e na Rota do dia, e a nota com os pontos que ficaram fora do arquivo.

## PR

Título: `feat: baixa a rota em gpx`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #230` e `Refs #186`.
- **Resumo**: download da rota em GPX, com origem, paradas e destino na ordem.
- **Tipo de mudança**: Requisito.
- **Evidências**: print do botão e o arquivo aberto num aplicativo ou site que lê GPX.

## Como validar

- `npm run build` termina sem erro.
- **Baixar GPX** numa rota com coordenadas: baixa `rota-<id>-<data>.gpx`.
- O arquivo abre num leitor de GPX (por exemplo, o importador do Google My Maps ou um aplicativo de trilhas) e mostra os pontos na ordem do mapa.
- Rota com parada sem coordenadas: a nota lista essa parada, e ela não está no arquivo.
- Rota sem nenhum ponto com coordenadas: o botão não aparece.
