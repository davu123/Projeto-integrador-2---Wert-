# Task — Identidade visual da Wert

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/211 |
| Quem | Eduardo |
| PBI | US25 [#182](https://github.com/CAMPUSCEUB/EcoTrack/issues/182) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/211-identidade-visual` |
| Commit | `feat: aplica a identidade visual da wert` |
| Destino | só `src/frontend` |
| Depende de | kit 1 da Sprint 10 na `main` (já está) |

A issue #211 já existe. Não crie outra.

Primeira Task do kit 3 (só telas). A #212 altera o mesmo `global.css` e vai depois desta.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/index.html` não carrega nenhuma fonte;
- `src/frontend/src/styles/global.css` começa com `--accent: #14803c` e o `.login-hero` usa uma foto do Unsplash.

Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/index.html`
- `src/frontend/src/styles/global.css`

Os dois são os da `main` mais o bloco novo.

- **`index.html`**: Poppins (500, 600, 700) e Roboto (400, 500, 700) do Google Fonts, e `theme-color` `#0D3538`.
- **`global.css`**
  - Cores da Wert (wertambiental.com.br) nos tokens do `:root`:
    - petróleo `#0D3538` nos títulos e no menu lateral;
    - verde `#45B892` nos botões e no destaque;
    - texto `#333333` e fundo `#F0F0F0`.
  - O cinza de apoio da Wert é `#7A7A7A`. Aqui ele fica `#616161`, porque `#7A7A7A` sobre `#F0F0F0` não chega ao contraste mínimo de 4,5:1.
  - O texto dos botões verdes é petróleo, não branco: branco sobre `#45B892` também não tem contraste.
  - Roboto no texto e Poppins nos títulos, na marca e no botão principal. A Inter, que era declarada e nunca carregada, sai.
  - Botões arredondados (`border-radius: 999px`).
  - Os botões verdes com estilo inline das páginas (`#15803d`) passam a usar a mesma cor e o mesmo formato, por um seletor no CSS. As páginas não mudam.
  - Login sem a foto externa: fundo em degradê petróleo com um brilho verde.
  - Menu com o item ativo marcado por uma barra verde à esquerda.
  - Modo escuro com os mesmos tons (petróleo escuro e o verde da Wert).

O logo continua o `src/assets/logo-wert.png`. Nenhuma página muda nesta Task.

Fora desta Task: foco, menu entre 900 e 1100 px e rótulos de acessibilidade (#212); limpar os estilos inline das páginas.

## PR

Título: `feat: aplica a identidade visual da wert`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #211` e `Refs #182`.
- **Resumo**: cores, fontes e botões da Wert; login sem foto externa; modo escuro nos mesmos tons.
- **Tipo de mudança**: Requisito.
- **Evidências**: prints do login, do Dashboard e de uma página com formulário (Lotes, por exemplo), no modo claro e no escuro.

## Como validar

- `npm run build` em `src/frontend` termina sem erro.
- Login: fundo petróleo sem foto, título em Poppins, botão **Entrar** verde e arredondado.
- No DevTools (Network), as fontes vêm do `fonts.gstatic.com`; em Computed, o `body` usa Roboto.
- Menu lateral petróleo; item ativo com a barra verde.
- Lotes, Agências e Rotas: o botão **Criar** fica verde `#45B892`, arredondado, com texto escuro.
- Modo escuro e alto contraste continuam funcionando.
