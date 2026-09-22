# Task — Tela de destinação

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/98 |
| Quem | Eduardo |
| PBI | [#37](https://github.com/CAMPUSCEUB/EcoTrack/issues/37) US11 — um único pai |
| Milestone | Sprint 04 - Destinação e PDF |
| Branch | `feature/98-tela-destinacao` |
| Commit | `feat: adiciona tela de destinacao` |
| Destino | só `src/frontend` |
| Depende de | merge da Task de destinação na API e da tela da Sprint 03 (#84) |

A issue #98 já existe. Não crie outra. Pode ir em paralelo com a #99 depois do merge da #97.

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/pages/DestinationsPage.jsx` (novo)
- `src/frontend/src/services/destinationService.js` (novo)
- `src/frontend/src/utils/formatters.js`

Rota `/destinacoes`. Menu Destinação. Sem relatórios.

## PR

Título: `feat: adiciona tela de destinacao`

```text
Closes #98

Página /destinacoes protegida e item no menu. Uma destinação por equipamento.

Como validar: logar, abrir Destinação e registrar reciclagem, reúso ou destruição de um equipamento. Certificado é opcional.
```

## Como validar

- Menu exibe Destinação.
- CRUD no browser com um equipamento já cadastrado.
- Certificado pode ficar em branco. Se preenchido, vai em `certificado_url`.
- Sem tela de relatórios.
