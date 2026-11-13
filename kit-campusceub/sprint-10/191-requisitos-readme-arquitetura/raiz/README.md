# EcoTrack Wert

Repositório institucional do Projeto Integrador II do CEUB. Sistema web para gestão de descarte eletrônico, com rastreabilidade, conformidade ambiental e apoio à operação da Wert.

> **Estudante:** leia o [guia dos alunos](docs/guia-alunos.md) e o [CONTRIBUTING.md](CONTRIBUTING.md) antes de abrir `issue` ou `pull request`.

## Identificação do repositório

| Campo | Informação |
| --- | --- |
| Instituição | CEUB |
| Organização no GitHub | CAMPUSCEUB |
| Professor(a) responsável | Adriana Falcomer Pontes |
| Equipe | Lucas Gonçalves Balduino ([Lucas-Balduino](https://github.com/Lucas-Balduino)), Artur Feitoza ([arturflr5](https://github.com/arturflr5)), Davi Oliveira Maia ([davi417](https://github.com/davi417)), Eduardo Martins ([eduardoMartinsCunha](https://github.com/eduardoMartinsCunha)) |
| Disciplina | Projeto Integrador II — Ciência da Computação |
| IDProjeto | 262-CC-PI-II-EcoTrack |
| Cliente | Wert (Brasília/DF) |

## Problema

O controle do descarte de equipamentos eletroeletrônicos ainda depende de planilhas isoladas e processos manuais. Isso gera falhas de rota, ausência de rastreabilidade centralizada, lentidão na emissão de relatórios, risco de inconsistência ou perda de dados e baixa visibilidade para gestão e auditoria.

## Solução proposta

O EcoTrack Wert é uma plataforma web que centraliza coletas, lotes, equipamentos, destinação e relatórios de conformidade. O público interno da Wert opera o sistema por perfil (administrador, gestor operacional, técnico de triagem, motorista e auditor). Agências do Banco do Brasil entram como pontos de coleta, não como cliente do produto.

A rota de coleta usa a localização das agências e dos pontos de entrega e pode ser aberta no Google Maps, no Waze ou em arquivo GPX.

Fora do escopo deste semestre: rastreamento do veículo em tempo real, atribuição automática de motorista, aplicativo nativo e integração com sistemas do Banco do Brasil.

## Estrutura deste repositório

| Item | Link |
| --- | --- |
| Backlog | [Project 262-CC-PI-II-EcoTrack](https://github.com/orgs/CAMPUSCEUB/projects/46) (Epic → Feature → PBI → Task) |
| Milestones | [Sprints 00 a 10](https://github.com/CAMPUSCEUB/EcoTrack/milestones) |
| Sprints | [sprints/README.md](sprints/README.md) |
| Entregas | [entregas/README.md](entregas/README.md) |
| Requisitos | [docs/requisitos.md](docs/requisitos.md) |
| Arquitetura | [docs/arquitetura.md](docs/arquitetura.md) |
| Decisões | [docs/decisoes/README.md](docs/decisoes/README.md) |

O código da aplicação vive em `src/` (`src/backend` e `src/frontend`), e entra no repositório por `task` → branch → `pull request`.
