# Task — Atribuir motorista na tela de rotas

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/139 |
| Quem | Eduardo |
| PBI | [#44](https://github.com/CAMPUSCEUB/EcoTrack/issues/44) US18 — um único pai |
| Milestone | Sprint 07 - Rotas e atribuição de motorista |
| Branch | `feature/139-tela-atribuir-motorista` |
| Commit | `feat: atribui motorista na tela de rotas` |
| Destino | só `src/frontend` |
| Depende de | merge da API de atribuição e da tela de rotas |

A issue #139 já existe. Não crie outra. **Depois** da #137 e da #138: as duas telas alteram `RoutesPage.jsx`. Não copia `App.jsx`: a rota `/rotas` já entrou na Task de planejamento.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/RoutesPage.jsx`
- `src/frontend/src/services/rotaService.js`

O arquivo **repete** data, paradas e ordem para o merge não apagar o planejamento. Acrescenta o select de motoristas (só perfil `motorista`) e chama `PATCH /rotas/:id/motorista`. Sem mapa. Sem algoritmo.

## PR

Título: `feat: atribui motorista na tela de rotas`

```text
Closes #139

A tela de rotas atribui na mão um motorista cadastrado. O select não lista técnico nem gestor.

Como validar: logar como gestor, abrir uma rota, escolher um motorista e salvar. A lista mostra o nome. Sem GPS.
```

## Como validar

- O select lista só usuários com perfil `motorista`.
- Salvar atribui e a lista mostra o nome.
- Continua possível montar data e paradas.
- Sem mapa.
