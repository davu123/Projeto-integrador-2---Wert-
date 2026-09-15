# ROADMAP — EcoTrack Wert (reconstrução)

Spec em `docs/context/`. Este arquivo é **execução**: uma tarefa por conversa, aceite testável, um commit.

Agente: **não ler o ROADMAP inteiro**. Ler só **Como usar**, **Progresso** e a **tarefa escolhida**.

## Como usar

SDD neste repo: uma tarefa = um objetivo, docs explícitos, aceite testável, um commit. Sem “faça a fase inteira”. Tipo `autor` ou bloqueada: parar e mostrar o prompt do autor. `referencia/` é read-only depois de 0.1. Sprints 1–5 copiam da referência; 6–9 são código novo.

## Prompt mestre — agente

```text
Uma tarefa por conversa.
Ler AGENTS.md por completo.
Pegar a primeira - [ ] da fase mais baixa não bloqueada.
Tipo autor ou bloqueada: parar e dizer o prompt do autor.
Decisão registrada (pendente): perguntar, não chutar.
Só arquivos permitidos; fora de escopo à risca.
Testar → aceite → checkbox → commit da mensagem sugerida (Conventional Commits).
Não executar a próxima na mesma conversa.
Não editar referencia/ depois de 0.1.
Commits sem PI1, legado ou “já existia”.
```

## Prompt mestre — autor

Tarefas `autor` / `autor+agente`: o humano passa fatos; o agente só formata. Não confirmado = `pendente`. O agente não marca revisão humana como verdadeira.

## Prompt de continuação

```text
Continuar o ROADMAP: uma tarefa, a primeira aberta da fase mais baixa não bloqueada. Não pular gate do autor.
```

## Fechar uma tarefa

1. Implementar só o escopo da tarefa.
2. Testar com os passos de "Como testar".
3. Conferir todos os critérios de aceite.
4. Se passou: marcar `[x]` no Progresso **e** no título da tarefa.
5. Commit com a mensagem sugerida, só arquivos permitidos + `ROADMAP.md`.
6. Parar. Não puxar a próxima tarefa na mesma conversa.

Não marcar `[x]` por “quase pronto”, linter verde sem o teste da tarefa, ou arquivos escritos sem o aceite.

## Decisão do autor

Se a tarefa tiver **PARAR — decisão do autor** e **Decisão registrada:** `(pendente)`: não implementar. Perguntar. Esperar o autor gravar a decisão na tarefa.

## Regras permanentes

- Não `git add -A`; não amend; não force push; não `--no-verify`.
- Windows: `git commit -m "type(id): descrição"` (Conventional Commits, uma linha).
- Sem datas no ROADMAP. Horizonte ≠ backlog.
- Não copiar `newequipment.jsx`, `reportsPage.jsx`, dockerfiles duplicados em `src/`, `authservice.js`, `equipmentservice.js`.

## Progresso

- [ ] Fase 0 — congelar referência e esqueleto do app
- [x] Tarefa 0.1 — copiar o sistema funcional para referencia/
- [ ] Tarefa 0.2 — autor: Compose da referência sobe
- [x] Tarefa 0.3 — esqueleto Docker do app/
- [ ] Tarefa 0.4 — autor: health do app
- [x] Tarefa 0.5 — decisão: duplicata na raiz
- [ ] Fase 1 — login e agências
- [x] Tarefa 1.1 — POST /auth/login e schema usuario
- [ ] Tarefa 1.2 — tela de login e sessão
- [ ] Tarefa 1.3 — CRUD de agências na API
- [ ] Tarefa 1.4 — tela de agências
- [ ] Tarefa 1.5 — autor: login e agências no browser
- [ ] Fase 2 — usuários e lotes
- [ ] Tarefa 2.1 — CRUD de usuários na API
- [ ] Tarefa 2.2 — tela de usuários
- [ ] Tarefa 2.3 — CRUD de lotes na API (sem PATCH status)
- [ ] Tarefa 2.4 — tela de lotes (sem ciclo de status)
- [ ] Tarefa 2.5 — autor: usuários e lotes no browser
- [ ] Fase 3 — status do lote e equipamentos
- [ ] Tarefa 3.1 — PATCH status do lote
- [ ] Tarefa 3.2 — UI de status do lote
- [ ] Tarefa 3.3 — GET/POST equipamentos na API
- [ ] Tarefa 3.4 — cadastrar e listar equipamentos
- [ ] Tarefa 3.5 — autor: status e equipamentos no browser
- [ ] Fase 4 — destinação e gerar PDF
- [ ] Tarefa 4.1 — CRUD destinação na API
- [ ] Tarefa 4.2 — tela de destinação
- [ ] Tarefa 4.3 — POST gerar PDF
- [ ] Tarefa 4.4 — botão gerar PDF
- [ ] Tarefa 4.5 — autor: destinação e PDF no browser
- [ ] Fase 5 — dashboard e arquivo de PDFs
- [ ] Tarefa 5.1 — GET /dashboard
- [ ] Tarefa 5.2 — tela dashboard
- [ ] Tarefa 5.3 — GET /relatorios
- [ ] Tarefa 5.4 — listar e baixar PDFs
- [ ] Tarefa 5.5 — autor: dashboard e downloads
- [ ] Fase 6 — motorista, permissões, F12
- [ ] Tarefa 6.1 — perfil motorista
- [ ] Tarefa 6.2 — autorização por perfil na API
- [ ] Tarefa 6.3 — filtrar menu e rotas no front
- [ ] Tarefa 6.4 — não concluir lote sem destinação
- [ ] Tarefa 6.5 — autor: RBAC e F12
- [ ] Fase 7 — rota e atribuição manual
- [ ] Tarefa 7.1 — schema rota e parada
- [ ] Tarefa 7.2 — CRUD de rota na API
- [ ] Tarefa 7.3 — atribuir motorista à rota
- [ ] Tarefa 7.4 — telas de planejamento
- [ ] Tarefa 7.5 — autor: rota sem GPS
- [ ] Fase 8 — rota do dia e recolhimento
- [ ] Tarefa 8.1 — GET rota do motorista
- [ ] Tarefa 8.2 — tela do motorista na base
- [ ] Tarefa 8.3 — PATCH status de recolhimento
- [ ] Tarefa 8.4 — UI de recolhimento
- [ ] Tarefa 8.5 — autor: motorista na base
- [ ] Fase 9 — editar equipamento, PDF e coletas
- [ ] Tarefa 9.1 — PUT /equipamentos/:id
- [ ] Tarefa 9.2 — tela editar equipamento
- [ ] Tarefa 9.3 — rota e motorista no PDF
- [ ] Tarefa 9.4 — gestor vê coletas
- [ ] Tarefa 9.5 — autor: fechamento da visão

### Decisões do autor

| Tarefa | O que decidir | Registrada |
|---|---|---|
| 0.5 | Apagar `backend/` e `frontend/` da raiz após a referência existir? | apagar (20/08/2026) |
| horizonte | Ferramenta para copiar só `app/` ao GitHub novo | `(pendente)` |

---

## Fase 0 — congelar referência e esqueleto do app

**Objetivo:** ter o sistema que já funciona em `referencia/` e um `app/` que sobe vazio (health).
**Pronto quando:** 0.2 e 0.4 confirmados pelo autor; 0.1 e 0.3 commitados.
**Depende de:** spec em `docs/context/` e `docs/reverse-engineering/`.

### Tarefa 0.1 — copiar o sistema funcional para referencia/ [x]

- **Tipo:** agente
- **Bloqueada por:** nada
- **Docs obrigatórios:** `docs/context/01-information-architecture.md`, `docs/context/03-tech-stack.md`
- **Arquivos permitidos (novos):** `referencia/backend/**`, `referencia/frontend/**`, `referencia/docker-compose.yml`, `referencia/README.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Copiar `backend/` e `frontend/` da raiz para `referencia/`, **excluindo** `node_modules`, `.git` e arquivos `.env` (copiar só `.env.example`).
2. Copiar `docker-compose.yml` da raiz para `referencia/docker-compose.yml` com contextos `./backend` e `./frontend` relativos a `referencia/`.
3. Escrever `referencia/README.md`: `docker compose up --build`; portas 1433/3000/5173; health `http://127.0.0.1:3000/health`.
4. Não alterar o código copiado (freeze).

**Fora de escopo:** `app/`; apagar a raiz; editar Lean Inception.

**Critérios de aceite:**

- Existem `referencia/backend/src/app.js` e `referencia/frontend/src/App.jsx`.
- Não há `referencia/**/node_modules` nem `referencia/**/.env`.
- Compose da referência usa portas 1433, 3000, 5173.

**Como testar:**

- Listar as pastas e confirmar ausência de `node_modules` em `referencia/`.
- Abrir `referencia/docker-compose.yml` e conferir ports.

**Commit sugerido:** `chore(0.1): congela o sistema funcional em referencia`

### Tarefa 0.2 — autor: Compose da referência sobe

- **Tipo:** autor
- **Bloqueada por:** 0.1
- **Docs obrigatórios:** `referencia/README.md`
- **Arquivos permitidos (novos):**
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. O autor sobe `docker compose` em `referencia/` e confirma `/health` e o front em 5173.
2. Relata ao agente o resultado (ok / erro + log).
3. O agente só marca `[x]` se o autor confirmou que subiu.

**Fora de escopo:** o agente fingir que testou Docker.

**Critérios de aceite:**

- Autor registrou que `http://127.0.0.1:3000/health` respondeu.

**Como testar:**

- Fato do autor, não do agente.

**Commit sugerido:** `docs(0.2): registra que a referencia sobe no docker`

### Tarefa 0.3 — esqueleto Docker do app/ [x]

- **Tipo:** agente
- **Bloqueada por:** 0.1
- **Docs obrigatórios:** `docs/context/03-tech-stack.md`, `docs/context/04-design-system.md`
- **Arquivos permitidos (novos):** `app/docker-compose.yml`, `app/backend/**`, `app/frontend/**`, `app/README.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Criar `app/backend` com `package.json` (express, cors, dotenv, mssql — jwt/bcrypt/pdfkit podem entrar já para não quebrar o lock nas sprints), `dockerfile` no estilo da referência, `.env.example` com `PORT=3001`, `DB_DATABASE=EcoTrackWertApp`, `server.js` + `app.js` só com `GET /health`, `config/database.js` copiado da referência e `schema.js` que só garante o banco vazio (sem tabelas de domínio).
2. Criar `app/frontend` com Vite/React, `dockerfile`, port 5174, `index.html`, `main.jsx`, página placeholder “EcoTrack Wert”, copiar `styles/global.css`, `responsive.css` e `logo-wert.png` da referência.
3. `app/docker-compose.yml`: SQL na 1434, backend 3001, frontend 5174, `VITE_API_URL=http://localhost:3001`.
4. `app/README.md` com os comandos. Sem rotas de produto.

**Fora de escopo:** login, tabelas de negócio, copiar controllers.

**Critérios de aceite:**

- Compose declara 1434, 3001, 5174.
- Backend tem `/health`.
- Front placeholder usa o CSS copiado (arquivo `global.css` presente).

**Como testar:**

- Conferir ports no Compose e o handler `/health` no `app.js`.

**Commit sugerido:** `chore(0.3): cria esqueleto docker do app`

### Tarefa 0.4 — autor: health do app

- **Tipo:** autor
- **Bloqueada por:** 0.3
- **Docs obrigatórios:** `app/README.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor sobe Compose em `app/` e chama `http://127.0.0.1:3001/health` e abre 5174.
2. Agente marca `[x]` só com confirmação.

**Fora de escopo:** implementar sprint 1.

**Critérios de aceite:**

- Autor confirmou health 3001 e front 5174.

**Como testar:**

- Fato do autor.

**Commit sugerido:** `docs(0.4): registra que o esqueleto do app sobe`

### Tarefa 0.5 — decisão: duplicata na raiz [x]

- **Tipo:** autor
- **Bloqueada por:** 0.2
- **Docs obrigatórios:** `docs/context/06-roadmap-briefing.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`, `README.md` (só depois da decisão)

> Decisão do autor gravada. Não reabrir este fork.

**Pergunta:** Apagar `backend/` e `frontend/` da raiz agora que `referencia/` existe, ou manter até o `app/` ser o dia a dia?
**Opções:** apagar a duplicata da raiz / manter raiz + referencia + app / só atualizar o README raiz apontando os dois Compose
**Decisão registrada:** apagar a duplicata da raiz (20/08/2026)

**Fazer:**

1. Remover `backend/` e `frontend/` da raiz e o `docker-compose.yml` raiz (hashes iguais aos de `referencia/`).
2. README raiz aponta `referencia/` (funcional) e `app/` (semestre).

**Fora de escopo:** chutar a opção.

**Critérios de aceite:**

- Decisão gravada nesta tarefa; README raiz não contradiz.

**Como testar:**

- Relê a decisão e o README.

**Commit sugerido:** `docs(0.5): alinha a raiz com referencia e app`

---

## Fase 1 — login e agências

**Objetivo:** F01 e F05 em `app/`.
**Pronto quando:** 1.5 confirmado.
**Depende de:** fase 0 (0.3 no mínimo; 0.4 preferível).

### Tarefa 1.1 — POST /auth/login e schema usuario [x]

- **Tipo:** agente
- **Bloqueada por:** 0.3
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-01.md`, `referencia/backend/src/controllers/authController.js`, `referencia/backend/src/config/schema.js`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/authController.js`, `app/backend/src/routes/authRoutes.js`, `app/backend/src/middlewares/authMiddleware.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `app/backend/src/config/schema.js`, `app/backend/package.json`, `ROADMAP.md`

**Fazer:**

1. Copiar login JWT + middleware da referência.
2. No schema do app, só tabela `usuario` + seed admin (hash da referência).
3. Montar `/auth`. Dependências jwt e bcrypt se ainda não estiverem no package do app.

**Fora de escopo:** agências; front; outras tabelas.

**Critérios de aceite:**

- `POST /auth/login` existe; schema cria `usuario` sem `agencia`.

**Como testar:**

- Conferir rotas em `app.js` e o `CREATE TABLE dbo.usuario` no schema.

**Commit sugerido:** `feat(1.1): autentica usuario com jwt`

### Tarefa 1.2 — tela de login e sessão

- **Tipo:** agente
- **Bloqueada por:** 1.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-01.md`, `docs/context/04-design-system.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/LoginPage.jsx`, `app/frontend/src/context/AuthContext.jsx`, `app/frontend/src/components/ProtectedRoute.jsx`, `app/frontend/src/components/Layout.jsx`, `app/frontend/src/components/Header.jsx`, `app/frontend/src/components/Sidebar.jsx`, `app/frontend/src/services/api.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/main.jsx`, `ROADMAP.md`

**Fazer:**

1. Copiar login, AuthContext, ProtectedRoute, api.js (login + client) da referência.
2. Layout/Header/Sidebar: Sidebar só com home placeholder e (ainda sem) agências — ou só home até 1.4.
3. `/` autenticado = placeholder, **não** DashboardPage.
4. `VITE_API_URL` default `http://127.0.0.1:3001`.

**Fora de escopo:** AgenciesPage; DashboardPage.

**Critérios de aceite:**

- Rotas `/login` e `/` protegida; login grava token.

**Como testar:**

- Conferir `App.jsx` e que `DashboardPage` não existe no app.

**Commit sugerido:** `feat(1.2): adiciona tela de login e sessao`

### Tarefa 1.3 — CRUD de agências na API

- **Tipo:** agente
- **Bloqueada por:** 1.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-01.md`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/agencyController.js`, `app/backend/src/routes/agencyRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `app/backend/src/config/schema.js`, `ROADMAP.md`

**Fazer:**

1. Copiar controller/routes de agência; JWT em todas as rotas `/agencias`.
2. Acrescentar tabela `agencia` no schema.

**Fora de escopo:** front; usuários.

**Critérios de aceite:**

- `/agencias` montado; schema tem `agencia`.

**Como testar:**

- Conferir `app.use('/agencias'` e `dbo.agencia`.

**Commit sugerido:** `feat(1.3): cadastra agencias na api`

### Tarefa 1.4 — tela de agências

- **Tipo:** agente
- **Bloqueada por:** 1.2, 1.3
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-01.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/AgenciesPage.jsx`, `app/frontend/src/services/agencyService.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `ROADMAP.md`

**Fazer:**

1. Copiar AgenciesPage e agencyService.
2. Rota `/agencias` protegida; item Agências no Sidebar.

**Fora de escopo:** outras páginas.

**Critérios de aceite:**

- `/agencias` no `App.jsx`; Sidebar tem Agências.

**Como testar:**

- Grep `AgenciesPage` em `app/frontend`.

**Commit sugerido:** `feat(1.4): adiciona tela de agencias`

### Tarefa 1.5 — autor: login e agências no browser

- **Tipo:** autor
- **Bloqueada por:** 1.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-01.md`, `app/README.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor testa login seed + CRUD de agência em 5174.
2. Confirma 401 em `/agencias` sem token.

**Critérios de aceite:**

- Autor confirmou os dois fluxos.

**Como testar:**

- Fato do autor.

**Commit sugerido:** `docs(1.5): registra aceite da sprint de login e agencias`

---

## Fase 2 — usuários e lotes

**Objetivo:** F02 e F06 sem PATCH de status.
**Pronto quando:** 2.5 confirmado.
**Depende de:** fase 1.

### Tarefa 2.1 — CRUD de usuários na API

- **Tipo:** agente
- **Bloqueada por:** 1.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-02.md`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/userController.js`, `app/backend/src/routes/userRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `ROADMAP.md`

**Fazer:**

1. Copiar userController/routes da referência. CHECK **sem** `motorista`.

**Fora de escopo:** front; motorista; lotes.

**Critérios de aceite:**

- `/usuarios` montado; `PERFIS_VALIDOS` sem motorista.

**Como testar:**

- Grep `motorista` em `userController.js` do app — não deve aparecer.

**Commit sugerido:** `feat(2.1): cadastra usuarios na api`

### Tarefa 2.2 — tela de usuários

- **Tipo:** agente
- **Bloqueada por:** 2.1, 1.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-02.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/usersPage.jsx`, `app/frontend/src/services/userService.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `ROADMAP.md`

**Fazer:**

1. Copiar tela e service; rota `/usuarios`; Sidebar Usuários. Select sem motorista.

**Fora de escopo:** lotes.

**Critérios de aceite:**

- Rota e item de menu existem; opções de perfil iguais à API.

**Como testar:**

- Grep `motorista` em `usersPage.jsx` do app — não deve aparecer.

**Commit sugerido:** `feat(2.2): adiciona tela de usuarios`

### Tarefa 2.3 — CRUD de lotes na API (sem PATCH status)

- **Tipo:** agente
- **Bloqueada por:** 1.3, 2.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-02.md`, `referencia/backend/src/controllers/loteController.js`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/loteController.js`, `app/backend/src/routes/loteRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `app/backend/src/config/schema.js`, `ROADMAP.md`

**Fazer:**

1. Extrair GET/POST/PUT de lote da referência. **Não** exportar nem montar `atualizarStatusLote`.
2. Tabela `lote` no schema.

**Fora de escopo:** PATCH status; equipamentos.

**Critérios de aceite:**

- `loteRoutes` não tem `patch`; schema tem `lote`.

**Como testar:**

- Abrir `loteRoutes.js` do app e confirmar ausência de `patch`.

**Commit sugerido:** `feat(2.3): cadastra lotes na api`

### Tarefa 2.4 — tela de lotes (sem ciclo de status)

- **Tipo:** agente
- **Bloqueada por:** 2.3, 2.2
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-02.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/LotsPage.jsx`, `app/frontend/src/services/lotService.js`, `app/frontend/src/utils/formatters.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `ROADMAP.md`

**Fazer:**

1. Copiar LotsPage **sem** `alterarStatus` / botões de ciclo. lotService sem PATCH.
2. Copiar formatters se necessário. Rota `/lotes`.

**Fora de escopo:** equipamentos; PATCH.

**Critérios de aceite:**

- Página cria/edita lote; não chama `/lotes/:id/status`.

**Como testar:**

- Grep `atualizarStatusLote` em `app/frontend` — não deve existir.

**Commit sugerido:** `feat(2.4): adiciona tela de lotes`

### Tarefa 2.5 — autor: usuários e lotes no browser

- **Tipo:** autor
- **Bloqueada por:** 2.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-02.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor cria usuário e lote ligado a agência.

**Critérios de aceite:**

- Autor confirmou.

**Como testar:**

- Fato do autor.

**Commit sugerido:** `docs(2.5): registra aceite da sprint de usuarios e lotes`

---

## Fase 3 — status do lote e equipamentos

**Objetivo:** F07, F08, F09.
**Pronto quando:** 3.5 confirmado.
**Depende de:** fase 2.

### Tarefa 3.1 — PATCH status do lote

- **Tipo:** agente
- **Bloqueada por:** 2.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-03.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/loteController.js`, `app/backend/src/routes/loteRoutes.js`, `ROADMAP.md`

**Fazer:**

1. Copiar `atualizarStatusLote` e montar `PATCH /:id/status`.

**Fora de escopo:** F12 (sprint 6); front.

**Critérios de aceite:**

- PATCH existe; valores pendente/em_triagem/concluido.

**Como testar:**

- Grep `atualizarStatusLote` nas rotas do app.

**Commit sugerido:** `feat(3.1): atualiza status do lote na api`

### Tarefa 3.2 — UI de status do lote

- **Tipo:** agente
- **Bloqueada por:** 3.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-03.md`
- **Arquivos permitidos (editar):** `app/frontend/src/pages/LotsPage.jsx`, `app/frontend/src/services/lotService.js`, `ROADMAP.md`

**Fazer:**

1. Ligar `alterarStatus` como na referência.

**Fora de escopo:** equipamentos.

**Critérios de aceite:**

- UI chama PATCH de status.

**Como testar:**

- Grep `atualizarStatusLote` em `lotService.js` do app.

**Commit sugerido:** `feat(3.2): permite mudar status do lote na tela`

### Tarefa 3.3 — GET/POST equipamentos na API

- **Tipo:** agente
- **Bloqueada por:** 2.3
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-03.md`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/equipmentController.js`, `app/backend/src/routes/equipmentRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `app/backend/src/config/schema.js`, `ROADMAP.md`

**Fazer:**

1. Copiar GET+POST apenas. Tabela `equipamento`. Sem PUT.

**Fora de escopo:** PUT; destinação.

**Critérios de aceite:**

- Rotas só GET e POST; schema `equipamento`.

**Como testar:**

- Abrir `equipmentRoutes.js` do app — duas linhas de rota.

**Commit sugerido:** `feat(3.3): cadastra equipamentos na api`

### Tarefa 3.4 — cadastrar e listar equipamentos

- **Tipo:** agente
- **Bloqueada por:** 3.3, 2.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-03.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/EquipmentFormPage.jsx`, `app/frontend/src/pages/EquipmentListPage.jsx`, `app/frontend/src/services/equipmentApi.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `app/frontend/src/services/api.js`, `ROADMAP.md`

**Fazer:**

1. Copiar form + listagem. Não copiar `newequipment.jsx`. Rotas `/equipamentos/novo` e `/equipamentos`.

**Fora de escopo:** edição; destinação.

**Critérios de aceite:**

- Duas rotas no App; listagem sem botão editar.

**Como testar:**

- Grep `newequipment` em `app/frontend` — ausente.

**Commit sugerido:** `feat(3.4): adiciona cadastro e listagem de equipamentos`

### Tarefa 3.5 — autor: status e equipamentos no browser

- **Tipo:** autor
- **Bloqueada por:** 3.2, 3.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-03.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor muda status de um lote e cadastra/lista equipamento.

**Critérios de aceite:**

- Autor confirmou.

**Commit sugerido:** `docs(3.5): registra aceite da sprint de equipamentos`

---

## Fase 4 — destinação e gerar PDF

**Objetivo:** F11 e F14.
**Pronto quando:** 4.5 confirmado.
**Depende de:** fase 3.

### Tarefa 4.1 — CRUD destinação na API

- **Tipo:** agente
- **Bloqueada por:** 3.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-04.md`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/destinacaoController.js`, `app/backend/src/routes/destinacaoRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `app/backend/src/config/schema.js`, `ROADMAP.md`

**Fazer:**

1. Copiar destinação; tabela `destinacao`.

**Fora de escopo:** PDF; F12.

**Critérios de aceite:**

- `/destinacoes` montado.

**Como testar:**

- Grep `destinacoes` em `app/backend/src/app.js`.

**Commit sugerido:** `feat(4.1): registra destinacao na api`

### Tarefa 4.2 — tela de destinação

- **Tipo:** agente
- **Bloqueada por:** 4.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-04.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/DestinationsPage.jsx`, `app/frontend/src/services/destinationService.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `ROADMAP.md`

**Fazer:**

1. Copiar tela; rota `/destinacoes`.

**Fora de escopo:** relatórios.

**Critérios de aceite:**

- Rota e menu Destinação.

**Como testar:**

- Grep `DestinationsPage` em `app/frontend/src/App.jsx`.

**Commit sugerido:** `feat(4.2): adiciona tela de destinacao`

### Tarefa 4.3 — POST gerar PDF

- **Tipo:** agente
- **Bloqueada por:** 4.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-04.md`, `referencia/backend/src/controllers/reportController.js`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/reportController.js`, `app/backend/src/routes/reportRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `app/backend/src/config/schema.js`, `app/backend/package.json`, `ROADMAP.md`

**Fazer:**

1. Copiar só `gerarRelatorio`; `POST /relatorios/gerar`; tabela `relatorio`; static `/uploads`; pdfkit. **Não** exportar `listarRelatorios`.

**Fora de escopo:** GET lista; F16.

**Critérios de aceite:**

- reportRoutes só tem POST gerar.

**Como testar:**

- Abrir `reportRoutes.js` do app — uma rota POST.

**Commit sugerido:** `feat(4.3): gera pdf de conformidade do lote`

### Tarefa 4.4 — botão gerar PDF

- **Tipo:** agente
- **Bloqueada por:** 4.3
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-04.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/Reports.jsx`, `app/frontend/src/services/reportsService.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `app/frontend/src/services/api.js`, `ROADMAP.md`

**Fazer:**

1. Tela com gerar por `lote_id`. Sem tabela de downloads. Não copiar `reportsPage.jsx`.

**Fora de escopo:** listar PDFs.

**Critérios de aceite:**

- `/relatorios` gera; sem UI de lista (ou lista vazia sem GET).

**Como testar:**

- Grep `listarRelatorios` em `app/frontend` — ausente.

**Commit sugerido:** `feat(4.4): adiciona geracao de pdf na tela`

### Tarefa 4.5 — autor: destinação e PDF no browser

- **Tipo:** autor
- **Bloqueada por:** 4.2, 4.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-04.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor registra destinação e gera PDF; confere arquivo em uploads.

**Commit sugerido:** `docs(4.5): registra aceite da sprint de destinacao e pdf`

---

## Fase 5 — dashboard e arquivo de PDFs

**Objetivo:** F13 e F15.
**Pronto quando:** 5.5 confirmado.
**Depende de:** fase 4.

### Tarefa 5.1 — GET /dashboard

- **Tipo:** agente
- **Bloqueada por:** 4.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-05.md`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/dashboardController.js`, `app/backend/src/routes/dashboardRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `ROADMAP.md`

**Fazer:**

1. Copiar dashboard da referência (totais e quebras). Sem indicador de coletas (F21).

**Critérios de aceite:**

- `GET /dashboard` montado.

**Como testar:**

- Grep `dashboard` em `app/backend/src/app.js`.

**Commit sugerido:** `feat(5.1): expoe indicadores no dashboard da api`

### Tarefa 5.2 — tela dashboard

- **Tipo:** agente
- **Bloqueada por:** 5.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-05.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/DashboardPage.jsx`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `app/frontend/src/services/api.js`, `ROADMAP.md`

**Fazer:**

1. Copiar DashboardPage; `/` passa a usá-la; item Dashboard no Sidebar.

**Critérios de aceite:**

- `App.jsx` importa DashboardPage na rota `/`.

**Como testar:**

- Abrir `App.jsx`.

**Commit sugerido:** `feat(5.2): adiciona tela de dashboard`

### Tarefa 5.3 — GET /relatorios

- **Tipo:** agente
- **Bloqueada por:** 4.3
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-05.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/reportController.js`, `app/backend/src/routes/reportRoutes.js`, `ROADMAP.md`

**Fazer:**

1. Copiar `listarRelatorios` e `GET /`.

**Critérios de aceite:**

- GET e POST em reportRoutes.

**Como testar:**

- Abrir `reportRoutes.js`.

**Commit sugerido:** `feat(5.3): lista relatorios pdf na api`

### Tarefa 5.4 — listar e baixar PDFs

- **Tipo:** agente
- **Bloqueada por:** 5.3, 4.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-05.md`
- **Arquivos permitidos (editar):** `app/frontend/src/pages/Reports.jsx`, `app/frontend/src/services/reportsService.js`, `ROADMAP.md`

**Fazer:**

1. Completar lista e link de download como na referência.

**Critérios de aceite:**

- Tela lista PDFs e permite baixar.

**Como testar:**

- Grep `arquivo_pdf_url` em `Reports.jsx` do app.

**Commit sugerido:** `feat(5.4): lista e baixa pdfs gerados`

### Tarefa 5.5 — autor: dashboard e downloads

- **Tipo:** autor
- **Bloqueada por:** 5.2, 5.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-05.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor vê totais no dashboard e baixa um PDF.

**Commit sugerido:** `docs(5.5): registra aceite do nucleo de rastreabilidade`

---

## Fase 6 — motorista, permissões, F12

**Objetivo:** F03, F04, F12 (código **novo**).
**Pronto quando:** 6.5 confirmado.
**Depende de:** fase 5.

### Tarefa 6.1 — perfil motorista

- **Tipo:** agente
- **Bloqueada por:** 5.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-06.md`
- **Arquivos permitidos (editar):** `app/backend/src/config/schema.js`, `app/backend/src/controllers/userController.js`, `app/frontend/src/pages/usersPage.jsx`, `ROADMAP.md`

**Fazer:**

1. Incluir `motorista` no CHECK (ALTER se a tabela já existe — script idempotente), `PERFIS_VALIDOS` e select do front.

**Fora de escopo:** rotas; middleware F04.

**Critérios de aceite:**

- Criar usuário com perfil motorista via API.

**Como testar:**

- Grep `motorista` nos três arquivos.

**Commit sugerido:** `feat(6.1): inclui perfil motorista no cadastro`

### Tarefa 6.2 — autorização por perfil na API

- **Tipo:** agente
- **Bloqueada por:** 6.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-06.md`
- **Arquivos permitidos (novos):** `app/backend/src/middlewares/requirePerfil.js`
- **Arquivos permitidos (editar):** `app/backend/src/routes/*.js`, `ROADMAP.md`

**Fazer:**

1. Middleware que lê `req.usuario.perfil`. Aplicar: auditor só GET em agências/lotes/equipamentos/destinações; POST usuários só admin; demais alinhado à receita sprint-06.

**Fora de escopo:** front.

**Critérios de aceite:**

- Pelo menos uma rota de escrita recusa auditor.

**Como testar:**

- Grep `requirePerfil` nas routes.

**Commit sugerido:** `feat(6.2): restringe rotas da api por perfil`

### Tarefa 6.3 — filtrar menu e rotas no front

- **Tipo:** agente
- **Bloqueada por:** 6.2
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-06.md`
- **Arquivos permitidos (editar):** `app/frontend/src/components/Sidebar.jsx`, `app/frontend/src/components/ProtectedRoute.jsx`, `app/frontend/src/App.jsx`, `ROADMAP.md`

**Fazer:**

1. Sidebar e rotas conforme perfil (auditor não vê cadastro de usuários se a matriz disser isso; motorista menu mínimo).

**Fora de escopo:** tela de rota.

**Critérios de aceite:**

- ProtectedRoute aceita lista de perfis; Sidebar não é mais lista estática igual para todos.

**Como testar:**

- Grep `perfil` em Sidebar e ProtectedRoute.

**Commit sugerido:** `feat(6.3): filtra menu e rotas por perfil`

### Tarefa 6.4 — não concluir lote sem destinação

- **Tipo:** agente
- **Bloqueada por:** 3.1, 4.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-06.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/loteController.js`, `ROADMAP.md`

**Fazer:**

1. Se status alvo é `concluido`, verificar destinação em todos os equipamentos; senão 400.

**Fora de escopo:** PDF.

**Critérios de aceite:**

- Função `atualizarStatusLote` contém a checagem.

**Como testar:**

- Grep `destinacao` em `atualizarStatusLote`.

**Commit sugerido:** `feat(6.4): impede concluir lote sem destinacao`

### Tarefa 6.5 — autor: RBAC e F12

- **Tipo:** autor
- **Bloqueada por:** 6.3, 6.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-06.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor cria motorista; tenta concluir lote incompleto (espera erro); login auditor não cria agência.

**Commit sugerido:** `docs(6.5): registra aceite de governanca e consistencia`

---

## Fase 7 — rota e atribuição manual

**Objetivo:** F17 e F18 (código novo, sem GPS).
**Pronto quando:** 7.5 confirmado.
**Depende de:** fase 6.

### Tarefa 7.1 — schema rota e parada

- **Tipo:** agente
- **Bloqueada por:** 6.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-07.md`
- **Arquivos permitidos (editar):** `app/backend/src/config/schema.js`, `ROADMAP.md`

**Fazer:**

1. Tabelas `rota` e `parada` (data, ordem, FK agência e/ou lote, motorista_id nullable). Sem colunas GPS.

**Critérios de aceite:**

- CREATE TABLE das duas entidades; nenhum campo lat/lng.

**Como testar:**

- Grep `lat`/`gps` no schema — ausente; `dbo.rota` presente.

**Commit sugerido:** `feat(7.1): cria tabelas de rota e parada`

### Tarefa 7.2 — CRUD de rota na API

- **Tipo:** agente
- **Bloqueada por:** 7.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-07.md`
- **Arquivos permitidos (novos):** `app/backend/src/controllers/rotaController.js`, `app/backend/src/routes/rotaRoutes.js`
- **Arquivos permitidos (editar):** `app/backend/src/app.js`, `ROADMAP.md`

**Fazer:**

1. CRUD com paradas ordenadas. JWT + perfil gestor/admin.

**Fora de escopo:** atribuição de motorista (7.3 pode ser o mesmo controller se ficar um PATCH; se já incluir motorista_id no POST, ainda assim 7.3 pode só validar perfil motorista — prefira POST/PUT rota sem motorista aqui e PATCH motorista em 7.3).

**Critérios de aceite:**

- `/rotas` listar/criar com paradas.

**Como testar:**

- Grep `rotas` em `app.js`.

**Commit sugerido:** `feat(7.2): cadastra rotas de coleta na api`

### Tarefa 7.3 — atribuir motorista à rota

- **Tipo:** agente
- **Bloqueada por:** 7.2, 6.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-07.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/rotaController.js`, `app/backend/src/routes/rotaRoutes.js`, `ROADMAP.md`

**Fazer:**

1. PATCH (ou campo no PUT) `motorista_id` só se o usuário for perfil motorista. Sem algoritmo.

**Critérios de aceite:**

- Atribuição recusa tecnico/gestor como motorista da rota.

**Como testar:**

- Grep `motorista` no rotaController.

**Commit sugerido:** `feat(7.3): atribui motorista a rota manualmente`

### Tarefa 7.4 — telas de planejamento

- **Tipo:** agente
- **Bloqueada por:** 7.3
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-07.md`, `docs/context/04-design-system.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/RoutesPage.jsx`, `app/frontend/src/services/rotaService.js`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `ROADMAP.md`

**Fazer:**

1. Tela do Marcos: data, paradas, ordem, select de motoristas. Visual no CSS da referência. Sem mapa.

**Critérios de aceite:**

- Rota `/rotas` no App; menu para gestor/admin.

**Como testar:**

- Grep `RoutesPage` em App.jsx; grep `mapbox`/`leaflet`/`gps` em `app/frontend` — ausente.

**Commit sugerido:** `feat(7.4): adiciona tela de planejamento de rotas`

### Tarefa 7.5 — autor: rota sem GPS

- **Tipo:** autor
- **Bloqueada por:** 7.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-07.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor monta rota com duas paradas e atribui motorista.

**Commit sugerido:** `docs(7.5): registra aceite do planejamento de rotas`

---

## Fase 8 — rota do dia e recolhimento

**Objetivo:** F19 e F20.
**Pronto quando:** 8.5 confirmado.
**Depende de:** fase 7.

### Tarefa 8.1 — GET rota do motorista

- **Tipo:** agente
- **Bloqueada por:** 7.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-08.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/rotaController.js`, `app/backend/src/routes/rotaRoutes.js`, `ROADMAP.md`

**Fazer:**

1. `GET /rotas/minha` (ou equivalente) filtra por `req.usuario.id` e data do dia.

**Critérios de aceite:**

- Motorista não lista rota de outro.

**Como testar:**

- Endpoint existe e filtra por usuario.

**Commit sugerido:** `feat(8.1): devolve a rota do dia ao motorista`

### Tarefa 8.2 — tela do motorista na base

- **Tipo:** agente
- **Bloqueada por:** 8.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-08.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/DriverRoutePage.jsx`
- **Arquivos permitidos (editar):** `app/frontend/src/App.jsx`, `app/frontend/src/components/Sidebar.jsx`, `ROADMAP.md`

**Fazer:**

1. Tela web desktop com paradas e ordem. Sem mapa. Menu do motorista.

**Critérios de aceite:**

- Rota visível ao perfil motorista.

**Como testar:**

- Grep `DriverRoutePage`; sem libs de mapa.

**Commit sugerido:** `feat(8.2): adiciona tela da rota do dia na base`

### Tarefa 8.3 — PATCH status de recolhimento

- **Tipo:** agente
- **Bloqueada por:** 8.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-08.md`
- **Arquivos permitidos (editar):** `app/backend/src/config/schema.js`, `app/backend/src/controllers/rotaController.js`, `app/backend/src/routes/rotaRoutes.js`, `ROADMAP.md`

**Fazer:**

1. Campo/status `recolhido` | `nao_recolhido` | `parcial` na parada (ou lote). PATCH simples.

**Critérios de aceite:**

- CHECK com os três valores; PATCH autenticado.

**Como testar:**

- Grep `recolhido` no schema.

**Commit sugerido:** `feat(8.3): registra status de recolhimento`

### Tarefa 8.4 — UI de recolhimento

- **Tipo:** agente
- **Bloqueada por:** 8.3, 8.2
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-08.md`
- **Arquivos permitidos (editar):** `app/frontend/src/pages/DriverRoutePage.jsx`, `app/frontend/src/services/rotaService.js`, `ROADMAP.md`

**Fazer:**

1. Motorista marca o status na tela da base.

**Critérios de aceite:**

- UI dispara o PATCH.

**Como testar:**

- Grep `parcial` em DriverRoutePage.

**Commit sugerido:** `feat(8.4): permite marcar recolhimento na tela`

### Tarefa 8.5 — autor: motorista na base

- **Tipo:** autor
- **Bloqueada por:** 8.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-08.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor loga como motorista, vê a rota e marca recolhido.

**Commit sugerido:** `docs(8.5): registra aceite da execucao da coleta`

---

## Fase 9 — editar equipamento, PDF e coletas

**Objetivo:** F10, F16, F21.
**Pronto quando:** 9.5 confirmado.
**Depende de:** fase 8.

### Tarefa 9.1 — PUT /equipamentos/:id

- **Tipo:** agente
- **Bloqueada por:** 8.5
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-09.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/equipmentController.js`, `app/backend/src/routes/equipmentRoutes.js`, `ROADMAP.md`

**Fazer:**

1. Implementar `atualizarEquipamento` e `PUT /:id` (não existe na referência — escrever no mesmo estilo dos outros controllers).

**Critérios de aceite:**

- PUT montado.

**Como testar:**

- Grep `router.put` em equipmentRoutes do app.

**Commit sugerido:** `feat(9.1): permite editar equipamento na api`

### Tarefa 9.2 — tela editar equipamento

- **Tipo:** agente
- **Bloqueada por:** 9.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-09.md`
- **Arquivos permitidos (novos):** `app/frontend/src/pages/EquipmentEditPage.jsx`
- **Arquivos permitidos (editar):** `app/frontend/src/pages/EquipmentListPage.jsx`, `app/frontend/src/services/equipmentApi.js`, `app/frontend/src/App.jsx`, `ROADMAP.md`

**Fazer:**

1. Rota de edição; link na listagem. Não usar `newequipment.jsx`.

**Critérios de aceite:**

- Listagem tem editar; PUT no service.

**Como testar:**

- Grep `equipamentos/:id` no frontend do app.

**Commit sugerido:** `feat(9.2): adiciona tela de edicao de equipamento`

### Tarefa 9.3 — rota e motorista no PDF

- **Tipo:** agente
- **Bloqueada por:** 7.3, 4.3
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-09.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/reportController.js`, `ROADMAP.md`

**Fazer:**

1. Incluir rota e motorista no PDF **quando** o lote estiver numa parada atribuída. Se não houver, PDF igual ao da sprint 4.

**Critérios de aceite:**

- `gerarRelatorio` consulta rota/motorista.

**Como testar:**

- Grep `motorista` em reportController do app.

**Commit sugerido:** `feat(9.3): inclui rota e motorista no pdf`

### Tarefa 9.4 — gestor vê coletas

- **Tipo:** agente
- **Bloqueada por:** 8.3, 5.1
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-09.md`
- **Arquivos permitidos (editar):** `app/backend/src/controllers/dashboardController.js`, `app/frontend/src/pages/DashboardPage.jsx`, `ROADMAP.md`

**Fazer:**

1. Totais ou lista: recolhido vs pendente a partir do status da sprint 8. Visível ao gestor.

**Critérios de aceite:**

- Dashboard (API + tela) mostra coletas.

**Como testar:**

- Grep `recolhido` em dashboardController e DashboardPage.

**Commit sugerido:** `feat(9.4): mostra coletas feitas ao gestor`

### Tarefa 9.5 — autor: fechamento da visão

- **Tipo:** autor
- **Bloqueada por:** 9.2, 9.3, 9.4
- **Docs obrigatórios:** `docs/reverse-engineering/sprint-09.md`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Autor edita um equipamento, gera PDF com rota, vê indicador de coleta.

**Commit sugerido:** `docs(9.5): registra aceite do fechamento da visao`

---

## Fora do roadmap atual

- Copiar histórico só de `app/` para o GitHub novo do PI2 (ferramenta `(pendente)`).
- GPS, atribuição automática, app nativo, integração BB.
- Nove pastas com o app inteiro duplicado.
- Reabrir Lean Inception / Artefato 2 nas tarefas de código.
