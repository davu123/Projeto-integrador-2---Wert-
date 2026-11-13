# Task — Login vazio e tela Minha conta

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/196 |
| Quem | Eduardo |
| PBI | [#179](https://github.com/CAMPUSCEUB/EcoTrack/issues/179) US22 — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/196-tela-minha-conta` |
| Commit | `feat: abre o login vazio e cria a tela minha conta` |
| Destino | só `src/frontend` |
| Depende de | merge da Task de credenciais na API (#194) |

A issue #196 já existe. Não crie outra.

Começar **depois** do merge da #194: a tela chama o `PUT /auth/senha`. Pode ir em paralelo com a API protegida (#195), que não mexe nestes arquivos.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/routes/authRoutes.js` tem `router.put('/senha', ...)` (a #194 está na `main`). Se faltar, pare e espere o merge;
- `src/frontend/src/auth/acesso.js` tem o item `/rota-do-dia` no `MENU`;
- `src/frontend/src/App.jsx` tem a rota `/rota-do-dia` com `RotaProtegida`.

Se o `acesso.js` ou o `App.jsx` estiverem diferentes, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/LoginPage.jsx`
- `src/frontend/src/auth/acesso.js`
- `src/frontend/src/App.jsx`
- `src/frontend/src/pages/AccountPage.jsx` (novo)
- `src/frontend/src/services/authService.js` (novo)

Os três primeiros são os da `main` mais o bloco novo:

- **`LoginPage.jsx`**: os campos de e-mail e senha abrem vazios. Antes vinham com o e-mail e a senha do administrador.
- **`acesso.js`**: item `{ href: '/minha-conta', label: 'Minha conta' }` no `MENU`, com os cinco perfis (administrador, gestor, tecnico, auditor e motorista).
- **`App.jsx`**: rota `/minha-conta` com `RotaProtegida`, como as outras. Ela precisa estar no `MENU`: o `App.jsx` protege cada rota pelo `href` exato do `MENU`, e uma rota fora dele deixaria a página sem a lista de perfis.

Os dois novos:

- **`authService.js`**: `alterarSenha(senha_atual, nova_senha)` chama o `PUT /auth/senha`.
- **`AccountPage.jsx`**: mostra o nome e o e-mail de quem está logado e o formulário com senha atual, nova senha e confirmação. Antes de chamar a API, confere se a nova senha tem 8 caracteres ou mais, se a confirmação é igual e se a nova senha é diferente da atual. A mensagem da API (por exemplo, “Senha atual incorreta.”) aparece no formulário. Depois de salvar, os campos ficam vazios e a sessão continua.

A página usa as classes que já existem (`card`, `form-card`, `form-grid`, `alert`, `primary-btn`). Identidade visual nova não entra nesta Task.

## PR

Título: `feat: abre o login vazio e cria a tela minha conta`

Corpo: o template do repositório inteiro, com os títulos `##`. Preencha assim:

- **Issue relacionada**: `Closes #196` e, na linha de baixo, `Refs #179`.
- **Resumo**: login abre sem credencial preenchida; página **Minha conta** com troca de senha para os cinco perfis.
- **Tipo de mudança**: Requisito.
- **Como validar**: os itens da seção abaixo que você testou.
- **Evidências**: print do login vazio, da mensagem de senha atual errada e da mensagem de sucesso.

## Como validar

- `/login` abre com e-mail e senha vazios.
- Os cinco perfis veem **Minha conta** no menu.
- Nova senha com menos de 8 caracteres → “A nova senha deve ter pelo menos 8 caracteres.”, sem chamar a API.
- Confirmação diferente → “A confirmação não é igual à nova senha.”.
- Senha atual errada → “Senha atual incorreta.”, e o usuário continua logado.
- Tudo certo → “Senha alterada com sucesso.”. Sair e entrar de novo: a senha antiga não entra e a nova entra.
- `npm run build` em `src/frontend` termina sem erro.
