# EcoTrack Wert

Sistema web para gestão de descarte eletrônico, com foco em rastreabilidade, conformidade ambiental e apoio à gestão operacional.

## Sobre o projeto

O **EcoTrack Wert** será desenvolvido no contexto da disciplina **Projeto Integrador II** do curso de **Ciência da Computação do UniCEUB**, em parceria com a empresa **Wert**, sediada em Brasília/DF.

A proposta do sistema é digitalizar e centralizar o processo de gestão de descarte de equipamentos eletroeletrônicos, especialmente no contexto de atendimento ao **Banco do Brasil**, permitindo controle de lotes, equipamentos, destinação final, relatórios de conformidade e indicadores gerenciais.

## Problema que o projeto resolve

Atualmente, o controle do descarte eletrônico pode depender de planilhas isoladas e processos manuais, o que gera problemas como:

- ausência de rastreabilidade centralizada
- dificuldade para emissão de relatórios
- risco de inconsistência ou perda de dados
- baixa visibilidade gerencial
- dificuldade de auditoria e comprovação de conformidade

O EcoTrack Wert foi projetado para resolver esse cenário com uma plataforma web única, organizada e rastreável.

## Objetivo

Desenvolver uma aplicação web capaz de:

- cadastrar equipamentos eletrônicos recebidos para descarte
- organizar equipamentos em lotes de coleta
- associar lotes a agências/pontos de coleta
- registrar a destinação final dos equipamentos
- gerar relatórios de conformidade ambiental em PDF
- disponibilizar dashboard com indicadores operacionais
- controlar acesso por perfis de usuário

## Público-alvo

O sistema foi pensado para os seguintes perfis:

- **Administrador**: gerencia usuários, acessos e supervisão geral do sistema
- **Técnico de triagem**: registra equipamentos e atualiza a destinação final
- **Gestor operacional**: acompanha lotes, indicadores e relatórios
- **Auditor/consultor**: consulta relatórios e rastreabilidade dos ativos

## Funcionalidades previstas

- autenticação de usuários com controle de acesso
- cadastro e gerenciamento de usuários
- cadastro e gerenciamento de agências
- cadastro e acompanhamento de lotes
- cadastro de equipamentos
- registro de destinação final
- geração de relatórios em PDF
- dashboard gerencial com indicadores
- interface responsiva para desktop

## Tecnologias previstas

### Front-end
- React.js
- JavaScript
- CSS
- consumo de API REST

### Back-end
- Node.js
- Express.js
- JWT para autenticação
- bcrypt para segurança de senhas

### Banco de dados
- SQL Server no ambiente local de desenvolvimento
- modelagem relacional baseada nas entidades do projeto

### Ambiente e versionamento
- Git e GitHub
- Docker / Docker Compose
- execução local com frontend, backend e banco separados

## Modelagem de dados

A modelagem prevista inclui as seguintes entidades principais:

- **Usuário**
- **Agência**
- **Lote**
- **Equipamento**
- **Destinação**
- **Relatório**

### Relacionamentos principais

- uma **Agência** pode possuir vários **Lotes**
- um **Lote** contém vários **Equipamentos**
- um **Equipamento** possui registro de **Destinação**
- um **Lote** pode gerar **Relatórios**
- um **Usuário** participa das operações do sistema conforme seu perfil

## Arquitetura da solução

O EcoTrack Wert seguirá uma arquitetura em camadas:

- **Front-end**: interface web
- **Back-end**: API com regras de negócio
- **Banco de dados**: armazenamento relacional das informações

### Fluxo geral

Usuário → Interface Web → API → Banco de Dados

## Estrutura do projeto

```bash
ecotrack_mvp/
├── backend/
│   ├── src/
│   ├── database/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
├── docker-compose.yml
└── README.md