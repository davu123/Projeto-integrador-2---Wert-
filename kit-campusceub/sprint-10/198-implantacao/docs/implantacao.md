# Implantação

Como publicar o EcoTrack Wert numa VPS com Docker, com HTTPS, e como operar depois: primeiro acesso, atualização, backup e logs.

Arquivos usados, todos dentro de `src/`:

| Arquivo | Para quê |
| --- | --- |
| `docker-compose.prod.yml` | Banco, API e tela de produção |
| `backend/dockerfile.prod` | Imagem da API (`npm ci --omit=dev` e `node`) |
| `frontend/dockerfile.prod` | Build da tela com `VITE_API_URL=/api`, servido pelo Caddy |
| `deploy/Caddyfile` | HTTPS automático, `/api` para a API e o `index.html` para as rotas da tela |
| `deploy/.env.example` | Modelo das variáveis. O `deploy/.env` de verdade fica só na VPS |

O `docker-compose.yml` continua sendo o de desenvolvimento.

Nos comandos abaixo, `<subdominio>` é o endereço completo do sistema (por exemplo `ecotrack.exemplo.com.br`) e `<IP_DA_VPS>` é o IP público da VPS. Nenhum dos dois entra no repositório.

## 1. Requisitos da VPS

- Processador x86-64. O SQL Server não roda em ARM.
- 4 GB de memória ou mais. O SQL Server sozinho pede 2 GB.
- 20 GB de disco ou mais, para o sistema, as imagens, o banco, os PDFs e os backups.
- Ubuntu 22.04 ou 24.04.
- Docker Engine com o plugin `docker compose`. Se a imagem da VPS não trouxer o Docker, instale pelo guia oficial em <https://docs.docker.com/engine/install/ubuntu/>.
- Portas 22, 80 e 443 liberadas no firewall da VPS. As portas do banco e da API não são publicadas.

O banco sobe na edição Express (`MSSQL_PID=Express`), que é gratuita e tem limite de 10 GB por banco.

## 2. DNS do subdomínio

O HTTPS só funciona depois que o subdomínio aponta para a VPS.

1. No painel da Hostinger, abra o domínio e a área de DNS (registros DNS).
2. Crie um registro do tipo **A**:
   - Nome: a parte do subdomínio (por exemplo `ecotrack`);
   - Aponta para: `<IP_DA_VPS>`;
   - TTL: o padrão do painel.
3. Espere a propagação e confira de qualquer computador:

```bash
nslookup <subdominio>
```

A resposta precisa trazer o `<IP_DA_VPS>`. Só então siga para a subida: o Caddy tenta emitir o certificado na primeira subida.

## 3. Primeira subida

Na VPS, com um usuário que pode usar o Docker:

```bash
git clone https://github.com/CAMPUSCEUB/EcoTrack.git
cd EcoTrack/src
cp deploy/.env.example deploy/.env
nano deploy/.env
```

Preencha o `deploy/.env`:

| Variável | O que colocar |
| --- | --- |
| `DOMAIN` | `<subdominio>`, sem `https://` |
| `DB_PASSWORD` | Senha do `sa` do SQL Server: 8 caracteres ou mais, com maiúscula, minúscula, número e símbolo. Sem isso o banco não sobe |
| `DB_DATABASE` | Nome do banco. Pode ficar `EcoTrackWert` |
| `JWT_SECRET` | Resultado de `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | Validade do login. Padrão `8h` |
| `ADMIN_EMAIL` e `ADMIN_PASSWORD` | E-mail e senha do primeiro administrador. A senha precisa de 8 caracteres ou mais |

Não use `$`, aspas nem espaços nos valores.

Suba:

```bash
docker compose -f docker-compose.prod.yml --env-file deploy/.env up -d --build
docker compose -f docker-compose.prod.yml --env-file deploy/.env ps
```

A primeira subida baixa as imagens e pode levar alguns minutos. O banco precisa ficar `healthy` antes da API, e a API antes da tela. Confira a API:

```bash
curl https://<subdominio>/api/health
```

A resposta esperada é `{"message":"API EcoTrack Wert online.","banco":"ok"}`. Se o banco cair, a mesma rota devolve 503.

## 4. Primeiro acesso

1. Abra `https://<subdominio>` e entre com o `ADMIN_EMAIL` e o `ADMIN_PASSWORD`.
2. Em **Minha conta**, troque a senha.
3. Apague o valor de `ADMIN_PASSWORD` no `deploy/.env` e recrie a API:

```bash
docker compose -f docker-compose.prod.yml --env-file deploy/.env up -d backend
```

A API só cria o administrador quando o banco não tem nenhum. Se o log mostrar “nenhum administrador no banco”, faltou o `ADMIN_EMAIL` ou o `ADMIN_PASSWORD`, ou a senha tem menos de 8 caracteres.

Os outros usuários são criados pelo administrador na tela **Usuários**.

## 5. Atualização

Depois de um merge na `main`:

```bash
cd EcoTrack/src
git pull
docker compose -f docker-compose.prod.yml --env-file deploy/.env up -d --build
```

O banco, os PDFs e o certificado ficam em volumes e continuam depois da atualização. A API confere e cria as tabelas novas ao subir. Faça um backup antes de atualizar (seção 6).

## 6. Backup e restauração

Os comandos desta seção leem o `deploy/.env` no shell. Rode-os dentro de `src/`:

```bash
set -a; . ./deploy/.env; set +a
mkdir -p backups
alias prod='docker compose -f docker-compose.prod.yml --env-file deploy/.env'
```

### Banco

Backup:

```bash
prod exec db mkdir -p /var/opt/mssql/backup
prod exec db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$DB_PASSWORD" -C -b \
  -Q "BACKUP DATABASE [$DB_DATABASE] TO DISK = N'/var/opt/mssql/backup/ecotrack.bak' WITH INIT"
prod cp db:/var/opt/mssql/backup/ecotrack.bak "backups/ecotrack-$(date +%F).bak"
```

Restauração (a API fica parada durante a troca):

```bash
prod stop backend
prod exec db mkdir -p /var/opt/mssql/backup
prod cp backups/ecotrack-AAAA-MM-DD.bak db:/var/opt/mssql/backup/ecotrack.bak
prod exec db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$DB_PASSWORD" -C -b \
  -Q "RESTORE DATABASE [$DB_DATABASE] FROM DISK = N'/var/opt/mssql/backup/ecotrack.bak' WITH REPLACE"
prod start backend
```

### PDFs

Os PDFs ficam no volume `ecotrack_uploads`.

Backup:

```bash
docker run --rm -v ecotrack_uploads:/dados:ro -v "$PWD/backups":/backup alpine \
  tar czf "/backup/uploads-$(date +%F).tgz" -C /dados .
```

Restauração:

```bash
docker run --rm -v ecotrack_uploads:/dados -v "$PWD/backups":/backup alpine \
  tar xzf /backup/uploads-AAAA-MM-DD.tgz -C /dados
```

Guarde a pasta `backups/` fora da VPS também (por exemplo, baixando com `scp`). Um backup que só existe na VPS se perde junto com ela. O `.bak` e o `.tgz` de uma mesma data andam juntos: o banco guarda o caminho de cada PDF.

## 7. Logs

```bash
docker compose -f docker-compose.prod.yml --env-file deploy/.env ps
docker compose -f docker-compose.prod.yml --env-file deploy/.env logs -f --tail=100 backend
docker compose -f docker-compose.prod.yml --env-file deploy/.env logs --tail=100 db
docker compose -f docker-compose.prod.yml --env-file deploy/.env logs --tail=100 web
```

- `backend`: subida da API, criação do administrador e erros das rotas.
- `db`: SQL Server.
- `web`: Caddy, inclusive a emissão do certificado.

Cada serviço guarda até 5 arquivos de 10 MB de log; os mais antigos são apagados.

## 8. Problemas comuns

| Sintoma | Causa provável |
| --- | --- |
| O banco não fica `healthy` | `DB_PASSWORD` fraca (o SQL Server recusa) ou memória insuficiente. Veja `logs db` |
| A API reinicia sem parar | `JWT_SECRET` vazio ou banco fora do ar. Veja `logs backend` |
| O navegador avisa que o certificado é inválido | O registro A ainda não aponta para a VPS, ou as portas 80 e 443 estão fechadas. Veja `logs web` |
| Login devolve “Muitas tentativas de login” | Foram 10 tentativas erradas em 15 minutos. Espere ou reinicie a API |
| Baixar o PDF dá “arquivo não encontrado” | O PDF foi gerado antes do volume `uploads`, ou o volume foi apagado. Gere de novo |
