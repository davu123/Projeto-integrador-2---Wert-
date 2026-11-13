# Task — API protegida e download autenticado

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/195 |
| Quem | Davi |
| PBI | [#180](https://github.com/CAMPUSCEUB/EcoTrack/issues/180) US23 — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/195-api-protegida` |
| Commit | `feat: protege a api e exige login para baixar relatorio` |
| Destino | `src/backend` e `src/docker-compose.yml` |
| Depende de | merge da Task de credenciais na API (#194) |

A issue #195 já existe. Não crie outra.

Começar **depois** do merge da #194. As duas alteram `userController.js`, `backend/.env.example` e `docker-compose.yml`, e os arquivos desta pasta já trazem o que a #194 colocou. Copiar antes do merge da #194 apaga o trabalho dela.

A tela de download e a implantação esperam esta Task.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/controllers/authController.js` exporta `login` e `alterarSenha` (a #194 está na `main`);
- `src/backend/src/app.js` tem `app.use('/uploads', express.static(...))`;
- `src/backend/src/controllers/reportController.js` monta o PDF com `new PDFDocument` e tem a seção “Rota de coleta” da Sprint 09.

Se faltar algum, pare e avise o Code Review.

## Instalar as dependências

Em `src/backend`:

```bash
npm install helmet@8 express-rate-limit@8
```

O `package.json` e o `package-lock.json` mudam e entram no mesmo commit. A imagem de produção usa `npm ci`, que falha se o `package-lock.json` não estiver junto.

## O que copiar (sobrescrever)

- `src/backend/src/app.js`
- `src/backend/src/controllers/reportController.js`
- `src/backend/src/routes/reportRoutes.js`
- `src/backend/src/middlewares/authMiddleware.js`
- `src/backend/src/controllers/agencyController.js`
- `src/backend/src/controllers/dashboardController.js`
- `src/backend/src/controllers/destinacaoController.js`
- `src/backend/src/controllers/equipmentController.js`
- `src/backend/src/controllers/loteController.js`
- `src/backend/src/controllers/userController.js` (repete o bloco da #194)
- `src/backend/.env.example` (repete o bloco da #194)
- `src/docker-compose.yml` (repete o bloco da #194)

O que muda:

- **Download autenticado**: `GET /relatorios/:id/arquivo`, com token e os perfis do `GET /relatorios` (administrador, gestor e auditor). O caminho vem do banco e precisa ficar dentro da pasta `uploads`. Fora dela, ou arquivo que sumiu → 404. Id inválido → 400. O PDF sai como anexo, `relatorio-lote-<lote>-<id>.pdf`.
- **`/uploads` deixa de ser público**: sai o `express.static`. O `arquivo_pdf_url` continua salvo no banco do mesmo jeito; quem baixa é a rota nova.
- **helmet**: cabeçalhos de segurança em todas as respostas da API.
- **CORS**: `CORS_ORIGIN` com uma origem ou uma lista separada por vírgula. Origem fora da lista não recebe o cabeçalho de CORS. No `docker-compose.yml`, o padrão é `http://localhost:5174`.
- **Limite de login**: `POST /auth/login` aceita `LOGIN_RATE_LIMIT` tentativas erradas (padrão 10) por IP em 15 minutos. Depois → 429 com mensagem. Login certo não conta. `TRUST_PROXY` diz quantos proxies há na frente da API (vazio no desenvolvimento, `1` atrás do Caddy da implantação). Sem ele, atrás de um proxy, todos os usuários contariam como um IP só.
- **Erros em JSON**: rota que não existe → 404 `{ message: 'Rota não encontrada.' }`. JSON malformado → 400. Erro não tratado → 500 `{ message: 'Erro interno do servidor.' }`.
- **Sem detalhe interno**: nenhum controller nem o `authMiddleware` devolve `error.message` na resposta. O erro vai para o log com `console.error`.
- **`/health`**: consulta o banco. Com banco → 200 `{ message, banco: 'ok' }`. Sem banco → 503.

Sem tela nesta Task: o botão de download que usa a rota nova é outra Task. Até ela entrar, o link antigo da tela **Relatórios** dá 404, porque o `/uploads` não é mais público.

## Subir no Docker depois do merge

Na primeira subida depois desta Task, use `-V`. O container guarda o `node_modules` num volume, e sem `-V` o helmet não aparece lá:

```bash
cd src
docker compose up --build -V
```

Abra a tela em `http://localhost:5174`. Por `http://127.0.0.1:5174` o CORS bloqueia, a menos que essa origem entre no `CORS_ORIGIN` do `src/.env`.

## PR

Título: `feat: protege a api e exige login para baixar relatorio`

Corpo: o template do repositório inteiro, com os títulos `##`. Preencha assim:

- **Issue relacionada**: `Closes #195` e, na linha de baixo, `Refs #180`.
- **Resumo**: `GET /relatorios/:id/arquivo` com login e perfil; `/uploads` fora do ar público; helmet; CORS por `CORS_ORIGIN`; limite de tentativas no login; 404 e 500 em JSON; nenhum `error.message` na resposta; `/health` consulta o banco.
- **Tipo de mudança**: Requisito.
- **Como validar**: os itens da seção abaixo que você testou.
- **Evidências**: print do 401, do 403 e do 200 no download, do 429 no login e do `/health`.

## Como validar

- `GET /relatorios/1/arquivo` sem token → 401. Com token de técnico ou motorista → 403. Com token de administrador, gestor ou auditor → 200 e o PDF.
- `GET /relatorios/abc/arquivo` → 400. Relatório que não existe → 404.
- `http://localhost:3001/uploads/reports/<arquivo>.pdf` → 404 em JSON.
- `GET /rota-que-nao-existe` → 404 em JSON.
- Banco parado: `GET /health` → 503 e `GET /agencias` → 500 só com `message`, sem `error`.
- Com `LOGIN_RATE_LIMIT=3`: três logins errados e o quarto → 429 “Muitas tentativas de login. Tente de novo em 15 minutos.”.
- A resposta tem `X-Content-Type-Options: nosniff` e não tem `X-Powered-By`.
- A tela em `http://localhost:5174` continua entrando e listando.
