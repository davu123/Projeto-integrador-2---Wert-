# Task #52 — Tela de login e sessão

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/52 |
| PBI | #27 US01 |
| Milestone | Sprint 01 - Login e agências |
| Branch | `feature/52-tela-login-sessao` |
| Commit | `feat: adiciona tela de login e sessao` |
| Destino | só `src/frontend` |
| Depende de | merge da #50 |

Pode ir em paralelo com a #51.

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/main.jsx`
- `src/frontend/src/pages/LoginPage.jsx` (novo)
- `src/frontend/src/context/AuthContext.jsx` (novo)
- `src/frontend/src/components/ProtectedRoute.jsx` (novo)
- `src/frontend/src/components/Layout.jsx` (novo)
- `src/frontend/src/components/Header.jsx` (novo)
- `src/frontend/src/components/Sidebar.jsx` (novo)
- `src/frontend/src/services/api.js` (novo)

Home autenticada = placeholder. **Não** copiar DashboardPage.

## PR

Título: `feat: adiciona tela de login e sessao`

```text
Closes #52

Tela /login, sessão no navegador e rota protegida. Home ainda é placeholder.

Como validar: abrir http://127.0.0.1:5174, entrar com admin@wert.com.br / ecotrack2025 e recarregar autenticado.
```

## Como validar

- Sem sessão cai em `/login`.
- Login grava token e mostra a home placeholder.
- Menu só tem Início (Agências entram na #53).
