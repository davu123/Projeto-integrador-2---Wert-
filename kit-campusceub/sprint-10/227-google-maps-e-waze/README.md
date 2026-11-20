# Task — Abrir a rota no Google Maps e no Waze

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/227 |
| Quem | Eduardo |
| PBI | US29 [#186](https://github.com/CAMPUSCEUB/EcoTrack/issues/186) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/227-google-maps-e-waze` |
| Commit | `feat: abre a rota no google maps e no waze` |
| Destino | só `src/frontend` |
| Depende de | [#224](https://github.com/CAMPUSCEUB/EcoTrack/issues/224) (mapa da rota) |

A issue #227 já existe. Não crie outra.

Altera `RouteDetails.jsx` e `DriverRoutePage.jsx`, criados ou alterados pela Task do mapa. A branch sai da `main` **depois** do merge dela. Não divide arquivo com a origem e o destino nem com a sugestão de ordem: pode ir em paralelo com elas.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- existe `src/frontend/src/components/RouteDetails.jsx` (a Task do mapa está na `main`);
- `src/frontend/src/pages/DriverRoutePage.jsx` importa `RouteMap` e tem a coluna **Endereço**;
- não existe `src/frontend/src/utils/navegacao.js`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar

Criar:

- `src/frontend/src/utils/navegacao.js`
- `src/frontend/src/components/RouteNavigation.jsx`

Sobrescrever:

- `src/frontend/src/components/RouteDetails.jsx`
- `src/frontend/src/pages/DriverRoutePage.jsx`

Os sobrescritos são os da `main` com o bloco do mapa mais o bloco novo.

- **`navegacao.js`**: monta os links, sem chave de API.
  - Cada ponto vai pelas coordenadas; sem elas, pelo endereço em texto. Ponto sem os dois fica fora dos links.
  - **Google Maps**: `https://www.google.com/maps/dir/?api=1&origin=…&destination=…&waypoints=…&travelmode=driving`. O link aceita até 9 paradas intermediárias; com mais, a rota sai em trechos, e cada trecho começa onde o anterior terminou.
  - **Waze**: o link leva um destino só (`https://waze.com/ul?ll=…&navigate=yes`, ou `?q=<endereço>` sem coordenadas).
  - Próximo destino: a primeira parada sem marcação de recolhimento; com todas marcadas, o destino da rota.
- **`RouteNavigation.jsx`**: quadro **Navegar** com os botões do Google Maps (um por trecho) e o botão do Waze para o próximo destino. Lista os pontos que ficaram fora dos links.
- **`RouteDetails.jsx`** (tela de Rotas, **Ver no mapa**) e **`DriverRoutePage.jsx`** (Rota do dia): o quadro **Navegar** embaixo do mapa e a coluna **Navegar** com o link do Waze de cada parada.

Fora desta Task: o GPX.

## PR

Título: `feat: abre a rota no google maps e no waze`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #227` e `Refs #186`.
- **Resumo**: links do Google Maps (em trechos de até 9 paradas intermediárias) e do Waze (por parada e próximo destino) em Rotas e na Rota do dia.
- **Tipo de mudança**: Requisito.
- **Evidências**: print do quadro Navegar e da rota aberta no Google Maps.

## Como validar

- `npm run build` termina sem erro.
- Rota com origem, destino e até 9 paradas: um botão **Abrir rota no Google Maps**, que abre o trajeto da origem ao destino passando pelas paradas na ordem.
- Rota com mais de 9 paradas: botões **Google Maps, trecho 1: … → …**, **trecho 2: …**; o trecho 2 começa na parada em que o trecho 1 termina.
- Parada com endereço e sem coordenadas: entra no link pelo endereço.
- Parada sem endereço e sem coordenadas: fica fora e aparece na nota.
- Motorista, **Rota do dia**: o botão do Waze aponta a primeira parada não marcada; marcar essa parada passa o botão para a seguinte.
- O link **Waze** de cada linha abre o Waze naquele ponto.
