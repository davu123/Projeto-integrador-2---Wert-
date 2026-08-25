# Showcase — EcoTrack Wert

| Campo | Valor |
|---|---|
| Etapa | 11 — Showcase |
| Data desta versão | 19/08/2026 |
| Status | Validado na sessão (19/08/2026) |
| Depende de | [Canvas MVP](../10-canvas-mvp/canvas-mvp.md) |

Resumo executivo da Lean Inception, para o grupo e para a banca. Detalhe nas etapas 0–10 e no [Artefato 2](../../artefatos/02-backlog-requisitos-sprints/README.md).

**Autores:** Lucas Gonçalves Balduino, Davi Oliveira Maia, Artur Feitoza, Eduardo Martins  
**Orientadora:** Adriana Falcomer Pontes · PI2 · UniCEUB

---

## Visão

Para a equipe da Wert, cujo descarte eletrônico ainda depende de planilhas, o **EcoTrack Wert** é um sistema web de gestão logística e rastreabilidade de e-lixo. Centraliza coletas, lotes, equipamentos, destinação e relatórios de conformidade. Une operação de campo (rotas e motoristas, **sem GPS**) e governança administrativa/fiscal.

Cliente: **Wert**. Banco do Brasil: ponto de coleta, não cliente do produto.

---

## Escopo

| É | Não é |
|---|---|
| Web desktop, plataforma única da Wert, rastreabilidade, perfis, PDF auditável | Sistema do BB, ERP da Wert, app nativo, marketplace, sistema do órgão ambiental |

| Faz | Não faz |
|---|---|
| Login, usuários, agências, lotes, equipamentos, destinação, PDF, dashboard, **planejar rota e atribuir motorista**, status de recolhimento | GPS, atribuição automática, integração com o BB, financeiro, frota, CRM |

---

## Objetivos (3)

1. Centralizar a operação no EcoTrack, no lugar de planilhas.  
2. Garantir rastreabilidade ponta a ponta e conformidade (PDF + dashboard).  
3. Organizar o planejamento das coletas (rota, motorista, status de recolhimento).

---

## Personas e jornada

Renata (admin) → Marcos (gestor) planeja e atribui → Paulo (motorista) recolhe → Camila (triagem) cadastra e destina → Helena (auditora) consulta e baixa o PDF.

Mapas ilustrados: `docs/lean-inception/04-personas/imagens/`.

---

## Backlog priorizado por ondas

Nove sprints a desenvolver no PI2.

| Sprint | Entrega |
|---|---|
| 1 | Login e agências |
| 2 | Usuários e lotes |
| 3 | Equipamentos e status do lote |
| 4 | Destinação e PDF |
| 5 | Dashboard e arquivo de PDFs |
| 6 | Perfil motorista, permissões, lote não fecha sem destinação |
| 7 | Rota + atribuição manual de motorista |
| 8 | Consulta da rota na base + status de recolhimento |
| 9 | Editar equipamento, PDF com rota/motorista, visão do gestor sobre a coleta |

21 funcionalidades (F01–F21): 14 verdes, 7 amarelos, 0 vermelho.

---

## Canvas MVP (síntese)

O produto será construído em nove sprints até **01/12/2026**: sprints 1–5 (rastreabilidade, 1 semana cada), sprint 6 (permissões e consistência, 2 semanas), sprints 7–9 (logística de planejamento/atribuição, sem GPS, 2 semanas cada). Time de quatro pessoas.

Métricas: cadastro no sistema (não na planilha); histórico agência → lote → equipamento → destinação; PDF gerado; rota atribuída antes de sair; status de recolhimento visível; cada perfil vê o que deve.

---

## Pronto para apresentação

- [x] Material das etapas 0–11 consolidado nesta sessão  
- [x] Cronograma em sprints no Artefato 2  
- [x] Backlog e RF/RNF no Artefato 2  

Próximo uso: exportar os Markdown para PDF nas pastas `pdf/` de cada etapa, se a professora pedir documento formal.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Showcase redigido; Lean Inception encerrada nesta trilha. |
| 25/08/2026 | Duração das sprints alinhada ao cronograma (término 01/12/2026). |
