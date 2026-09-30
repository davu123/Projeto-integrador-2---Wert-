# Task — Listar e baixar PDFs na tela

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/114 |
| Quem | Eduardo |
| PBI | [#41](https://github.com/CAMPUSCEUB/EcoTrack/issues/41) US15 — um único pai |
| Milestone | Sprint 05 - Dashboard e PDFs |
| Branch | `feature/114-tela-listar-pdf` |
| Commit | `feat: lista e baixa pdfs na tela` |
| Destino | só `src/frontend` |
| Depende de | merge da API de listagem e da #100 |

A issue #114 já existe. Não crie outra. Pode ir em paralelo com a #112 depois do merge da #111. A #113 espera a #112.

Não copia `App.jsx`: a rota `/relatorios` já entrou na #100. Esta Task só completa a página.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/Reports.jsx`
- `src/frontend/src/services/reportsService.js`

A página continua gerando PDF e passa a listar os arquivos com link Baixar PDF (`VITE_API_URL` + `arquivo_pdf_url`).

## PR

Título: `feat: lista e baixa pdfs na tela`

```text
Closes #114

A página /relatorios lista os PDFs gerados e abre o download. O botão Gerar PDF permanece.

Como validar: logar, abrir Relatórios, ver a lista e baixar um PDF já gerado na Sprint 04.
```

## Como validar

- A lista chama `GET /relatorios`.
- O link abre o arquivo em `/uploads` (publicado na API de listagem, não na do dashboard).
- Gerar PDF continua na mesma página.
