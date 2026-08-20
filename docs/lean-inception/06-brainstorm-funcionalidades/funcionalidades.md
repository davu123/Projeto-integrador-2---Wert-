# Brainstorm de funcionalidades

| Campo | Valor |
|---|---|
| Etapa | 6 — Funcionalidades candidatas |
| Data desta versão | 19/08/2026 |
| Status | Validado na sessão (19/08/2026) |
| Depende de | [Jornada](../05-jornada-do-usuario/jornada.md) e [Objetivos](../03-objetivos-do-produto/objetivos.md) |

Cada item: **uma frase objetiva**. Origem: **núcleo** (já no código), **expansão** (rotas e motoristas) ou **complemento** (qualidade do núcleo).

Objetivos: **O1** centralizar a operação · **O2** rastreabilidade e conformidade · **O3** planejamento das coletas.

---

## Lista candidata

### Acesso e governança (Renata · O1)

| ID | Funcionalidade | Origem | Objetivo | Passo | Mantém |
|---|---|---|---|---|---|
| F01 | Autenticar o usuário com e-mail e senha e manter a sessão. | Núcleo | O1 | 0.1, 4.1 | sim |
| F02 | Cadastrar, editar e desativar usuários, com nome, e-mail e perfil. | Núcleo | O1 | 0.1 | sim |
| F03 | Incluir o perfil **motorista** entre os perfis válidos. | Complemento | O1, O3 | 0.1, 1.4 | sim |
| F04 | Restringir telas e APIs conforme o perfil (admin, gestor, técnico, motorista, auditor). | Complemento | O1 | 0.1, 4.1 | sim |

### Cadastros da operação (Marcos / Camila · O1, O2)

| ID | Funcionalidade | Origem | Objetivo | Passo | Mantém |
|---|---|---|---|---|---|
| F05 | Cadastrar e manter agências (código, cidade, UF, responsável). | Núcleo | O1 | 1.2 | sim |
| F06 | Cadastrar e manter lotes ligados a uma agência, com data, técnico e observações. | Núcleo | O1, O2 | 1.2 | sim |
| F07 | Atualizar o status do lote entre pendente, em triagem e concluído. | Núcleo | O1, O2 | 3.1, 3.5 | sim |
| F08 | Cadastrar equipamento no lote (tipo, marca, modelo, número de série, estado). | Núcleo | O1, O2 | 3.2 | sim |
| F09 | Listar os equipamentos de um lote para conferir com o físico. | Núcleo | O2 | 3.3 | sim |
| F10 | Editar dados de um equipamento já lançado. | Complemento | O2 | 3.2 | sim |
| F11 | Registrar a destinação de cada equipamento (reciclagem, reúso ou destruição, empresa e data). | Núcleo | O2 | 3.4 | sim |
| F12 | Impedir concluir o lote se algum equipamento estiver sem destinação. | Complemento | O2 | 3.5 | sim |

### Visibilidade e evidência (Marcos / Helena · O2)

| ID | Funcionalidade | Origem | Objetivo | Passo | Mantém |
|---|---|---|---|---|---|
| F13 | Exibir dashboard com totais e quebras (lotes por status, equipamentos, destinações). | Núcleo | O1, O2 | 1.1, 2.4 | sim |
| F14 | Gerar relatório de conformidade do lote em PDF. | Núcleo | O2 | 4.3 | sim |
| F15 | Listar e baixar os PDFs já gerados. | Núcleo | O2 | 4.3, 4.4 | sim |
| F16 | Incluir no PDF a rota e o motorista da coleta, quando existirem. | Expansão | O2, O3 | 4.3 | sim |

### Planejamento e recolhimento (Marcos / Paulo · O3)

| ID | Funcionalidade | Origem | Objetivo | Passo | Mantém |
|---|---|---|---|---|---|
| F17 | Montar uma rota de coleta com data, paradas (agências/lotes) e ordem. | Expansão | O3 | 1.3 | sim |
| F18 | Atribuir um motorista à rota (escolha manual). | Expansão | O3 | 1.4 | sim |
| F19 | Permitir que o motorista consulte, na base, a rota do dia já atribuída. | Expansão | O3 | 2.1 | sim |
| F20 | Registrar status simples de recolhimento por parada ou lote (recolhido, não recolhido, parcial). | Expansão | O3 | 2.3 | sim |
| F21 | Mostrar ao gestor se as coletas da rota foram feitas, no sistema (não no WhatsApp). | Expansão | O3 | 1.5, 2.4 | sim |

Todas as linhas acima **mantêm = sim**: são o produto definido na visão, no escopo e na jornada. Itens fora de escopo não entram nesta tabela.

---

## Fora desta lista

| Item | Motivo |
|---|---|
| GPS / mapa ao vivo no caminhão | Fora do produto (etapa 2) |
| Atribuição automática de motorista ou otimização de rota | Fora do produto (etapa 2) |
| Aplicativo nativo do motorista | Fora do produto (etapa 2) |
| Integração com sistemas do Banco do Brasil | Fora do produto (etapa 2) |
| Financeiro, NF, frota, CRM | Fora do produto (etapa 2) |

---

## Contagem para o sequenciador

| Origem | Quantidade | IDs |
|---|---|---|
| Núcleo | 11 | F01, F02, F05–F09, F11, F13–F15 |
| Complemento | 4 | F03, F04, F10, F12 |
| Expansão | 6 | F16–F21 |
| **Total** | **21** | |

Na simulação do PI2, o **núcleo** vira sprints já executadas; **complemento** e **expansão** viram sprints seguintes. A etapa 7 (semáforo) pontua cada ID.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Lista candidata extraída da jornada ponta a ponta e dos três objetivos, cruzada com as rotas do código. |
