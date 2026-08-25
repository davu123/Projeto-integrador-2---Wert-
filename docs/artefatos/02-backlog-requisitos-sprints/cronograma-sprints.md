# Cronograma em sprints

| Campo | Valor |
|---|---|
| Artefato | 2 — cronograma |
| Fonte | [Ondas da Lean Inception](../../lean-inception/09-sequenciador-ondas/ondas.md) e [pesos](../../lean-inception/08-esforco-negocio-ux/pesos.md) |
| Data desta versão | 25/08/2026 |
| Status | Preenchido a partir da etapa 9 |

Cada onda vira **uma sprint**. As nove sprints cabem no semestre com término em **01/12/2026**. Nove sprints de duas semanas ultrapassariam essa data: as sprints 1–5 (rastreabilidade) ocupam **uma semana** cada; as sprints 6–9 (governança e logística) ocupam **duas semanas** cada.

Início do calendário: **01/09/2026**. Totais **$ / E / U** = soma das histórias da sprint (legenda no [backlog](backlog.md)).

### Legenda

| Símbolo | Significado | Escala |
|---|---|---|
| `$` | Valor de negócio | soma em pontos (1–3 por história) |
| `E` | Factível (esforço de construção) | soma em pontos |
| `U` | Usabilidade | soma em pontos |

---

## Visão geral

| Sprint | Foco | Semanas | $ | E | U |
|---|---|---|---|---|---|
| 1 | Login e agências | 01/09/2026 – 07/09/2026 | 6 | 4 | 4 |
| 2 | Usuários e lotes | 08/09/2026 – 14/09/2026 | 6 | 4 | 5 |
| 3 | Equipamentos e status do lote | 15/09/2026 – 21/09/2026 | 7 | 4 | 7 |
| 4 | Destinação e PDF | 22/09/2026 – 28/09/2026 | 6 | 4 | 6 |
| 5 | Dashboard e arquivo de PDFs | 29/09/2026 – 05/10/2026 | 5 | 3 | 5 |
| 6 | Perfil motorista, permissões, consistência do lote | 06/10/2026 – 19/10/2026 | 7 | 4 | 6 |
| 7 | Planejar rota e atribuir motorista | 20/10/2026 – 02/11/2026 | 6 | 5 | 6 |
| 8 | Consulta da rota na base e status de recolhimento | 03/11/2026 – 16/11/2026 | 5 | 4 | 6 |
| 9 | PDF com rota/motorista, visão do gestor, editar equipamento | 17/11/2026 – 01/12/2026 | 6 | 3 | 6 |

---

## Sprints do semestre

### Sprint 1 — F01, F05 · $ 6 · E 4 · U 4
Autenticação (JWT) e CRUD de agências. **01/09/2026 – 07/09/2026** (1 semana).

### Sprint 2 — F02, F06 · $ 6 · E 4 · U 5
CRUD de usuários (perfis) e CRUD de lotes. **08/09/2026 – 14/09/2026** (1 semana).

### Sprint 3 — F07, F08, F09 · $ 7 · E 4 · U 7
Status do lote; cadastro e listagem de equipamentos. **15/09/2026 – 21/09/2026** (1 semana).

### Sprint 4 — F11, F14 · $ 6 · E 4 · U 6
Destinação do equipamento; geração de relatório PDF. **22/09/2026 – 28/09/2026** (1 semana).

### Sprint 5 — F13, F15 · $ 5 · E 3 · U 5
Dashboard gerencial; listagem/download dos PDFs. **29/09/2026 – 05/10/2026** (1 semana).

### Sprint 6 — F03, F04, F12 · $ 7 · E 4 · U 6
Perfil motorista; autorização por perfil nas telas e APIs; não concluir lote sem destinação. **06/10/2026 – 19/10/2026** (2 semanas).

### Sprint 7 — F17, F18 · $ 6 · E 5 · U 6
Modelo e tela de rota (paradas e ordem); atribuição **manual** de motorista. Sem GPS e sem atribuição automática. **20/10/2026 – 02/11/2026** (2 semanas).

### Sprint 8 — F19, F20 · $ 5 · E 4 · U 6
Motorista consulta a rota do dia na base; status simples de recolhimento (recolhido / não / parcial). **03/11/2026 – 16/11/2026** (2 semanas).

### Sprint 9 — F10, F16, F21 · $ 6 · E 3 · U 6
Editar equipamento; PDF com rota e motorista; gestor vê no sistema se a coleta foi feita. **17/11/2026 – 01/12/2026** (2 semanas).

---

## Fora deste cronograma

GPS, atribuição automática, app nativo e integração com o Banco do Brasil ficam fora deste cronograma (escopo da etapa 2).
