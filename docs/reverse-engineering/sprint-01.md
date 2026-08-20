# Sprint 1 — F01, F05 (US01, US05)

Login JWT + CRUD de agências. Fonte: `referencia/` (prefixar os paths).

## Copiar / adaptar

**Schema** em `app/backend/src/config/schema.js`: blocos `dbo.usuario` e `dbo.agencia` + seed admin (`seed_admin.sql` / hash já em `schema.js`). Sem tabelas de lote/equipamento.

**API**

- `authController.js`, `authRoutes.js` (`POST /auth/login`)
- `authMiddleware.js`
- `agencyController.js`, `agencyRoutes.js` (GET/POST/PUT/DELETE com JWT)
- `app.js`: `/health`, `/auth`, `/agencias`, static ainda não precisa de uploads

**Front**

- `LoginPage.jsx`, `AuthContext.jsx`, `ProtectedRoute.jsx`
- `api.js` (fetch + Bearer + login)
- `AgenciesPage.jsx`, `agencyService.js`
- `App.jsx`: `/login`, `/agencias`; `/` placeholder autenticado (não `DashboardPage`)
- `Sidebar.jsx`: só Agências (e home se houver placeholder)

## Não copiar

Usuários CRUD, lotes, equipamentos, destinação, relatórios, dashboard, `newequipment.jsx`.

## Aceite da sprint

Login com `admin@wert.com.br` / senha do seed; CRUD de agência no browser em `http://127.0.0.1:5174`. `GET /agencias` sem token → 401.
