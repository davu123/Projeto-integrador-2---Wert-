# Kick-off — EcoTrack Wert

| Campo | Valor |
|---|---|
| Etapa | 0 — Alinhamento inicial |
| Data desta versão | 19/08/2026 |
| Consolidado por | Lucas Gonçalves Balduino |
| Status | Validado pelo grupo (19/08/2026) |
| Fontes | Código do repositório, README, Artefato 1, *Guia de Lean Inception Ajustado* |

---

## 1. Para que serve este documento

Registrar o contexto que vai orientar visão, personas, backlog e Canvas MVP. Sem este alinhamento, as etapas seguintes viram suposição.

Este texto **não** decide funcionalidade nova. Ele só trava o cenário em que o grupo está trabalhando.

---

## 2. O produto, em uma frase

O **EcoTrack Wert** é um sistema web para a Wert gerir o descarte de equipamentos eletroeletrônicos, com rastreabilidade, conformidade ambiental e apoio à operação (lotes, agências, destinação e relatórios).

---

## 3. Problema (validado)

O controle da Wert hoje é baseado em **processos manuais e planilhas**. Isso gera:

- ausência de rastreabilidade centralizada
- lentidão e fragilidade na emissão de relatórios
- risco de inconsistência ou perda de dados
- baixa visibilidade gerencial e dificuldade de auditoria
- custos de rota mal planejada (deslocamento, combustível, tempo de equipe) — ponto trazido pelo **Artefato 1**, não evidenciado como entidade no código atual

---

## 4. Duas leituras que precisam coexistir

| Leitura | O que é verdade |
|---|---|
| **Real** | O software já existe. Foi desenvolvido no Projeto Integrador I, principalmente por Davi. O repositório tem frontend React, API Node/Express e SQL Server, com CRUDs de usuários, agências, lotes, equipamentos, destinação, relatórios PDF e dashboard. |
| **Formal (disciplina)** | O grupo **não poderia** apresentar o PI2 como “software já pronto”. O processo adotado é **desconstruir** o sistema, documentá-lo, **complementá-lo** e **simular** o desenvolvimento em sprints agora, mesmo com o código já feito. |

Na documentação e nas apresentações, o código do PI1 vira **sprints já realizadas na simulação**. O que está no Artefato 1 e ainda não está no código vira **expansão**. Lacunas técnicas (por exemplo, perfil no banco sem autorização de fato) viram **complemento / dívida**.

---

## 5. Contexto de negócio

- **Empresa parceira:** Wert (Brasília/DF), descarte e gestão ambiental de eletroeletrônicos.
- **Quem usa o produto:** a Wert. Cliente na Visão do Produto = **Wert**.
- **Contexto operacional:** atendimento a agências do Banco do Brasil (pontos de coleta). O EcoTrack **não é** o sistema interno do BB.
- **Tipo de iniciativa:** produto existente sendo documentado e expandido — não é startup greenfield.

---

## 6. Time e perspectivas

| Pessoa | Papel |
|---|---|
| Lucas Gonçalves Balduino | Entra no PI2; conduz engenharia reversa e Lean Inception nesta sessão |
| Davi Oliveira Maia | Desenvolveu o software no PI1; contato institucional com a Wert |
| Artur Feitoza | Novo no projeto (no Artefato 1 o nome está grafado *Artur*) |
| Eduardo Martins | Integrante do grupo de 4; ingressou entre o Artefato 1 e o Artefato 2 (por isso não consta na capa do primeiro) |
| Adriana Falcomer Pontes | Professora orientadora |

Quem entra agora no PI2 não participou do desenvolvimento inicial. A base desta documentação é o **código**, o **Artefato 1** e as decisões já validadas pelo grupo nas etapas 0–2.

| Perspectiva | Quem alinha | Base |
|---|---|---|
| Negócio | Grupo + Artefato 1 | Artefato 1 e decisões do time |
| Técnica | Código + grupo | Repositório |
| UX | Grupo | Personas da etapa 4 |
| Academia | Professora + grupo | Formato Lean Inception, Artefato 2 |

---

## 7. Objetivo desta trilha (o que vira Artefato 2)

O guia Lean Inception termina em **backlog em ondas** e **Canvas MVP**.

O **Artefato 2** da disciplina pede:

1. Backlog pronto
2. Requisitos funcionais e não funcionais
3. Cronograma em sprints

Tradução combinada: após as etapas 9–11, as **ondas** viram **sprints**, as **funcionalidades** viram **RF**, e restrições de qualidade/arquitetura viram **RNF**.

---

## 8. Fontes de verdade (ordem de conflito)

Se duas fontes discordarem, usar esta ordem na documentação e avisar o grupo:

1. **Código do repositório** — o que o sistema faz hoje
2. **Artefato 1** — o que o grupo já comprometeu com a professora
3. **README** — visão de produto resumida
4. **Decisões do grupo** — etapas 0–2 validadas em 19/08/2026

Rotas e motoristas: o Artefato 1 prevê logística de coleta; o código do PI1 ainda não implementa essas entidades. O escopo fechado na etapa 2 trata isso como **planejamento e atribuição** (expansão do produto), sem GPS nem atribuição automática.

---

## 9. Validação

- [x] O problema (planilhas + processos manuais) está bem formulado
- [x] O PI2 documenta e simula o desenvolvimento (desconstrução + expansão), em vez de apresentar o PI1 como produto acabado

Validado pelo grupo em 19/08/2026.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Kick-off consolidado na sessão Cursor (Lucas). |
| 19/08/2026 | Grupo validou o kick-off. |
