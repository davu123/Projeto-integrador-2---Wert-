# AGENTS.md

Contexto para qualquer agente neste repositório. Leia este arquivo inteiro antes de alterar estrutura, kit ou documentação.

Há dois trabalhos aqui. Não misture.

1. A reconstrução do semestre, em `app/` e `referencia/`. Spec em `docs/context/`.
2. O kit que o colega copia para o repositório institucional [CAMPUSCEUB/EcoTrack](https://github.com/CAMPUSCEUB/EcoTrack). Pasta `kit-campusceub/`. Branch `docs/lean-inception-sprints`.

A linguagem de engenharia reversa, PI1, “já existia” e “produto meio pronto” fica neste repositório. Não entra em README, sprint, issue ou PR do EcoTrack. O kit que será copiado também não leva essa frase.

## Reconstrução

Reconstrução sprint a sprint do EcoTrack Wert em `app/`, com o sistema que já funciona congelado em `referencia/`. Visão: `docs/context/00-project-brief.md`.

### Spec vs execução

A spec está em `docs/context/`. A lista de execução está em `ROADMAP.md` (quando existir).

Se o autor pediu para avançar o projeto, implementar uma fase, ou “continuar o roadmap”:

- **Com** `ROADMAP.md`: o ROADMAP está congelado na Tarefa 1.1 desde 31/10/2026. Não executar. Dizer isso ao Lucas e perguntar.
- **Sem** `ROADMAP.md`: não invente um plano. A spec está em `docs/context/` (o `06` é o briefing). Gerar a lista é trabalho do `roadmap-sdd`, não improvisar fases.

### Documentos de contexto (só os que existem)

- `docs/context/00-project-brief.md` — o que é o projeto de reconstrução
- `docs/context/01-information-architecture.md` — árvores `referencia/` vs `app/`
- `docs/context/03-tech-stack.md` — React/Vite, Express, SQL Server, portas
- `docs/context/04-design-system.md` — copiar CSS da referência, não inventar
- `docs/context/06-roadmap-briefing.md` — restrições se for **alterar** o ROADMAP

Não existem `02` (modelo de conteúdo de caderno) nem `05` (editorial).

Receitas de cópia: `docs/reverse-engineering/` (quando existirem). Produto acadêmico: `docs/lean-inception/`, `docs/artefatos/`.

### Onde está o código

- Sistema funcional congelado: `referencia/`. Portas 1433 / 3000 / 5173. Não editar.
- Reconstrução do semestre: `app/`. Portas 1434 / 3001 / 5174.
- Kit institucional: `kit-campusceub/`. Uma pasta por Task. O colega copia o `src/` da pasta para o `src/` do EcoTrack.
- Spec ≠ conteúdo acadêmico. Não misturar tarefas de código com edição da Lean Inception.

Estado real em 31/10/2026: o `app/` parou na Tarefa 1.1 do ROADMAP (login, commit `8c2addd`). Só ela e a Fase 0 (0.1, 0.3, 0.5) estão `[x]`. Os kits andaram sem o `app/`: as Sprints 01–05 saíram da `referencia/`, e as Sprints 06–07 (`requirePerfil.js`, `acesso.js`, rotas) são código novo, escrito direto na pasta do kit em cima da `main` do EcoTrack. Hoje o código mais completo do produto é o `src/` da `main` do EcoTrack, não o `app/`. Não há kit da Sprint 08 ainda.

Decisão do Lucas em 31/10/2026: o `app/` e o ROADMAP ficam congelados na Tarefa 1.1. Não avançar o ROADMAP, não apagar o `app/` e não usar o `app/` como base de kit. Todo kit parte da `main` do EcoTrack. Para conferir um kit antes de entregar, aplicar as pastas numa cópia temporária da `main` do EcoTrack no scratchpad, fora dos dois repositórios, e checar se back e front compilam.

A `main` local deste repositório é o sistema antigo (último commit `37b42d6`) e a branch `DocumentacaoLeanPI2` é anterior ao kit. Não mexer em nenhuma das duas.

### Regras da reconstrução

- Não editar `referencia/` depois do freeze.
- Não tratar horizonte (repo novo, GPS) como backlog imediato.
- Sprints 1–5 do `app/`: só paths do mapa. Sprints 6–9: código novo, sem fingir que veio da referência.
- Commit deste repositório sem PI1 no assunto quando o texto for parar no EcoTrack. A explicação da origem fica no `AGENTS.md` e no `docs/context/`, não no README do kit que o colega copia para uma issue.
- Não marcar revisão humana como verdadeira.
- Não scaffoldar telas de sprint futura dentro de `app/` como se já fossem entrega.
- Uma tarefa do ROADMAP por conversa, quando o pedido for o roadmap. Não `git add -A` cego. Não amend. Não `--no-verify`.
- Commit e push neste repositório só quando o Lucas pedir. A branch do kit é `docs/lean-inception-sprints`. Não commitar na `main`.

```bash
cd referencia
docker compose up --build

cd app
docker compose up --build
```

Health: `http://127.0.0.1:3000/health` (referência) e `http://127.0.0.1:3001/health` (app).

## Kit e EcoTrack

O par deste arquivo no EcoTrack é `C:\Users\Lucas\Programas\EcoTrack\AGENTS.md`. Ele está em `.git/info/exclude`. Não o adicione, não o commite, não o cite em issue, PR, README ou sprint. Se `git status` no EcoTrack mostrar `AGENTS.md`, pare.

Os dois arquivos descrevem o mesmo estado de sprint. A reconstrução (`app/`, `referencia/`, `ROADMAP.md`) fica neste. O fluxo de issue, PR e merge fica nos dois. Se a data ou o número divergir, o `gh` manda.

Lucas Gonçalves Balduino (GitHub `Lucas-Balduino`) é o Scrum Master e o Code Review. Está aprendendo issues, PRs e Projects. Explique o passo antes de decidir por ele. O `gh` desta máquina age como Lucas. Não deixe rastro de IA (Cursor, Claude Code ou outro): nada de `Co-authored-by`, “Generated with Claude Code”, commit de IA ou “gerado por” em commit, PR, comentário, issue ou README do kit. Vale mesmo que a ferramenta peça a linha de atribuição.

No EcoTrack o agente não faz `git commit` nem `git push`. Faz a mudança, deixa em stage só os arquivos da Task e entrega a mensagem do commit para o Lucas commitar. No PR, entrega título e corpo no template inteiro, e o Lucas abre. A exceção histórica é o primeiro commit, feito antes da regra. Não repetir. Quem mergeia é o Lucas, com merge commit, sem squash, para o autor do código continuar sendo o aluno. O autor do PR não mergeia o próprio PR. Se o PR for do Lucas, um colega revisa e o merge não é ele. Nos PRs de documentação do Lucas (#127, #130, #142), quem revisa e mergeia é o Artur.

Commit neste repositório, quando o Lucas pedir documentação do kit, sai com o autor que o Git já usa (`Lucas <lucas.balduino@sempreceub.com>`). Não mudar o `git config`. Correção pedida na branch de um colega no EcoTrack: `git commit -m` simples. O `git config` da máquina já liga o commit à conta `Lucas-Balduino`, então não precisa de `-c user.name`/`user.email`. Sem `Co-authored-by`. Correção feita pelo Eduardo na branch do Davi fica no nome do Eduardo.

Se `git checkout -b` no EcoTrack passar a rastrear `origin/main`, rodar `git branch --unset-upstream` antes do push. Não deixar alteração em branch antiga.

### Pessoas

| Papel | Quem | GitHub | A partir da Sprint 04 |
| --- | --- | --- | --- |
| Scrum Master e Code Review | Lucas Gonçalves Balduino | Lucas-Balduino | Organiza, revisa, mergeia o PR dos outros. Não implementa Task de produto. Não mergeia o próprio PR |
| Backend | Davi Oliveira Maia | davi417 | Só API. Conta `davu123` no commit é aceitável |
| Frontend | Eduardo Martins | eduardoMartinsCunha | Só tela |
| Documentação | Artur Feitoza | arturflr5 | Ata de review e relatório. A ata de planning é do Lucas |

O `davu123` é a conta deste repositório. Commit com esse autor não é problema: a conta institucional do Davi é `davi417`.

Como cada um tem trabalhado:

- Artur segue o kit, um PR por vez, pede review e corrige o que o review aponta. Às vezes o corpo usa `###` no lugar de `##`, o relatório da sprint fica no texto do planejamento, e o arquivo ganha BOM. A ata de review é dele. A ata de planning não é.
- Eduardo segue o kit de perto, um commit, preenche o template e espera o merge da dependência. Quando o Davi ficou sem PC, o Eduardo commitou a correção na branch do Davi. O PR continua do Davi.
- Davi já abriu as quatro Tasks da Sprint 02 de uma vez, com template vazio, e mergeou a #79 sozinho com review ainda pedindo mudança. O código depois foi alinhado ao kit. Com ele, a tabela do kit e o `blocked by` precisam estar explícitos. O GitHub não impede abrir PR de issue bloqueada. Conferir a matriz e o schema contra o kit, não só contra o texto do PR.

Catch-up encerrado: Artur fez a Sprint 01 (#50–#53 e #56), Davi a 02 (#79–#82), Eduardo a 03 (#83–#84). A Sprint 03 não é modelo: #83 e #84 cobrem US07, US08 e US09, e o pai oficial é só a US07 (#33). US08 (#34) e US09 (#35) foram fechadas na mão.

### Hierarquia

Epic → Feature (F01–F21) → PBI (US01–US21) → Task. Project 46: `262-CC-PI-II-EcoTrack`. Uma Task tem um pai. O número de Tasks do PBI varia com o escopo. Não há cota de duas. API e tela não entram no mesmo PR quando os dois existem.

`Closes #<task>` fecha só a Task. PBI e Feature fecham na mão quando os filhos estão na `main`. `Refs #<n>` não fecha. Issue que já fechou não recebe `Closes` de novo.

Regra escrita para o colega: `kit-campusceub/README.md`, seção “Corte ao criar um kit novo”. O exemplo curto de `gh pr create` nesse README não substitui o template `.github/PULL_REQUEST_TEMPLATE.md` do EcoTrack. O corpo lá é inteiro, com heading `##`: Issue relacionada, Resumo, Tipo de mudança, Como validar, Evidências, Checklist. Corpo só com `Closes` não serve. Tipo Requisito para código, Documentação para ata ou relatório.

### Recortes que não voltam

- Sprint 02: #80 é GET/POST/PUT, sem DELETE e sem PATCH de status. #82 não tem botão Concluir. #80 depende da #51, não da #79.
- Sprint 04: `certificado_url` opcional. Sem `GET /relatorios`. Sem recusar `concluido` sem destinação.
- Sprint 05: a API de lista publica `/uploads` antes do dashboard, porque as duas alteram `app.js`. O download é `VITE_API_URL` + `arquivo_pdf_url`. O JSON do dashboard tem `indicadores` (equipamentos, lotes, agencias, destinacoes) e as quebras `{label, total}`. Sem indicador de coleta. #117 não mergeou; valeu o #118.
- Sprint 06: motorista entra no cadastro e na matriz. A rota do dia e o recolhimento são Sprint 08–09 (RF23–RF25), não esta. A US12 não tem tela. Três APIs em paralelo.
- Sprint 07: rota com data, paradas e ordem (US17) e atribuição manual de motorista (US18). Sem GPS, mapa, status de recolhimento ou rota no PDF.

### Rotina: criar o kit de uma sprint

1. Ler o PBI, a Feature e o RF. Cortar Tasks pequenas, um pai cada. Marcar no README o que é sprint seguinte e não deve ser copiado da `referencia/`.
2. Ordem pelo arquivo compartilhado. Quem altera o mesmo arquivo vai em série. Quem não altera pode ir em paralelo, e a tabela diz isso.
3. Uma pasta por Task, ainda sem número se a issue não existe. README com quem faz, PBI, milestone com o título exato do GitHub, branch `feature/<n>-slug`, mensagem de commit, lista do que copiar, e o que a pasta seguinte repete para o merge não apagar.
4. Não inventar número. A conversa daqui entrega as pastas sem número (`T1-slug`, `T2-slug`…), com o README da sprint e os corpos das issues prontos, e para aí. Quem valida, cria as issues e vincula os números é a conversa do EcoTrack (seções abaixo e “Conversas”).
5. `schema.js` e `app.js`, quando a Task os copia inteiros, partem do arquivo que está na `main` do EcoTrack mais o bloco novo. Não substituir por um schema antigo. Perder migração que já está na `main` (por exemplo `tipo` → `tipo_destino`, ou `certificado_url NVARCHAR(2048)`) volta para ajuste. A Sprint 07 errou isso e foi corrigida: `schema.js` da #136 é o da `main` mais `dbo.rota` e `dbo.parada`. O `app.js` da #136 é o da `main` mais `app.use('/rotas')`.
6. Commit neste repositório só se o Lucas pedir, na `docs/lean-inception-sprints`. Push só se ele pedir. O normal é um commit só, depois que a conversa do EcoTrack vinculou os números, no estilo `docs: vincula o kit da sprint NN as issues X a Y`. Não commitar a `main`.
7. Fechar com a mensagem de passagem para a conversa do EcoTrack (seção “Conversas”).

### Rotina: criar as issues no EcoTrack

Quem faz: a conversa do EcoTrack, depois que a conversa daqui entregou o kit. Antes de criar, ela valida o kit contra a `main` do EcoTrack:

- `schema.js` e `app.js` da pasta são os da `main` mais o bloco novo, sem perder migração;
- os arquivos que a pasta copia existem na `main` no estado que o kit supõe (a #126 mostrou que a `main` pode perder um merge);
- um pai por Task, ordem e `blocked by` coerentes com quem altera o mesmo arquivo;
- matriz de perfil igual à do `acesso.js` e do `requirePerfil` da `main`;
- milestone com o título exato e PBIs abertos;
- nada que seja da sprint seguinte, sem linguagem de engenharia reversa.

Se a validação achar erro de código ou de corte, a conversa do EcoTrack devolve para a daqui corrigir, sem criar issue. Se estiver certo, cria as issues e vincula neste repositório: renomeia `T1-slug` para `<n>-slug`, preenche `Closes #<n>`, os links da issue e do `blocked by` no README da pasta e da sprint, e a linha da sprint em `kit-campusceub/README.md`. Só mexe em `kit-campusceub/`, na branch `docs/lean-inception-sprints`. Commit `docs: vincula o kit da sprint NN as issues X a Y` só quando o Lucas pedir. Depois atualiza o estado nos dois `AGENTS.md`.

`gh issue create` no `CAMPUSCEUB/EcoTrack`:

- `--parent` no PBI
- `--assignee` `davi417`, `eduardoMartinsCunha` ou `arturflr5`
- `--label enhancement`
- `--milestone` com o título exato, acento inclusive
- `--project "262-CC-PI-II-EcoTrack"`
- `--blocked-by` quando a tabela manda esperar
- corpo com PBI, contexto, proposta, critérios, como validar e prioridade
- sem linguagem de engenharia reversa

Milestone da Sprint 07, já existente: `Sprint 07 - Rotas e atribuição de motorista`. Título mais curto não acha a milestone.

Não abrir issue nova se ela já existe. A #101 foi duplicata da #67 e foi fechada.

### Rotina: revisar PR no EcoTrack

1. Achar o PR aberto do autor (`gh pr list --author`). Não reavaliar PR já mergeado.
2. Ler corpo, commits, arquivos e `Closes`. Comparar com a issue e com a pasta do kit daquela Task, não só com o README curto. O código da pasta manda quando o README resume menos.
3. Conferir: um pai, arquivos da pasta, branch saída da `main`, dependência já mergeada, template inteiro, tipo Requisito ou Documentação, sem linguagem de engenharia reversa.
4. API e tela no mesmo PR: pedir separação. `Closes` no PBI ou na Feature: pedir para trocar pela Task e usar `Refs` no pai. Várias histórias na mesma Task: pedir corte, no modelo da Sprint 04 em diante. A Sprint 03 não se repete.
5. Schema que perde migração da `main` volta para ajuste. Matriz de perfil que não bate com `acesso.js` ou com a tabela da sprint volta para ajuste.
6. Veredito em português, com o comentário pronto para o Lucas colar. Não mergear, não aprovar no `gh`, a menos que ele peça. Não aprovar PR cujo autor é o Lucas.
7. Correção na branch do colega só quando ele pedir: trazer a branch atualizada do remoto antes (a cópia local pode estar velha), commit simples, push normal, sem mudar o `git config`.

### Rotina: planning e review

Template no EcoTrack: `docs/reunioes/template-reuniao.md`. Planning #61, #63, #65, #67, #69, #71, #73, #75, #77. Review #62, #64, #66, #68, #70, #72, #74, #76, #78.

As reuniões acontecem nas aulas de terça-feira à noite: review da sprint que fecha e planning da seguinte no mesmo dia. A planning é preparada antes da aula pelo Lucas com o agente: issues, kit e quem faz o quê. Na aula ele só indica as Tasks. Às vezes a sprint anterior ainda está atrasada no dia, mas a seguinte já fica pronta. Por isso o kit da próxima sprint precisa estar pronto antes da terça.

- Planning: Lucas organiza e a ata é escrita com ele. Não entregar essa ata ao Artur, mesmo quando o texto da issue (#73, #75, #77) diz “Documentação redige a ata”: vale a prática, não o texto. O relatório `sprints/sprint-NN.md` também sai nessa entrega. A ata lista quem fechou o plano e os encaminhamentos de quem executa. Não inventar presença. Não colocar na planning um fato que só apareceu na review.
- Review: Artur redige a ata e abre o PR. A issue pede a ata e a atualização de `sprints/sprint-NN.md` com issues concluídas, PRs aceitos e evidências. Checklist marcado sem essas seções preenchidas é pedido de mudança. Não fechar a review antes da reunião e da ata aceita.
- O índice `docs/reunioes/README.md` lista só arquivo que já está na branch. A review não entra no índice da planning enquanto o PR dela não tiver o arquivo.
- Plannings 01–03: uma ata, `docs/reunioes/2026-09-15-sprint-planning-01-02-03.md`, issues #61, #63, #65.
- Sprints 04–06: o merge da planning levou só `sprints/sprint-NN.md` (#102 fecha #67, #115 fecha #69, #127 fecha #71). A ata em `docs/reunioes/` é o PR #142, branch `docs/atas-planning-04-05-06`, autor Lucas, com `Refs #67`, `Refs #69` e `Refs #71`, sem `Closes`, porque essas issues já fecharam. Não abrir issue nova para isso. O autor não mergeia o #142.

### Rotina: fechar pais

Quando o Lucas disser que a sprint de produto está completa:

1. Confirmar que cada Task fechou pelo merge (`Closes` no PR mergeado).
2. Confirmar no GraphQL que cada PBI só tem essas Tasks, todas fechadas, e que a Feature só tem esse PBI.
3. Fechar PBI e Feature na mão, com comentário curto, `gh issue close --reason completed`, como Lucas.
4. Não fechar a issue da review. Não fechar planning que ainda não tem ata, se a issue ainda estiver aberta. Não fechar de novo o que já está fechado. Issue que já fechou não recebe `Closes` de novo.

### Fluxo que o colega executa

Está no `kit-campusceub/README.md`. O agente não commita o kit no EcoTrack. O colega copia a pasta, na branch do README, com a mensagem exata, sem `feat(4.1)`. Esse prefixo é só da reconstrução neste repositório. Branch `feature/<n>-descricao` para código, `docs/<n>-descricao` para documentação. Sem commit em `main`. Review de quem não é o autor, aceite do Lucas, merge do Lucas.

### Estado em 31/10/2026

Sprint 01 na `main`: #50–#53, #55, #56. Features e PBIs fechados. Review #62 fechada (ata 22/09).

Sprint 02 na `main`: #79–#82. A #79 foi mergeada pelo Davi sem `Closes`; o Lucas fechou a issue depois. Features e PBIs fechados. Review #64 fechada. #80 sem DELETE e sem PATCH de status. #82 sem botão Concluir.

Sprint 03 na `main`: #83 (PR #95) e #84 (PR #96). Features e PBIs fechados, inclusive US08 e US09. Review #66 fechada. Não copiar o corte.

Sprint 04 na `main`: #97–#100 (PRs #107–#110). Planning: relatório no #102, fecha #67. Pais fechados na mão: US11 #37, F11 #16, US14 #40, F14 #19. Review #68 fechada (ata 29/09, PR #116). Certificado opcional. Sem lista de PDF e sem a trava de lote.

Sprint 05 na `main`: #111–#114. PRs #118 (o #117 foi fechado sem merge), #119, #120, #121. Planning: relatório no #115, fecha #69. Pais fechados na mão em 10/10/2026: US13 #39, F13 #18, US15 #41, F15 #20. Review #70 fechada (ata 09/10, PR #128). #111 antes da #112, porque as duas alteram `app.js`.

Sprint 06 na `main`: #122–#125 (PRs #131–#134). A #126 (PR #135) foi mergeada em 27/10 como `8036e09`, mas um force push do `arturflr5` em 28/10 03:10 voltou a `main` para `fd02e13` e tirou da `main` os commits do #135 (`App.jsx`, `auth/acesso.js`, `ProtectedRoute.jsx`, `Sidebar.jsx`). A issue #126 continua fechada. Em 02/11/2026 a `main` já contém `8036e09` de novo, seguida dos merges #142, #141 e #143. A `main` continua sem proteção contra force push. Pais fechados na mão em 27/10/2026: US03 #29, US04 #30, US12 #38, F03 #8, F04 #9, F12 #17. Planning: relatório no #127, fecha #71. Review #72 aberta. PR do Artur: #141. A ata está no template. O `sprints/sprint-06.md` ainda está no texto do planejamento (“Nenhuma no início da sprint”, “Nenhum ainda”). Pedido de ajuste: preencher issues concluídas, PRs aceitos, evidências e próximas ações; no índice, só a linha da review 06; sem BOM. Não pedir a ele as atas de planning. Não fechar a #72 antes da ata aceita.

Sprint 07, código ainda não começou. Issues criadas, pai único, `blocked by` igual ao kit. Milestone: `Sprint 07 - Rotas e atribuição de motorista`. Kit neste repositório, pastas `136`–`139`, commit `60ed079`, branch `docs/lean-inception-sprints`.

| Ordem | Issue | PBI | Quem | Depende de |
| --- | --- | --- | --- | --- |
| 1 | #136 rotas na API | US17 #43 | Davi | Sprint 06 |
| 2 | #138 atribuir motorista na API | US18 #44 | Davi | #136 e #122 |
| 3 | #137 tela de rotas | US17 #43 | Eduardo | #136 |
| 4 | #139 atribuir motorista na tela | US18 #44 | Eduardo | #138 e #137 |

A #136 vem antes da #138 porque as duas alteram `rotaController.js` e `rotaRoutes.js`. Depois da #136, a #137 e a #138 podem ir em paralelo. A #139 espera as duas. Features F17 #22 e F18 #23 fecham na mão quando as Tasks do PBI estiverem na `main`.

Pais já fechados na mão: Sprints 01–06, Features e PBIs das Tasks que estão na `main`. Não fechar de novo.

Sprint 08, sem kit e sem Tasks. Milestone: `Sprint 08 - Rota do dia e recolhimento` (03/11 a 16/11). PBIs US19 #45 (F19 #24, RF23) e US20 #46 (F20 #25, RF24). Em 31/10 o Lucas cobrou o grupo e espera a Sprint 07 na `main` antes da terça. O kit 08 só é montado depois disso, em cima da `main` real, não dos arquivos do kit 07. Corte proposto, ainda não aprovado:

| Ordem | Task | PBI | Quem | Depende de |
| --- | --- | --- | --- | --- |
| 1 | `GET /rotas/minha?data=` na API, só motorista, filtrado por `req.usuario.id` | US19 #45 | Davi | #138 |
| 2 | tela `/rota-do-dia` e item no menu do motorista | US19 #45 | Eduardo | T1 e #139 |
| 3 | `status_recolhimento` na `parada` e `PATCH` na API | US20 #46 | Davi | T1 |
| 4 | botões de recolhimento na tela da rota do dia | US20 #46 | Eduardo | T3 e T2 |

Decisões pendentes do Lucas: status na parada, não no lote (a parada pode não ter lote); `PUT /rotas/:id` devolve 409 quando alguma parada já tem status, porque o `PUT` da #136 apaga e recria as paradas; só o motorista atribuído marca o status. Gestor ver o recolhimento é US21, Sprint 09.

Em 31/10/2026: o #141 do Artur continua sem commit novo depois do pedido de mudança de 28/10. O #142 aguarda review do Artur. A Planning 07 (#73) ainda não tem ata nem `sprints/sprint-07.md`.

Docker local ainda não foi validado pelo grupo. Em 31/10/2026 o Docker não está instalado na máquina do Lucas, então nem a Tarefa 0.2 nem a 0.4 do ROADMAP foram confirmadas. O `src/docker-compose.yml` do EcoTrack e o `app/docker-compose.yml` usam os mesmos nomes de container (`ecotrack_*_app`) e as mesmas portas 1434 / 3001 / 5174: subir um de cada vez. O compose não espera o SQL Server ficar pronto e a API tenta só 3 vezes (2 s), então a primeira subida pode derrubar o backend.

### Conversas

Desde 31/10/2026 o Lucas usa o Claude Code em vez do Cursor. Uma conversa principal por repositório:

- Aqui (Opus): corte das Tasks, código e README de cada pasta do kit, README da sprint e corpo das issues. Não cria issue no `gh`.
- No EcoTrack (Opus): visão institucional, estado da sprint, decisões. Valida o kit contra a `main`, cria as issues e vincula os números no kit (rotina “criar as issues no EcoTrack”).
- Tarefas de rotina (revisar PR, ata, relatório, fechar pais) em conversas separadas, que podem usar Sonnet.

Passagem do kit: a conversa daqui termina com as pastas sem número e uma mensagem curta que o Lucas leva para a do EcoTrack (sprint, pastas, ordem, dependências e decisões de corte). A volta é a do EcoTrack com os números criados ou com o que precisa corrigir.

As conversas não se veem. O que liga as duas é este arquivo e o par no EcoTrack. Quando uma conversa mudar o estado da sprint, atualizar os dois.

### O que não repetir

- PR sem o template institucional, ou com `###` no lugar de `##`.
- Várias histórias na mesma Task. A Sprint 03 não é modelo.
- Dizer que o GitHub fecha o pai quando a Task fecha.
- Tratar “API e tela” como se todo PBI tivesse exatamente duas Tasks.
- Abrir a branch seguinte em cima de uma branch ainda não mergeada, quando uma depende da outra.
- Sugerir que o autor mergeie o próprio PR, ou merge com squash.
- Abrir issue nova para relatório de planning ou review quando a issue da ata já existe. A #101 foi duplicata da #67 e foi fechada.
- Pedir ao Artur a ata de planning.
- Copiar `schema.js` ou `app.js` de um recorte antigo por cima da `main`.
- Citar o `AGENTS.md` do EcoTrack num PR, ou colocar linguagem de engenharia reversa no que o colega copia.
- Inventar número de issue antes de o `gh issue create` devolver o número.
- Executar o ROADMAP e o kit na mesma conversa, se o pedido for só um dos dois.
