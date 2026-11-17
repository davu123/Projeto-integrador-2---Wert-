# Task — Implantação com Docker e HTTPS

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/198 |
| Quem | Lucas |
| PBI | [#181](https://github.com/CAMPUSCEUB/EcoTrack/issues/181) US24 — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/198-implantacao` |
| Commit | `feat: adiciona a implantacao de producao com docker e https` |
| Destino | arquivos novos em `src/` e `docs/implantacao.md`, e o `src/backend/.dockerignore` |
| Depende de | merge da #194 e da #195 |

A issue #198 já existe. Não crie outra.

Começar **depois** do merge da #194 e da #195:

- a imagem de produção usa `npm ci --omit=dev`, que precisa do `package-lock.json` com helmet e express-rate-limit (#195);
- o compose passa `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN` e `TRUST_PROXY`, que só têm efeito depois da #194 e da #195;
- o healthcheck da API usa o `/health` que consulta o banco (#195).

As telas da #196 e da #197 não bloqueiam esta Task. O sistema publicado pega as telas que estiverem na `main` no dia, e cada merge depois disso entra pela atualização (seção 5 do guia).

O PR é do Lucas: quem revisa e mergeia é um colega.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/package.json` tem `helmet` e `express-rate-limit`, e `src/backend/package-lock.json` existe;
- `src/backend/src/app.js` tem o `/health` com `SELECT 1` e não tem o `express.static` do `/uploads`;
- `src/docker-compose.yml` lê o `JWT_SECRET` do `src/.env`;
- `src/backend/.dockerignore` existe e ignora `.env` e `.env.*`, menos o `.env.example` (veio com a #194).

Se faltar algum, a #194 ou a #195 ainda não entrou: pare e espere o merge.

## O que copiar

Um arquivo da `main` muda e os outros são novos. O `docker-compose.yml` de desenvolvimento continua igual.

Altera (sobrescrever):

- `src/backend/.dockerignore`: é o arquivo da `main` (`.env`, `.env.*`, `!.env.example`, da #194) mais `node_modules`, `uploads` e `*.log`, para a imagem de produção não levar dependências da máquina, PDFs nem logs.

Cria:

- `src/docker-compose.prod.yml`
- `src/backend/dockerfile.prod`
- `src/frontend/dockerfile.prod`
- `src/frontend/.dockerignore`
- `src/deploy/Caddyfile`
- `src/deploy/.env.example`
- `docs/implantacao.md`

O que cada um faz:

- **`docker-compose.prod.yml`**: três serviços, todos com `restart: unless-stopped` e log limitado a 5 arquivos de 10 MB.
  - `db`: SQL Server com `MSSQL_PID=Express`, senha do `deploy/.env`, sem porta publicada e com healthcheck por `sqlcmd -C`.
  - `backend`: imagem do `dockerfile.prod`. Sobe só com o banco `healthy`, guarda os PDFs no volume `uploads` e tem healthcheck no `/health`.
  - `web`: build da tela com `VITE_API_URL=/api`, servido pelo Caddy nas portas 80 e 443. Sobe só com a API `healthy`.
- **`backend/dockerfile.prod`**: `npm ci --omit=dev` e `node src/server.js`, sem nodemon, com o usuário `node`.
- **`frontend/dockerfile.prod`**: `npm run build` com `VITE_API_URL=/api` e copia o `dist` para a imagem do Caddy. A tela e a API ficam no mesmo endereço, então o CORS só precisa liberar `https://<DOMAIN>`.
- **`deploy/Caddyfile`**: HTTPS automático para o `DOMAIN`. `/api/*` vai para a API sem o prefixo (`/api/auth/login` chega como `/auth/login`). Qualquer outro caminho devolve o arquivo do build ou o `index.html`, para o `/rotas` e as outras rotas da tela abrirem direto.
- **`deploy/.env.example`**: modelo das variáveis, só com valores de exemplo. O `deploy/.env` de verdade fica só na VPS: o `.gitignore` da raiz ignora `.env` e mantém `.env.example`.
- **`docs/implantacao.md`**: guia para o TI. Cobre:
  - requisitos da VPS (x86, 4 GB ou mais, Ubuntu, Docker) e o registro A no painel da Hostinger;
  - primeira subida: o código chega à VPS como pacote `.tar.gz` da `main` (`git archive` com `core.autocrlf=false`), enviado por `scp` para `/opt/ecotrack`, sem Git nem credencial na VPS. Clonar com token só de leitura fica como alternativa;
  - primeiro acesso com o `ADMIN_PASSWORD`;
  - atualização: pacote novo extraído numa pasta nova, com o `deploy/.env` levado junto e a versão anterior guardada para voltar atrás;
  - backup e restauração do banco (`BACKUP DATABASE` pelo `sqlcmd`) e dos PDFs, em `/opt/ecotrack/backups`;
  - logs e a nota de entrega ao TI da Wert.

Nenhum IP, domínio real ou senha entra no repositório. O guia usa `<subdominio>` e `<IP_DA_VPS>`.

## PR

Título: `feat: adiciona a implantacao de producao com docker e https`

Corpo: o template do repositório inteiro, com os títulos `##`. Preencha assim:

- **Issue relacionada**: `Closes #198` e, na linha de baixo, `Refs #181`.
- **Resumo**: compose de produção com SQL Server Express, API sem nodemon e tela servida pelo Caddy com HTTPS; modelo do `deploy/.env`; guia de implantação, atualização e backup.
- **Tipo de mudança**: Requisito.
- **Como validar**: os itens da seção abaixo.
- **Evidências**: endereço publicado com o cadeado do HTTPS, resposta do `/api/health` e a saída do `ps` com os três serviços `healthy`.

## Como validar

Na VPS, seguindo o `docs/implantacao.md`:

- O pacote gerado no Windows chega por `scp` e é extraído em `/opt/ecotrack/atual`. `grep -c $'\r' src/deploy/.env.example` dentro dela mostra 0.
- `docker compose -f docker-compose.prod.yml --env-file deploy/.env ps`, dentro de `/opt/ecotrack/atual/src`, mostra `db`, `backend` e `web` como `healthy` ou `running`.
- `curl https://<subdominio>/api/health` → `{"message":"API EcoTrack Wert online.","banco":"ok"}`.
- `https://<subdominio>` abre o login com cadeado. `https://<subdominio>/rotas` abre direto, sem 404.
- O login com o `ADMIN_EMAIL` e o `ADMIN_PASSWORD` entra. A troca de senha funciona quando a #196 estiver na `main`.
- Gerar um relatório e baixar o PDF (com a #197 na `main`). `https://<subdominio>/api/uploads/reports/<arquivo>.pdf` → 404.
- Uma atualização pela seção 5, com um pacote novo: os usuários e os PDFs continuam, e o `deploy/.env` está na pasta nova.
- O backup da seção 6 gera o `.bak` e o `.tgz` em `/opt/ecotrack/backups`.
- Da sua máquina, a porta 1433 da VPS não responde.
- O pacote não leva nenhum `.env`: `tar -tzf pacotes/ecotrack-<versao>.tar.gz | grep '\.env$'` não mostra nada.
