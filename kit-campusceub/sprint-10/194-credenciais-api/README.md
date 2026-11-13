# Task — Credenciais na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/194 |
| Quem | Davi |
| PBI | [#179](https://github.com/CAMPUSCEUB/EcoTrack/issues/179) US22 — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/194-credenciais-api` |
| Commit | `feat: protege as credenciais e permite trocar a senha na api` |
| Destino | `src/backend`, `src/docker-compose.yml` e `src/.env.example` |
| Depende de | Sprint 09 na `main` |

A issue #194 já existe. Não crie outra.

Primeira Task da sprint. A API protegida, a tela **Minha conta** e a implantação esperam o merge desta.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/config/schema.js` tem o `INSERT` do `admin@wert.com.br` com o `adminHash` fixo e as tabelas `rota` e `parada` com `status_recolhimento`;
- `src/backend/src/controllers/authController.js` exporta só `login`;
- `src/docker-compose.yml` tem o valor do `JWT_SECRET` escrito direto no serviço `backend`.

Se estiver diferente, pare e avise o Code Review: copiar esta pasta por cima de outro arquivo apaga código.

## O que copiar (sobrescrever)

- `src/backend/src/config/schema.js`
- `src/backend/src/server.js`
- `src/backend/src/controllers/authController.js`
- `src/backend/src/routes/authRoutes.js`
- `src/backend/src/controllers/userController.js`
- `src/backend/.env.example`
- `src/docker-compose.yml`
- `src/.env.example` (novo)

Todos são os arquivos da `main` mais o bloco novo. As tabelas do `schema.js` não mudam.

- **Administrador inicial** (`schema.js`): sai o `INSERT` com a senha fixa. Ao subir, a API cria um administrador só se o banco não tiver nenhum, com o `ADMIN_EMAIL` e o `ADMIN_PASSWORD` do ambiente (`ADMIN_NOME` é opcional). Sem `ADMIN_PASSWORD`, ou com menos de 8 caracteres, não cria e mostra um aviso no log. Se o e-mail já for de outro usuário, também não cria. Nenhuma senha fica no código.
- **Conexão com o banco** (`schema.js`): `DB_SCHEMA_ATTEMPTS` (padrão 20) e `DB_SCHEMA_RETRY_DELAY_MS` (padrão 3000). Antes eram 3 tentativas de 2 s, e a primeira subida derrubava a API enquanto o SQL Server ainda não estava pronto.
- **`JWT_SECRET` obrigatório** (`server.js`): sem ele, a API escreve o erro no log e não sobe.
- **Login** (`authController.js`): a conta inativa só é informada (403) depois de a senha conferir. Senha errada numa conta inativa → 401, como qualquer senha errada. O 500 não devolve mais o `error.message`.
- **`PUT /auth/senha`** (`authController.js` e `authRoutes.js`): usuário logado, corpo `{ senha_atual, nova_senha }`.
  - Campo faltando → 400.
  - Nova senha com menos de 8 caracteres → 400.
  - Nova senha igual à atual → 400.
  - Senha atual errada → **400**, não 401. O 401 faz a tela derrubar a sessão.
  - Usuário inativo → 403.
  - Certo → 200 `{ message: 'Senha alterada com sucesso.' }`.
- **Usuários** (`userController.js`): senha com no mínimo 8 caracteres no cadastro e na edição. Na edição, senha vazia continua mantendo a atual.
- **`docker-compose.yml` e `.env.example`**: o `JWT_SECRET` e o `ADMIN_PASSWORD` saem do `src/.env`, que não vai para o repositório. O `.gitignore` da raiz já ignora `.env` e mantém `.env.example`.

Sem tela nesta Task: a página **Minha conta** e o login vazio são outra Task.

## Subir no Docker depois do merge

```bash
cd src
cp .env.example .env
```

No `src/.env`, preencha o `JWT_SECRET` (por exemplo, com o resultado de `openssl rand -hex 32`). Com banco novo, preencha também o `ADMIN_PASSWORD`, com 8 caracteres ou mais. Sem ele não há administrador para entrar.

```bash
docker compose up --build
```

Sem `src/.env`, o `docker compose` para e mostra “Defina JWT_SECRET no arquivo src/.env”.

Banco criado antes desta Task: o `admin@wert.com.br` continua lá com a senha antiga, e a API não cria outro. Troque essa senha pelo `PUT /auth/senha` (ou pela tela **Minha conta**, quando ela entrar).

## PR

Título: `feat: protege as credenciais e permite trocar a senha na api`

Corpo: o template do repositório inteiro, com os títulos `##`. Preencha assim:

- **Issue relacionada**: `Closes #194` e, na linha de baixo, `Refs #179`.
- **Resumo**: administrador inicial pelo ambiente, sem senha no código; `JWT_SECRET` obrigatório; mais tentativas de conexão com o banco; `PUT /auth/senha`; senha mínima de 8 caracteres; login só informa conta inativa depois de conferir a senha; compose lendo o `src/.env`.
- **Tipo de mudança**: Requisito.
- **Como validar**: os itens da seção abaixo que você testou.
- **Evidências**: print do log com “administrador inicial criado” e das respostas do `PUT /auth/senha` (200 e 400).

## Como validar

- Sem `JWT_SECRET`, `npm run dev` em `src/backend` mostra `[bootstrap] JWT_SECRET não definido` e para.
- Banco sem administrador e sem `ADMIN_PASSWORD`: o log mostra o aviso “nenhum administrador no banco” e nenhum usuário é criado.
- Banco sem administrador, com `ADMIN_EMAIL` e `ADMIN_PASSWORD`: o log mostra “administrador inicial criado” e o login com esses dados devolve 200.
- Subir de novo com outro `ADMIN_EMAIL`: não cria um segundo administrador.
- `PUT /auth/senha` sem token → 401. Senha nova com 7 caracteres → 400. Senha atual errada → 400. Certo → 200. Depois disso, a senha antiga dá 401 no login e a nova entra.
- `POST /usuarios` com senha de 7 caracteres → 400. `PUT /usuarios/:id` sem senha mantém a senha.
- Conta inativa: senha errada → 401 “Credenciais inválidas.”; senha certa → 403 “Usuário inativo.”.
- `git status` não mostra o `src/.env`.
