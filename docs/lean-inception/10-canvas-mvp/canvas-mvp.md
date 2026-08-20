# Canvas MVP — EcoTrack Wert

| Campo | Valor |
|---|---|
| Etapa | 10 — Canvas MVP |
| Data desta versão | 19/08/2026 |
| Status | Validado na sessão (19/08/2026) |
| Depende de | Etapas 1, 3, 4, 5 e 9 |

Quadro único da estratégia. Cada bloco reutiliza o que já foi fechado nas etapas anteriores.

---

## Visão do produto

> **Para** a equipe da Wert, **cujo** descarte eletrônico ainda depende de planilhas e processos manuais, **o EcoTrack Wert é um** sistema web de gestão logística e rastreabilidade de e-lixo **que** centraliza coletas, lotes, equipamentos, destinação e relatórios de conformidade. **Diferentemente** de planilhas isoladas, **o nosso produto** une operação de campo (rotas e motoristas) e governança administrativa/fiscal em uma plataforma única e auditável.

Cliente do produto: **Wert**. Agências do Banco do Brasil são pontos de coleta, não o cliente.

Objetivos (máx. 3): (1) centralizar a operação; (2) rastreabilidade e conformidade; (3) organizar o planejamento das coletas.

Fonte: [visão](../01-visao-do-produto/visao-do-produto.md) · [objetivos](../03-objetivos-do-produto/objetivos.md)

---

## Personas

| Apelido | Papel |
|---|---|
| **Renata** | Administradora — usuários e perfis |
| **Marcos** | Gestor operacional — dashboard, lotes, planejar rota, atribuir motorista |
| **Paulo** | Motorista — consulta a rota na base e registra recolhimento |
| **Camila** | Técnica de triagem — equipamentos e destinação |
| **Helena** | Auditora / consultora — consulta e PDF |

Fonte: [personas](../04-personas/personas.md)

---

## Jornadas

Jornada ponta a ponta do produto:

**Renata** (acessos) → **Marcos** (planeja e atribui) → **Paulo** (recolhe) → **Camila** (tria e destina) → **Helena** (consulta e PDF).

Canal: web desktop na Wert; campo físico só no trecho do Paulo (sem GPS no produto).

Fonte: [jornada](../05-jornada-do-usuario/jornada.md)

---

## Funcionalidades do MVP

Dois recortes, os dois oficiais neste canvas:

### Já entregue — ondas 1 a 5 (Sprints 1–5, PI1)

Login, usuários, agências, lotes e status, equipamentos, destinação, PDF, dashboard.

IDs: F01, F02, F05, F06, F07, F08, F09, F11, F13, F14, F15.

Isso cobre **O1** (plataforma única) e **O2** (rastreio + evidência), ainda sem logística de campo.

### A entregar no PI2 para fechar a visão — ondas 6 a 9 (Sprints 6–9)

| Onda | IDs | Entrega |
|---|---|---|
| 6 | F03, F04, F12 | Perfil motorista, permissões por perfil, lote não fecha sem destinação |
| 7 | F17, F18 | Rota com paradas e ordem; atribuição manual de motorista |
| 8 | F19, F20 | Paulo vê a rota do dia na base; status de recolhimento |
| 9 | F10, F16, F21 | Editar equipamento; PDF com rota/motorista; Marcos vê se coletou |

Fora do canvas (não é MVP): GPS, atribuição automática, app nativo, integração com sistemas do BB.

Fonte: [ondas](../09-sequenciador-ondas/ondas.md) · [funcionalidades](../06-brainstorm-funcionalidades/funcionalidades.md)

---

## Custos e agenda

| Item | Registro |
|---|---|
| Quem desenvolve | Lucas Gonçalves Balduino, Davi Oliveira Maia, Artur Feitoza, Eduardo Martins |
| Natureza | Projeto acadêmico (PI2 / UniCEUB), parceria Wert — sem orçamento comercial à parte |
| Stack (já definida) | React + Vite, Node/Express, SQL Server, Docker |
| Agenda já consumida | Sprints 1–5 (ondas 1–5) — núcleo no repositório |
| Agenda restante | Sprints 6–9 (ondas 6–9) — 4 sprints; duração sugerida **2 semanas** cada (8 semanas de calendário, ajustável pelo grupo) |
| Entrega acadêmica | Artefato 2: backlog, RF/RNF e este cronograma em sprints |

Fonte: [cronograma](../../artefatos/02-backlog-requisitos-sprints/cronograma-sprints.md)

---

## Resultados esperados e métricas

| Resultado (ligado ao objetivo) | Como saber que funcionou |
|---|---|
| Operação centralizada no EcoTrack (O1) | Usuários, agências, lotes, equipamentos e destinações são criados e consultados no sistema, não em planilha |
| Ativo rastreável até a destinação (O2) | Dado um número de série ou lote, o caminho agência → lote → equipamento → destinação está completo |
| Evidência de conformidade (O2) | PDF do lote gerado e armazenado; dashboard com totais e quebras |
| Coletas planejadas (O3) | Existe rota com paradas e motorista atribuído **antes** do caminhão sair |
| Recolhimento visível (O3) | Status recolhido / não recolhido / parcial no sistema; gestor não depende do WhatsApp para saber se coletou |
| Acesso no perfil certo (O1) | Auditor consulta e não altera operação; motorista vê a rota do dia; admin gerencia contas |

---

## Leitura em um parágrafo

O EcoTrack Wert já tem o **MVP de rastreabilidade** (ondas 1–5). O PI2 completa o **MVP da visão**: permissões reais, consistência do lote e planejamento/atribuição de coletas sem GPS (ondas 6–9), em quatro sprints, com o time de quatro pessoas, até o produto cobrir a jornada Marcos → Paulo → Camila → Helena.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Canvas preenchido com visão, personas, jornada, ondas 1–9, agenda das sprints e métricas dos três objetivos. |
