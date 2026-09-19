# Task #56 — PDFs formais da Lean Inception

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/56 |
| Quem | Artur |
| Tipo | Task de documentação (sem PBI pai) |
| Milestone | Sprint 01 - Login e agências |
| Branch | `docs/56-pdfs-lean-inception` |
| Commit | `docs: publica pdfs formais da lean inception` |
| Destino no EcoTrack | PDFs em `docs/lean-inception/` + índice + registro em `entregas/` |
| Depende de | depois das Tasks de código #50–#53 |

**Um único PR** com as 12 etapas (`Closes #56`). Sem Markdown de conteúdo das etapas no EcoTrack.

Os PDFs **já estão nesta pasta**, com os nomes da issue #56. Copie `docs/` e `entregas/` daqui para o EcoTrack.

## O que fazer (não é copiar `src/`)

1. No EcoTrack: `git checkout main && git pull`.
2. `git checkout -b docs/56-pdfs-lean-inception`.
3. Copiar **esta pasta** por cima do EcoTrack, mantendo os caminhos:
   - `docs/lean-inception/` → `docs/lean-inception/` no EcoTrack
   - `entregas/lean-inception/` → `entregas/lean-inception/` no EcoTrack
   - `entregas/README.md` → `entregas/README.md` no EcoTrack (só acrescenta a linha da Lean Inception; não apague Artefatos 1–3)
4. Conferir os 12 PDFs e o índice [docs/lean-inception/README.md](docs/lean-inception/README.md).
5. `git add` só o que a lista abaixo indicar.
6. Commit e PR com o texto deste README.

## Caminhos (iguais à issue #56)

| # | Etapa | PDF no EcoTrack |
|---|---|---|
| 0 | Kick-off | `docs/lean-inception/00-kickoff/pdf/kickoff.pdf` |
| 1 | Visão do produto | `docs/lean-inception/01-visao-do-produto/pdf/visao-do-produto.pdf` |
| 2 | É / Não é / Faz / Não faz | `docs/lean-inception/02-escopo-e-nao-e-faz-nao-faz/pdf/escopo.pdf` |
| 3 | Objetivos do produto | `docs/lean-inception/03-objetivos-do-produto/pdf/objetivos.pdf` |
| 4 | Personas | `docs/lean-inception/04-personas/pdf/personas.pdf` |
| 5 | Jornada do usuário | `docs/lean-inception/05-jornada-do-usuario/pdf/jornada.pdf` |
| 6 | Brainstorm de funcionalidades | `docs/lean-inception/06-brainstorm-funcionalidades/pdf/funcionalidades.pdf` |
| 7 | Semáforo | `docs/lean-inception/07-semaforo-tecnico-negocio/pdf/semaforo.pdf` |
| 8 | Esforço, negócio e UX | `docs/lean-inception/08-esforco-negocio-ux/pdf/pesos.pdf` |
| 9 | Sequenciador (ondas) | `docs/lean-inception/09-sequenciador-ondas/pdf/ondas.pdf` |
| 10 | Canvas MVP | `docs/lean-inception/10-canvas-mvp/pdf/canvas-mvp.pdf` |
| 11 | Showcase | `docs/lean-inception/11-showcase/pdf/showcase.pdf` |

Índice (já pronto): `docs/lean-inception/README.md`  
Registro (já pronto): `entregas/lean-inception/README.md`

## `git add` no EcoTrack

```text
docs/lean-inception/00-kickoff/pdf/kickoff.pdf
docs/lean-inception/01-visao-do-produto/pdf/visao-do-produto.pdf
docs/lean-inception/02-escopo-e-nao-e-faz-nao-faz/pdf/escopo.pdf
docs/lean-inception/03-objetivos-do-produto/pdf/objetivos.pdf
docs/lean-inception/04-personas/pdf/personas.pdf
docs/lean-inception/05-jornada-do-usuario/pdf/jornada.pdf
docs/lean-inception/06-brainstorm-funcionalidades/pdf/funcionalidades.pdf
docs/lean-inception/07-semaforo-tecnico-negocio/pdf/semaforo.pdf
docs/lean-inception/08-esforco-negocio-ux/pdf/pesos.pdf
docs/lean-inception/09-sequenciador-ondas/pdf/ondas.pdf
docs/lean-inception/10-canvas-mvp/pdf/canvas-mvp.pdf
docs/lean-inception/11-showcase/pdf/showcase.pdf
docs/lean-inception/README.md
entregas/lean-inception/README.md
entregas/README.md
```

Não adicionar `.md` das etapas, `PARA-O-GRUPO.md`, prompts de imagem nem a pasta `imagens/`. As figuras já estão **dentro** dos PDFs.

## PR

Título: `docs: publica pdfs formais da lean inception`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #56

Publica as 12 etapas da Lean Inception em PDF no padrão CEUB. Sem Markdown de conteúdo.

Como validar: abrir docs/lean-inception/README.md e conferir um PDF por etapa (0–11), com imagens na etapa de personas.
```

Tipo de mudança: Documentação.

## O que não fazer

- Não copiar `src/`.
- Não versionar os Markdown das etapas no EcoTrack.
- Não misturar Artefato 1, 2 ou 3 neste PR.
- Não citar repositório de trabalho, engenharia reversa ou código já existente.
- Não abrir um PR por etapa: é **um** PR com as 12 PDFs.
- Não usar os nomes longos do Google Docs (`Kick Off - Projeto Integrador II.pdf`): no EcoTrack vale o slug da issue (`kickoff.pdf`).
