# Requisitos funcionais e não funcionais

| Campo | Valor |
|---|---|
| Artefato | 2 — requisitos |
| Fonte | F01–F21, escopo da etapa 2, arquitetura prevista no Artefato 1 |
| Data desta versão | 25/08/2026 |
| Status | Preenchido |

---

## Requisitos funcionais

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

---

## Requisitos não funcionais

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

## Rastreio rápido

| Entrega da disciplina | Onde está |
|---|---|
| RF | tabela acima (RF01–RF25) |
| RNF | tabela acima (RNF01–RNF12) |
| Histórias | [backlog.md](backlog.md) |
| Sprints | [cronograma-sprints.md](cronograma-sprints.md) |
