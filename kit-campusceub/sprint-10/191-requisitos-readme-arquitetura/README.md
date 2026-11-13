# Task #191 — Requisitos, README e arquitetura com o escopo da Sprint 10

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/191 |
| Quem | Artur |
| Tipo | Task de documentação (sem PBI pai) |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `docs/191-requisitos-readme-arquitetura` |
| Commit | `docs: registra os requisitos e o escopo da sprint 10` |
| Destino | `README.md` (raiz), `docs/requisitos.md`, `docs/arquitetura.md` |
| Depende de | nada (pode ir junto com a #188: não dividem arquivo) |

A issue #191 já existe. Não crie outra.

Os arquivos a copiar estão em **`raiz/`**, porque o `README.md` do EcoTrack teria o mesmo nome deste. Copie o **conteúdo** de `raiz/` para a raiz do EcoTrack: `raiz/README.md` → `README.md`, `raiz/docs/` → `docs/`.

A #187 (modelo de dados, do Lucas) também altera `docs/arquitetura.md` e parte da versão desta Task. Esta vai primeiro.

## O que muda

Base: os três arquivos da `main` com o bloco novo. Segue as Features F22–F29 (#171–#178) e as decisões das Tasks #194–#198.

- **`docs/requisitos.md`**
  - visão e objetivo 3: planejamento com a localização dos pontos de coleta e de entrega, sem rastreamento do veículo em tempo real;
  - **RF26 a RF31** (senha, localização da agência, pontos de entrega, rota com origem, destino e ordem sugerida, exportação para Google Maps, Waze e GPX, navegação do motorista), cada um com a Feature e as issues;
  - **RNF09 revisto**: deixa de dizer "sem GPS e sem mapa" e passa a dizer "sem rastreamento do veículo em tempo real e sem aplicativo nativo";
  - **RNF13 a RNF17** (segredos fora do repositório, API e relatórios protegidos, publicação com HTTPS, identidade visual, heurísticas de Nielsen);
  - tabela nova **Rastreabilidade da Sprint 10** (Feature → requisito → issues);
  - PBIs #179 a #186 nos critérios de aceite, servidor com HTTPS nas dependências e uma linha nova de risco.
- **`README.md`** da raiz: uma frase sobre a rota com localização e exportação; a linha "fora do escopo" troca "GPS" por "rastreamento do veículo em tempo real"; milestones "Sprints 00 a 10".
- **`docs/arquitetura.md`**
  - contexto técnico: desktop e tablet, sistema publicado com HTTPS, sem rastreamento em tempo real;
  - publicação (Caddy na frente da tela e da API em `/api`) e PDFs entregues só pela rota autenticada;
  - **navegação**: o diagrama ganha `/minha-conta` e a saída para Google Maps, Waze ou GPX; a matriz de perfis passa a ser a do `acesso.js` da `main`, com a linha da Minha conta; lista "Mudanças de navegação da Sprint 10";
  - API: `PUT /auth/senha`, `PUT /equipamentos/:id` e `GET /relatorios/:id/arquivo`, e um parágrafo de segurança.

O modelo de dados (seção Dados) **não** muda aqui. A notação de Peter Chen é a #187.

Alguns itens descrevem o que a Sprint 10 entrega (Minha conta, download autenticado, localização). Os requisitos e a arquitetura registram o escopo da sprint; o código chega pelas Tasks de cada PBI.

## O que fazer

1. `git checkout main` e `git pull`.
2. `git checkout -b docs/191-requisitos-readme-arquitetura`.
3. Copiar o conteúdo de `raiz/` desta pasta para a raiz do EcoTrack. Não copiar este `README.md` (o de fora de `raiz/`).
4. `git status`: só estes três arquivos alterados.

```text
README.md
docs/arquitetura.md
docs/requisitos.md
```

5. `git add README.md docs/arquitetura.md docs/requisitos.md`.
6. `git commit -m "docs: registra os requisitos e o escopo da sprint 10"`.
7. `git push -u origin HEAD` e abrir o PR com o texto abaixo.

Antes do commit: sem BOM (salvar como UTF-8), títulos com `##` onde o arquivo já usa `##`, separador de tabela `| --- |`.

## Como validar

- Em `docs/requisitos.md`, a tabela de RF vai até RF31 e a de RNF até RNF17; o RNF09 não fala mais em GPS.
- Em `docs/arquitetura.md`, o diagrama de navegação aparece desenhado no GitHub e a matriz de perfis bate com o `src/frontend/src/auth/acesso.js`.
- No `README.md`, a linha "fora do escopo" fala em rastreamento em tempo real.

## PR

Título: `docs: registra os requisitos e o escopo da sprint 10`

Corpo (template inteiro, com `##`):

```markdown
# Pull request

## Issue relacionada

Closes #191

## Resumo

Registra o escopo da Sprint 10 na documentação. Em `docs/requisitos.md`, entram os RF26 a RF31 e os RNF13 a RNF17, com a rastreabilidade para as Features F22 a F29, e o RNF09 passa a tratar de rastreamento em tempo real em vez de GPS. Em `docs/arquitetura.md`, a navegação ganha a Minha conta e a exportação da rota, a matriz de perfis segue o `acesso.js`, e a API registra a troca de senha, a edição de equipamento e o download autenticado do relatório. O `README.md` atualiza o que fica fora do escopo.

## Tipo de mudança

- [ ] Requisito
- [ ] Correção
- [x] Documentação
- [ ] Organização
- [ ] Entrega acadêmica

## Como validar

- Abrir `docs/requisitos.md` na branch e conferir RF26–RF31, RNF09 revisto e RNF13–RNF17.
- Abrir `docs/arquitetura.md` e conferir o diagrama de navegação e a matriz de perfis contra `src/frontend/src/auth/acesso.js`.
- Abrir o `README.md` e conferir a linha do que fica fora do escopo.

## Evidências

Links da branch para os três arquivos e print do diagrama de navegação desenhado.

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
