# Task — Tela de dashboard

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/113 |
| Quem | Eduardo |
| PBI | [#39](https://github.com/CAMPUSCEUB/EcoTrack/issues/39) US13 — um único pai |
| Milestone | Sprint 05 - Dashboard e PDFs |
| Branch | `feature/113-tela-dashboard` |
| Commit | `feat: adiciona tela de dashboard` |
| Destino | só `src/frontend` |
| Depende de | merge da API de dashboard e da #100 |

A issue #113 já existe. Não crie outra. Pode ir em paralelo com a #114 depois do merge da #112.

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/pages/DashboardPage.jsx` (novo)
- `src/frontend/src/utils/formatters.js`

A rota `/` deixa de ser placeholder e passa a mostrar o dashboard. O menu troca Início por Dashboard e mantém Destinação e Relatórios. O CSS desses blocos já está no `global.css` do esqueleto.

## PR

Título: `feat: adiciona tela de dashboard`

```text
Closes #113

A home autenticada mostra totais e quebras do GET /dashboard.

Como validar: logar e ver equipamentos, lotes, agências, destinações e as quebras. O menu continua com Destinação e Relatórios.
```

## Como validar

- `/` renderiza o dashboard.
- Menu exibe Dashboard, Destinação e Relatórios.
- Sem rota de motorista.
