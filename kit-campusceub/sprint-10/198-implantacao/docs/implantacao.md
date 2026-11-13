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

O código chega à VPS como um pacote `.tar.gz` gerado a partir da `main`, num computador que já tem acesso ao repositório, e enviado por `scp`. A VPS não precisa de Git nem de credencial do GitHub.

Nos comandos abaixo:

- `<subdominio>` é o endereço completo do sistema (por exemplo `ecotrack.exemplo.com.br`);
- `<IP_DA_VPS>` é o IP público da VPS;
- `<usuario>` é o usuário de SSH da VPS;
- `<versao>` é o commit curto da `main` que está no pacote (por exemplo `a1b2c3d`).

Nenhum desses valores entra no repositório.

Na VPS, tudo fica em `/opt/ecotrack`:

| Pasta | Conteúdo |
| --- | --- |
| `/opt/ecotrack/pacotes` | Pacotes `.tar.gz` recebidos |
| `/opt/ecotrack/atual` | Versão em uso. Os comandos `docker compose` rodam em `/opt/ecotrack/atual/src` |
| `/opt/ecotrack/anterior` | Versão anterior, guardada para voltar atrás |
| `/opt/ecotrack/backups` | Backups do banco e dos PDFs. Fica fora de `atual`, então a atualização não apaga |

## 1. Requisitos

Na VPS:

- Processador x86-64. O SQL Server não roda em ARM.
- 4 GB de memória ou mais. O SQL Server sozinho pede 2 GB.
- 20 GB de disco ou mais, para o sistema, as imagens, o banco, os PDFs e os backups.
- Ubuntu 22.04 ou 24.04.
- Docker Engine com o plugin `docker compose`. Se a imagem da VPS não trouxer o Docker, instale pelo guia oficial em <https://docs.docker.com/engine/install/ubuntu/>.
- Acesso por SSH com um usuário que pode usar o Docker.
- Portas 22, 80 e 443 liberadas no firewall da VPS. As portas do banco e da API não são publicadas.

No computador que gera o pacote:

- Git, com uma cópia do repositório e acesso de leitura a ele;
- cliente OpenSSH (`ssh` e `scp`). O Windows 10 e o 11 já trazem os dois no PowerShell.

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

### 3.1 Preparar a pasta na VPS

Na VPS, uma vez só:

```bash
sudo mkdir -p /opt/ecotrack/pacotes /opt/ecotrack/backups
sudo chown -R <usuario>:<usuario> /opt/ecotrack
```

### 3.2 Gerar e enviar o pacote

No computador que gera o pacote, no PowerShell, dentro da pasta do repositório:

```powershell
git fetch origin
$versao = git rev-parse --short origin/main
git -c core.autocrlf=false archive --format=tar.gz -o "ecotrack-$versao.tar.gz" origin/main src docs/implantacao.md
scp "ecotrack-$versao.tar.gz" <usuario>@<IP_DA_VPS>:/opt/ecotrack/pacotes/
$versao
```

- O `git fetch` só atualiza a referência `origin/main`. A cópia local e a branch atual não mudam.
- O pacote leva o `src/` e este guia, sem `.git`, sem `node_modules` e sem nenhum `.env`.
- O `-c core.autocrlf=false` mantém o fim de linha dos arquivos como está no repositório. Sem ele, o Git no Windows pode converter os arquivos para CRLF. Aí o `deploy/.env` copiado do modelo leva um caractere a mais no fim de cada valor, e as senhas não conferem no Linux.
- O último comando mostra a `<versao>`. Anote: ela é o nome do pacote.

Em Linux ou macOS, os mesmos comandos funcionam no terminal, com `versao=$(git rev-parse --short origin/main)` e `$versao` nas outras linhas.

### 3.3 Extrair e configurar

Na VPS:

```bash
cd /opt/ecotrack
mkdir atual
tar -xzf pacotes/ecotrack-<versao>.tar.gz -C atual
cd atual/src
cp deploy/.env.example deploy/.env
chmod 600 deploy/.env
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

O SQL Server grava a senha do `sa` na primeira subida. Trocar o `DB_PASSWORD` depois não muda a senha do banco, e a API deixa de conectar.

### 3.4 Subir

Dentro de `/opt/ecotrack/atual/src`:

```bash
docker compose -f docker-compose.prod.yml --env-file deploy/.env up -d --build
docker compose -f docker-compose.prod.yml --env-file deploy/.env ps
```

A primeira subida baixa as imagens e pode levar alguns minutos. O banco precisa ficar `healthy` antes da API, e a API antes da tela. Confira a API:

```bash
curl https://<subdominio>/api/health
```

A resposta esperada é `{"message":"API EcoTrack Wert online.","banco":"ok"}`. Se o banco cair, a mesma rota devolve 503.

### 3.5 Alternativa: clonar com token

Quem tem acesso de leitura ao repositório no GitHub pode clonar direto na VPS, depois da etapa 3.1 e no lugar das etapas 3.2 e 3.3:

```bash
git config --get credential.helper
git clone https://github.com/CAMPUSCEUB/EcoTrack.git /opt/ecotrack/atual
```

- O primeiro comando precisa voltar vazio. Se mostrar um valor, o Git vai gravar o token num arquivo: use o pacote.
- O `git clone` pede usuário e senha. Informe o usuário do GitHub e, no lugar da senha, cole um token de acesso pessoal só de leitura do conteúdo do repositório, com validade curta. O que se digita nessa pergunta não aparece na tela nem vai para o histórico do shell.
- Não coloque o token na URL do `git clone`: ele ficaria no histórico do shell e no `.git/config`.
- Se a organização não aceitar esse tipo de token, use o pacote.

Depois do clone, siga a partir do `cd atual/src` da etapa 3.3. Nesse caminho, a atualização é `git pull` dentro de `/opt/ecotrack/atual`, que pede o token de novo. O `deploy/.env` continua no lugar, porque o Git ignora arquivos `.env`. Faça o backup antes (seção 6) e depois rode o `up -d --build` e o `restart web` da seção 5.

## 4. Primeiro acesso

1. Abra `https://<subdominio>` e entre com o `ADMIN_EMAIL` e o `ADMIN_PASSWORD`.
2. Em **Minha conta**, troque a senha.
3. Apague o valor de `ADMIN_PASSWORD` no `deploy/.env` e recrie a API, dentro de `/opt/ecotrack/atual/src`:

```bash
docker compose -f docker-compose.prod.yml --env-file deploy/.env up -d backend
```

A API só cria o administrador quando o banco não tem nenhum. Se o log mostrar “nenhum administrador no banco”, faltou o `ADMIN_EMAIL` ou o `ADMIN_PASSWORD`, ou a senha tem menos de 8 caracteres.

Os outros usuários são criados pelo administrador na tela **Usuários**.

## 5. Atualização

Depois de um merge na `main`:

1. Na VPS, faça o backup do banco e dos PDFs (seção 6).
2. No computador que gera o pacote, gere e envie um pacote novo, com os mesmos comandos da etapa 3.2.
3. Na VPS, extraia o pacote numa pasta nova, traga o `deploy/.env` e troque as pastas:

```bash
cd /opt/ecotrack
rm -rf nova
mkdir nova
tar -xzf pacotes/ecotrack-<versao>.tar.gz -C nova
cp -p atual/src/deploy/.env nova/src/deploy/.env
rm -rf anterior
mv atual anterior
mv nova atual
```

4. Suba a versão nova:

```bash
cd /opt/ecotrack/atual/src
docker compose -f docker-compose.prod.yml --env-file deploy/.env up -d --build
docker compose -f docker-compose.prod.yml --env-file deploy/.env restart web
docker compose -f docker-compose.prod.yml --env-file deploy/.env ps
```

- A pasta nova vem só do pacote. Arquivo apagado na `main` não fica para trás.
- O `restart web` faz o Caddy ler o `Caddyfile` da pasta nova, mesmo quando a imagem da tela não mudou.
- Os dados não se perdem. O `docker-compose.prod.yml` tem `name: ecotrack`, então os volumes se chamam `ecotrack_sqlserver_data`, `ecotrack_uploads`, `ecotrack_caddy_data` e `ecotrack_caddy_config`, seja qual for a pasta. Trocar `atual` por `nova` não toca neles.
- A API confere e cria as tabelas novas ao subir.
- Nunca rode `docker compose ... down -v`: o `-v` apaga os volumes, e com eles o banco e os PDFs.

Para voltar à versão anterior, dentro de `/opt/ecotrack`:

```bash
rm -rf falhou
mv atual falhou
mv anterior atual
cd atual/src
docker compose -f docker-compose.prod.yml --env-file deploy/.env up -d --build
docker compose -f docker-compose.prod.yml --env-file deploy/.env restart web
```

Se a versão nova já tinha mudado o banco, restaure também o backup feito no passo 1 (seção 6).

## 6. Backup e restauração

Os comandos desta seção leem o `deploy/.env` no shell e gravam em `/opt/ecotrack/backups`. Rode-os dentro de `/opt/ecotrack/atual/src`:

```bash
cd /opt/ecotrack/atual/src
set -a; . ./deploy/.env; set +a
BACKUPS=/opt/ecotrack/backups
alias prod='docker compose -f docker-compose.prod.yml --env-file deploy/.env'
```

### Banco

Backup:

```bash
prod exec db mkdir -p /var/opt/mssql/backup
prod exec db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$DB_PASSWORD" -C -b \
  -Q "BACKUP DATABASE [$DB_DATABASE] TO DISK = N'/var/opt/mssql/backup/ecotrack.bak' WITH INIT"
prod cp db:/var/opt/mssql/backup/ecotrack.bak "$BACKUPS/ecotrack-$(date +%F).bak"
```

Restauração (a API fica parada durante a troca):

```bash
prod stop backend
prod exec db mkdir -p /var/opt/mssql/backup
prod cp "$BACKUPS/ecotrack-AAAA-MM-DD.bak" db:/var/opt/mssql/backup/ecotrack.bak
prod exec db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$DB_PASSWORD" -C -b \
  -Q "RESTORE DATABASE [$DB_DATABASE] FROM DISK = N'/var/opt/mssql/backup/ecotrack.bak' WITH REPLACE"
prod start backend
```

### PDFs

Os PDFs ficam no volume `ecotrack_uploads`.

Backup:

```bash
docker run --rm -v ecotrack_uploads:/dados:ro -v "$BACKUPS":/backup alpine \
  tar czf "/backup/uploads-$(date +%F).tgz" -C /dados .
```

Restauração:

```bash
docker run --rm -v ecotrack_uploads:/dados -v "$BACKUPS":/backup alpine \
  tar xzf /backup/uploads-AAAA-MM-DD.tgz -C /dados
```

### Cópia fora da VPS

Um backup que só existe na VPS se perde junto com ela. Baixe a pasta de backups para outro computador. No PowerShell:

```powershell
scp -r <usuario>@<IP_DA_VPS>:/opt/ecotrack/backups .\backups-ecotrack
```

O `.bak` e o `.tgz` de uma mesma data andam juntos: o banco guarda o caminho de cada PDF. Guarde também uma cópia do `deploy/.env` em lugar seguro, fora de qualquer repositório: sem a `DB_PASSWORD` dele, o banco restaurado não abre.

## 7. Logs

Dentro de `/opt/ecotrack/atual/src`:

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

Para saber qual versão está no ar, veja o pacote mais recente:

```bash
ls -t /opt/ecotrack/pacotes | head -1
```

## 8. Problemas comuns

| Sintoma | Causa provável |
| --- | --- |
| O banco não fica `healthy` | `DB_PASSWORD` fraca (o SQL Server recusa) ou memória insuficiente. Veja `logs db` |
| A API reinicia sem parar | `JWT_SECRET` vazio, banco fora do ar ou `DB_PASSWORD` trocado depois da primeira subida. Veja `logs backend` |
| O `docker compose` não acha o `deploy/.env` | O comando rodou fora de `/opt/ecotrack/atual/src`, ou o `.env` não foi copiado para a pasta nova na atualização. Ele continua em `/opt/ecotrack/anterior/src/deploy/.env` |
| O `.env` parece certo, mas a senha não confere | O pacote saiu com fim de linha do Windows. `grep -c $'\r' deploy/.env` mostra mais que 0. Gere o pacote de novo com `-c core.autocrlf=false` |
| O navegador avisa que o certificado é inválido | O registro A ainda não aponta para a VPS, ou as portas 80 e 443 estão fechadas. Veja `logs web` |
| Login devolve “Muitas tentativas de login” | Foram 10 tentativas erradas em 15 minutos. Espere ou reinicie a API |
| Baixar o PDF dá “arquivo não encontrado” | O PDF foi gerado antes do volume `uploads`, ou o volume foi apagado. Gere de novo |

## 9. Entrega ao TI da Wert

Quando o sistema passar para o TI da Wert, a equipe recebe o pacote `.tar.gz` da versão em uso ou uma cópia do código num repositório próprio, e segue este mesmo guia:

- Com o pacote, a primeira subida começa na etapa 3.3, e cada versão nova chega como outro pacote (seção 5).
- Com repositório próprio, o pacote sai do repositório da equipe com os comandos da etapa 3.2, ou a VPS clona dele como na etapa 3.5.

O `deploy/.env` e os backups passam por um canal seguro, nunca por e-mail aberto nem por repositório. Ao receber a VPS, troque o `JWT_SECRET` e recrie a API: todos os usuários precisam entrar de novo. O `DB_PASSWORD` não muda (seção 3.3).
