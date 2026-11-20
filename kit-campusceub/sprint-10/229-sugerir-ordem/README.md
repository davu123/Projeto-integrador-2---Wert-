# Task — Sugerir a ordem das paradas na tela de Rotas

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/229 |
| Quem | Eduardo |
| PBI | US28 [#185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/229-sugerir-ordem` |
| Commit | `feat: sugere a ordem das paradas na tela de rotas` |
| Destino | só `src/frontend` |
| Depende de | [#228](https://github.com/CAMPUSCEUB/EcoTrack/issues/228) (origem e destino da rota) |

A issue #229 já existe. Não crie outra.

Altera `RoutesPage.jsx` depois da Task de origem e destino. A branch sai da `main` **depois** do merge dela. Se a sprint apertar, esta é a segunda Task a ficar de fora, depois do GPX.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/src/pages/RoutesPage.jsx` tem `origem_id` e o botão **Ver no mapa**;
- `src/frontend/src/services/rotaService.js` não tem `sugerirOrdem`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/RoutesPage.jsx`
- `src/frontend/src/services/rotaService.js`

O `RoutesPage.jsx` é o da `main` com os blocos do mapa e da origem e destino mais o bloco novo. O `rotaService.js` é o da `main` mais uma linha.

- **`rotaService.js`**: `sugerirOrdem`, que chama `POST /rotas/sugerir-ordem`.
- **`RoutesPage.jsx`**:
  - Botão **Sugerir ordem** ao lado de **Adicionar parada**. Manda a origem e as paradas do formulário e aplica a ordem devolvida **só na tela**; a rota é gravada em **Criar** ou **Atualizar**, como antes.
  - A resposta traz o `agencia_id` resolvido pela agência do lote na parada só com lote. A tela **não** copia esse campo: casa cada parada pelo `lote_id` e pela posição, e a parada só com lote continua sem agência gravada.
  - Cada parada mostra a distância do trecho (“2,4 km desde a origem”, “desde a parada anterior”, ou “(primeira parada, sem origem)”). Parada sem coordenadas vai para o fim, com “Sem coordenadas: fica no fim da rota.”
  - Um quadro mostra a distância total em linha reta e os avisos da API.
  - Botões **Subir** e **Descer** em cada parada, para ajustar antes de gravar. Mudar a origem, uma parada ou a ordem apaga as distâncias, que só valem para a ordem sugerida.
  - **Prévia no mapa** do formulário, com a ordem atual, antes de gravar.

A distância é em linha reta (haversine), só para ordenar. O caminho pelas ruas fica com o Google Maps e o Waze.

## PR

Título: `feat: sugere a ordem das paradas na tela de rotas`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #229` e `Refs #185`.
- **Resumo**: sugestão da ordem das paradas pela menor distância, aplicada na tela e ajustável antes de gravar, com prévia no mapa.
- **Tipo de mudança**: Requisito.
- **Evidências**: print do formulário depois de **Sugerir ordem**, com as distâncias e a prévia no mapa.

## Como validar

- `npm run build` termina sem erro.
- Rota com origem e paradas fora de ordem, **Sugerir ordem**: as paradas mudam de lugar, cada uma com a distância do trecho, e o quadro mostra o total. A prévia no mapa acompanha.
- Nada muda na lista até clicar em **Atualizar**. Depois de atualizar, a ordem gravada é a da tela.
- Parada sem coordenadas: vai para o fim, com o aviso.
- Parada só com lote: depois de sugerir e atualizar, o `GET /rotas` continua com `agencia_id` nulo nela.
- Sem origem: a primeira parada mostra “(primeira parada, sem origem)”.
- **Descer** uma parada: a ordem troca e as distâncias somem.
- Parada sem agência e sem lote: **Sugerir ordem** pede para escolher antes.
- Rota já começada (alguma parada marcada): **Atualizar** recebe o 409 da API, como antes.
