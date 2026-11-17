# Task #190 — Storyboard tradicional e rotas de usabilidade

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/190 |
| Quem | Artur |
| Tipo | Task de documentação (sem PBI pai) |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `docs/190-storyboard-e-rotas` |
| Commit | `docs: refaz o storyboard e detalha as rotas por perfil` |
| Destino | `entregas/artefato_3/artefato-3.md` |
| Depende de | merge da [#188](https://github.com/CAMPUSCEUB/EcoTrack/issues/188) |

A issue #190 já existe. Não crie outra.

Começar **depois** do merge da #188: o arquivo desta pasta é o `artefato-3.md` da #188 com duas seções novas no fim. Copiar antes do merge da #188 cria o arquivo sem as imagens (`artefato_3/imagens/`), que chegam pela #188.

A #189 também parte da #188, mas não divide arquivo com esta. As duas podem ir em qualquer ordem depois da #188.

## O que muda

Pedido da Sprint Review 06: storyboard no formato tradicional e rotas de usabilidade detalhadas. As seções 1 a 4 do Artefato 3 não mudam, menos uma nota na 1.3.

- **1.3**: nota dizendo que a matriz ali é a planejada na entrega e que as rotas de cada perfil, tela a tela, estão na seção 6.
- **5. Storyboard** (nova): 14 quadros, agrupados pelas cinco personas (Renata, Marcos, Paulo, Camila e Helena). Cada quadro tem o wireframe da seção 4, quando existe, e uma tabela **Cena / Ação do usuário / Resposta do sistema**. No fim, um diagrama Mermaid com a sequência dos quadros.
- **6. Rotas de usabilidade por perfil** (nova): regras comuns (login, Dashboard depois do login, endereço inexistente, tela fora do perfil, cabeçalho) e uma tabela por perfil com **Tela / Caminho / Ações permitidas**. As telas seguem o `src/frontend/src/App.jsx` e o `src/frontend/src/auth/acesso.js` da `main`; as ações seguem as permissões da API.

O auditor ainda vê os formulários de Lotes e Destinação, e a API recusa a gravação. A seção 6.4 registra isso como está.

A tela **Minha conta** (`/minha-conta`, da #196) já está na `main`, então cada tabela de 6.1 a 6.5 termina com a linha dela (trocar a própria senha).

## Se a Task de telas por perfil entrar antes

A seção 6 descreve a `main` de 17/11: o motorista cai no Dashboard e o auditor vê os formulários. A #213, telas por perfil da US26 (pasta `213-telas-por-perfil` deste kit), muda as duas coisas. Antes de copiar, abra o `src/frontend/src/auth/acesso.js` da `main`. Se ele tiver `paginaInicial`, essa Task já entrou: copie a pasta e, no `artefato-3.md`, troque o seguinte.

- Regras comuns:
  - “Quem já entrou e abre `/login` volta para `/`.” → “Quem já entrou e abre `/login` volta para a página inicial do perfil.”
  - “Depois do login, todos os perfis caem no **Dashboard** (`/`).” → “Depois do login, o motorista cai na **Rota do dia** (`/rota-do-dia`) e os outros perfis no **Dashboard** (`/`).”
  - “Endereço que não existe leva para `/` (com sessão)” → “Endereço que não existe leva para a página inicial do perfil (com sessão)”.
- No fim da 6.4: “Nas telas de Lotes e Destinação o formulário ainda aparece para ele, mas a API recusa a gravação.” → “Nas telas de Lotes e Destinação ele vê só a lista: o formulário e os botões de alteração não aparecem.”
- No Quadro 8: “Entra no sistema e abre **Rota do dia**” → “Entra no sistema e cai direto na **Rota do dia**”.

Se a `main` não tiver `paginaInicial`, copie a pasta como está.

## O que fazer

1. `git checkout main` e `git pull`. Confirmar que a #188 está na `main` (existe `entregas/artefato_3/artefato-3.md`).
2. `git checkout -b docs/190-storyboard-e-rotas`.
3. Copiar `entregas/` **desta pasta** por cima do EcoTrack. Não copiar este `README.md`.
4. `git status`: só `entregas/artefato_3/artefato-3.md` alterado.
5. `git add entregas/artefato_3/artefato-3.md`.
6. `git commit -m "docs: refaz o storyboard e detalha as rotas por perfil"`.
7. `git push -u origin HEAD` e abrir o PR com o texto abaixo.

Antes do commit: sem BOM (salvar como UTF-8), títulos com `##` onde o arquivo já usa `##`, separador de tabela `| --- |`.

## Como validar

- No GitHub, na branch, abrir `entregas/artefato_3/artefato-3.md`: os wireframes aparecem nos quadros da seção 5 e o diagrama Mermaid no fim dela aparece desenhado.
- Conferir cada tabela da seção 6 com o `MENU` do `src/frontend/src/auth/acesso.js`: os mesmos caminhos para cada perfil.
- Entrar no sistema com um usuário de cada perfil e conferir que o menu lateral mostra só as telas da tabela.

## PR

Título: `docs: refaz o storyboard e detalha as rotas por perfil`

Corpo (template inteiro, com `##`):

```markdown
# Pull request

## Issue relacionada

Closes #190

## Resumo

Atende a Sprint Review 06 no Artefato 3. A seção 5 traz o storyboard no formato tradicional: 14 quadros pelas cinco personas, cada um com o wireframe e a tabela cena, ação do usuário e resposta do sistema. A seção 6 detalha as rotas de usabilidade de cada perfil, tela a tela, conforme o `App.jsx`, o `acesso.js` e as permissões da API.

## Tipo de mudança

- [ ] Requisito
- [ ] Correção
- [x] Documentação
- [ ] Organização
- [ ] Entrega acadêmica

## Como validar

- Abrir `entregas/artefato_3/artefato-3.md` na branch e conferir as seções 5 e 6.
- Comparar as tabelas da seção 6 com o `MENU` de `src/frontend/src/auth/acesso.js`.
- Entrar com um usuário de cada perfil e conferir o menu lateral.

## Evidências

Link da branch para o Artefato 3 e print de um quadro do storyboard e de uma tabela de rotas.

## Checklist

- [x] A mudança está vinculada a uma `issue` principal.
- [x] A `issue` principal está fechada ou será fechada pelo `merge` deste `pull request`.
- [x] A `issue` está vinculada à `milestone` da sprint, quando aplicável.
- [x] A documentação foi atualizada quando necessário.
- [ ] Um ADR foi registrado quando a decisão alterou escopo, processo, arquitetura, integração, critério avaliativo ou outro ponto que precise de histórico consultável.
- [x] As evidências de validação foram registradas.
- [ ] O relatório da sprint foi atualizado quando esta mudança fizer parte da entrega.
```

Revisão: Lucas e um colega. Quem mergeia é o Lucas, com merge commit.
