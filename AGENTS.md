# AGENTS.md

Contexto operacional para qualquer agente trabalhando **neste** repositório. Leia este arquivo inteiro antes de alteração estrutural.

## O que é este projeto

Reconstrução sprint a sprint do EcoTrack Wert em `app/`, com o sistema que já funciona congelado em `referencia/`. Visão completa: `docs/context/00-project-brief.md` — leia-o.

## Spec vs execução

A spec está em `docs/context/`. A lista de execução está em `ROADMAP.md` (quando existir).

Se o autor pediu para avançar o projeto, implementar uma fase, ou “continuar o roadmap”:

- **Com** `ROADMAP.md`: não invente um plano. Siga o **Prompt mestre — agente** no topo. Uma tarefa.
- **Sem** `ROADMAP.md`: não invente um plano. A spec está em `docs/context/` (o `06` é o briefing). Gerar a lista é trabalho do `roadmap-sdd`, não improvisar fases.

## Documentos de contexto (só os que existem)

- `docs/context/00-project-brief.md` — o que é o projeto de reconstrução
- `docs/context/01-information-architecture.md` — árvores `referencia/` vs `app/`
- `docs/context/03-tech-stack.md` — React/Vite, Express, SQL Server, portas
- `docs/context/04-design-system.md` — copiar CSS da referência, não inventar
- `docs/context/06-roadmap-briefing.md` — restrições se for **alterar** o ROADMAP

Não existem `02` (modelo de conteúdo de caderno) nem `05` (editorial).

`ROADMAP.md` — SDD: prompts mestre, progresso, tarefas, aceite, commit (quando existir).

Receitas de cópia: `docs/reverse-engineering/` (quando existirem). Produto acadêmico: `docs/lean-inception/`, `docs/artefatos/`.

## Onde está o código

- Sistema funcional congelado: `referencia/`.
- Reconstrução do semestre: `app/`.
- Spec ≠ conteúdo acadêmico. Não misturar tarefas de código com edição da Lean Inception.

## Regras que um agente não deve quebrar

- Não editar `referencia/` depois do freeze.
- Não tratar horizonte (repo novo, GPS) como backlog imediato.
- Sprints 1–5: só paths do mapa; sprints 6–9: código novo, sem fingir que veio da referência.
- Commits sem PI1 / legado / “já existia”.
- Não marcar revisão humana como verdadeira.
- Não scaffoldar telas de sprint futura.
- Não escolher sozinho fork (já fechados no `03`/`06`, salvo a tabela pendente).
- Uma tarefa do ROADMAP por conversa; não `git add -A`; não amend; não `--no-verify`.
- Kit institucional (`kit-campusceub/`): ao abrir sprint nova, cada Task tem um único PBI pai. O número de Tasks do PBI varia com o escopo. Não repetir a Sprint 03, em que #83 e #84 cobrem US07, US08 e US09. Regra: `kit-campusceub/README.md`, seção "Corte ao criar um kit novo".

## Comandos esperados

```bash
cd referencia
docker compose up --build

cd app
docker compose up --build
```

Health: `http://127.0.0.1:3000/health` (referência) e `http://127.0.0.1:3001/health` (app). Detalhe das portas: `docs/context/03-tech-stack.md`.
