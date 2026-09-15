# Task #56 — PDFs formais da Lean Inception

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/56 |
| Tipo | Task de documentação (sem PBI pai) |
| Milestone | Sprint 01 - Login e agências |
| Branch | `docs/56-pdfs-lean-inception` |
| Commit | `docs: publica pdfs formais da lean inception` |
| Destino no EcoTrack | só PDFs em `docs/lean-inception/` + índice + registro em `entregas/` |
| Depende de | nada das Tasks de código (#50–#55). Pode ir em paralelo |

**Um único PR** com as 12 etapas (`Closes #56`). Sem Markdown de conteúdo no EcoTrack.

## O que fazer (não é copiar `src/`)

1. No EcoTrack: `git checkout main && git pull`.
2. `git checkout -b docs/56-pdfs-lean-inception`.
3. Abrir cada Markdown das etapas 0–11 **neste** repositório (`docs/lean-inception/`).
4. Colar no Google Docs no padrão CEUB (capa, identificação da disciplina, autores, paginação).
5. Incluir as imagens no PDF (personas em `docs/lean-inception/04-personas/imagens/` e qualquer outra figura da etapa).
6. Exportar PDF e gravar **somente** nos caminhos da tabela abaixo.
7. Criar `docs/lean-inception/README.md` só com links para os PDFs (sem o texto das etapas).
8. Criar registro em `entregas/` apontando para esta issue e a Sprint 01.

Fonte neste repo:

| # | Markdown de origem | PDF no EcoTrack |
|---|---|---|
| 0 | `docs/lean-inception/00-kickoff/kickoff.md` | `docs/lean-inception/00-kickoff/pdf/kickoff.pdf` |
| 1 | `docs/lean-inception/01-visao-do-produto/visao-do-produto.md` | `docs/lean-inception/01-visao-do-produto/pdf/visao-do-produto.pdf` |
| 2 | `docs/lean-inception/02-escopo-e-nao-e-faz-nao-faz/escopo.md` | `docs/lean-inception/02-escopo-e-nao-e-faz-nao-faz/pdf/escopo.pdf` |
| 3 | `docs/lean-inception/03-objetivos-do-produto/objetivos.md` | `docs/lean-inception/03-objetivos-do-produto/pdf/objetivos.pdf` |
| 4 | `docs/lean-inception/04-personas/personas.md` + `04-personas/imagens/` | `docs/lean-inception/04-personas/pdf/personas.pdf` |
| 5 | `docs/lean-inception/05-jornada-do-usuario/jornada.md` | `docs/lean-inception/05-jornada-do-usuario/pdf/jornada.pdf` |
| 6 | `docs/lean-inception/06-brainstorm-funcionalidades/funcionalidades.md` | `docs/lean-inception/06-brainstorm-funcionalidades/pdf/funcionalidades.pdf` |
| 7 | `docs/lean-inception/07-semaforo-tecnico-negocio/semaforo.md` | `docs/lean-inception/07-semaforo-tecnico-negocio/pdf/semaforo.pdf` |
| 8 | `docs/lean-inception/08-esforco-negocio-ux/pesos.md` | `docs/lean-inception/08-esforco-negocio-ux/pdf/pesos.pdf` |
| 9 | `docs/lean-inception/09-sequenciador-ondas/ondas.md` | `docs/lean-inception/09-sequenciador-ondas/pdf/ondas.pdf` |
| 10 | `docs/lean-inception/10-canvas-mvp/canvas-mvp.md` | `docs/lean-inception/10-canvas-mvp/pdf/canvas-mvp.pdf` |
| 11 | `docs/lean-inception/11-showcase/showcase.md` | `docs/lean-inception/11-showcase/pdf/showcase.pdf` |

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
entregas/lean-inception.md
```

Não adicionar `.md` das etapas, `PARA-O-GRUPO.md`, prompts de imagem nem a pasta `imagens/` no EcoTrack. As figuras vão **dentro** do PDF.

## PR

Título: `docs: publica pdfs formais da lean inception`

```text
Closes #56

Publica as 12 etapas da Lean Inception em PDF no padrão CEUB. Sem Markdown de conteúdo.

Como validar: abrir docs/lean-inception/README.md e conferir um PDF por etapa (0–11), com imagens na etapa de personas.
```

Tipo de mudança: Documentação.

## O que não fazer

- Não copiar `src/`.
- Não versionar os Markdown das etapas no EcoTrack.
- Não misturar Artefato 1 ou 2 neste PR.
- Não citar este repositório, engenharia reversa ou código já existente no PDF.
- Não abrir um PR por etapa: é **um** PR com as 12 PDFs.
