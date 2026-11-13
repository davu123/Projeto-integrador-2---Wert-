# Task #188 — Lean Inception e Artefatos em Markdown

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/188 |
| Quem | Artur |
| Tipo | Task de documentação (sem PBI pai) |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `docs/188-pdfs-para-markdown` |
| Commit | `docs: converte a lean inception e os artefatos de pdf para markdown` |
| Destino | `docs/lean-inception/` e `entregas/` |
| Depende de | nada (pode ir junto com a #191: não dividem arquivo) |

A issue #188 já existe. Não crie outra.

A #189 e a #190 partem desta. Elas só começam depois do merge deste PR.

## O que esta pasta traz

Cada PDF vira um Markdown com o mesmo conteúdo. A capa do PDF (instituição, curso, integrantes, documento, professora e local) virou uma tabela no início de cada arquivo. As imagens ficam em arquivo próprio e os diagramas estão em Mermaid, que o GitHub desenha.

| PDF que sai | Markdown que entra |
|---|---|
| `docs/lean-inception/00-kickoff/pdf/kickoff.pdf` | `docs/lean-inception/00-kickoff/kickoff.md` |
| `docs/lean-inception/01-visao-do-produto/pdf/visao-do-produto.pdf` | `docs/lean-inception/01-visao-do-produto/visao-do-produto.md` |
| `docs/lean-inception/02-escopo-e-nao-e-faz-nao-faz/pdf/escopo.pdf` | `docs/lean-inception/02-escopo-e-nao-e-faz-nao-faz/escopo.md` |
| `docs/lean-inception/03-objetivos-do-produto/pdf/objetivos.pdf` | `docs/lean-inception/03-objetivos-do-produto/objetivos.md` |
| `docs/lean-inception/04-personas/pdf/personas.pdf` | `docs/lean-inception/04-personas/personas.md` e `04-personas/imagens/` (5 PNG) |
| `docs/lean-inception/05-jornada-do-usuario/pdf/jornada.pdf` | `docs/lean-inception/05-jornada-do-usuario/jornada.md` |
| `docs/lean-inception/06-brainstorm-funcionalidades/pdf/funcionalidades.pdf` | `docs/lean-inception/06-brainstorm-funcionalidades/funcionalidades.md` |
| `docs/lean-inception/07-semaforo-tecnico-negocio/pdf/semaforo.pdf` | `docs/lean-inception/07-semaforo-tecnico-negocio/semaforo.md` |
| `docs/lean-inception/08-esforco-negocio-ux/pdf/pesos.pdf` | `docs/lean-inception/08-esforco-negocio-ux/pesos.md` |
| `docs/lean-inception/09-sequenciador-ondas/pdf/ondas.pdf` | `docs/lean-inception/09-sequenciador-ondas/ondas.md` |
| `docs/lean-inception/10-canvas-mvp/pdf/canvas-mvp.pdf` | `docs/lean-inception/10-canvas-mvp/canvas-mvp.md` |
| `docs/lean-inception/11-showcase/pdf/showcase.pdf` | `docs/lean-inception/11-showcase/showcase.md` |
| `entregas/artefato_1/Artefato 1 - Projeto Integrador II.pdf` | `entregas/artefato_1/artefato-1.md` |
| `entregas/artefato_2/Artefato 2 - Projeto Integrador II.pdf` | `entregas/artefato_2/artefato-2.md` |
| `entregas/artefato_3/Artefato 3 - Projeto Integrador II.pdf` | `entregas/artefato_3/artefato-3.md` e `artefato_3/imagens/` (10 PNG) |

Índices e registros atualizados, sem link para PDF:

- `docs/lean-inception/README.md`
- `entregas/README.md`
- `entregas/artefato_1/README.md`, `entregas/artefato_2/README.md`, `entregas/artefato_3/README.md`
- `entregas/lean-inception/README.md`
- `entregas/template-entrega.md`

## O que fazer

No PowerShell, na pasta do EcoTrack:

1. `git checkout main` e `git pull`.
2. `git checkout -b docs/188-pdfs-para-markdown`.
3. Copiar `docs/` e `entregas/` **desta pasta** por cima do EcoTrack, mantendo os caminhos. Não copiar este `README.md`.
4. Remover os 15 PDFs (as pastas `pdf/` somem junto):

```powershell
git rm "docs/lean-inception/*.pdf" "entregas/*.pdf"
```

5. Conferir que não sobrou PDF: `git ls-files "*.pdf"` não mostra nada em `docs/` nem em `entregas/`.
6. `git add docs/lean-inception entregas`.
7. `git status`: só arquivos de `docs/lean-inception/` e `entregas/`. Nada de `src/`, nada fora dessas duas pastas.
8. `git commit -m "docs: converte a lean inception e os artefatos de pdf para markdown"`.
9. `git push -u origin HEAD` e abrir o PR com o texto abaixo.

Antes do commit:

- Os arquivos não podem ganhar BOM. Se o editor perguntar, salve como **UTF-8** (não "UTF-8 com BOM").
- Títulos com `##`, não `###`, onde o arquivo já usa `##`.
- Separador de tabela `| --- |`, como está nos arquivos.

## Como validar

- Abrir `docs/lean-inception/README.md` no GitHub, na branch, e clicar em cada uma das 12 etapas.
- Em `04-personas/personas.md`, as cinco imagens aparecem.
- Em `05-jornada-do-usuario/jornada.md`, `09-sequenciador-ondas/ondas.md` e `entregas/artefato_3/artefato-3.md`, os diagramas Mermaid aparecem desenhados.
- Em `entregas/artefato_3/artefato-3.md`, os dez wireframes da seção 4 aparecem.
- Abrir `entregas/README.md` e clicar no documento de cada Artefato.
- `git ls-files "*.pdf"` não lista nada em `docs/` nem em `entregas/`.

## PR

Título: `docs: converte a lean inception e os artefatos de pdf para markdown`

Corpo (template inteiro, com `##`):

```markdown
# Pull request

## Issue relacionada

Closes #188

## Resumo

Converte para Markdown as 12 etapas da Lean Inception (`docs/lean-inception/`) e os Artefatos 1, 2 e 3 (`entregas/`), atendendo a Sprint Review 06. A capa de cada PDF virou uma tabela no início do arquivo. As imagens ficam em arquivo próprio (`04-personas/imagens/` e `artefato_3/imagens/`) e os diagramas estão em Mermaid. Os 15 PDFs foram removidos e os índices e registros de entrega apontam para os arquivos em Markdown.

## Tipo de mudança

- [ ] Requisito
- [ ] Correção
- [x] Documentação
- [ ] Organização
- [ ] Entrega acadêmica

## Como validar

- Abrir `docs/lean-inception/README.md` na branch e abrir as 12 etapas pelos links.
- Conferir as cinco imagens das personas e os dez wireframes do Artefato 3.
- Conferir os diagramas Mermaid da jornada, do sequenciador e do Artefato 3.
- Abrir `entregas/README.md` e o documento de cada Artefato.
- `git ls-files "*.pdf"` não lista nada em `docs/` nem em `entregas/`.

## Evidências

Links da branch para `docs/lean-inception/README.md` e `entregas/README.md`, e print de uma etapa com imagem e de um diagrama Mermaid desenhado.

## Checklist

- [x] A mudança está vinculada a uma `issue` principal.
- [x] A `issue` principal está fechada ou será fechada pelo `merge` deste `pull request`.
- [x] A `issue` está vinculada à `milestone` da sprint, quando aplicável.
- [x] A documentação foi atualizada quando necessário.
- [ ] Um ADR foi registrado quando a decisão alterou escopo, processo, arquitetura, integração, critério avaliativo ou outro ponto que precise de histórico consultável.
- [x] As evidências de validação foram registradas.
- [ ] O relatório da sprint foi atualizado quando esta mudança fizer parte da entrega.
```

Revisão: Lucas e um colega. Quem mergeia é o Lucas, com merge commit.
