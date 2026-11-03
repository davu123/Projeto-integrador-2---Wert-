# Task — Marcar recolhimento na tela da rota do dia

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/151 |
| Quem | Eduardo |
| PBI | [#46](https://github.com/CAMPUSCEUB/EcoTrack/issues/46) US20 — um único pai |
| Milestone | Sprint 08 - Rota do dia e recolhimento |
| Branch | `feature/151-tela-status-recolhimento` |
| Commit | `feat: marca recolhimento na tela da rota do dia` |
| Destino | só `src/frontend` |
| Depende de | merge da API de recolhimento (#150) e da tela da rota do dia (#149) |

A issue #151 já existe. Não crie outra. **Depois** das duas: o botão chama o PATCH da API de recolhimento, e esta pasta altera a página e o service da tela da rota do dia.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que a `main` já tem `src/frontend/src/pages/DriverRoutePage.jsx` e que o `rotaService.js` tem `listarMinhasRotas`. Se faltar, a tela da rota do dia ainda não entrou: pare e espere o merge.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/DriverRoutePage.jsx`
- `src/frontend/src/services/rotaService.js`

Os dois arquivos são os da `main` mais o bloco novo. O `rotaService.js` ganha `marcarRecolhimento(paradaId, status)`. A página **repete** a data e a tabela de paradas da tela da rota do dia e acrescenta a coluna **Recolhimento** e os botões **Recolhido**, **Parcial** e **Não recolhido** em cada parada. O botão do status atual fica preenchido. Não copia `App.jsx` nem `acesso.js`: a rota e o menu já entraram na Task anterior.

Um clique por parada, sem formulário. Sem mapa. Sem GPS.

## PR

Título: `feat: marca recolhimento na tela da rota do dia`

```text
Closes #151

A tela Rota do dia ganha a coluna Recolhimento e os botões Recolhido, Parcial e Não recolhido em cada parada. O clique chama o PATCH e a tabela mostra o status salvo.

Como validar: login do motorista, abrir Rota do dia, clicar em Recolhido numa parada. A coluna mostra Recolhido. Recarregar a página — o status continua.
```

## Como validar

- Motorista clica em **Recolhido**, **Parcial** ou **Não recolhido** e a coluna mostra o status, com a mensagem "Recolhimento registrado."
- Recarregar a página mantém o status.
- Clicar em outro botão troca o status.
- Erro da API aparece em vermelho na tela.
- A tela de rotas do gestor continua igual. Ao editar ou excluir uma rota já marcada, o gestor vê a mensagem do 409.
- Grep `mapbox`/`leaflet`/`gps` nesta pasta — ausente.
