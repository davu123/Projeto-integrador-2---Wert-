# Task #55 — Criar src com esqueleto Docker e health

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/55 |
| Tipo | Task (infra; sem PBI pai) |
| Milestone | Sprint 01 - Login e agências |
| Branch | `feature/55-cria-esqueleto-src` |
| Commit | `chore: cria esqueleto docker em src` |
| Destino no EcoTrack | criar a pasta `src/` na raiz |

Esta Task **cria** `src/`. As outras só acrescentam arquivos.

## O que copiar

Tudo que está em `src/` desta pasta → `src/` no EcoTrack.

## PR

Título: `chore: cria esqueleto docker em src`

```text
Closes #55

Cria src/ com Docker Compose, API só com GET /health e front placeholder.

Como validar: docker compose up --build em src/; abrir http://127.0.0.1:3001/health e http://127.0.0.1:5174.
```

Tipo de mudança: Requisito.

## Como validar

- `GET http://127.0.0.1:3001/health` responde.
- Front placeholder abre em 5174.
- Não existe `POST /auth/login` nem `/agencias`.
