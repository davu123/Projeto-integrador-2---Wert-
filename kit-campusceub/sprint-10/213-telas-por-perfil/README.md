# Task — Página inicial do motorista e telas só de consulta para o auditor

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/213 |
| Quem | Eduardo |
| PBI | US26 [#183](https://github.com/CAMPUSCEUB/EcoTrack/issues/183) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/213-telas-por-perfil` |
| Commit | `feat: abre a rota do dia para o motorista e esconde a escrita do auditor` |
| Destino | só `src/frontend` |
| Depende de | kit 1 da Sprint 10 na `main` (já está) |

A issue #213 já existe. Não crie outra.

Não divide arquivo com a #211, a #212 nem a #214. Pode ir antes ou depois delas; o Eduardo faz um PR por vez.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/src/auth/acesso.js` tem o item `/minha-conta` no `MENU` (a #196 está na `main`);
- `src/frontend/src/pages/LoginPage.jsx` abre com `useState('')` no e-mail e na senha e chama `navigate('/')`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/auth/acesso.js`
- `src/frontend/src/pages/LoginPage.jsx`
- `src/frontend/src/App.jsx`
- `src/frontend/src/pages/LotsPage.jsx`
- `src/frontend/src/pages/DestinationsPage.jsx`

Os cinco são os da `main` mais o bloco novo. O `MENU` não muda.

- **`acesso.js`**: duas funções novas.
  - `paginaInicial(perfil)`: `/rota-do-dia` para o motorista, `/` para os outros.
  - `podeEscrever(perfil)`: administrador, gestor e técnico. São os mesmos perfis do POST, PUT, PATCH e DELETE de lotes e destinações na API.
- **`LoginPage.jsx`**: depois do login, vai para `paginaInicial` do perfil. O motorista cai na **Rota do dia**, que é o trabalho dele; o **Dashboard** continua no menu.
- **`App.jsx`**: `/login` com sessão aberta e endereço desconhecido também levam para a `paginaInicial`. Sem isso, o redirecionamento do `/login` mandava o motorista de volta para o Dashboard.
- **`LotsPage.jsx`** e **`DestinationsPage.jsx`**: para o auditor, a página mostra só a lista. Ficam escondidos o formulário de cadastro e a coluna **Ações** (Editar, Pendente, Em triagem, Concluir, Excluir), e o texto do topo diz que o perfil só consulta. Antes, o auditor via os botões, clicava e recebia 403 da API. Heurística de Nielsen: prevenção de erro.

Fora desta Task: a confirmação ao desativar usuário e as outras páginas.

## PR

Título: `feat: abre a rota do dia para o motorista e esconde a escrita do auditor`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #213` e `Refs #183`.
- **Resumo**: o motorista entra pela Rota do dia; o auditor vê Lotes e Destinação só para consulta.
- **Tipo de mudança**: Requisito.
- **Evidências**: print da Rota do dia logo depois do login do motorista e das páginas Lotes e Destinação logado como auditor.

## Como validar

- `npm run build` termina sem erro.
- Login como motorista → abre `/rota-do-dia`. O menu ainda tem **Dashboard**.
- Motorista logado abrindo `/login` ou `/qualquer-coisa` → volta para `/rota-do-dia`.
- Login como administrador, gestor, técnico ou auditor → abre o Dashboard, como antes.
- Auditor em **Lotes** e **Destinação**: só a lista, sem formulário e sem a coluna Ações.
- Técnico em **Lotes** e **Destinação**: formulário e botões, como antes.
