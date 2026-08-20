# Backlog — EcoTrack Wert

| Campo | Valor |
|---|---|
| Artefato | 2 — backlog |
| Origem | Funcionalidades F01–F21 e [ondas](../../lean-inception/09-sequenciador-ondas/ondas.md) |
| Data desta versão | 20/08/2026 |
| Status | Preenchido |

Histórias no formato *Como [persona], quero [ação], para [benefício]*. Todas as histórias serão desenvolvidas nas sprints do PI2. Tarefas agrupadas por sprint.

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

| ID | História | Feature | Sprint | Situação |
|---|---|---|---|---|
| US01 | Como usuário da Wert, quero entrar com e-mail e senha, para acessar só o que me compete. | F01 | 1 | A fazer |
| US02 | Como Renata, quero cadastrar, editar e desativar usuários com perfil, para manter as contas em ordem. | F02 | 2 | A fazer |
| US03 | Como Renata, quero o perfil motorista no cadastro, para o Paulo existir no sistema. | F03 | 6 | A fazer |
| US04 | Como Renata / Helena, quero que cada perfil só veja e altere o que pode, para a auditoria não mudar operação e o admin controlar o acesso. | F04 | 6 | A fazer |
| US05 | Como Marcos, quero cadastrar agências, para os pontos de coleta existirem no EcoTrack. | F05 | 1 | A fazer |
| US06 | Como Marcos, quero abrir e manter lotes ligados a uma agência, para organizar cada coleta. | F06 | 2 | A fazer |
| US07 | Como Marcos / Camila, quero mudar o status do lote (pendente, em triagem, concluído), para o fluxo aparecer no sistema. | F07 | 3 | A fazer |
| US08 | Como Camila, quero lançar o equipamento no lote (tipo, marca, modelo, série, estado), para o ativo ficar rastreável. | F08 | 3 | A fazer |
| US09 | Como Camila, quero listar os equipamentos do lote, para conferir com o físico. | F09 | 3 | A fazer |
| US10 | Como Camila, quero editar um equipamento já lançado, para corrigir erro de digitação. | F10 | 9 | A fazer |
| US11 | Como Camila, quero registrar a destinação (reciclagem, reúso ou destruição, empresa e data), para fechar o ciclo ambiental. | F11 | 4 | A fazer |
| US12 | Como Marcos / Helena, quero que o lote não seja concluído sem destinação em todos os itens, para o PDF não sair oco. | F12 | 6 | A fazer |
| US13 | Como Marcos, quero um dashboard com totais e quebras, para ver gargalos sem montar planilha. | F13 | 5 | A fazer |
| US14 | Como Helena, quero gerar o relatório de conformidade do lote em PDF, para arquivar evidência. | F14 | 4 | A fazer |
| US15 | Como Helena, quero listar e baixar os PDFs já gerados, para reabrir o laudo do ciclo. | F15 | 5 | A fazer |
| US16 | Como Helena, quero ver rota e motorista no PDF, quando existirem, para o laudo cobrir a coleta. | F16 | 9 | A fazer |
| US17 | Como Marcos, quero montar uma rota com data, paradas e ordem, para planejar a semana de coletas. | F17 | 7 | A fazer |
| US18 | Como Marcos, quero atribuir um motorista à rota na mão, para o Paulo saber o que é dele. | F18 | 7 | A fazer |
| US19 | Como Paulo, quero ver na base a rota do dia já atribuída, para não depender de papel ou zap. | F19 | 8 | A fazer |
| US20 | Como Paulo, quero marcar recolhido / não recolhido / parcial, para o status existir no sistema. | F20 | 8 | A fazer |
| US21 | Como Marcos, quero ver se as coletas da rota foram feitas, para não cobrar a equipe no WhatsApp. | F21 | 9 | A fazer |

---

## Tarefas (por sprint)

Todas as nove sprints serão desenvolvidas neste semestre.

### Sprint 1 — E1, E2

- Autenticação com e-mail e senha (JWT, hash bcrypt)
- Tela de login e sessão
- CRUD de agências (código, cidade, UF, responsável, telefone)
- Rotas da API de agências protegidas por token

### Sprint 2 — E1, E2

- CRUD de usuários (nome, e-mail, perfil, desativar)
- CRUD de lotes ligados a uma agência (data, técnico, observações, status)
- Telas de usuários e de lotes

### Sprint 3 — E2

- Atualizar status do lote (`pendente`, `em_triagem`, `concluido`)
- Cadastro de equipamento no lote (tipo, marca, modelo, série, estado)
- Listagem de equipamentos do lote

### Sprint 4 — E2, E3

- Registro de destinação por equipamento (reciclagem, reúso ou destruição, empresa, data)
- Geração de relatório de conformidade do lote em PDF

### Sprint 5 — E3

- Dashboard com totais e quebras (status, tipo, estado, destino)
- Listar e baixar os PDFs gerados

### Sprint 6 — E1, E2

- Incluir `motorista` no CHECK de perfil (banco, API, tela de usuários)
- Definir matriz de permissões (admin, gestor, técnico, motorista, auditor)
- Middleware de autorização nas rotas da API
- Filtrar menu e rotas no frontend por perfil
- Validar `PATCH` de status `concluido`: todos os equipamentos do lote com destinação

### Sprint 7 — E4

- Tabelas de rota e parada (agência/lote, ordem)
- CRUD de rota (data, paradas)
- Atribuir `usuario` com perfil motorista à rota
- Telas de planejamento para o Marcos
- Sem GPS e sem algoritmo de atribuição

### Sprint 8 — E4

- Tela do Paulo: rota do dia filtrada pelo usuário logado (uso na base)
- Status de recolhimento por parada ou lote (`recolhido`, `nao_recolhido`, `parcial`)
- `PATCH` simples, poucos campos

### Sprint 9 — E2, E3, E4

- `PUT /equipamentos/:id`
- Incluir motorista e rota no PDFKit
- Indicador ou lista para o gestor: coletas feitas vs pendentes (a partir do status da sprint 8)
