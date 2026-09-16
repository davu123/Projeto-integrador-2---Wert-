# Task #50 — POST /auth/login e JWT na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/50 |
| Quem | Artur (catch-up Sprint 01) |
| PBI | #27 US01 |
| Milestone | Sprint 01 - Login e agências |
| Branch | `feature/50-auth-login-api` |
| Commit | `feat: autentica usuario com jwt` |
| Destino | só `src/backend` |
| Depende de | merge da #55 |

A branch local já pode existir; rebaseie em `main` **depois** do merge da #55.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/authController.js` (novo)
- `src/backend/src/routes/authRoutes.js` (novo)
- `src/backend/src/middlewares/authMiddleware.js` (novo)
- `src/backend/src/app.js`
- `src/backend/src/config/schema.js`

Seed: `admin@wert.com.br` / `ecotrack2025`.

## PR

Título: `feat: autentica usuario com jwt`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #50

Adiciona POST /auth/login, JWT, middleware e tabela usuario com seed admin.

Como validar: POST /auth/login com admin@wert.com.br / ecotrack2025; uma rota protegida sem token deve retornar 401.
```

## Como validar

- Login devolve token.
- Sem Bearer → 401.
- Schema tem `dbo.usuario` e **não** tem `dbo.agencia`.
