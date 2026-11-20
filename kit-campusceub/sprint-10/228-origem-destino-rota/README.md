# Task — Origem e destino no formulário de Rotas

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/228 |
| Quem | Eduardo |
| PBI | US28 [#185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/228-origem-destino-rota` |
| Commit | `feat: escolhe a origem e o destino na tela de rotas` |
| Destino | só `src/frontend` |
| Depende de | [#224](https://github.com/CAMPUSCEUB/EcoTrack/issues/224) (mapa da rota) e [#226](https://github.com/CAMPUSCEUB/EcoTrack/issues/226) (tela de pontos de entrega) |

A issue #228 já existe. Não crie outra.

Altera `RoutesPage.jsx`, que a Task do mapa também altera, e usa o `pontoEntregaService.js` criado na Task dos pontos de entrega. A branch sai da `main` **depois** do merge das duas.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/src/pages/RoutesPage.jsx` tem o botão **Ver no mapa** (a Task do mapa está na `main`);
- existe `src/frontend/src/services/pontoEntregaService.js` (a Task dos pontos de entrega está na `main`);
- `RoutesPage.jsx` não tem `origem_id`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/RoutesPage.jsx`

É o da `main` com o bloco do mapa mais o bloco novo.

- Dois campos no formulário: **Origem (onde a rota começa)** e **Destino (onde a rota termina)**, com os pontos de entrega. Os dois são opcionais.
- Só aparecem os pontos **ativos**. Na edição, se a rota usa um ponto que foi desativado, ele continua no campo com “— inativo, escolha outro”; salvar assim recebe a mensagem da API.
- O salvar envia `origem_id` e `destino_id` (número ou `null`). “Sem origem” apaga a origem gravada.
- Na lista, a coluna **Origem → destino**.

A API já valida o ponto ativo (400) e devolve `origem` e `destino` no `GET /rotas`.

Fora desta Task: sugerir a ordem das paradas.

## PR

Título: `feat: escolhe a origem e o destino na tela de rotas`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #228` e `Refs #185`.
- **Resumo**: origem e destino da rota escolhidos entre os pontos de entrega ativos.
- **Tipo de mudança**: Requisito.
- **Evidências**: print do formulário com origem e destino e da lista com a coluna nova.

## Como validar

- `npm run build` termina sem erro.
- Criar rota com origem e destino: a lista mostra `Depósito → Destinadora`, e **Ver no mapa** mostra **O** e **D**.
- Editar uma rota: os dois campos vêm preenchidos; mudar só a data mantém origem e destino.
- Desativar o destino em **Pontos de entrega** e abrir a edição: o campo mostra “— inativo, escolha outro”; salvar dá a mensagem da API; escolher outro ponto salva.
- Rota sem origem: a lista mostra `— → …`.
- Parada só com lote continua sem agência depois de salvar (confira no `GET /rotas`: `agencia_id` nulo).
