# Task — Tela da rota do dia do motorista

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/149 |
| Quem | Eduardo |
| PBI | [#45](https://github.com/CAMPUSCEUB/EcoTrack/issues/45) US19 — um único pai |
| Milestone | Sprint 08 - Rota do dia e recolhimento |
| Branch | `feature/149-tela-rota-do-dia` |
| Commit | `feat: adiciona tela da rota do dia do motorista` |
| Destino | só `src/frontend` |
| Depende de | merge da API da rota do dia (#148) |

A issue #149 já existe. Não crie outra. Pode ir em paralelo com a API de recolhimento, depois do merge da API da rota do dia.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que a `main` já tem a tela de rotas da Sprint 07: `App.jsx` com a rota `/rotas`, `acesso.js` com o item **Rotas** e `rotaService.js` com `atribuirMotorista`. Se faltar algum, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/auth/acesso.js`
- `src/frontend/src/services/rotaService.js`
- `src/frontend/src/pages/DriverRoutePage.jsx` (novo)

`App.jsx`, `acesso.js` e `rotaService.js` são os da `main` mais uma linha cada: a rota `/rota-do-dia`, o item **Rota do dia** só para `motorista`, e `listarMinhasRotas(data)`. A página nova mostra a data (hoje por padrão) e, para cada rota do motorista, a tabela de paradas com ordem e agência ou lote.

Tela do Paulo. Sem botões de recolhimento: isso é a Task seguinte. Sem mapa. Sem GPS.

## PR

Título: `feat: adiciona tela da rota do dia do motorista`

```text
Closes #149

A página /rota-do-dia mostra ao motorista as rotas atribuídas a ele na data, com paradas em ordem. Item Rota do dia no menu só do motorista.

Como validar: gestor cria rota para hoje e atribui o motorista. Login do motorista, abrir Rota do dia, ver as paradas em ordem. Login de gestor — o item Rota do dia não aparece.
```

## Como validar

- Motorista vê **Rota do dia** no menu e as paradas da rota de hoje, em ordem.
- Trocar a data mostra as rotas daquele dia. Dia sem rota mostra "Nenhuma rota atribuída a você nesta data."
- Gestor, administrador, técnico e auditor não veem o item. Abrir `/rota-do-dia` com esses perfis volta para o início.
- A tela de rotas do gestor continua igual.
- Grep `mapbox`/`leaflet`/`gps` nesta pasta — ausente.
