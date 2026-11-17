# Task — Menu entre 900 e 1100 px, foco visível e rótulos do cabeçalho

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/212 |
| Quem | Eduardo |
| PBI | US26 [#183](https://github.com/CAMPUSCEUB/EcoTrack/issues/183) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/212-layout-e-foco` |
| Commit | `feat: ajusta o menu entre 900 e 1100 px e deixa o foco visivel` |
| Destino | só `src/frontend` |
| Depende de | merge da #211 (identidade visual) |

A issue #212 já existe. Não crie outra.

Começar **depois** do merge da #211, numa branch nova saindo da `main`. O `global.css` desta pasta repete o bloco da #211; copiar antes do merge apaga a identidade visual.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/src/styles/global.css` tem `--wert-primary: #0d3538` (a #211 está na `main`);
- `src/frontend/src/styles/responsive.css` tem `grid-template-columns: 84px 1fr !important`.

Se faltar, pare e espere o merge da #211.

## O que copiar (sobrescrever)

- `src/frontend/src/styles/global.css`
- `src/frontend/src/styles/responsive.css`
- `src/frontend/src/components/Header.jsx`

Os três são os da `main` mais o bloco novo. Heurísticas de Nielsen atendidas: visibilidade do estado do sistema (onde está o foco), prevenção de erro e acessibilidade.

- **`responsive.css`**: entre 900 e 1100 px o menu lateral tinha 84 px e os nomes ficavam cortados. Agora fica com 13,5rem, os nomes inteiros, e a marca (logo e “EcoTrack Wert”) empilhada. Abaixo de 900 px nada muda.
- **`global.css`**: foco do teclado visível em links, botões e campos, com 3 px na cor `--focus`, inclusive nos campos que têm `outline: 'none'` no estilo inline (Lotes, Agências, Rotas e outras). No menu lateral o foco é verde, para aparecer sobre o petróleo.
- **`Header.jsx`**: os botões **A-** e **A+** ganham `aria-label` e `title` (“Diminuir o tamanho da fonte” e “Aumentar o tamanho da fonte”). O leitor de tela lia só “A menos”.

Fora desta Task: a página que abre depois do login e as telas do auditor (#213); Rota do dia, exclusão de rota e telefone da agência (#214); limpar os estilos inline.

## PR

Título: `feat: ajusta o menu entre 900 e 1100 px e deixa o foco visivel`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #212` e `Refs #183`.
- **Resumo**: menu lateral legível entre 900 e 1100 px; foco do teclado visível em todos os campos e botões; rótulos dos botões de fonte.
- **Tipo de mudança**: Requisito.
- **Evidências**: print do menu com a janela em 1000 px e do foco num campo de Lotes.

## Como validar

- `npm run build` termina sem erro.
- Janela com 1000 px de largura (DevTools, modo responsivo): o menu mostra os nomes inteiros e a marca não sai da coluna.
- Com 800 px, o menu fica em cima, como antes. Com 1280 px, como antes.
- Em Lotes, apertar Tab até o campo **Observações**: aparece o contorno de 3 px. No menu lateral, o contorno do item é verde.
- No DevTools (Elements), os botões A- e A+ têm `aria-label`.
