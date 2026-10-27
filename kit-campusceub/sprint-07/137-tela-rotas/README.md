# Task — Tela de planejamento de rotas

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/137 |
| Quem | Eduardo |
| PBI | [#43](https://github.com/CAMPUSCEUB/EcoTrack/issues/43) US17 — um único pai |
| Milestone | Sprint 07 - Rotas e atribuição de motorista |
| Branch | `feature/137-tela-rotas` |
| Commit | `feat: adiciona tela de planejamento de rotas` |
| Destino | só `src/frontend` |
| Depende de | merge da API de rotas |

A issue #137 já existe. Não crie outra. Pode ir em paralelo com a #138, depois do merge da #136.

## O que copiar (sobrescrever)

- `src/frontend/src/auth/acesso.js`
- `src/frontend/src/App.jsx`
- `src/frontend/src/pages/RoutesPage.jsx` (novo)
- `src/frontend/src/services/rotaService.js` (novo)

Tela do Marcos: data, paradas (agência e/ou lote) e ordem. Item **Rotas** no menu de gestor/admin. Sem select de motorista. Sem mapa.

## PR

Título: `feat: adiciona tela de planejamento de rotas`

```text
Closes #137

A página /rotas monta rota com data, paradas e ordem. Menu só para gestor e admin.

Como validar: logar como gestor, abrir Rotas, criar uma rota com duas paradas. Logar como técnico — o item Rotas não aparece.
```

## Como validar

- Gestor/admin vê Rotas no menu e cria rota com duas paradas.
- Técnico, auditor e motorista não vêem o item.
- Grep `mapbox`/`leaflet`/`gps` nesta pasta — ausente.
- Sem atribuição de motorista.
