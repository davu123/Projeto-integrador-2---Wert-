# Task — Tela para gerar PDF

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/100 |
| Quem | Eduardo |
| PBI | [#40](https://github.com/CAMPUSCEUB/EcoTrack/issues/40) US14 — um único pai |
| Milestone | Sprint 04 - Destinação e PDF |
| Branch | `feature/100-tela-gerar-pdf` |
| Commit | `feat: adiciona geracao de pdf na tela` |
| Destino | só `src/frontend` |
| Depende de | merge da Task de PDF na API **e** da tela de destinação |

A issue #100 já existe. Não crie outra. Espere o merge da #99 e da #98.

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/pages/Reports.jsx` (novo)
- `src/frontend/src/services/reportsService.js` (novo)
- `src/frontend/src/utils/formatters.js`

Rota `/relatorios`: escolha do lote e botão Gerar PDF. **Não** há tabela de downloads nem `GET /relatorios`. Não copiar `reportsPage.jsx`.

O `App.jsx` desta pasta já inclui Destinação. A tela de destinação precisa estar na `main` antes deste merge.

## PR

Título: `feat: adiciona geracao de pdf na tela`

```text
Closes #100

Página /relatorios protegida, item no menu e botão Gerar PDF por lote. Sem listagem nem download.

Como validar: logar, abrir Relatórios, gerar o PDF de um lote e conferir a mensagem de sucesso. Não deve existir lista de arquivos.
```

## Como validar

- Menu exibe Relatórios e continua exibindo Destinação.
- Gerar PDF no browser.
- Não há `listarRelatorios` no frontend.
