# Task #189 — Backlog e sprints conforme a Review 06

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/189 |
| Quem | Artur |
| Tipo | Task de documentação (sem PBI pai) |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `docs/189-backlog-e-sprints` |
| Commit | `docs: ajusta backlog e sprints conforme a review 06` |
| Destino | `entregas/artefato_2/artefato-2.md` e duas etapas de `docs/lean-inception/` |
| Depende de | merge da [#188](https://github.com/CAMPUSCEUB/EcoTrack/issues/188) |

A issue #189 já existe. Não crie outra.

Começar **depois** do merge da #188: os três arquivos desta pasta são as versões em Markdown da #188 com os ajustes desta Task. Copiar antes do merge da #188 cria arquivos soltos, sem o resto da conversão.

A #190 também parte da #188, mas não divide arquivo com esta. As duas podem ir em qualquer ordem depois da #188.

## O que muda

Pedido da Sprint Review 06: backlog só com funcionalidades, diferença entre história de usuário e backlog, sprint identificada pela cor e sem mensuração de esforço.

- **`entregas/artefato_2/artefato-2.md`**, seções 7 e 8 (as seções 1 a 6 não mudam):
  - 7.1 nova: tabela e texto com a diferença e a relação entre backlog do produto e história de usuário;
  - legenda de cores das sprints (🟥 1, 🟧 2, 🟨 3, 🟩 4, 🟦 5, 🟪 6, 🟫 7, ⬛ 8, ⬜ 9). Nas tabelas, a sprint aparece só pela cor;
  - legenda de pesos só com valor (`$`) e usabilidade (`U`). A coluna de esforço (`E`, "factível") sai de todas as tabelas;
  - 7.4 nova: backlog do produto com as 21 funcionalidades (F01–F21), épico, sprint, valor e usabilidade;
  - a antiga 7.4 (tarefas técnicas por sprint) sai do backlog: tarefa técnica não é funcionalidade e fica nas issues de cada sprint;
  - os épicos mostram as sprints pela cor, a partir das Features de cada épico no GitHub;
  - 8 e 8.1: cronograma pela cor, sem o total de esforço.
- **`docs/lean-inception/09-sequenciador-ondas/ondas.md`**: sem a regra de soma de esforço, sem a coluna `E` e sem o `E` dos totais de cada onda; a coluna de cor do semáforo passa a se chamar **Semáforo**, para não confundir com a cor da sprint; cada onda cita a sprint pela cor.
- **`docs/lean-inception/08-esforco-negocio-ux/pesos.md`**: só duas frases. A etapa 8 continua com a tabela de esforço, porque ela é o registro do método da Lean Inception. As frases que diziam que o esforço aparece no Artefato 2 e no sequenciador passam a dizer que ele fica só nesta etapa.

## O que fazer

1. `git checkout main` e `git pull`. Confirmar que a #188 está na `main` (existe `entregas/artefato_2/artefato-2.md`).
2. `git checkout -b docs/189-backlog-e-sprints`.
3. Copiar `docs/` e `entregas/` **desta pasta** por cima do EcoTrack. Não copiar este `README.md`.
4. `git status`: só estes três arquivos alterados.

```text
docs/lean-inception/08-esforco-negocio-ux/pesos.md
docs/lean-inception/09-sequenciador-ondas/ondas.md
entregas/artefato_2/artefato-2.md
```

5. `git add` desses três arquivos.
6. `git commit -m "docs: ajusta backlog e sprints conforme a review 06"`.
7. `git push -u origin HEAD` e abrir o PR com o texto abaixo.

Antes do commit: sem BOM (salvar como UTF-8), títulos com `##` onde o arquivo já usa `##`, separador de tabela `| --- |`.

## Como validar

- No GitHub, na branch, abrir `entregas/artefato_2/artefato-2.md`: as cores aparecem nas tabelas das seções 7 e 8 e não há coluna `E`.
- Procurar `EE`, `factível` e `esforço` no Artefato 2 e no sequenciador: nada encontrado.
- A soma de `$` e de `U` de cada sprint na seção 8.1 bate com as histórias da cor na seção 7.5.

## PR

Título: `docs: ajusta backlog e sprints conforme a review 06`

Corpo (template inteiro, com `##`):

```markdown
# Pull request

## Issue relacionada

Closes #189

## Resumo

Atende a Sprint Review 06 sobre backlog e sprints. No Artefato 2, o backlog passa a listar só as funcionalidades (F01–F21), com uma seção que explica a diferença e a relação entre backlog e história de usuário. Cada sprint é identificada pela sua cor, e a mensuração de esforço sai do backlog, do cronograma e do sequenciador de ondas. A etapa 8 da Lean Inception continua com a tabela de esforço do método, com o texto ajustado.

## Tipo de mudança

- [ ] Requisito
- [ ] Correção
- [x] Documentação
- [ ] Organização
- [ ] Entrega acadêmica

## Como validar

- Abrir `entregas/artefato_2/artefato-2.md` na branch e conferir as seções 7 e 8.
- Abrir `docs/lean-inception/09-sequenciador-ondas/ondas.md` e conferir as ondas sem a coluna de esforço.
- Procurar `EE`, `factível` e `esforço` nos dois arquivos: nada encontrado.

## Evidências

Links da branch para os dois arquivos e print da legenda de cores e do backlog do produto.

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
