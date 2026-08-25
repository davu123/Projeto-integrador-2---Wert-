# Backlog — EcoTrack Wert

| Campo | Valor |
|---|---|
| Artefato | 2 — backlog |
| Fonte | Funcionalidades F01–F21, [objetivos](../../lean-inception/03-objetivos-do-produto/objetivos.md) e [pesos](../../lean-inception/08-esforco-negocio-ux/pesos.md) |
| Data desta versão | 25/08/2026 |
| Status | Preenchido |

Histórias no formato *Como [persona], quero [ação], para [benefício]*. Todas as histórias serão desenvolvidas nas sprints do PI2. Tarefas agrupadas por sprint.

### Legenda — valor, factível e usabilidade

Pesos da etapa 8 da Lean Inception. Cada símbolo vale **1**; a repetição indica 2 ou 3.

| Símbolo | Significado | Escala |
|---|---|---|
| `$` `$$` `$$$` | **Valor** de negócio | 1 / 2 / 3 |
| `E` `EE` `EEE` | **Factível** (esforço de construção) | 1 / 2 / 3 — mais letras = maior esforço |
| `U` `UU` `UUU` | **Usabilidade** | 1 / 2 / 3 |

Na Lean Inception a usabilidade aparece como ♥; aqui usa-se **U** com a mesma escala.

---

## Objetivos do produto

Os épicos abaixo referenciam estes três objetivos (O1–O3):

1. **O1 — Centralizar a operação** — a Wert controla o ciclo de descarte eletrônico em uma única plataforma web, no lugar de planilhas e processos manuais.
2. **O2 — Garantir rastreabilidade e conformidade** — cada ativo tem histórico auditável da agência até a destinação, com relatório em PDF e indicadores no dashboard.
3. **O3 — Organizar o planejamento das coletas** — rotas e motoristas são planejados e atribuídos no sistema, com status de recolhimento, sem depender de controle informal.

---

## Épicos

| ID | Épico | Objetivo | Sprints |
|---|---|---|---|
| E1 | Acesso e governança | O1 | 1, 2, 6 |
| E2 | Cadastro operacional (agência, lote, equipamento, destinação) | O1, O2 | 2, 3, 4, 6, 9 |
| E3 | Conformidade e visibilidade (dashboard e PDF) | O2 | 4, 5, 9 |
| E4 | Planejamento e recolhimento de coletas | O3 | 6, 7, 8, 9 |

---

## Histórias de usuário

Cada história herda os pesos da funcionalidade (F) correspondente.

| ID | História | Feature | Sprint | $ | E | U |
|---|---|---|---|---|---|---|
| US01 | Como usuário da Wert, quero entrar com e-mail e senha, para acessar só o que me compete. | F01 | 1 | $$$ | EE | UU |
| US02 | Como Renata, quero cadastrar, editar e desativar usuários com perfil, para manter as contas em ordem. | F02 | 2 | $$$ | EE | UU |
| US03 | Como Renata, quero o perfil motorista no cadastro, para o Paulo existir no sistema. | F03 | 6 | $$ | E | U |
| US04 | Como Renata / Helena, quero que cada perfil só veja e altere o que pode, para a auditoria não mudar operação e o admin controlar o acesso. | F04 | 6 | $$$ | EE | UUU |
| US05 | Como Marcos, quero cadastrar agências, para os pontos de coleta existirem no EcoTrack. | F05 | 1 | $$$ | EE | UU |
| US06 | Como Marcos, quero abrir e manter lotes ligados a uma agência, para organizar cada coleta. | F06 | 2 | $$$ | EE | UUU |
| US07 | Como Marcos / Camila, quero mudar o status do lote (pendente, em triagem, concluído), para o fluxo aparecer no sistema. | F07 | 3 | $$ | E | UU |
| US08 | Como Camila, quero lançar o equipamento no lote (tipo, marca, modelo, série, estado), para o ativo ficar rastreável. | F08 | 3 | $$$ | EE | UUU |
| US09 | Como Camila, quero listar os equipamentos do lote, para conferir com o físico. | F09 | 3 | $$ | E | UU |
| US10 | Como Camila, quero editar um equipamento já lançado, para corrigir erro de digitação. | F10 | 9 | $ | E | U |
| US11 | Como Camila, quero registrar a destinação (reciclagem, reúso ou destruição, empresa e data), para fechar o ciclo ambiental. | F11 | 4 | $$$ | EE | UUU |
| US12 | Como Marcos / Helena, quero que o lote não seja concluído sem destinação em todos os itens, para o PDF não sair oco. | F12 | 6 | $$ | E | UU |
| US13 | Como Marcos, quero um dashboard com totais e quebras, para ver gargalos sem montar planilha. | F13 | 5 | $$$ | EE | UUU |
| US14 | Como Helena, quero gerar o relatório de conformidade do lote em PDF, para arquivar evidência. | F14 | 4 | $$$ | EE | UUU |
| US15 | Como Helena, quero listar e baixar os PDFs já gerados, para reabrir o laudo do ciclo. | F15 | 5 | $$ | E | UU |
| US16 | Como Helena, quero ver rota e motorista no PDF, quando existirem, para o laudo cobrir a coleta. | F16 | 9 | $$ | E | UU |
| US17 | Como Marcos, quero montar uma rota com data, paradas e ordem, para planejar a semana de coletas. | F17 | 7 | $$$ | EEE | UUU |
| US18 | Como Marcos, quero atribuir um motorista à rota na mão, para o Paulo saber o que é dele. | F18 | 7 | $$$ | EE | UUU |
| US19 | Como Paulo, quero ver na base a rota do dia já atribuída, para não depender de papel ou zap. | F19 | 8 | $$ | EE | UUU |
| US20 | Como Paulo, quero marcar recolhido / não recolhido / parcial, para o status existir no sistema. | F20 | 8 | $$$ | EE | UUU |
| US21 | Como Marcos, quero ver se as coletas da rota foram feitas, para não cobrar a equipe no WhatsApp. | F21 | 9 | $$$ | E | UUU |

---

## Tarefas (por sprint)

Os pesos de cada tarefa somam o total da sprint (mesma soma das histórias daquela sprint). Quando duas tarefas pertencem à mesma funcionalidade, o peso da F é repartido entre elas.

### Sprint 1 — E1, E2 · total **$ 6 · E 4 · U 4**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Autenticação com e-mail e senha (JWT, hash bcrypt) | F01 | $$ | E | U |
| Tela de login e sessão | F01 | $ | E | U |
| CRUD de agências (código, cidade, UF, responsável, telefone) | F05 | $$ | E | U |
| Rotas da API de agências protegidas por token | F05 | $ | E | U |

### Sprint 2 — E1, E2 · total **$ 6 · E 4 · U 5**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| CRUD de usuários (nome, e-mail, perfil, desativar) | F02 | $$ | E | U |
| CRUD de lotes ligados a uma agência (data, técnico, observações, status) | F06 | $$ | E | UU |
| Telas de usuários e de lotes | F02, F06 | $$ | EE | UU |

### Sprint 3 — E2 · total **$ 7 · E 4 · U 7**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Atualizar status do lote (`pendente`, `em_triagem`, `concluido`) | F07 | $$ | E | UU |
| Cadastro de equipamento no lote (tipo, marca, modelo, série, estado) | F08 | $$$ | EE | UUU |
| Listagem de equipamentos do lote | F09 | $$ | E | UU |

### Sprint 4 — E2, E3 · total **$ 6 · E 4 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Registro de destinação por equipamento (reciclagem, reúso ou destruição, empresa, data) | F11 | $$$ | EE | UUU |
| Geração de relatório de conformidade do lote em PDF | F14 | $$$ | EE | UUU |

### Sprint 5 — E3 · total **$ 5 · E 3 · U 5**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Dashboard com totais e quebras (status, tipo, estado, destino) | F13 | $$$ | EE | UUU |
| Listar e baixar os PDFs gerados | F15 | $$ | E | UU |

### Sprint 6 — E1, E2 · total **$ 7 · E 4 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Incluir `motorista` no CHECK de perfil (banco, API, tela de usuários) | F03 | $$ | E | U |
| Definir matriz de permissões (admin, gestor, técnico, motorista, auditor) | F04 | $ | E | U |
| Middleware de autorização nas rotas da API | F04 | $ | E | U |
| Filtrar menu e rotas no frontend por perfil | F04 | $ | — | U |
| Validar `PATCH` de status `concluido`: todos os equipamentos do lote com destinação | F12 | $$ | E | UU |

### Sprint 7 — E4 · total **$ 6 · E 5 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Tabelas de rota e parada (agência/lote, ordem) | F17 | $ | E | U |
| CRUD de rota (data, paradas) | F17 | $ | E | U |
| Telas de planejamento para o Marcos | F17 | $ | E | U |
| Atribuir `usuario` com perfil motorista à rota | F18 | $$$ | EE | UUU |
| Sem GPS e sem algoritmo de atribuição | — | — | — | — |

(A última linha é restrição de escopo, sem peso.)

### Sprint 8 — E4 · total **$ 5 · E 4 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Tela do Paulo: rota do dia filtrada pelo usuário logado (uso na base) | F19 | $$ | EE | UUU |
| Status de recolhimento por parada ou lote (`recolhido`, `nao_recolhido`, `parcial`) | F20 | $$ | E | UU |
| `PATCH` simples, poucos campos | F20 | $ | E | U |

### Sprint 9 — E2, E3, E4 · total **$ 6 · E 3 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| `PUT /equipamentos/:id` | F10 | $ | E | U |
| Incluir motorista e rota no PDFKit | F16 | $$ | E | UU |
| Indicador ou lista para o gestor: coletas feitas vs pendentes (a partir do status da sprint 8) | F21 | $$$ | E | UUU |
