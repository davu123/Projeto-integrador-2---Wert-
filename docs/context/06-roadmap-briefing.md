# 06 — Briefing para gerar o ROADMAP

Este documento **não é o roadmap**. É a instrução para produzir ou atualizar `ROADMAP.md` (skill `roadmap-sdd`). As restrições abaixo **ganham** das defaults da skill (caderno, sem backend, artefato Markdown antes de app).

## Restrições

- **Solo na execução SDD.** Uma tarefa por conversa, mesmo o grupo sendo quatro pessoas. Sem trilhas paralelas no ROADMAP.
- **Trabalho agora = reconstrução do software.** Núcleo = código em `referencia/` (depois do freeze) + backlog F01–F21. Não é caderno de notas.
- **App começa na fase 0** (esqueleto Docker + health). Gate do autor: Compose da referência sobe; Compose do `app/` sobe. DoD de uma fase de sprint = `app/` ainda sobe e o aceite da fase (browser ou `curl`) passou.
- **Sprints 1–5:** copiar/adaptar **somente** os paths listados em `docs/reverse-engineering/`. Se a referência mistura duas features no mesmo arquivo (ex.: `loteController.js` com CRUD + PATCH status), a tarefa **extrai** só o trecho da sprint. Não copiar o dump inteiro “para ir mais rápido”.
- **Sprints 6–9:** **não há fonte** na referência. Implementar código novo no mesmo estilo (Express + React + SQL Server), lendo o backlog e `sprint-0N.md`. Sem GPS e sem atribuição automática.
- **`referencia/` é read-only** depois da tarefa de freeze. Agente que editar `referencia/` falhou a tarefa.
- **Não editar** `docs/lean-inception/` nem artefatos acadêmicos nas tarefas de código.
- **Commits:** não mencionar PI1, legado, “já existia”, “cópia do PI1”. Mensagem = comportamento da sprint (`feat(1.1): autentica usuario com jwt`).
- **Não criar** nove pastas `sprints/01`… com o app inteiro.
- **Não recriar** `backend/` e `frontend/` na raiz: a fonte funcional é `referencia/`; a reconstrução é `app/`.
- **Portas (já decididas):** referência 1433/3000/5173; app 1434/3001/5174. Banco do app: `EcoTrackWertApp`.
- **npm** (já decidido). Sem fork de React/Express.
- **SDD para modelo menor.** Uma tarefa = um objetivo, aceite testável, um commit. Sem “faça a sprint inteira”.
- **Sem datas** no ROADMAP. Horizonte (repo novo) ≠ fase.

## Formato esperado do ROADMAP.md

Lista executável, alinhada ao `roadmap-sdd`:

- Topo: prompts mestre (agente / autor / continuação), fechar tarefa, decisão do autor, regras permanentes (sem `git add -A`, sem amend, sem `--no-verify`; Windows: `git commit -m "type(id): descrição"`).
- Progresso com checkboxes por fase e por tarefa.
- Tabela **Decisões do autor**.
- Fases: **0** freeze + esqueleto; **1–9** = sprints acadêmicas. Cada fase: objetivo, pronto quando, depende de.
- Cada tarefa: tipo, bloqueio, docs obrigatórios, arquivos permitidos (novos/editar), fazer, fora de escopo, aceite, como testar, commit sugerido `type(id): descrição` em português, minúscula, sem ponto final.
- Fim de cada fase 1–9: uma tarefa `autor` de verificação no browser/Docker.
- **Fora do roadmap atual:** repo novo, GPS.

Fatiar como no plano aprovado (API depois tela quando couber; extração quando o arquivo da referência mistura features):

- 0.1 copiar raiz → `referencia/`; 0.2 autor Compose referência; 0.3 esqueleto `app/`; 0.4 autor health do app.
- 1.1 login API; 1.2 LoginPage; 1.3 agências API; 1.4 AgenciesPage; 1.5 autor.
- 2.x usuários API/tela; lotes CRUD sem PATCH status; autor.
- 3.x PATCH status; equipamentos GET+POST e telas; autor.
- 4.x destinação; POST gerar PDF; autor.
- 5.x dashboard; GET/listar PDFs; autor.
- 6.x motorista no CHECK; middleware de perfil; filtro de menu; F12; autor.
- 7.x rota/parada + atribuição manual + UI Marcos; autor.
- 8.x rota do dia + status recolhimento; autor.
- 9.x PUT equipamento + PDF com rota/motorista + indicador de coletas; autor.

Também criar (na mesma geração do ROADMAP, não são tarefas de código): `docs/reverse-engineering/mapa-codigo.md` e `sprint-01.md` … `sprint-09.md`.

## Decisões ainda abertas

| Tarefa futura (id sugerido) | O que decidir | Registrada |
|---|---|---|
| 0.5 | Apagar duplicata `backend/` e `frontend/` na raiz | apagar (autor, 20/08/2026) |
| horizonte | Ferramenta para levar só `app/` ao GitHub novo (filter-repo, cópia + commits refeitos, outro) | `(pendente)` |

Portas, npm, React, Express, SQL Server: **não** estão pendentes.

## O que o roadmap não deve fazer

- Estimar prazos em datas.
- Tratar horizonte (repo novo, GPS) como fase 0.
- Tarefas “implementar a sprint N”.
- Copiar arquivos órfãos (`newequipment.jsx`, `reportsPage.jsx`, dockerfiles duplicados, re-exports `authservice.js` / `equipmentservice.js`).
- Deixar o modelo escolher framework ou gerenciador de pacotes.
- Gerar a spec de novo no lugar deste `docs/context/`.
- Executar as tarefas na conversa que **escreve** o ROADMAP (exceto o autor pedir explicitamente a fase 0 depois da lista existir).
