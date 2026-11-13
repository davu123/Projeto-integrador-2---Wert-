# Sprint 10 — Adequações e implantação (kit 1)

Milestone: **Sprint 10 - Adequações e implantação**. Período oficial: 13/11/2026 a 23/11/2026.

Este é o kit 1 da sprint: segurança, credenciais e implantação (US22, US23 e US24). Identidade visual, usabilidade, localização e rotas vêm em kits separados, depois que estes arquivos estiverem na `main`.

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
| `docker-compose.prod.yml`, `backend/dockerfile.prod`, `frontend/dockerfile.prod`, os dois `.dockerignore`, `deploy/Caddyfile`, `deploy/.env.example` | | | | | cria |
| `docs/implantacao.md` (raiz do repositório) | | | | | cria |

A #194 e a #195 dividem três arquivos e vão em série. Os arquivos da pasta #195 já trazem o bloco da #194, e copiar a #195 antes do merge da #194 apaga esse trabalho.

Depois do merge da #194, a #195 e a #196 vão em paralelo: não dividem arquivo.

A #197 espera a #195, porque a tela chama a rota de download nova. A #198 espera a #194 e a #195, porque a imagem de produção precisa das dependências e das variáveis delas. A #197 e a #198 não dividem arquivo e podem ir juntas.

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
