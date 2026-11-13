# Artefato 2 — EcoTrack Wert

| Campo | Valor |
| --- | --- |
| Instituição | Centro Universitário de Brasília - CEUB |
| Curso | Ciência da Computação |
| Projeto | EcoTrack Wert |
| Integrantes | Lucas Gonçalves Balduino - 22409139<br>Artur Feitoza - 22401202<br>Davi Oliveira Maia - 22305561<br>Eduardo Martins - 22403813 |
| Documento | Projeto Integrador II - Artefato 2 |
| Professora orientadora | Adriana Falcomer Pontes |
| Local | Brasília |

## 1. Introdução

O **EcoTrack Wert** é um sistema web voltado para a gestão centralizada do descarte de equipamentos eletroeletrônicos, focado em rastreabilidade, conformidade ambiental e suporte ao controle operacional.

O projeto foi idealizado e desenvolvido no contexto da disciplina Projeto Integrador II do curso de Ciência da Computação do UniCEUB, em parceria com a empresa **Wert**, sediada em Brasília/DF. A finalidade principal da plataforma é digitalizar os processos operacionais de descarte eletrônico, com ênfase no atendimento às demandas operacionais e regulatórias associadas ao Banco do Brasil.

## 2. Problema

Atualmente, a gestão de resíduos e o descarte de equipamentos eletroeletrônicos são frequentemente realizados por meio de planilhas isoladas e procedimentos manuais. Esse modelo descentralizado gera uma série de gargalos e riscos para as organizações, tais como:

* **Custos elevados por falhas de rota:** O mau gerenciamento de rotas e a falta de planejamento logístico geram deslocamentos desnecessários, consumo excessivo de combustível e desperdício de tempo das equipes de transporte.
* **Ausência de rastreabilidade centralizada:** Falta de uma plataforma única para o acompanhamento contínuo e transparente dos ativos.
* **Lentidão na emissão de relatórios:** Elevada complexidade e morosidade na consolidação manual de dados operacionais e ambientais.
* **Risco de inconsistência e perda de dados:** Vulnerabilidade ao extravio de informações, duplicidades ou erros de preenchimento.
* **Baixa visibilidade gerencial e auditabilidade:** Dificuldade em monitorar indicadores em tempo real e comprovar a conformidade ambiental perante fiscalizações.

## 3. Justificativa

A modernização da gestão do descarte eletrônico justifica-se tanto por exigências de conformidade ambiental quanto por uma sólida visão de negócio e eficiência operacional:

* **Visão de Negócio e Redução de Custos:** A digitalização do processo proporciona controle estratégico sobre toda a operação, eliminando custos invisíveis gerados por ineficiências logísticas e permitindo um modelo de atendimento corporativo escalável e lucrativo.
* **Otimização Logística (Rotas e Motoristas):** A solução simplifica e otimiza a tomada de decisão no planejamento das rotas de coleta, facilitando a escolha dos trajetos mais eficientes e a alocação adequada de motoristas e veículos, o que reduz diretamente o tempo em trânsito e o consumo de combustível.
* **Governança e Conformidade Ambiental:** A centralização do ciclo de vida dos ativos garante a rastreabilidade ponta a ponta — desde o recolhimento na agência até a destinação final —, trazendo total transparência e simplificando a prestação de contas perante órgãos fiscalizadores e clientes corporativos.

## 4. Público-alvo

O sistema foi concebido para atender de forma integrada aos diferentes atores da cadeia de coleta, transporte, triagem e auditoria do descarte eletrônico:

* **Administrador:** Responsável pelo gerenciamento de usuários, atribuição de permissões e supervisão geral do sistema.
* **Gestor Operacional:** Encarregado do planejamento de demandas, acompanhamento dos lotes, distribuição das coletas e análise de indicadores no dashboard.
* **Motorista:** Agente de campo responsável por executar as rotas de coleta, realizar o transporte dos lotes das agências até o centro de triagem e atualizar os status de recolhimento no sistema.
* **Técnico de Triagem:** Responsável pela recepção, conferência física e cadastramento dos equipamentos, bem como pelo registro da destinação final.
* **Auditor / Consultor:** Usuário encarregado de consultar a rastreabilidade dos ativos e validar a emissão dos relatórios de conformidade ambiental.

## 5. Proposta de Solução

### Definição Geral do Software

O **EcoTrack Wert** é uma plataforma web para gestão logística e rastreabilidade do descarte eletroeletrônico. O software atua como uma central única de inteligência que conecta a operação de campo (rotas, motoristas e coletas nas agências) ao controle administrativo e fiscal. A plataforma transforma processos manuais e desfragmentados em um fluxo digital contínuo, transparente e auditável.

### Funcionamento e Capacidades Operacionais

* **Planejamento Logístico e de Rotas:** Organização dos pontos de coleta por agências e gerenciamento da atribuição de rotas aos motoristas, otimizando o transporte de lotes.
* **Gestão de Lotes e Equipamentos:** Cadastro e rastreamento detalhado de cada ativo, permitindo acompanhar o histórico completo desde a recepção até o registro da destinação final.
* **Relatórios Automáticos de Conformidade:** Emissão simplificada de relatórios e laudos ambientais em PDF, prontos para auditoria.
* **Painel de Controle Gerencial (Dashboard):** Visualização em tempo real de métricas operacionais para suporte à tomada de decisões estratégicas pela gestão.

### Aspectos Técnicos e Arquitetura

Para garantir escalabilidade, segurança e bom desempenho, o sistema será estruturado em uma arquitetura em camadas:

| Camada / Componente | Tecnologia / Descrição |
| --- | --- |
| **Front-end** | **React.js**, **JavaScript** e **CSS**, com interface web focada na usabilidade desktop. |
| **Back-end** | API REST em **Node.js** com **Express.js**, utilizando **JWT** para autenticação e **bcrypt** para proteção de credenciais. |
| **Banco de Dados** | Modelagem relacional estruturada em **SQL Server**. |
| **Ambiente & Deploy** | Suporte a containerização com **Docker** e **Docker Compose**, facilidade no versionamento via **Git/GitHub**. |

## 6. Requisitos funcionais e não funcionais

### 6.1 Requisitos funcionais

| ID | Requisito | Feature | Categoria |
| --- | --- | --- | --- |
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
| --- | --- | --- |
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

## 7. Backlog

O backlog do produto lista só funcionalidades: o que o EcoTrack faz para quem o usa. Tarefas técnicas (tabelas, rotas da API, componentes de tela) não entram no backlog. Elas ficam nas issues de cada sprint, no GitHub, como filhas da história de usuário.

### 7.1 Backlog e histórias de usuário

| | Backlog do produto | História de usuário |
| --- | --- | --- |
| O que é | Lista priorizada das funcionalidades do produto (F01–F21) | Descrição de uma funcionalidade do ponto de vista de quem a usa |
| Pergunta que responde | O que o produto faz e em que ordem | Para quem, o quê e por quê |
| Formato | Uma linha por funcionalidade, com épico, sprint, valor e usabilidade | *Como [persona], quero [ação], para [benefício]* |
| Origem | Brainstorm (etapa 6) e sequenciador (etapa 9) da Lean Inception | Personas (etapa 4) e jornada (etapa 5) da Lean Inception |
| No GitHub | Feature (F01–F21), filha de um épico | PBI (US01–US21), filho de uma Feature, com as Tasks da sprint |

A relação é de um para um: cada funcionalidade do backlog vira uma história (F01 → US01, …, F21 → US21). O backlog diz **o que** entra e em que ordem. A história diz **para quem** e **por quê**, e é com ela que a sprint aceita a entrega.

### Legenda — cores das sprints

Cada sprint é identificada pela sua cor. As tabelas deste artefato usam só a cor.

| Cor | Sprint | Período | Foco |
| --- | --- | --- | --- |
| 🟥 Vermelho | 1 | 01/09/2026 – 07/09/2026 | Login e agências |
| 🟧 Laranja | 2 | 08/09/2026 – 14/09/2026 | Usuários e lotes |
| 🟨 Amarelo | 3 | 15/09/2026 – 21/09/2026 | Equipamentos e status do lote |
| 🟩 Verde | 4 | 22/09/2026 – 28/09/2026 | Destinação e PDF |
| 🟦 Azul | 5 | 29/09/2026 – 05/10/2026 | Dashboard e arquivo de PDFs |
| 🟪 Roxo | 6 | 06/10/2026 – 19/10/2026 | Perfil motorista, permissões, consistência do lote |
| 🟫 Marrom | 7 | 20/10/2026 – 02/11/2026 | Planejar rota e atribuir motorista |
| ⬛ Preto | 8 | 03/11/2026 – 16/11/2026 | Consulta da rota na base e status de recolhimento |
| ⬜ Branco | 9 | 17/11/2026 – 01/12/2026 | PDF com rota/motorista, visão do gestor, editar equipamento |

### Legenda — valor e usabilidade

Pesos da etapa 8 da Lean Inception. Cada símbolo vale **1**; a repetição indica 2 ou 3.

| Símbolo | Significado | Escala |
| --- | --- | --- |
| `$` `$$` `$$$` | **Valor** de negócio | 1 / 2 / 3 |
| `U` `UU` `UUU` | **Usabilidade** | 1 / 2 / 3 |

Na Lean Inception a usabilidade aparece como ♥; neste artefato usa-se **U** com a mesma escala.

### 7.2 Objetivos do produto

Os épicos referenciam estes três objetivos (O1–O3):

1. **O1 — Centralizar a operação** — a Wert controla o ciclo de descarte eletrônico em uma única plataforma web, no lugar de planilhas e processos manuais.
2. **O2 — Garantir rastreabilidade e conformidade** — cada ativo tem histórico auditável da agência até a destinação, com relatório em PDF e indicadores no dashboard.
3. **O3 — Organizar o planejamento das coletas** — rotas e motoristas são planejados e atribuídos no sistema, com status de recolhimento, sem depender de controle informal.

### 7.3 Épicos

| ID | Épico | Objetivo | Sprints |
| --- | --- | --- | --- |
| E1 | Acesso e governança | O1 | 🟥 🟧 🟪 |
| E2 | Cadastro operacional (agência, lote, equipamento, destinação) | O1, O2 | 🟥 🟧 🟨 🟩 🟪 ⬜ |
| E3 | Conformidade e visibilidade (dashboard e PDF) | O2 | 🟩 🟦 ⬜ |
| E4 | Planejamento e recolhimento de coletas | O3 | 🟫 ⬛ ⬜ |

### 7.4 Backlog do produto

Funcionalidades em ordem de entrega.

| ID | Funcionalidade | Épico | Sprint | $ | U |
| --- | --- | --- | --- | --- | --- |
| F01 | Autenticar com e-mail e senha | E1 | 🟥 | $$$ | UU |
| F05 | Cadastrar e manter agências | E2 | 🟥 | $$$ | UU |
| F02 | Cadastrar, editar e desativar usuários | E1 | 🟧 | $$$ | UU |
| F06 | Cadastrar e manter lotes | E2 | 🟧 | $$$ | UUU |
| F07 | Atualizar status do lote | E2 | 🟨 | $$ | UU |
| F08 | Cadastrar equipamento no lote | E2 | 🟨 | $$$ | UUU |
| F09 | Listar equipamentos do lote | E2 | 🟨 | $$ | UU |
| F11 | Registrar destinação | E2 | 🟩 | $$$ | UUU |
| F14 | Gerar PDF de conformidade | E3 | 🟩 | $$$ | UUU |
| F13 | Dashboard de indicadores | E3 | 🟦 | $$$ | UUU |
| F15 | Listar e baixar PDFs | E3 | 🟦 | $$ | UU |
| F03 | Incluir perfil motorista | E1 | 🟪 | $$ | U |
| F04 | Restringir telas e APIs por perfil | E1 | 🟪 | $$$ | UUU |
| F12 | Não concluir lote sem destinação | E2 | 🟪 | $$ | UU |
| F17 | Montar rota com paradas e ordem | E4 | 🟫 | $$$ | UUU |
| F18 | Atribuir motorista à rota | E4 | 🟫 | $$$ | UUU |
| F19 | Motorista consultar a rota do dia | E4 | ⬛ | $$ | UUU |
| F20 | Status de recolhimento | E4 | ⬛ | $$$ | UUU |
| F10 | Editar equipamento já lançado | E2 | ⬜ | $ | U |
| F16 | Incluir rota e motorista no PDF | E3 | ⬜ | $$ | UU |
| F21 | Gestor ver se as coletas foram feitas | E4 | ⬜ | $$$ | UUU |

### 7.5 Histórias de usuário

| ID | História | Feature | Sprint | $ | U |
| --- | --- | --- | --- | --- | --- |
| US01 | Como usuário da Wert, quero entrar com e-mail e senha, para acessar só o que me compete. | F01 | 🟥 | $$$ | UU |
| US02 | Como Renata, quero cadastrar, editar e desativar usuários com perfil, para manter as contas em ordem. | F02 | 🟧 | $$$ | UU |
| US03 | Como Renata, quero o perfil motorista no cadastro, para o Paulo existir no sistema. | F03 | 🟪 | $$ | U |
| US04 | Como Renata / Helena, quero que cada perfil só veja e altere o que pode, para a auditoria não mudar operação e o admin controlar o acesso. | F04 | 🟪 | $$$ | UUU |
| US05 | Como Marcos, quero cadastrar agências, para os pontos de coleta existirem no EcoTrack. | F05 | 🟥 | $$$ | UU |
| US06 | Como Marcos, quero abrir e manter lotes ligados a uma agência, para organizar cada coleta. | F06 | 🟧 | $$$ | UUU |
| US07 | Como Marcos / Camila, quero mudar o status do lote (pendente, em triagem, concluído), para o fluxo aparecer no sistema. | F07 | 🟨 | $$ | UU |
| US08 | Como Camila, quero lançar o equipamento no lote (tipo, marca, modelo, série, estado), para o ativo ficar rastreável. | F08 | 🟨 | $$$ | UUU |
| US09 | Como Camila, quero listar os equipamentos do lote, para conferir com o físico. | F09 | 🟨 | $$ | UU |
| US10 | Como Camila, quero editar um equipamento já lançado, para corrigir erro de digitação. | F10 | ⬜ | $ | U |
| US11 | Como Camila, quero registrar a destinação (reciclagem, reúso ou destruição, empresa e data), para fechar o ciclo ambiental. | F11 | 🟩 | $$$ | UUU |
| US12 | Como Marcos / Helena, quero que o lote não seja concluído sem destinação em todos os itens, para o PDF não sair oco. | F12 | 🟪 | $$ | UU |
| US13 | Como Marcos, quero um dashboard com totais e quebras, para ver gargalos sem montar planilha. | F13 | 🟦 | $$$ | UUU |
| US14 | Como Helena, quero gerar o relatório de conformidade do lote em PDF, para arquivar evidência. | F14 | 🟩 | $$$ | UUU |
| US15 | Como Helena, quero listar e baixar os PDFs já gerados, para reabrir o laudo do ciclo. | F15 | 🟦 | $$ | UU |
| US16 | Como Helena, quero ver rota e motorista no PDF, quando existirem, para o laudo cobrir a coleta. | F16 | ⬜ | $$ | UU |
| US17 | Como Marcos, quero montar uma rota com data, paradas e ordem, para planejar a semana de coletas. | F17 | 🟫 | $$$ | UUU |
| US18 | Como Marcos, quero atribuir um motorista à rota na mão, para o Paulo saber o que é dele. | F18 | 🟫 | $$$ | UUU |
| US19 | Como Paulo, quero ver na base a rota do dia já atribuída, para não depender de papel ou zap. | F19 | ⬛ | $$ | UUU |
| US20 | Como Paulo, quero marcar recolhido / não recolhido / parcial, para o status existir no sistema. | F20 | ⬛ | $$$ | UUU |
| US21 | Como Marcos, quero ver se as coletas da rota foram feitas, para não cobrar a equipe no WhatsApp. | F21 | ⬜ | $$$ | UUU |

## 8. Cronograma em sprints

As nove sprints cabem no semestre com término em **01/12/2026**. Nove sprints de duas semanas ultrapassariam essa data: as sprints de rastreabilidade (🟥 a 🟦) ocupam **uma semana** cada; as de governança e logística (🟪 a ⬜) ocupam **duas semanas** cada. Início: **01/09/2026**. Totais **$ / U** = soma das histórias da sprint (legenda na seção 7).

### 8.1 Visão geral

| Sprint | Foco | Período | $ | U |
| --- | --- | --- | --- | --- |
| 🟥 | Login e agências | 01/09/2026 – 07/09/2026 | 6 | 4 |
| 🟧 | Usuários e lotes | 08/09/2026 – 14/09/2026 | 6 | 5 |
| 🟨 | Equipamentos e status do lote | 15/09/2026 – 21/09/2026 | 7 | 7 |
| 🟩 | Destinação e PDF | 22/09/2026 – 28/09/2026 | 6 | 6 |
| 🟦 | Dashboard e arquivo de PDFs | 29/09/2026 – 05/10/2026 | 5 | 5 |
| 🟪 | Perfil motorista, permissões, consistência do lote | 06/10/2026 – 19/10/2026 | 7 | 6 |
| 🟫 | Planejar rota e atribuir motorista | 20/10/2026 – 02/11/2026 | 6 | 6 |
| ⬛ | Consulta da rota na base e status de recolhimento | 03/11/2026 – 16/11/2026 | 5 | 6 |
| ⬜ | PDF com rota/motorista, visão do gestor, editar equipamento | 17/11/2026 – 01/12/2026 | 6 | 6 |
