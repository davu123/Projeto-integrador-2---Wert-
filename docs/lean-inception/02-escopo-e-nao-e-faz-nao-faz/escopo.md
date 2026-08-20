# Escopo — É / Não é / Faz / Não faz

| Campo | Valor |
|---|---|
| Etapa | 2 — Limites do produto |
| Data desta versão | 19/08/2026 |
| Elaborado por | Lucas Gonçalves Balduino |
| Status | Validado pelo grupo (19/08/2026) |
| Depende de | [Visão do produto](../01-visao-do-produto/visao-do-produto.md) |

---

## 1. Como ler os quatro quadrantes

| Quadrante | Significa | Não significa |
|---|---|---|
| **É** | Atributos que o produto deve ter | Lista de telas |
| **Não é** | Evitar confusão com outro sistema | Item de outra disciplina ou outro produto |
| **Faz** | Capacidades que o produto deve ter | Lista de telas da sprint atual |
| **Não faz** | Fora do escopo deste produto | Item para sprint posterior dentro do mesmo produto |

O produto cobre rastreabilidade (itens 1–7 de **Faz**) e planejamento de rotas com atribuição de motoristas (item 8). A ordem de construção está no sequenciador (sprints 1 a 9).

---

## 2. Quadrantes

### É

1. Sistema **web** (navegador), uso principal em **desktop**
2. Plataforma **única** da Wert para o ciclo de descarte eletrônico
3. Foco em **rastreabilidade** e **conformidade ambiental**
4. Controle por **perfis de acesso** (administrador, gestor, técnico, auditor e motorista)
5. Geração de **evidência auditável** (histórico + PDF)

### Não é

1. **Não é** o sistema interno do Banco do Brasil — a Wert usa o EcoTrack; agências do BB são pontos de coleta
2. **Não é** um ERP completo da Wert (RH, financeiro, compras, estoque geral)
3. **Não é** um aplicativo móvel nativo (iOS/Android)
4. **Não é** um marketplace de sucata nem e-commerce
5. **Não é** um sistema do órgão ambiental — gera prova para auditoria, não substitui o órgão

### Faz

1. Autenticar usuários e gerenciar contas/perfis
2. Cadastrar e manter **agências** (pontos de coleta)
3. Organizar **lotes** de coleta e seus status
4. Cadastrar **equipamentos** (tipo, marca, modelo, série, estado)
5. Registrar **destinação final** (reciclagem, reúso, destruição)
6. Emitir **relatórios de conformidade em PDF**
7. Exibir **dashboard** com indicadores operacionais
8. **Planejar rotas de coleta** e **atribuir motoristas** (cadastro de motorista, montagem da rota, atribuição de agências/lotes, status de recolhimento)

### Não faz

1. Cobrança, nota fiscal, contas a pagar/receber
2. Rastreamento por **GPS** em tempo real
3. **Atribuição automática** de rotas ou motoristas (algoritmo / otimização automática)
4. Integração direta com sistemas do Banco do Brasil
5. Aplicativo nativo do motorista
6. Gestão de frota completa (manutenção, combustível, pneus)
7. Chat, e-mail marketing ou CRM comercial da Wert

---

## 3. Corte de logística (fechado)

| No produto | Fora do produto |
|---|---|
| Cadastro de motorista, planejamento de rota de coleta, atribuição de agências/lotes ao motorista, status de recolhimento | GPS ao vivo, atribuição automática, aplicativo nativo do motorista, gestão de frota |

---

## 4. Validação

Validado pelo grupo em 19/08/2026: quadrantes acima e o corte de logística.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Escopo redigido. |
| 19/08/2026 | Grupo validou: rotas/motoristas como planejamento e atribuição; GPS e atribuição automática fora do produto. |
