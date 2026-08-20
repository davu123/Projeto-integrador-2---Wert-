# 03 — Stack técnica

Separar **agora** e **quando**. Não scaffoldar o “quando”. Stack fechada no Artefato 1 e no código da raiz — sem fork de framework.

## Agora

| Decisão | Escolha | Por quê |
|---|---|---|
| Front | React 18.3, Vite 5, react-router-dom 6, JavaScript | Já no `referencia/frontend/package.json` |
| Back | Node 20, Express 4, mssql 11 | Já no `referencia/backend/package.json` |
| Auth | JWT (`jsonwebtoken`) + bcrypt | Artefato 1 / código |
| PDF | PDFKit | Relatórios de conformidade |
| Banco | SQL Server 2022 (`mcr.microsoft.com/mssql/server:2022-latest`) | Compose da raiz |
| Schema | `ensureDatabaseSchema()` em `referencia/backend/src/config/schema.js` (idempotente, sem pasta `migrations/`) | Como a referência já sobe |
| Pacotes | npm | `package-lock.json` nos dois lados |
| Onde vive (após freeze) | `referencia/` (congelado) e `app/` (reconstrução) | Plano SDD |
| Versionamento | Git neste repositório | Commits por tarefa do ROADMAP |
| Preview referência | `docker compose` em `referencia/` — portas 1433 (SQL), 3000 (API), 5173 (Vite) | Sistema que já funciona |
| Preview app | `docker compose` em `app/` — portas 1434 (SQL), 3001 (API), 5174 (Vite) | Evita colidir com a referência |
| Banco da referência | `EcoTrackWert` | `.env.example` atual |
| Banco do app | `EcoTrackWertApp` no container próprio | Isola dados da reconstrução |

Comandos (depois da fase 0):

```bash
cd referencia
docker compose up --build

cd app
docker compose up --build
```

API da referência: `http://127.0.0.1:3000/health`. API do app: `http://127.0.0.1:3001/health`. Front: `5173` vs `5174`.

## Quando passar a outra camada

Critério (não data): o grupo tem o GitHub novo do PI2 e o `app/` já tem histórico de sprints.

| Decisão | Escolha | Por quê |
|---|---|---|
| Repo novo | histórico só de `app/` | Sem `referencia/` nem receitas de engenharia reversa |
| Filter-repo / cópia | `(pendente)` até o autor escolher a ferramenta | Horizonte |
| CI | `(pendente)` | Não bloqueia o ROADMAP |

Forks ainda abertos: só o **como** copiar o git para o repo novo (tabela no `06`). Framework, npm e Docker **não** estão abertos.
