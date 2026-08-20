# Requisitos funcionais e não funcionais

| Campo | Valor |
|---|---|
| Artefato | 2 — requisitos |
| Origem | F01–F21, escopo da etapa 2, arquitetura do repositório |
| Data desta versão | 19/08/2026 |
| Status | Preenchido |

---

## Requisitos funcionais

| ID | Requisito | Feature | Origem |
|---|---|---|---|
| RF01 | O sistema deve autenticar o usuário por e-mail e senha e manter sessão por token. | F01 | Núcleo |
| RF02 | O sistema deve permitir cadastrar, consultar, editar e desativar usuários, com nome, e-mail e perfil. | F02 | Núcleo |
| RF03 | Os perfis válidos devem ser: administrador, gestor, técnico, auditor e motorista. | F03 | Complemento |
| RF04 | O sistema deve restringir telas e operações da API conforme o perfil. | F04 | Complemento |
| RF05 | O administrador deve cadastrar, editar e desativar qualquer usuário. | F04 | Complemento |
| RF06 | O auditor deve consultar lotes, equipamentos, destinações e relatórios, sem criar nem alterar operação. | F04 | Complemento |
| RF07 | O motorista deve consultar apenas a rota a ele atribuída e registrar status de recolhimento. | F04, F19, F20 | Expansão |
| RF08 | O sistema deve permitir cadastrar e manter agências (código único, cidade, UF, responsável, telefone). | F05 | Núcleo |
| RF09 | O sistema deve permitir cadastrar e manter lotes ligados a uma agência, com data de coleta, técnico, status e observações. | F06 | Núcleo |
| RF10 | O status do lote deve ser pendente, em_triagem ou concluido. | F07 | Núcleo |
| RF11 | O sistema deve permitir cadastrar equipamento em um lote (tipo, marca, modelo, número de série, estado). | F08 | Núcleo |
| RF12 | O estado do equipamento deve ser bom, danificado ou inutilizavel. | F08 | Núcleo |
| RF13 | O sistema deve listar os equipamentos de um lote. | F09 | Núcleo |
| RF14 | O sistema deve permitir editar um equipamento já cadastrado. | F10 | Complemento |
| RF15 | O sistema deve registrar uma destinação por equipamento (reciclagem, reuso ou destruicao, empresa, data, certificado opcional). | F11 | Núcleo |
| RF16 | O sistema não deve aceitar status concluido no lote se algum equipamento estiver sem destinação. | F12 | Complemento |
| RF17 | O sistema deve exibir dashboard com totais de equipamentos, lotes, agências e destinações, e quebras por status, tipo, estado e tipo de destino. | F13 | Núcleo |
| RF18 | O sistema deve gerar relatório de conformidade do lote em PDF. | F14 | Núcleo |
| RF19 | O sistema deve listar os relatórios gerados e permitir download do PDF. | F15 | Núcleo |
| RF20 | Quando a rota e o motorista existirem, o PDF deve incluí-los. | F16 | Expansão |
| RF21 | O gestor deve montar rota de coleta com data, paradas (agências/lotes) e ordem. | F17 | Expansão |
| RF22 | O gestor deve atribuir manualmente um motorista à rota. | F18 | Expansão |
| RF23 | O motorista deve consultar, em tela web na base, a rota do dia a ele atribuída. | F19 | Expansão |
| RF24 | O sistema deve registrar status de recolhimento por parada ou lote: recolhido, nao_recolhido ou parcial. | F20 | Expansão |
| RF25 | O gestor deve visualizar no sistema se as coletas da rota foram feitas. | F21 | Expansão |

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
| RNF11 | O sistema deve registrar data de criação/atualização nas entidades principais (já no esquema). | Auditoria |
| RNF12 | Comunicação frontend–API em ambiente local via URL configurável (variável de ambiente). | Configuração |

---

## Rastreio rápido

| Entrega da disciplina | Onde está |
|---|---|
| RF | tabela acima (RF01–RF25) |
| RNF | tabela acima (RNF01–RNF12) |
| Histórias | [backlog.md](backlog.md) |
| Sprints | [cronograma-sprints.md](cronograma-sprints.md) |
