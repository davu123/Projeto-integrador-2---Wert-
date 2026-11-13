# Task — Download do relatório com login

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/197 |
| Quem | Eduardo |
| PBI | [#180](https://github.com/CAMPUSCEUB/EcoTrack/issues/180) US23 — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/197-tela-download-relatorio` |
| Commit | `feat: baixa o pdf do relatorio com o token` |
| Destino | só `src/frontend` |
| Depende de | merge da API protegida (#195) |

A issue #197 já existe. Não crie outra.

Começar **depois** do merge da #195: a tela chama o `GET /relatorios/:id/arquivo`, que só existe depois dela. Desde a #195 o `/uploads` não é público, e o link antigo da tela **Relatórios** dá 404 até esta Task entrar.

Não depende da tela **Minha conta** (#196): os arquivos não se cruzam.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/routes/reportRoutes.js` tem `router.get('/:id/arquivo', ...)` (a #195 está na `main`). Se faltar, pare e espere o merge;
- `src/frontend/src/pages/Reports.jsx` tem o link `<a href={`${API_URL}${relatorio.arquivo_pdf_url}`}>`;
- `src/frontend/src/services/api.js` exporta `API_URL` e o objeto `api` com `get`, `post`, `put`, `patch` e `delete`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/services/api.js`
- `src/frontend/src/services/reportsService.js`
- `src/frontend/src/pages/Reports.jsx`

Os três são os da `main` mais o bloco novo:

- **`api.js`**: `api.download(path)` busca o arquivo com o token e devolve um `Blob`. Resposta 401 limpa a sessão, como as outras chamadas. Outro erro vira um `Error` com a mensagem da API e o `status`.
- **`reportsService.js`**: `baixarRelatorio(id)` chama `/relatorios/:id/arquivo`.
- **`Reports.jsx`**: o link **Baixar PDF** vira um botão. O clique busca o PDF com o token, cria um endereço temporário com `URL.createObjectURL` e baixa como `relatorio-lote-<lote>-<id>.pdf`. Enquanto baixa, o botão mostra **Baixando...**. Mensagens:
  - 403 → “Seu perfil não tem permissão para baixar relatórios.”;
  - 404 → “O arquivo deste relatório não foi encontrado no servidor. Gere o relatório de novo.”;
  - outro erro → a mensagem da API.

O formulário de gerar relatório e a tabela não mudam. Identidade visual nova não entra nesta Task.

## PR

Título: `feat: baixa o pdf do relatorio com o token`

Corpo: o template do repositório inteiro, com os títulos `##`. Preencha assim:

- **Issue relacionada**: `Closes #197` e, na linha de baixo, `Refs #180`.
- **Resumo**: o botão **Baixar PDF** busca o arquivo pela rota autenticada, com mensagens para 403 e 404.
- **Tipo de mudança**: Requisito.
- **Como validar**: os itens da seção abaixo que você testou.
- **Evidências**: print do PDF baixado e da mensagem de 404.

## Como validar

- Administrador, gestor ou auditor: **Relatórios**, **Baixar PDF** → o navegador baixa `relatorio-lote-<lote>-<id>.pdf`, e o arquivo abre.
- Na aba de rede, a chamada é `GET /relatorios/<id>/arquivo` com o cabeçalho `Authorization`.
- Apagar o PDF da pasta `src/backend/uploads/reports` e clicar de novo → mensagem de 404.
- Gerar um relatório novo e baixar → funciona.
- `npm run build` em `src/frontend` termina sem erro.
