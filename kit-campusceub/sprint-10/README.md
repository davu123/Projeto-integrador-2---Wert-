# Sprint 10 — Adequações e implantação

Milestone: **Sprint 10 - Adequações e implantação**. Período oficial: 13/11/2026 a 23/11/2026.

A sprint tem quatro kits de código, cada um montado sobre a `main` depois do anterior:

- **kit 1**: segurança, credenciais e implantação (US22, US23 e US24). Na `main` desde 17/11/2026;
- **kit 2**: API da localização e da rota (US27 e US28), seção “Kit 2” abaixo;
- **kit 3**: identidade visual e usabilidade, só telas (US25 e US26), seção “Kit 3” abaixo;
- **kit 4**: telas da localização, da rota com mapa e da exportação (US27, US28 e US29), seção “Kit 4” abaixo.

A documentação (#187 a #191) está na seção “Documentação”, no fim.

## Kit 1 — Segurança, credenciais e implantação

Uma pasta = uma Task = uma branch = um PR. Cada Task tem **um** PBI pai. Copie a pasta para a raiz do EcoTrack: o `src/` da pasta vai para o `src/` do EcoTrack, e o `docs/` da #198 vai para o `docs/`.

As issues já existem (#194 a #198). Não crie outra.

**Davi** só API. **Eduardo** só tela. **Lucas** faz a implantação. Todas as Tasks partem da `main` depois da Sprint 09.

## Ordem

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [194-credenciais-api](194-credenciais-api/README.md) | [#194](https://github.com/CAMPUSCEUB/EcoTrack/issues/194) | [US22 #179](https://github.com/CAMPUSCEUB/EcoTrack/issues/179) | Davi | `feature/194-credenciais-api` | `feat: protege as credenciais e permite trocar a senha na api` | Sprint 09 |
| 2 | [195-api-protegida](195-api-protegida/README.md) | [#195](https://github.com/CAMPUSCEUB/EcoTrack/issues/195) | [US23 #180](https://github.com/CAMPUSCEUB/EcoTrack/issues/180) | Davi | `feature/195-api-protegida` | `feat: protege a api e exige login para baixar relatorio` | #194 |
| 2 | [196-tela-minha-conta](196-tela-minha-conta/README.md) | [#196](https://github.com/CAMPUSCEUB/EcoTrack/issues/196) | [US22 #179](https://github.com/CAMPUSCEUB/EcoTrack/issues/179) | Eduardo | `feature/196-tela-minha-conta` | `feat: abre o login vazio e cria a tela minha conta` | #194 |
| 3 | [197-tela-download-relatorio](197-tela-download-relatorio/README.md) | [#197](https://github.com/CAMPUSCEUB/EcoTrack/issues/197) | [US23 #180](https://github.com/CAMPUSCEUB/EcoTrack/issues/180) | Eduardo | `feature/197-tela-download-relatorio` | `feat: baixa o pdf do relatorio com o token` | #195 |
| 3 | [198-implantacao](198-implantacao/README.md) | [#198](https://github.com/CAMPUSCEUB/EcoTrack/issues/198) | [US24 #181](https://github.com/CAMPUSCEUB/EcoTrack/issues/181) | Lucas | `feature/198-implantacao` | `feat: adiciona a implantacao de producao com docker e https` | #194 e #195 |

Quem mexe em cada arquivo (todos dentro de `src/`, menos o guia):

| Arquivo | #194 | #195 | #196 | #197 | #198 |
|---|---|---|---|---|---|
| `backend/src/config/schema.js` | altera | | | | |
| `backend/src/server.js` | altera | | | | |
| `backend/src/controllers/authController.js` | altera | | | | |
| `backend/src/routes/authRoutes.js` | altera | | | | |
| `backend/src/controllers/userController.js` | altera | altera | | | |
| `backend/.env.example` | altera | altera | | | |
| `docker-compose.yml` | altera | altera | | | |
| `.env.example` | cria | | | | |
| `backend/src/app.js` | | altera | | | |
| `backend/src/controllers/reportController.js` | | altera | | | |
| `backend/src/routes/reportRoutes.js` | | altera | | | |
| `backend/src/middlewares/authMiddleware.js` | | altera | | | |
| `backend/src/controllers/` agency, dashboard, destinacao, equipment, lote | | altera | | | |
| `backend/package.json` e `package-lock.json` | | `npm install` | | | |
| `frontend/src/pages/LoginPage.jsx` | | | altera | | |
| `frontend/src/auth/acesso.js` | | | altera | | |
| `frontend/src/App.jsx` | | | altera | | |
| `frontend/src/pages/AccountPage.jsx` | | | cria | | |
| `frontend/src/services/authService.js` | | | cria | | |
| `frontend/src/services/api.js` | | | | altera | |
| `frontend/src/services/reportsService.js` | | | | altera | |
| `frontend/src/pages/Reports.jsx` | | | | altera | |
| `backend/.dockerignore` | cria (PR #200) | | | | altera |
| `docker-compose.prod.yml`, `backend/dockerfile.prod`, `frontend/dockerfile.prod`, `frontend/.dockerignore`, `deploy/Caddyfile`, `deploy/.env.example` | | | | | cria |
| `docs/implantacao.md` (raiz do repositório) | | | | | cria |

A #194 e a #195 dividem três arquivos e vão em série. Os arquivos da pasta #195 partem dos arquivos da `main` depois do #200 (o PR da #194), e copiar a #195 antes do merge da #194 apaga esse trabalho.

Depois do merge da #194, a #195 e a #196 vão em paralelo: não dividem arquivo.

A #197 espera a #195, porque a tela chama a rota de download nova. A #198 espera a #194 e a #195, porque a imagem de produção precisa das dependências e das variáveis delas. A #197 e a #198 não dividem arquivo e podem ir juntas. A #198 altera o `src/backend/.dockerignore` que a #194 criou: a pasta traz o arquivo da `main` mais as linhas novas.

O Davi faz a #195 numa branch nova saindo da `main` depois do merge da #194, não em cima da branch da #194.

- **US22**: senha do administrador definida na instalação, sem senha no código; `JWT_SECRET` obrigatório; `PUT /auth/senha`; senha com 8 caracteres ou mais; login abre vazio; página **Minha conta** para os cinco perfis.
- **US23**: PDF baixado só com login e perfil (administrador, gestor e auditor), por `GET /relatorios/:id/arquivo`; `/uploads` deixa de ser público; helmet; CORS por `CORS_ORIGIN`; limite de tentativas no login; 404 e 500 em JSON, sem detalhe interno; `/health` consulta o banco.
- **US24**: compose de produção com SQL Server Express e HTTPS pelo Caddy; segredos no `deploy/.env`, fora do repositório; banco e PDFs em volumes; guia de implantação, atualização e backup.

Features: F22 ([#171](https://github.com/CAMPUSCEUB/EcoTrack/issues/171)) só nas Tasks da US22, F23 ([#172](https://github.com/CAMPUSCEUB/EcoTrack/issues/172)) só nas da US23, F24 ([#173](https://github.com/CAMPUSCEUB/EcoTrack/issues/173)) só na da US24. O PR fecha a Task. O PBI e a Feature fecham manualmente quando as Tasks daquele PBI estiverem na `main`.

## Depois do merge de cada Task, no ambiente local

- **#194**: copie `src/.env.example` para `src/.env` e preencha o `JWT_SECRET`. Com banco novo, preencha também o `ADMIN_PASSWORD`. Sem `JWT_SECRET`, o `docker compose up` para com aviso.
- **#195**: a primeira subida é `docker compose up --build -V`, para o container instalar o helmet. Abra a tela por `http://localhost:5174`.

## O que não fazer

- Não começar a #195 nem a #196 antes do merge da #194.
- Não juntar US22, US23 e US24 na mesma Task.
- Não misturar API e tela no mesmo PR.
- Não usar `feat(10.1)`.
- Não commitar o `src/.env` nem o `src/deploy/.env`. Nenhuma senha, IP ou domínio real no repositório.
- Não criar rota no `App.jsx` fora do `MENU` do `acesso.js`.
- Não copiar identidade visual, heurísticas de usabilidade, coordenadas, mapa ou exportação de rota: são os kits seguintes.
- Não abrir o PR sem `Closes #<n>` no corpo e sem o template inteiro.

## Kit 2 — API da localização e da rota

Montado sobre a `main` em `58e1cfb` (kit 1 inteiro). Só API, só Davi. As issues já existem (#207 a #210). Não crie outra.

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [207-localizacao-agencia-api](207-localizacao-agencia-api/README.md) | [#207](https://github.com/CAMPUSCEUB/EcoTrack/issues/207) | [US27 #184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) | Davi | `feature/207-localizacao-agencia-api` | `feat: registra cep, endereco e coordenadas da agencia na api` | kit 1 |
| 2 | [208-pontos-entrega-api](208-pontos-entrega-api/README.md) | [#208](https://github.com/CAMPUSCEUB/EcoTrack/issues/208) | [US27 #184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) | Davi | `feature/208-pontos-entrega-api` | `feat: cadastra os pontos de entrega na api` | #207 |
| 3 | [209-origem-destino-rota-api](209-origem-destino-rota-api/README.md) | [#209](https://github.com/CAMPUSCEUB/EcoTrack/issues/209) | [US28 #185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) | Davi | `feature/209-origem-destino-rota-api` | `feat: adiciona origem, destino e coordenadas das paradas na rota` | #208 |
| 4 | [210-sugerir-ordem-api](210-sugerir-ordem-api/README.md) | [#210](https://github.com/CAMPUSCEUB/EcoTrack/issues/210) | [US28 #185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) | Davi | `feature/210-sugerir-ordem-api` | `feat: sugere a ordem das paradas pelo vizinho mais proximo` | #209 |

Quem mexe em cada arquivo (todos em `src/backend/src/`):

| Arquivo | #207 | #208 | #209 | #210 |
|---|---|---|---|---|
| `config/schema.js` | altera | altera | altera | |
| `utils/localizacao.js` | cria | | | |
| `controllers/agencyController.js` | altera | | | |
| `controllers/pontoEntregaController.js` | | cria | | |
| `routes/pontoEntregaRoutes.js` | | cria | | |
| `app.js` | | altera | | |
| `controllers/rotaController.js` | | | altera | altera |
| `routes/rotaRoutes.js` | | | | altera |

As quatro vão **em série**: o `schema.js` passa pela #207, pela #208 e pela #209, e o `rotaController.js` pela #209 e pela #210. Cada pasta traz o arquivo da `main` com os blocos das Tasks anteriores mais o seu. Cada branch sai da `main` depois do merge da anterior.

- **US27**: agência com CEP, endereço, latitude e longitude opcionais e validados; cadastro de pontos de entrega (depósito ou destinadora) com endereço e coordenadas obrigatórias, só para administrador e gestor.
- **US28**: rota com origem e destino em pontos de entrega ativos; GET das rotas com os dois pontos e o endereço e as coordenadas de cada parada, inclusive a parada só com lote; `POST /rotas/sugerir-ordem` pelo vizinho mais próximo, sem gravar.

Decisões do corte:

- Coordenadas digitadas, sem geocodificação e sem serviço externo. Distância em linha reta (haversine), só para ordenar.
- No PUT de agência e de rota, campo novo que não veio no corpo fica como está, para as telas de hoje não apagarem o que a API gravou.
- Ponto de entrega usado numa rota não é excluído (409): é desativado.
- O mapa não entra.

Features: F27 ([#176](https://github.com/CAMPUSCEUB/EcoTrack/issues/176)) e F28 ([#177](https://github.com/CAMPUSCEUB/EcoTrack/issues/177)). US27 e F27 fecham só depois das telas do kit 4; o mesmo vale para US28 e F28.

## Kit 3 — Identidade visual e usabilidade

Montado sobre a `main` em `58e1cfb`. Só telas, só Eduardo. As issues já existem (#211 a #214). Não crie outra.

| Ordem | Pasta | Issue | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|---|
| 1 | [211-identidade-visual](211-identidade-visual/README.md) | [#211](https://github.com/CAMPUSCEUB/EcoTrack/issues/211) | [US25 #182](https://github.com/CAMPUSCEUB/EcoTrack/issues/182) | Eduardo | `feature/211-identidade-visual` | `feat: aplica a identidade visual da wert` | kit 1 |
| 1 | [213-telas-por-perfil](213-telas-por-perfil/README.md) | [#213](https://github.com/CAMPUSCEUB/EcoTrack/issues/213) | [US26 #183](https://github.com/CAMPUSCEUB/EcoTrack/issues/183) | Eduardo | `feature/213-telas-por-perfil` | `feat: abre a rota do dia para o motorista e esconde a escrita do auditor` | kit 1 |
| 1 | [214-telas-de-operacao](214-telas-de-operacao/README.md) | [#214](https://github.com/CAMPUSCEUB/EcoTrack/issues/214) | [US26 #183](https://github.com/CAMPUSCEUB/EcoTrack/issues/183) | Eduardo | `feature/214-telas-de-operacao` | `feat: ajusta a rota do dia, a exclusao de rota e o telefone da agencia` | kit 1 |
| 2 | [212-layout-e-foco](212-layout-e-foco/README.md) | [#212](https://github.com/CAMPUSCEUB/EcoTrack/issues/212) | [US26 #183](https://github.com/CAMPUSCEUB/EcoTrack/issues/183) | Eduardo | `feature/212-layout-e-foco` | `feat: ajusta o menu entre 900 e 1100 px e deixa o foco visivel` | #211 |

Quem mexe em cada arquivo (todos em `src/frontend/`):

| Arquivo | #211 | #212 | #213 | #214 |
|---|---|---|---|---|
| `index.html` | altera | | | |
| `src/styles/global.css` | altera | altera | | |
| `src/styles/responsive.css` | | altera | | |
| `src/components/Header.jsx` | | altera | | |
| `src/auth/acesso.js` | | | altera | |
| `src/pages/LoginPage.jsx` | | | altera | |
| `src/App.jsx` | | | altera | |
| `src/pages/LotsPage.jsx` | | | altera | |
| `src/pages/DestinationsPage.jsx` | | | altera | |
| `src/pages/DriverRoutePage.jsx` | | | | altera |
| `src/pages/RoutesPage.jsx` | | | | altera |
| `src/pages/AgenciesPage.jsx` | | | | altera |

Só a #211 e a #212 dividem arquivo (`global.css`): a #212 vai depois do merge da #211, e a pasta #212 repete o bloco da #211. A #213 e a #214 não dividem arquivo com ninguém. O Eduardo faz um PR por vez; a ordem sugerida é #211, #212, #213, #214.

- **US25**: cores, fontes e botões da Wert; login sem foto externa; modo escuro nos mesmos tons.
- **US26**:
  - menu legível entre 900 e 1100 px, foco do teclado visível e rótulos em A- e A+;
  - motorista entra pela Rota do dia e o auditor vê Lotes e Destinação só para consulta;
  - Rota do dia legível no modo escuro, confirmação antes de excluir rota e telefone no cadastro de agência.

Decisões do corte:

- O cinza de apoio e o texto dos botões verdes mudam de cor para manter o contraste. Os detalhes estão no README da #211.
- Os estilos inline das sete páginas ficam como estão. Só os botões verdes passam a usar a cor da Wert, por um seletor no `global.css`.
- O `!important` do modo escuro fica.
- A confirmação ao desativar usuário fica de fora.
- A #214 mostra o nome da agência da parada só com lote, que a API devolve desde a #209.

Features: F25 ([#174](https://github.com/CAMPUSCEUB/EcoTrack/issues/174)) só na #211; F26 ([#175](https://github.com/CAMPUSCEUB/EcoTrack/issues/175)) na #212, na #213 e na #214. O kit 4 vai mexer de novo em `AgenciesPage.jsx`, `RoutesPage.jsx` e `DriverRoutePage.jsx`, e parte dos arquivos da `main` depois do kit 3.

## Kit 4 — Telas da localização, da rota com mapa e da exportação

Montado sobre a `main` em `ffd9a49` (kits 2 e 3 inteiros). Só telas, só Eduardo. A API não muda: tudo o que as telas usam já está na `main`. Issues #224 a #230, criadas em 20/11/2026 com pai, responsável, milestone, Project e `blocked by`.

| Ordem | Pasta | PBI (pai único) | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|
| 1 | [224-mapa-da-rota](224-mapa-da-rota/README.md) | [US28 #185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) | Eduardo | `feature/224-mapa-da-rota` | `feat: mostra a rota no mapa` | kits 2 e 3 |
| 1 | [225-localizacao-agencias](225-localizacao-agencias/README.md) | [US27 #184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) | Eduardo | `feature/225-localizacao-agencias` | `feat: adiciona cep, endereco e coordenadas na tela de agencias` | kits 2 e 3 |
| 1 | [226-pontos-de-entrega](226-pontos-de-entrega/README.md) | [US27 #184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) | Eduardo | `feature/226-pontos-de-entrega` | `feat: cria a tela de pontos de entrega` | kits 2 e 3 |
| 2 | [227-google-maps-e-waze](227-google-maps-e-waze/README.md) | [US29 #186](https://github.com/CAMPUSCEUB/EcoTrack/issues/186) | Eduardo | `feature/227-google-maps-e-waze` | `feat: abre a rota no google maps e no waze` | #224 |
| 2 | [228-origem-destino-rota](228-origem-destino-rota/README.md) | [US28 #185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) | Eduardo | `feature/228-origem-destino-rota` | `feat: escolhe a origem e o destino na tela de rotas` | #224 e #226 |
| 3 | [229-sugerir-ordem](229-sugerir-ordem/README.md) | [US28 #185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) | Eduardo | `feature/229-sugerir-ordem` | `feat: sugere a ordem das paradas na tela de rotas` | #228 |
| 3 | [230-gpx-da-rota](230-gpx-da-rota/README.md) | [US29 #186](https://github.com/CAMPUSCEUB/EcoTrack/issues/186) | Eduardo | `feature/230-gpx-da-rota` | `feat: baixa a rota em gpx` | #227 |

Quem mexe em cada arquivo (todos em `src/frontend/`):

| Arquivo | #224 | #225 | #226 | #227 | #228 | #229 | #230 |
|---|---|---|---|---|---|---|---|
| `package.json`, `package-lock.json` | altera | | | | | | |
| `src/components/RouteMap.jsx`, `RouteMap.css` | cria | | | | | | |
| `src/components/RouteDetails.jsx` | cria | | | altera | | | |
| `src/components/RouteNavigation.jsx` | | | | cria | | | altera |
| `src/utils/navegacao.js` | | | | cria | | | |
| `src/utils/gpx.js` | | | | | | | cria |
| `src/pages/RoutesPage.jsx` | altera | | | | altera | altera | |
| `src/pages/DriverRoutePage.jsx` | altera | | | altera | | | |
| `src/pages/AgenciesPage.jsx` | | altera | | | | | |
| `src/pages/DeliveryPointsPage.jsx` | | | cria | | | | |
| `src/services/pontoEntregaService.js` | | | cria | | | | |
| `src/services/api.js` | | | altera | | | | |
| `src/auth/acesso.js` | | | altera | | | | |
| `src/App.jsx` | | | altera | | | | |
| `src/services/rotaService.js` | | | | | | altera | |

- #224, #225 e #226 não dividem arquivo e podem ir em paralelo.
- Depois do merge da #224, a #227 pode ir em paralelo com a #228 (que espera também a #226). A #229 vai depois da #228, e a #230 depois da #227.
- Quem divide arquivo vai em série, e a pasta seguinte repete o bloco da anterior: `RoutesPage.jsx` (#224 → #228 → #229), `DriverRoutePage.jsx` e `RouteDetails.jsx` (#224 → #227), `RouteNavigation.jsx` (#227 → #230). A #228 também importa o serviço criado na #226.
- Cada branch sai da `main` depois do merge da dependência, nunca da branch anterior.

Ordem sugerida para o Eduardo, um PR por vez: **#224 → #225 → #226 → #227 → #228 → #229 → #230**. O mapa vem primeiro; a #225 logo depois, porque sem coordenadas cadastradas o mapa fica vazio.

Se a sprint apertar, sai primeiro a **#230** (GPX) e depois a **#229** (sugerir ordem). O mapa (#224) não sai. Sem a #229, a ordem continua manual; sem a #230, a exportação fica com o Google Maps e o Waze.

- **US27**: CEP, endereço e coordenadas na tela de Agências; tela de pontos de entrega para administrador e gestor.
- **US28**: mapa da rota em Rotas e na Rota do dia; origem e destino no formulário; sugestão da ordem aplicada na tela, ajustável antes de gravar.
- **US29**: links do Google Maps e do Waze; GPX.

Decisões do corte:

- Mapa com Leaflet 1.9 e `react-leaflet` 4.x (o frontend é React 18) sobre o OpenStreetMap, sem chave de API. A atribuição do OpenStreetMap fica visível. O Caddy de produção não tem CSP, e os tiles carregam.
- O mapa liga os pontos em linha reta. O caminho pelas ruas é dos aplicativos de navegação.
- Google Maps com até 9 paradas intermediárias por link, em trechos encadeados. Waze com um destino por link: o próximo destino e um link por parada.
- O GPX só leva pontos com coordenadas.
- A sugestão de ordem não grava: a rota é gravada em Criar ou Atualizar. O `agencia_id` que a API devolve na parada só com lote não é copiado.
- CSS do mapa em `RouteMap.css`. O kit não altera `global.css`, `responsive.css`, `Sidebar.jsx`, `Header.jsx`, `Layout.jsx`, `LoginPage.jsx`, `DashboardPage.jsx` nem `LotsPage.jsx`. Esses arquivos são do redesenho de layout do Lucas, que anda em paralelo.
- O item novo do menu é `/pontos-entrega`, depois de Rotas, para administrador e gestor.
- Sem geocodificação: endereço e coordenadas são digitados.

Features: F27 ([#176](https://github.com/CAMPUSCEUB/EcoTrack/issues/176)), F28 ([#177](https://github.com/CAMPUSCEUB/EcoTrack/issues/177)) e F29 ([#178](https://github.com/CAMPUSCEUB/EcoTrack/issues/178)). US27 e F27 fecham depois da #225 e da #226; US28 e F28 depois da #224, da #228 e da #229 (ou só da #224 e da #228, se a #229 sair do corte); US29 e F29 depois da #227 e da #230 (ou só da #227). O épico E7 ([#170](https://github.com/CAMPUSCEUB/EcoTrack/issues/170)) fecha com as três Features.

## Documentação

Cinco Tasks de documentação, sem PBI pai, com o rótulo `documentation` e a mesma milestone. Todas atendem a Sprint Review 06; a #191 registra também o escopo da Sprint 10. As issues já existem (#187 a #191). Não crie outra.

Branch `docs/<n>-slug`, tipo **Documentação** no template do PR, `Closes #<n>` da própria Task.

| Ordem | Pasta | Issue | Quem | Branch | Commit no EcoTrack | Depende de |
|---|---|---|---|---|---|---|
| 1 | [191-requisitos-readme-arquitetura](191-requisitos-readme-arquitetura/README.md) | [#191](https://github.com/CAMPUSCEUB/EcoTrack/issues/191) | Artur | `docs/191-requisitos-readme-arquitetura` | `docs: registra os requisitos e o escopo da sprint 10` | nada |
| 1 | [188-pdfs-para-markdown](188-pdfs-para-markdown/README.md) | [#188](https://github.com/CAMPUSCEUB/EcoTrack/issues/188) | Artur | `docs/188-pdfs-para-markdown` | `docs: converte a lean inception e os artefatos de pdf para markdown` | nada |
| 2 | [189-backlog-e-sprints](189-backlog-e-sprints/README.md) | [#189](https://github.com/CAMPUSCEUB/EcoTrack/issues/189) | Artur | `docs/189-backlog-e-sprints` | `docs: ajusta backlog e sprints conforme a review 06` | #188 |
| 2 | [190-storyboard-e-rotas](190-storyboard-e-rotas/README.md) | [#190](https://github.com/CAMPUSCEUB/EcoTrack/issues/190) | Artur | `docs/190-storyboard-e-rotas` | `docs: refaz o storyboard e detalha as rotas por perfil` | #188 |
| 3 | [187-modelo-peter-chen](187-modelo-peter-chen/README.md) | [#187](https://github.com/CAMPUSCEUB/EcoTrack/issues/187) | Lucas | `docs/187-modelo-peter-chen` | `docs: ajusta o modelo de dados para a notacao de peter chen` | #191, #190 e as Tasks de schema do kit 2 (#207, #208 e #209) |

Quem mexe em cada arquivo:

| Arquivo | #191 | #188 | #189 | #190 | #187 |
|---|---|---|---|---|---|
| `README.md` (raiz) | altera | | | | |
| `docs/requisitos.md` | altera | | | | |
| `docs/arquitetura.md` | altera | | | | altera (só a seção Dados) |
| `docs/lean-inception/` (12 etapas, índice, imagens das personas, 12 PDFs) | | cria `.md`, remove PDF | | | |
| `docs/lean-inception/08-esforco-negocio-ux/pesos.md` | | cria | altera | | |
| `docs/lean-inception/09-sequenciador-ondas/ondas.md` | | cria | altera | | |
| `entregas/README.md`, `entregas/lean-inception/README.md`, `entregas/template-entrega.md`, `entregas/artefato_*/README.md` | | altera | | | |
| `entregas/artefato_1/artefato-1.md` | | cria | | | |
| `entregas/artefato_2/artefato-2.md` | | cria | altera | | |
| `entregas/artefato_3/artefato-3.md` e `artefato_3/imagens/` | | cria | | altera (só o `.md`) | altera (só a seção 2.3 do `.md`) |
| os 3 PDFs dos Artefatos | | remove | | | |

- A #191 e a #188 não dividem arquivo e podem ir juntas.
- A #189 e a #190 partem dos arquivos que a #188 cria. Elas só começam depois do merge da #188. Entre si não dividem arquivo.
- A #187 parte do `docs/arquitetura.md` da #191 e troca só a seção Dados, e parte do Artefato 3 da #190 e troca só a seção 2.3 (o diagrama antigo vira um link para o modelo). Ela vai por último, depois do merge da #191, da #190 e da API de localização e de rota, porque o modelo precisa das tabelas novas do `schema.js`.

O Artur faz um PR por vez: **#191 → #188 → #189 → #190**. Cada branch sai da `main` atualizada, depois do merge do PR anterior, nunca da branch anterior.

O PR da #187 é do Lucas: o Artur revisa e mergeia. Os PRs do Artur são revisados pelo Lucas e por um colega, e quem mergeia é o Lucas.

Lembretes para todos os PRs de documentação:

- Arquivo sem BOM (UTF-8 simples).
- Títulos com `##` no corpo do PR e nos arquivos, não `###` no lugar de `##`.
- Separador de tabela `| --- |`.
- Corpo do PR com o template inteiro, tipo **Documentação**.
