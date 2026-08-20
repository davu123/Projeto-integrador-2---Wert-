# 00 — Project brief

## O que é

Repositório do **EcoTrack Wert** (PI2 / UniCEUB, parceria Wert). Hoje o software web completo de rastreabilidade (login, usuários, agências, lotes, equipamentos, destinação, PDF, dashboard) vive na raiz (`backend/`, `frontend/`, `docker-compose.yml`). Este brief descreve a **reconstrução acadêmica**: congelar esse sistema em `referencia/` e reconstruir o mesmo produto em `app/`, sprint a sprint, alinhado ao backlog (F01–F21).

## Por que existe

A disciplina pede desenvolvimento em nove sprints. O código da raiz já cobre o núcleo (ondas 1–5) e **não** cobre logística (ondas 6–9: motorista, RBAC, rotas, recolhimento). Sem um mapa arquivo → sprint e uma árvore `app/` que cresce por commits, não dá para executar o semestre como lista SDD nem levar só o histórico da reconstrução para o repositório novo do grupo.

## Para quem é (agora)

O grupo (Lucas, Davi, Artur, Eduardo) e o agente que executar o `ROADMAP.md`. A professora lê a documentação em `docs/lean-inception/` e `docs/artefatos/`, não este brief.

## Como o projeto avança

1. Spec neste `docs/context/` + `AGENTS.md`.
2. `ROADMAP.md` + receitas em `docs/reverse-engineering/`.
3. Freeze de `referencia/` (cópia do sistema que já sobe).
4. Esqueleto de `app/` que sobe no Docker (health).
5. Sprints 1–5: copiar/adaptar da referência, um commit por tarefa.
6. Sprints 6–9: código novo no estilo da referência, segundo o backlog.
7. Gate do autor no fim de cada fase (`docker compose` em `app/` ainda sobe).

## Escopo — dentro (agora)

1. Congelar o sistema funcional em `referencia/` e não editá-lo depois.
2. Reconstruir em `app/` as funcionalidades F01–F21 na ordem das nove sprints.
3. Mapa explícito de arquivos (o que copiar, o que não copiar, o que inventar nas sprints 6–9).
4. Commits Conventional Commits que simulem o deploy incremental (`app/` executável após cada `feat`).

## Escopo — fora (agora)

- GPS, atribuição automática, app nativo, integração com o Banco do Brasil.
- Reescrever a Lean Inception ou o Artefato 2 (já sanitizados).
- Nove cópias físicas do app (uma pasta por sprint).
- Apagar `backend/` e `frontend/` da raiz antes do autor confirmar que a referência sobe.
- Publicar o histórico no repositório novo do PI2 (horizonte).
- Mencionar PI1, “já no código” ou legado nos commits e na spec de execução.

## Critério de sucesso (agora)

`referencia/` é uma cópia fiel que sobe com Docker. `app/` sobe com Docker. O ROADMAP tem aceite testável por tarefa. Executar as fases 1–9 nessa ordem cobre F01–F21 sem consultar a raiz — só `referencia/` (sprints 1–5) e o backlog (sprints 6–9).

## Horizonte (não é o foco agora)

Copiar **somente** o histórico de `app/` para o GitHub novo do PI2 (filter-repo ou equivalente). `referencia/` e `docs/reverse-engineering/` podem ficar neste repo. Documentação acadêmica já sanitizada pode ir à parte.
