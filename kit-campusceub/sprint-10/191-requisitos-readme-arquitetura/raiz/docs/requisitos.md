# Requisitos

## Visão do produto

O EcoTrack Wert é um sistema web de gestão logística e rastreabilidade de descarte eletroeletrônico. A entrega deste repositório cobre autenticação, cadastros operacionais, destinação, relatórios em PDF, dashboard e planejamento de coletas com a localização dos pontos de coleta e de entrega, sem rastreamento do veículo em tempo real. A partir da Sprint 10 cobre também a proteção das credenciais e da API, a publicação com HTTPS, a identidade visual da Wert e a usabilidade avaliada pelas heurísticas de Nielsen.

## Público-alvo

- **Administrador:** gerencia usuários, perfis e supervisão geral.
- **Gestor operacional:** planeja demandas, acompanha lotes, monta rotas e lê indicadores.
- **Técnico de triagem:** cadastra equipamentos e registra destinação.
- **Motorista:** consulta a rota do dia na base e registra recolhimento.
- **Auditor / consultor:** consulta rastreabilidade e emite/baixa PDFs.
- **Professora e banca:** avaliam o histórico do repositório (issues, PRs, sprints e entregas).

Cliente do produto: **Wert**. Agências do Banco do Brasil são pontos de coleta.

## Problema

Planilhas e processos manuais fragmentam o ciclo de descarte: falhas de rota, rastreio incompleto, relatórios lentos e pouca evidência para auditoria.

## Objetivos

1. Centralizar a operação em uma plataforma web.
2. Garantir rastreabilidade até a destinação, com PDF e indicadores.
3. Organizar o planejamento das coletas (rota com pontos localizados, motorista, status de recolhimento e navegação até as paradas).

Metas por sprint: ver [sprints/README.md](../sprints/README.md) e as `milestones` do GitHub.

## Requisitos funcionais

| ID | Requisito | Feature | Issue |
| --- | --- | --- | --- |
| RF01 | Autenticar por e-mail e senha e manter sessão por token. | F01 | #6 / #27 |
| RF02 | Cadastrar, consultar, editar e desativar usuários (nome, e-mail, perfil). | F02 | #7 / #28 |
| RF03 | Perfis válidos: administrador, gestor, técnico, auditor e motorista. | F03 | #8 / #29 |
| RF04 | Restringir telas e operações da API conforme o perfil. | F04 | #9 / #30 |
| RF05 | O administrador cadastra, edita e desativa qualquer usuário. | F04 | #9 / #30 |
| RF06 | O auditor consulta lotes, equipamentos, destinações e relatórios, sem alterar operação. | F04 | #9 / #30 |
| RF07 | O motorista consulta apenas a rota atribuída e registra recolhimento. | F04, F19, F20 | #9 / #24 / #25 |
| RF08 | Cadastrar e manter agências (código único, cidade, UF, responsável, telefone). | F05 | #10 / #31 |
| RF09 | Cadastrar e manter lotes ligados a uma agência (data, técnico, status, observações). | F06 | #11 / #32 |
| RF10 | Status do lote: `pendente`, `em_triagem` ou `concluido`. | F07 | #12 / #33 |
| RF11 | Cadastrar equipamento em um lote (tipo, marca, modelo, série, estado). | F08 | #13 / #34 |
| RF12 | Estado do equipamento: `bom`, `danificado` ou `inutilizavel`. | F08 | #13 / #34 |
| RF13 | Listar os equipamentos de um lote. | F09 | #14 / #35 |
| RF14 | Editar um equipamento já cadastrado. | F10 | #15 / #36 |
| RF15 | Registrar destinação por equipamento (reciclagem, reuso ou destruicao, empresa, data, certificado opcional). | F11 | #16 / #37 |
| RF16 | Recusar `concluido` no lote se algum equipamento estiver sem destinação. | F12 | #17 / #38 |
| RF17 | Dashboard com totais e quebras por status, tipo, estado e destino. | F13 | #18 / #39 |
| RF18 | Gerar relatório de conformidade do lote em PDF. | F14 | #19 / #40 |
| RF19 | Listar relatórios gerados e permitir download. | F15 | #20 / #41 |
| RF20 | Incluir rota e motorista no PDF quando existirem. | F16 | #21 / #42 |
| RF21 | Gestor monta rota com data, paradas e ordem. | F17 | #22 / #43 |
| RF22 | Gestor atribui manualmente um motorista à rota. | F18 | #23 / #44 |
| RF23 | Motorista consulta, em tela web na base, a rota do dia. | F19 | #24 / #45 |
| RF24 | Status de recolhimento: `recolhido`, `nao_recolhido` ou `parcial`. | F20 | #25 / #46 |
| RF25 | Gestor visualiza se as coletas da rota foram feitas. | F21 | #26 / #47 |
| RF26 | Cada usuário troca a própria senha informando a senha atual; a senha nova tem no mínimo 8 caracteres. O administrador inicial é criado com a senha definida na instalação, sem senha padrão no código, e a tela de login abre vazia. | F22 | #171 / #179 |
| RF27 | Agência com CEP, endereço, latitude e longitude, além do telefone editável na tela. Coordenadas validadas por faixa. Só administrador e gestor alteram. | F27 | #176 / #184 |
| RF28 | Cadastrar pontos de entrega (depósito ou destinadora) com endereço e coordenadas. | F27 | #176 / #184 |
| RF29 | Rota com ponto de origem e de destino. O sistema sugere a ordem das paradas pela distância, e o gestor ajusta antes de salvar. Parada sem coordenada fica no fim, com aviso. A rota aparece num mapa (OpenStreetMap) com a origem, as paradas na ordem e o destino. Rota já começada continua travada. | F28 | #177 / #185 |
| RF30 | Exportar a rota para o Google Maps (dividida em trechos quando passar do limite de paradas), para o Waze (por parada) e em arquivo GPX. | F29 | #178 / #186 |
| RF31 | O motorista abre a navegação a partir da rota do dia, inclusive o Waze para a próxima parada pendente. O gestor tem a mesma exportação na tela de rotas. | F29 | #178 / #186 |

## Requisitos não funcionais

| ID | Requisito | Categoria |
| --- | --- | --- |
| RNF01 | Interface principal web, uso em desktop. | Usabilidade |
| RNF02 | Senhas com hash bcrypt; autenticação via JWT. | Segurança |
| RNF03 | Rotas da API, exceto login e health, exigem token Bearer. | Segurança |
| RNF04 | Após a sprint de permissões, a API recusa operação fora do perfil do token. | Segurança |
| RNF05 | Dados persistidos em SQL Server. | Persistência |
| RNF06 | Frontend consome API REST (JSON). | Arquitetura |
| RNF07 | Ambiente de desenvolvimento sobe com Docker Compose. | Implantação |
| RNF08 | Relatórios de conformidade em PDF armazenável e reutilizável. | Auditoria |
| RNF09 | O produto não faz rastreamento do veículo em tempo real nem exige aplicativo nativo. A rota usa a localização cadastrada dos pontos de coleta e de entrega, e a navegação abre no Google Maps, no Waze ou em arquivo GPX. | Escopo |
| RNF10 | Telas de cadastro da triagem com fluxo curto e poucos campos obrigatórios. | Usabilidade |
| RNF11 | Registrar data de criação/atualização nas entidades principais. | Auditoria |
| RNF12 | URL da API configurável por variável de ambiente. | Configuração |
| RNF13 | Segredos (chave do token, senha do banco e senha inicial do administrador) configurados por variável de ambiente, fora do repositório. A API não sobe sem a chave do token. | Segurança |
| RNF14 | PDFs baixados só com login e perfil permitido (administrador, gestor e auditor), sem pasta pública de arquivos. API com origem permitida restrita, limite de tentativas no login e erros sem detalhe interno. | Segurança |
| RNF15 | Sistema publicado com HTTPS, com banco e PDFs preservados entre reinícios e atualizações e guia de implantação, atualização e backup para o TI. | Implantação |
| RNF16 | Telas com a identidade visual da Wert (cores, tipografia e logo) definida em um único lugar, com modo escuro e alto contraste legíveis. | Usabilidade |
| RNF17 | Telas corrigidas pelas heurísticas de Nielsen: confirmação de ações destrutivas, retorno durante o envio, ações visíveis só para o perfil que pode executá-las, campos com rótulo e foco visível e layout sem quebra em desktop e tablet. | Usabilidade |

## Rastreabilidade da Sprint 10

| Feature | Requisito | Issue (Feature / PBI) |
| --- | --- | --- |
| F22 — Proteger credenciais e senhas | RF26 | #171 / #179 |
| F23 — Proteger a API e os relatórios | RNF13, RNF14 | #172 / #180 |
| F24 — Publicar o sistema | RNF15 | #173 / #181 |
| F25 — Aplicar a identidade visual da Wert | RNF16 | #174 / #182 |
| F26 — Corrigir a usabilidade pelas heurísticas de Nielsen | RNF17 | #175 / #183 |
| F27 — Localizar pontos de coleta e de entrega | RF27, RF28 | #176 / #184 |
| F28 — Montar rota com origem, destino e ordem sugerida | RF29 | #177 / #185 |
| F29 — Exportar a rota e navegar até as paradas | RF30, RF31 | #178 / #186 |

## Critérios de aceitação

Cada PBI nas issues #27 a #47 e #179 a #186 traz critérios observáveis. A Task filha só fecha quando o PR demonstra esses critérios e um colega revisa.

## Dependências

- Acesso dos quatro integrantes e da professora ao repositório CAMPUSCEUB/EcoTrack.
- Quadro [262-CC-PI-II-EcoTrack](https://github.com/orgs/CAMPUSCEUB/projects/46).
- Docker local para subir backend, frontend e SQL Server.
- Servidor com Docker e um endereço com HTTPS para o sistema publicado (Sprint 10).
- Papéis da equipe definidos (ver [CONTRIBUTING.md](../CONTRIBUTING.md)).

## Riscos e rastreabilidade para issues

| Risco | Impacto | Issues |
| --- | --- | --- |
| Calendário das sprints 1–9 já publicado, com desenvolvimento ainda na organização do repositório | Atraso nas features da Sprint 01 | #1, #6, #10, #27, #31 |
| Escopo de logística (rotas) mais complexo que cadastros | Pressão nas sprints 07–09 | #5, #22–#26 |
| Segurança, publicação, identidade visual e localização das rotas na mesma sprint | Pressão sobre a Sprint 10 e sobre as telas | #168–#170, #171–#178 |
