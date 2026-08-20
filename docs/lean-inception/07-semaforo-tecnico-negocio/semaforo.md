# Semáforo — o quê × como

| Campo | Valor |
|---|---|
| Etapa | 7 — Revisão técnica e de negócio |
| Data desta versão | 19/08/2026 |
| Status | Validado na sessão (19/08/2026) — cores propostas a partir do código e do escopo |
| Depende de | [Funcionalidades](../06-brainstorm-funcionalidades/funcionalidades.md) |

UX **não** entra nesta matriz (vai para a etapa 8).

---

## Como as cores foram atribuídas

Notas de **1 a 3**:

| Eixo | 1 | 2 | 3 |
|---|---|---|---|
| **O quê** (negócio) | Ainda não está claro o comportamento | Comportamento conhecido, falta um detalhe de regra | Comportamento fechado na visão, no escopo ou no código |
| **Como** (técnica) | Não sabemos como construir | Caminho conhecido, módulo ou regra ainda não desenhados | Já existe no código, ou é extensão óbvia dele |

Cor:

- **Verde** — o quê = 3 **e** como = 3  
- **Amarelo** — nenhum eixo vale 1, mas não é 3×3  
- **Vermelho** — o quê = 1 **ou** como = 1  

Nenhum item ficou vermelho: o que estava incerto demais (GPS, atribuição automática) já saiu na etapa 2.

---

## Matriz

| ID | Funcionalidade | O quê | Como | Cor | Por quê |
|---|---|---|---|---|---|
| F01 | Autenticar com e-mail e senha | 3 | 3 | Verde | Já no código (JWT, bcrypt, `/auth/login`) |
| F02 | Cadastrar, editar e desativar usuários | 3 | 3 | Verde | CRUD completo em `/usuarios` |
| F03 | Incluir perfil motorista | 3 | 3 | Verde | Estender o CHECK de perfil e o select da tela; regra de negócio já fechada |
| F04 | Restringir telas e APIs por perfil | 2 | 2 | Amarelo | Sabemos que Helena consulta e Renata governa acessos; a **matriz exata** (quem cria lote, quem só lê PDF) ainda não está escrita. Tecnicamente é middleware + rotas, padrão conhecido |
| F05 | Cadastrar e manter agências | 3 | 3 | Verde | CRUD em `/agencias` |
| F06 | Cadastrar e manter lotes | 3 | 3 | Verde | CRUD em `/lotes` |
| F07 | Atualizar status do lote | 3 | 3 | Verde | `PATCH /lotes/:id/status` com pendente / em_triagem / concluído |
| F08 | Cadastrar equipamento no lote | 3 | 3 | Verde | `POST /equipamentos` |
| F09 | Listar equipamentos do lote | 3 | 3 | Verde | `GET /equipamentos` |
| F10 | Editar equipamento já lançado | 3 | 3 | Verde | Comportamento óbvio; no código só existem GET e POST — falta PUT, mas o caminho é o mesmo dos outros CRUDs |
| F11 | Registrar destinação | 3 | 3 | Verde | CRUD em `/destinacoes` |
| F12 | Não concluir lote sem destinação | 3 | 3 | Verde | Regra clara da jornada; validação no `PATCH` de status |
| F13 | Dashboard de indicadores | 3 | 3 | Verde | `GET /dashboard` já devolve totais e quebras |
| F14 | Gerar PDF de conformidade do lote | 3 | 3 | Verde | `POST /relatorios/gerar` (PDFKit) |
| F15 | Listar e baixar PDFs gerados | 3 | 3 | Verde | `GET /relatorios` + arquivos em `/uploads` |
| F16 | Incluir rota e motorista no PDF | 3 | 2 | Amarelo | O que entra no laudo está claro; o layout só existe depois de F17/F18 |
| F17 | Montar rota com paradas e ordem | 3 | 2 | Amarelo | Escopo fechado (planejamento, sem GPS). Como: tabelas e telas novas, modelo ainda não desenhado |
| F18 | Atribuir motorista à rota (manual) | 3 | 2 | Amarelo | Depende de F17 + perfil motorista (F03); FK para `usuario`, sem algoritmo |
| F19 | Motorista consultar a rota do dia na base | 3 | 2 | Amarelo | Tela simples de leitura; depende da rota existir e filtrar pelo usuário logado |
| F20 | Status de recolhimento (recolhido / não / parcial) | 2 | 2 | Amarelo | Falta cravar se o status é da **parada** ou do **lote**. Implementação é campo + `PATCH`, sem GPS |
| F21 | Gestor ver se as coletas foram feitas | 3 | 2 | Amarelo | É o dashboard/rota da expansão; depende de F20 alimentar o indicador |

**Divergência modelo × grupo:** nenhuma registrada nesta sessão. Se o grupo já tiver a matriz de permissões (F04) ou o status de recolhimento (F20) óbvios, esses dois podem subir para verde.

---

## Síntese

| Cor | Quantidade | IDs |
|---|---|---|
| Verde | 14 | F01–F03, F05–F15 |
| Amarelo | 7 | F04, F16–F21 |
| Vermelho | 0 | — |

Leitura: o núcleo está verde (já construído ou é extensão direta). Amarelo concentra-se na **expansão de rotas** e na **autorização por perfil**. Isso é o que o sequenciador (etapa 9) deve espalhar entre ondas, sem juntar três amarelos na mesma onda.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Matriz preenchida com notas e cores a partir do repositório e do escopo das etapas 2 e 6. |
