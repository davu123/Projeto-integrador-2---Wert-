# 01 — Arquitetura de informação

Duas camadas. **Agora** = o que o repo precisa para achar código e spec. **Horizonte** = telas que `app/` ainda não tem no dia do freeze.

## Agora

Antes do freeze (fase 0 do ROADMAP), a fonte viva ainda é a raiz. Depois do freeze, a fonte viva do produto “já funciona” é `referencia/`; a fonte viva do semestre é `app/`.

```text
.
├── AGENTS.md
├── ROADMAP.md                          ← execução SDD (quando existir)
├── README.md
├── docker-compose.yml                  ← sistema atual na raiz (até a fase 0 copiar)
├── backend/                            ← fonte da cópia; não editar após freeze
├── frontend/
├── referencia/                         ← CONGELADO após tarefa 0.1
│   ├── backend/
│   ├── frontend/
│   ├── docker-compose.yml              ← portas 1433 / 3000 / 5173
│   └── README.md
├── app/                                ← RECONSTRUÇÃO (cresce por commit)
│   ├── backend/
│   ├── frontend/
│   └── docker-compose.yml              ← portas 1434 / 3001 / 5174
├── docs/
│   ├── context/                        ← esta spec
│   ├── reverse-engineering/            ← mapa e receitas por sprint
│   ├── lean-inception/                 ← produto (visão, ondas) — não é execução
│   └── artefatos/                      ← Artefatos 1 e 2
```

### O que vai em cada lugar

- **`referencia/`** — clone do sistema que já roda. Read-only depois do freeze. Serve para copiar nas sprints 1–5 e para o grupo subir o produto completo sem esperar o `app/`.
- **`app/`** — único lugar onde o ROADMAP escreve código de produto. Começa como esqueleto (Compose + health). Telas e rotas entram na ordem das sprints.
- **`docs/context/`** — spec do projeto de reconstrução. Não é backlog de tela.
- **`docs/reverse-engineering/`** — mapa F/US → arquivos e uma receita por sprint. Fonte da verdade para “o que copiar nesta tarefa”.
- **`docs/lean-inception/` e `docs/artefatos/`** — documentação da disciplina. Não listam implementação feita.
- **Raiz `backend/` / `frontend/`** — originais. Permanecem até o autor autorizar remoção da duplicata (horizonte / decisão no `06`).

### Relações

Uma fonte de verdade por pergunta:

- O que o produto *é* (visão, F01–F21, sprints acadêmicas) → `docs/lean-inception/` e `docs/artefatos/02-backlog-requisitos-sprints/`.
- Quais *arquivos* pertencem a qual sprint → `docs/reverse-engineering/mapa-codigo.md` e `sprint-0N.md`.
- O que o agente *faz agora* → `ROADMAP.md`.
- Como o visual deve parecer → copiar de `referencia/frontend/src/styles/` (`04`).

Não duplicar a lista de arquivos no `00` nem no `AGENTS.md`.

### Telas de `app/` (ordem de entrada)

Não criar rotas no esqueleto. Ordem:

1. `/login`, `/agencias`
2. `/usuarios`, `/lotes`
3. status do lote em `/lotes`; `/equipamentos/novo`, `/equipamentos`
4. `/destinacoes`; gerar PDF em `/relatorios`
5. `/` (dashboard); listar/baixar PDFs
6. perfil motorista e menus filtrados (sem tela nova de rota)
7. telas de planejamento de rota (Marcos)
8. tela do motorista na base + status de recolhimento
9. editar equipamento; PDF com rota/motorista; indicador de coletas

## Horizonte (não executar agora)

Sitemap completo da visão (rotas, motorista, RBAC) já está no backlog. Isto **não** autoriza scaffold dessas telas na fase 0. Repo novo do PI2 com histórico só de `app/` também é horizonte.
