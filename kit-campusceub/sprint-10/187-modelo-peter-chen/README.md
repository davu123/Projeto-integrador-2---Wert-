# Task #187 — Modelo de dados na notação de Peter Chen

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/187 |
| Quem | Lucas |
| Tipo | Task de documentação (sem PBI pai) |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `docs/187-modelo-peter-chen` |
| Commit | `docs: ajusta o modelo de dados para a notacao de peter chen` |
| Destino | `docs/arquitetura.md`, seção **Dados**, e `entregas/artefato_3/artefato-3.md`, seção **2.3** |
| Depende de | merge da [#191](https://github.com/CAMPUSCEUB/EcoTrack/issues/191), da [#190](https://github.com/CAMPUSCEUB/EcoTrack/issues/190) e da API de localização e de rota (US27 e US28) |

A issue #187 já existe. Não crie outra.

É a **última** Task de documentação da sprint. O modelo descreve o banco, e a API de localização e de rota ainda vai mudar o `schema.js` (localização da agência, ponto de entrega, origem e destino da rota). Fazer antes disso deixa o modelo velho no mesmo dia.

O PR é do Lucas: o Artur revisa e mergeia, com merge commit.

## O que muda

Pedido da Sprint Review 06: modelo de dados em Peter Chen, sem nome nos relacionamentos, com (mínimo, máximo), tamanho dos campos e coluna de restrições. Mudam a seção **Dados** do `docs/arquitetura.md` e a seção **2.3** do Artefato 3.

- O `erDiagram` (pé de galinha com nome nos relacionamentos) sai.
- Entra um diagrama Mermaid (`flowchart`) no estilo de Chen: retângulo para entidade, losango sem nome para relacionamento, e a cardinalidade **(mín, máx)** no rótulo de cada linha. São 8 entidades e 10 relacionamentos, inclusive `parada.lote_id`, que faltava.
- Por que Mermaid e não SVG está escrito no arquivo: o GitHub desenha direto, o texto fica versionado e a mudança aparece linha a linha na revisão.
- Uma tabela diz de onde vem cada cardinalidade (coluna, `NOT NULL`, `UNIQUE`, `ON DELETE CASCADE` ou regra da API).
- **Dicionário de dados**: uma tabela por entidade com **Campo / Tipo / Tamanho / Restrições**, mais as restrições de tabela, os índices e as regras que só a API garante.
- **Artefato 3, seção 2.3**: o `erDiagram` em pé de galinha sai e entra um link para a seção Dados do `docs/arquitetura.md`, com a lista das entidades. O modelo fica num lugar só. O parágrafo dos perfis e da regra do lote continua.

## No dia, antes do commit

O arquivo desta pasta traz o aviso **ATUALIZAR COM O SCHEMA DA MAIN NO DIA** no começo da seção Dados. Ele segue o `schema.js` da `main` da Sprint 09.

1. `git checkout main` e `git pull`. Confirmar que a #191, a #190 e a API de localização e de rota estão na `main`.
2. `git checkout -b docs/187-modelo-peter-chen`.
3. Abrir o `docs/arquitetura.md` da `main` e trocar **só a seção `## Dados`** (do título `## Dados` até antes de `## Decisões técnicas`) pela seção `## Dados` do arquivo desta pasta. Não copiar o arquivo inteiro: se a #191 mudou no review, o resto do arquivo da `main` é o que vale.
4. Abrir o `src/backend/src/config/schema.js` da `main` e conferir, tabela a tabela:
   - coluna nova: linha nova no dicionário, com tipo, tamanho e restrições;
   - tabela nova (por exemplo, ponto de entrega): entidade nova no diagrama, relacionamentos com (mín, máx), linha na tabela de relacionamentos e tabela própria no dicionário;
   - chave estrangeira nova (por exemplo, origem e destino da rota): losango novo no diagrama e linha na tabela de relacionamentos;
   - `CHECK`, `UNIQUE` e índice novos: na coluna Restrições ou na lista de índices;
   - regra nova que só a API garante: na lista "Regras que a API garante e o banco não".
5. Apagar o aviso **ATUALIZAR COM O SCHEMA DA MAIN NO DIA**.
   - No `entregas/artefato_3/artefato-3.md` da `main`, trocar **só a seção `### 2.3 Modelo de dados (visão)`** (do título até antes de `### 2.4`) pela seção 2.3 do arquivo desta pasta. Como no passo 3, não copiar o arquivo inteiro.
6. Conferir o diagrama desenhado no GitHub (ou em https://mermaid.live) antes do commit.
7. `git add docs/arquitetura.md entregas/artefato_3/artefato-3.md` e `git status`: só esses dois arquivos.
8. `git commit -m "docs: ajusta o modelo de dados para a notacao de peter chen"`.
9. `git push -u origin HEAD` e abrir o PR com o texto abaixo.

Antes do commit: sem BOM (salvar como UTF-8), títulos com `##` onde o arquivo já usa `##`, separador de tabela `| --- |`.

## Como validar

- O diagrama da seção Dados aparece desenhado, com losangos sem nome e (mín, máx) em todas as linhas.
- Cada tabela do `schema.js` da `main` tem uma tabela no dicionário, com os mesmos campos, tipos e tamanhos.
- Cada `FOREIGN KEY` do `schema.js` aparece como um relacionamento.
- O aviso **ATUALIZAR COM O SCHEMA DA MAIN NO DIA** não está mais no arquivo.
- A seção 2.3 do Artefato 3 não tem mais diagrama em pé de galinha, e o link para `docs/arquitetura.md#dados` abre a seção Dados.

## PR

Título: `docs: ajusta o modelo de dados para a notacao de peter chen`

Corpo (template inteiro, com `##`):

```markdown
# Pull request

## Issue relacionada

Closes #187

## Resumo

Atende a Sprint Review 06 no modelo de dados de `docs/arquitetura.md`. O diagrama passa para a notação de Peter Chen, em Mermaid: entidades em retângulo, relacionamentos em losango sem nome e cardinalidade (mínimo, máximo) em cada linha, inclusive a ligação entre parada e lote. Uma tabela mostra de onde vem cada cardinalidade, e o dicionário de dados traz campo, tipo, tamanho e restrições de cada tabela, conferido com o `schema.js` da `main`. A seção 2.3 do Artefato 3 deixa o diagrama antigo e aponta para esse modelo, para não haver duas versões.

## Tipo de mudança

- [ ] Requisito
- [ ] Correção
- [x] Documentação
- [ ] Organização
- [ ] Entrega acadêmica

## Como validar

- Abrir `docs/arquitetura.md` na branch e conferir o diagrama da seção Dados.
- Comparar o dicionário de dados com `src/backend/src/config/schema.js`.
- Abrir `entregas/artefato_3/artefato-3.md`, seção 2.3, e seguir o link para o modelo.

## Evidências

Link da branch para `docs/arquitetura.md` e print do diagrama desenhado.

## Checklist

- [x] A mudança está vinculada a uma `issue` principal.
- [x] A `issue` principal está fechada ou será fechada pelo `merge` deste `pull request`.
- [x] A `issue` está vinculada à `milestone` da sprint, quando aplicável.
- [x] A documentação foi atualizada quando necessário.
- [ ] Um ADR foi registrado quando a decisão alterou escopo, processo, arquitetura, integração, critério avaliativo ou outro ponto que precise de histórico consultável.
- [x] As evidências de validação foram registradas.
- [ ] O relatório da sprint foi atualizado quando esta mudança fizer parte da entrega.
```
