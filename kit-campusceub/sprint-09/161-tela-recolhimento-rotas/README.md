# Task — Recolhimento por rota na tela de rotas

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/161 |
| Quem | Eduardo |
| PBI | [#47](https://github.com/CAMPUSCEUB/EcoTrack/issues/47) US21 — um único pai |
| Milestone | Sprint 09 - Fechamento da visão |
| Branch | `feature/161-tela-recolhimento-rotas` |
| Commit | `feat: mostra o recolhimento por rota na tela de rotas` |
| Destino | só `src/frontend` |
| Depende de | merge da Sprint 08 |

A issue #161 já existe. Não crie outra.

Não depende de nenhuma Task desta sprint: o `GET /rotas` já devolve o `status_recolhimento` de cada parada. Pode começar logo.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que a `RoutesPage.jsx` da `main` tem a lista de rotas com as colunas ID, Data, Paradas, Motorista e Ações, e que o `GET /rotas` devolve `status_recolhimento` nas paradas. Se faltar, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/RoutesPage.jsx`

A página é a da `main` com a coluna nova **Recolhimento** na lista de rotas. Para cada rota, conta as paradas:

- **Recolhidas** (`recolhido`);
- **Parciais** (`parcial`);
- **Não recolhidas** (`nao_recolhido`);
- **Pendentes**: parada que o motorista ainda não marcou.

O formulário, o Editar, o Excluir e o motorista não mudam. Sem API nova, sem dashboard, sem mapa.

## PR

Título: `feat: mostra o recolhimento por rota na tela de rotas`

```text
Closes #161

A lista de rotas ganha a coluna Recolhimento com a contagem de paradas recolhidas, parciais, não recolhidas e pendentes de cada rota.

Como validar: motorista marca paradas na Rota do dia. Login de gestor, Rotas → a coluna mostra a contagem daquela rota. Rota sem marcação → tudo pendente.
```

## Como validar

- Rota com paradas marcadas pelo motorista: a coluna mostra quantas estão recolhidas, parciais e não recolhidas, e quantas faltam.
- Rota sem nenhuma marcação: todas as paradas aparecem como pendentes.
- Rota sem paradas: tudo zero.
- Depois de o motorista marcar uma parada, recarregar a tela de rotas mostra a contagem nova.
- Criar, editar, excluir e atribuir motorista continuam iguais.
