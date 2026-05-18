# EcoTrack Wert - MVP 

Este pacote entrega a base do MVP alinhada à Sprint 1 do projeto:

- US01 - Cadastrar equipamentos eletrônicos
- US02 - Login seguro
- US03 - Estrutura inicial do banco

## Estrutura

- `backend/` API Node.js + Express + SQL Server
- `frontend/` React + Vite

## Passo a passo

### Banco
Rode os scripts em `backend/database/scripts`:
1. `create_tables.sql`
2. `seed_admin.sql`

### Backend
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

## Acesso inicial

- Usuário: `admin@wert.com.br`
- Senha: `ecotrack2025`

## Observações

- Ajuste os dados do SQL Server no arquivo `.env` do backend.
- O layout segue a direção visual escolhida para o MVP, com modo claro/escuro e opções básicas de acessibilidade.
