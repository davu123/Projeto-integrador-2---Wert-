# CENTRO UNIVERSITÁRIO DE BRASÍLIA - CEUB
## CURSO DE CIÊNCIA DA COMPUTAÇÃO

---

# ECOTRACK WERT

**PROJETO INTEGRADOR II — ARTEFATO 2**  
**Professora Orientadora:** Adriana Falcomer Pontes  
**Local:** Brasília / DF  

### Autores:

* **Lucas Gonçalves Balduino** — RA: 22409139
* **Artur Feitoza** — RA: 22401202
* **Davi Oliveira Maia** — RA: 22305561
* **Eduardo Martins**

Este documento é a entrega do **Artefato 2**. Reúne, em um único arquivo:

1. o **Artefato 1** (contexto, problema, justificativa, público-alvo e proposta de solução), **sem alteração** em relação à versão já submetida;
2. os elementos novos desta entrega: **requisitos funcionais e não funcionais**, **backlog** e **cronograma em sprints**.

Origem dos elementos novos: Lean Inception (etapas 0–11) em `docs/lean-inception/`.

---

## Sumário

- [Parte I — Artefato 1](#parte-i--artefato-1)
  - [1. Introdução](#1-introdução)
  - [2. Problema](#2-problema)
  - [3. Justificativa](#3-justificativa)
  - [4. Público-alvo](#4-público-alvo)
  - [5. Proposta de Solução](#5-proposta-de-solução)
- [Parte II — Artefato 2](#parte-ii--artefato-2)
  - [6. Requisitos funcionais e não funcionais](#6-requisitos-funcionais-e-não-funcionais)
  - [7. Backlog](#7-backlog)
  - [8. Cronograma em sprints](#8-cronograma-em-sprints)

---

# Parte I — Artefato 1

O texto desta parte é a cópia íntegra do Artefato 1. A capa original (três autores) permanece como foi submetida. Eduardo Martins consta na capa deste Artefato 2.

---

# ECOTRACK WERT

**PROJETO INTEGRADOR II — ARTEFATO 1**  
**Professora Orientadora:** Adriana Falcomer Pontes  
**Local:** Brasília / DF  

### Autores (capa entregue):

* **Lucas Gonçalves Balduino** — RA: 22409139
* **Artur Feitoza** — RA: 22401202
* **Davi Oliveira Maia** — RA: 22305561

> Nota posterior (19/08/2026): **Eduardo Martins** integrou o grupo depois desta entrega. A capa acima permanece como foi submetida. A partir do Artefato 2, os autores são os quatro integrantes.

---

## 1. Introdução

O **EcoTrack Wert** é um sistema web voltado para a gestão centralizada do descarte de equipamentos eletroeletrônicos, focado em rastreabilidade, conformidade ambiental e suporte ao controle operacional.

O projeto foi idealizado no contexto da disciplina *Projeto Integrador II* do curso de Ciência da Computação do UniCEUB, em parceria com a empresa **Wert**, sediada em Brasília/DF. A finalidade principal da plataforma é digitalizar os processos operacionais de descarte eletrônico, com ênfase no atendimento às demandas operacionais e regulatórias associadas ao Banco do Brasil.

---

## 2. Problema

Atualmente, a gestão de resíduos e o descarte de equipamentos eletroeletrônicos são frequentemente realizados por meio de planilhas isoladas e procedimentos manuais. Esse modelo descentralizado gera uma série de gargalos e riscos para as organizações, tais como:

* **Custos elevados por falhas de rota:** O mau gerenciamento de rotas e a falta de planejamento logístico geram deslocamentos desnecessários, consumo excessivo de combustível e desperdício de tempo das equipes de transporte.
* **Ausência de rastreabilidade centralizada:** Falta de uma plataforma única para o acompanhamento contínuo e transparente dos ativos.
* **Lentidão na emissão de relatórios:** Elevada complexidade e morosidade na consolidação manual de dados operacionais e ambientais.
* **Risco de inconsistência e perda de dados:** Vulnerabilidade ao extravio de informações, duplicidades ou erros de preenchimento.
* **Baixa visibilidade gerencial e auditabilidade:** Dificuldade em monitorar indicadores em tempo real e comprovar a conformidade ambiental perante fiscalizações.

---

## 3. Justificativa

A modernização da gestão do descarte eletrônico justifica-se tanto por exigências de conformidade ambiental quanto por uma sólida visão de negócio e eficiência operacional:

1. **Visão de Negócio e Redução de Custos:** A digitalização do processo proporciona controle estratégico sobre toda a operação, eliminando custos invisíveis gerados por ineficiências logísticas e permitindo um modelo de atendimento corporativo escalável e lucrativo.
2. **Otimização Logística (Rotas e Motoristas):** A solução simplifica e otimiza a tomada de decisão no planejamento das rotas de coleta, facilitando a escolha dos trajetos mais eficientes e a alocação adequada de motoristas e veículos, o que reduz diretamente o tempo em trânsito e o consumo de combustível.
3. **Governança e Conformidade Ambiental:** A centralização do ciclo de vida dos ativos garante a rastreabilidade ponta a ponta — desde o recolhimento na agência até a destinação final —, trazendo total transparência e simplificando a prestação de contas perante órgãos fiscalizadores e clientes corporativos.

---

## 4. Público-alvo

O sistema foi concebido para atender de forma integrada aos diferentes atores da cadeia de coleta, transporte, triagem e auditoria do descarte eletrônico:

* **Administrador:** Responsável pelo gerenciamento de usuários, atribuição de permissões e supervisão geral do sistema.
* **Gestor Operacional:** Encarregado do planejamento de demandas, acompanhamento dos lotes, distribuição das coletas e análise de indicadores no dashboard.
* **Motorista:** Agente de campo responsável por executar as rotas de coleta, realizar o transporte dos lotes das agências até o centro de triagem e atualizar os status de recolhimento no sistema.
* **Técnico de Triagem:** Responsável pela recepção, conferência física e cadastramento dos equipamentos, bem como pelo registro da destinação final.
* **Auditor / Consultor:** Usuário encarregado de consultar a rastreabilidade dos ativos e validar a emissão dos relatórios de conformidade ambiental.

---

## 5. Proposta de Solução

### 5.1 Definição Geral do Software

O **EcoTrack Wert** é uma plataforma web para gestão logística e rastreabilidade do descarte eletroeletrônico. O software atua como uma central única de inteligência que conecta a operação de campo (rotas, motoristas e coletas nas agências) ao controle administrativo e fiscal. A plataforma transforma processos manuais e desfragmentados em um fluxo digital contínuo, transparente e auditável.

### 5.2 Funcionamento e Capacidades Operacionais

* **Planejamento Logístico e de Rotas:** Organização dos pontos de coleta por agências e gerenciamento da atribuição de rotas aos motoristas, otimizando o transporte de lotes.
* **Gestão de Lotes e Equipamentos:** Cadastro e rastreamento detalhado de cada ativo, permitindo acompanhar o histórico completo desde a recepção até o registro da destinação final.
* **Relatórios Automáticos de Conformidade:** Emissão simplificada de relatórios e laudos ambientais em PDF, prontos para auditoria.
* **Painel de Controle Gerencial (Dashboard):** Visualização em tempo real de métricas operacionais para suporte à tomada de decisões estratégicas pela gestão.

### 5.3 Aspectos Técnicos e Arquitetura

Para garantir escalabilidade, segurança e bom desempenho, o sistema será estruturado em uma arquitetura em camadas:

| Camada / Componente | Tecnologia / Descrição |
| :--- | :--- |
| **Front-end** | **React.js**, **JavaScript** e **CSS**, com interface web focada na usabilidade desktop. |
| **Back-end** | API REST em **Node.js** com **Express.js**, utilizando **JWT** para autenticação e **bcrypt** para proteção de credenciais. |
| **Banco de Dados** | Modelagem relacional estruturada em **SQL Server**. |
| **Ambiente & Deploy** | Suporte a containerização com **Docker** e **Docker Compose**, facilidade no versionamento via **Git/GitHub**. |

---

## Relação com a Lean Inception (nota de 19/08/2026)

Este artefato foi escrito antes das etapas 0–2. O planejamento de rotas e a atribuição de motoristas permanecem no produto; GPS e atribuição automática ficam fora. Detalhe na [etapa 2 — escopo](../../lean-inception/02-escopo-e-nao-e-faz-nao-faz/escopo.md).

---

# Parte II — Artefato 2

Os itens a seguir são os elementos novos desta entrega: requisitos, backlog e cronograma em sprints. Todas as histórias e sprints serão desenvolvidas neste semestre.

---

## 6. Requisitos funcionais e não funcionais

Fonte: funcionalidades F01–F21, escopo da etapa 2 da Lean Inception e arquitetura prevista no Artefato 1.

### 6.1 Requisitos funcionais

| ID | Requisito | Feature | Categoria |
|---|---|---|---|
| RF01 | O sistema deve autenticar o usuário por e-mail e senha e manter sessão por token. | F01 | Autenticação |
| RF02 | O sistema deve permitir cadastrar, consultar, editar e desativar usuários, com nome, e-mail e perfil. | F02 | Cadastro |
| RF03 | Os perfis válidos devem ser: administrador, gestor, técnico, auditor e motorista. | F03 | Acesso |
| RF04 | O sistema deve restringir telas e operações da API conforme o perfil. | F04 | Acesso |
| RF05 | O administrador deve cadastrar, editar e desativar qualquer usuário. | F04 | Acesso |
| RF06 | O auditor deve consultar lotes, equipamentos, destinações e relatórios, sem criar nem alterar operação. | F04 | Acesso |
| RF07 | O motorista deve consultar apenas a rota a ele atribuída e registrar status de recolhimento. | F04, F19, F20 | Acesso |
| RF08 | O sistema deve permitir cadastrar e manter agências (código único, cidade, UF, responsável, telefone). | F05 | Cadastro |
| RF09 | O sistema deve permitir cadastrar e manter lotes ligados a uma agência, com data de coleta, técnico, status e observações. | F06 | Cadastro |
| RF10 | O status do lote deve ser pendente, em_triagem ou concluido. | F07 | Cadastro |
| RF11 | O sistema deve permitir cadastrar equipamento em um lote (tipo, marca, modelo, número de série, estado). | F08 | Cadastro |
| RF12 | O estado do equipamento deve ser bom, danificado ou inutilizavel. | F08 | Cadastro |
| RF13 | O sistema deve listar os equipamentos de um lote. | F09 | Cadastro |
| RF14 | O sistema deve permitir editar um equipamento já cadastrado. | F10 | Cadastro |
| RF15 | O sistema deve registrar uma destinação por equipamento (reciclagem, reuso ou destruicao, empresa, data, certificado opcional). | F11 | Conformidade |
| RF16 | O sistema não deve aceitar status concluido no lote se algum equipamento estiver sem destinação. | F12 | Conformidade |
| RF17 | O sistema deve exibir dashboard com totais de equipamentos, lotes, agências e destinações, e quebras por status, tipo, estado e tipo de destino. | F13 | Indicadores |
| RF18 | O sistema deve gerar relatório de conformidade do lote em PDF. | F14 | Auditoria |
| RF19 | O sistema deve listar os relatórios gerados e permitir download do PDF. | F15 | Auditoria |
| RF20 | Quando a rota e o motorista existirem, o PDF deve incluí-los. | F16 | Auditoria |
| RF21 | O gestor deve montar rota de coleta com data, paradas (agências/lotes) e ordem. | F17 | Logística |
| RF22 | O gestor deve atribuir manualmente um motorista à rota. | F18 | Logística |
| RF23 | O motorista deve consultar, em tela web na base, a rota do dia a ele atribuída. | F19 | Logística |
| RF24 | O sistema deve registrar status de recolhimento por parada ou lote: recolhido, nao_recolhido ou parcial. | F20 | Logística |
| RF25 | O gestor deve visualizar no sistema se as coletas da rota foram feitas. | F21 | Logística |

### 6.2 Requisitos não funcionais

| ID | Requisito | Categoria |
|---|---|---|
| RNF01 | A interface principal deve ser web, uso em desktop (navegador). | Usabilidade |
| RNF02 | Senhas devem ser armazenadas com hash (bcrypt); autenticação via JWT. | Segurança |
| RNF03 | Rotas da API, exceto login e health, devem exigir token Bearer válido. | Segurança |
| RNF04 | Após a sprint 6, a API deve recusar operação fora do perfil do token. | Segurança |
| RNF05 | Dados persistidos em banco relacional SQL Server (EcoTrackWert). | Persistência |
| RNF06 | O frontend consome a API REST (JSON). | Arquitetura |
| RNF07 | O ambiente de desenvolvimento deve poder subir com Docker Compose (frontend, backend, banco). | Implantação |
| RNF08 | Relatórios de conformidade devem ser gerados em PDF armazenável e reutilizável. | Auditoria |
| RNF09 | O produto não deve exigir GPS, mapa ao vivo nem aplicativo nativo para cumprir as histórias do PI2. | Escopo / restrição |
| RNF10 | Telas de cadastro da triagem devem priorizar fluxo curto (Camila: poucos campos obrigatórios além dos já definidos). | Usabilidade |
| RNF11 | O sistema deve registrar data de criação/atualização nas entidades principais. | Auditoria |
| RNF12 | Comunicação frontend–API em ambiente local via URL configurável (variável de ambiente). | Configuração |

---

## 7. Backlog

Histórias no formato *Como [persona], quero [ação], para [benefício]*. Todas as histórias serão desenvolvidas nas sprints do PI2.

### Legenda — valor, factível e usabilidade

Pesos da etapa 8 da Lean Inception. Cada símbolo vale **1**; a repetição indica 2 ou 3.

| Símbolo | Significado | Escala |
|---|---|---|
| `$` `$$` `$$$` | **Valor** de negócio | 1 / 2 / 3 |
| `E` `EE` `EEE` | **Factível** (esforço de construção) | 1 / 2 / 3 — mais letras = maior esforço |
| `U` `UU` `UUU` | **Usabilidade** | 1 / 2 / 3 |

Na Lean Inception a usabilidade aparece como ♥; neste artefato usa-se **U** com a mesma escala.

### 7.1 Objetivos do produto

Os épicos referenciam estes três objetivos (O1–O3):

1. **O1 — Centralizar a operação** — a Wert controla o ciclo de descarte eletrônico em uma única plataforma web, no lugar de planilhas e processos manuais.
2. **O2 — Garantir rastreabilidade e conformidade** — cada ativo tem histórico auditável da agência até a destinação, com relatório em PDF e indicadores no dashboard.
3. **O3 — Organizar o planejamento das coletas** — rotas e motoristas são planejados e atribuídos no sistema, com status de recolhimento, sem depender de controle informal.

### 7.2 Épicos

| ID | Épico | Objetivo | Sprints |
|---|---|---|---|
| E1 | Acesso e governança | O1 | 1, 2, 6 |
| E2 | Cadastro operacional (agência, lote, equipamento, destinação) | O1, O2 | 2, 3, 4, 6, 9 |
| E3 | Conformidade e visibilidade (dashboard e PDF) | O2 | 4, 5, 9 |
| E4 | Planejamento e recolhimento de coletas | O3 | 6, 7, 8, 9 |

### 7.3 Histórias de usuário

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

### 7.4 Tarefas (por sprint)

Os pesos de cada tarefa somam o total da sprint. Quando duas tarefas pertencem à mesma funcionalidade, o peso da F é repartido.

#### Sprint 1 — E1, E2 · total **$ 6 · E 4 · U 4**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Autenticação com e-mail e senha (JWT, hash bcrypt) | F01 | $$ | E | U |
| Tela de login e sessão | F01 | $ | E | U |
| CRUD de agências (código, cidade, UF, responsável, telefone) | F05 | $$ | E | U |
| Rotas da API de agências protegidas por token | F05 | $ | E | U |

#### Sprint 2 — E1, E2 · total **$ 6 · E 4 · U 5**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| CRUD de usuários (nome, e-mail, perfil, desativar) | F02 | $$ | E | U |
| CRUD de lotes ligados a uma agência (data, técnico, observações, status) | F06 | $$ | E | UU |
| Telas de usuários e de lotes | F02, F06 | $$ | EE | UU |

#### Sprint 3 — E2 · total **$ 7 · E 4 · U 7**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Atualizar status do lote (`pendente`, `em_triagem`, `concluido`) | F07 | $$ | E | UU |
| Cadastro de equipamento no lote (tipo, marca, modelo, série, estado) | F08 | $$$ | EE | UUU |
| Listagem de equipamentos do lote | F09 | $$ | E | UU |

#### Sprint 4 — E2, E3 · total **$ 6 · E 4 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Registro de destinação por equipamento (reciclagem, reúso ou destruição, empresa, data) | F11 | $$$ | EE | UUU |
| Geração de relatório de conformidade do lote em PDF | F14 | $$$ | EE | UUU |

#### Sprint 5 — E3 · total **$ 5 · E 3 · U 5**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Dashboard com totais e quebras (status, tipo, estado, destino) | F13 | $$$ | EE | UUU |
| Listar e baixar os PDFs gerados | F15 | $$ | E | UU |

#### Sprint 6 — E1, E2 · total **$ 7 · E 4 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Incluir `motorista` no CHECK de perfil (banco, API, tela de usuários) | F03 | $$ | E | U |
| Definir matriz de permissões (admin, gestor, técnico, motorista, auditor) | F04 | $ | E | U |
| Middleware de autorização nas rotas da API | F04 | $ | E | U |
| Filtrar menu e rotas no frontend por perfil | F04 | $ | — | U |
| Validar `PATCH` de status `concluido`: todos os equipamentos do lote com destinação | F12 | $$ | E | UU |

#### Sprint 7 — E4 · total **$ 6 · E 5 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Tabelas de rota e parada (agência/lote, ordem) | F17 | $ | E | U |
| CRUD de rota (data, paradas) | F17 | $ | E | U |
| Telas de planejamento para o Marcos | F17 | $ | E | U |
| Atribuir `usuario` com perfil motorista à rota | F18 | $$$ | EE | UUU |
| Sem GPS e sem algoritmo de atribuição | — | — | — | — |

(A última linha é restrição de escopo, sem peso.)

#### Sprint 8 — E4 · total **$ 5 · E 4 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| Tela do Paulo: rota do dia filtrada pelo usuário logado (uso na base) | F19 | $$ | EE | UUU |
| Status de recolhimento por parada ou lote (`recolhido`, `nao_recolhido`, `parcial`) | F20 | $$ | E | UU |
| `PATCH` simples, poucos campos | F20 | $ | E | U |

#### Sprint 9 — E2, E3, E4 · total **$ 6 · E 3 · U 6**

| Tarefa | F | $ | E | U |
|---|---|---|---|---|
| `PUT /equipamentos/:id` | F10 | $ | E | U |
| Incluir motorista e rota no PDFKit | F16 | $$ | E | UU |
| Indicador ou lista para o gestor: coletas feitas vs pendentes (a partir do status da sprint 8) | F21 | $$$ | E | UUU |

---

## 8. Cronograma em sprints

As nove sprints cabem no semestre com término em **01/12/2026**. Nove sprints de duas semanas ultrapassariam essa data: as sprints 1–5 (rastreabilidade) ocupam **uma semana** cada; as sprints 6–9 (governança e logística) ocupam **duas semanas** cada. Início: **01/09/2026**. Totais **$ / E / U** = soma das histórias da sprint (legenda na seção 7).

### 8.1 Visão geral

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

### 8.2 Sprints do semestre

#### Sprint 1 — F01, F05 · $ 6 · E 4 · U 4
Autenticação (JWT) e CRUD de agências. **01/09/2026 – 07/09/2026** (1 semana).

#### Sprint 2 — F02, F06 · $ 6 · E 4 · U 5
CRUD de usuários (perfis) e CRUD de lotes. **08/09/2026 – 14/09/2026** (1 semana).

#### Sprint 3 — F07, F08, F09 · $ 7 · E 4 · U 7
Status do lote; cadastro e listagem de equipamentos. **15/09/2026 – 21/09/2026** (1 semana).

#### Sprint 4 — F11, F14 · $ 6 · E 4 · U 6
Destinação do equipamento; geração de relatório PDF. **22/09/2026 – 28/09/2026** (1 semana).

#### Sprint 5 — F13, F15 · $ 5 · E 3 · U 5
Dashboard gerencial; listagem/download dos PDFs. **29/09/2026 – 05/10/2026** (1 semana).

#### Sprint 6 — F03, F04, F12 · $ 7 · E 4 · U 6
Perfil motorista; autorização por perfil nas telas e APIs; não concluir lote sem destinação. **06/10/2026 – 19/10/2026** (2 semanas).

#### Sprint 7 — F17, F18 · $ 6 · E 5 · U 6
Modelo e tela de rota (paradas e ordem); atribuição **manual** de motorista. Sem GPS e sem atribuição automática. **20/10/2026 – 02/11/2026** (2 semanas).

#### Sprint 8 — F19, F20 · $ 5 · E 4 · U 6
Motorista consulta a rota do dia na base; status simples de recolhimento (recolhido / não / parcial). **03/11/2026 – 16/11/2026** (2 semanas).

#### Sprint 9 — F10, F16, F21 · $ 6 · E 3 · U 6
Editar equipamento; PDF com rota e motorista; gestor vê no sistema se a coleta foi feita. **17/11/2026 – 01/12/2026** (2 semanas).

### 8.3 Fora deste cronograma

GPS, atribuição automática, app nativo e integração com o Banco do Brasil ficam fora deste cronograma (escopo da etapa 2 da Lean Inception).
