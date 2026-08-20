# CENTRO UNIVERSITÁRIO DE BRASÍLIA - CEUB
## CURSO DE CIÊNCIA DA COMPUTAÇÃO

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
