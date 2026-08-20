# Semáforo — o quê × como

| Campo | Valor |
|---|---|
| Etapa | 7 — Revisão técnica e de negócio |
| Data desta versão | 20/08/2026 |
| Status | Validado na sessão (19/08/2026) |
| Depende de | [Funcionalidades](../06-brainstorm-funcionalidades/funcionalidades.md) |

UX **não** entra nesta matriz (vai para a etapa 8).

---

## Como as cores foram atribuídas

Notas de **1 a 3**:

| Eixo | 1 | 2 | 3 |
|---|---|---|---|
| **O quê** (negócio) | Ainda não está claro o comportamento | Comportamento conhecido, falta um detalhe de regra | Comportamento fechado na visão e no escopo |
| **Como** (técnica) | Não sabemos como construir | Caminho conhecido, modelo ou tela ainda a detalhar | Stack e abordagem conhecidas (React, Express, SQL Server) |

Cor:

- **Verde** — o quê = 3 **e** como = 3  
- **Amarelo** — nenhum eixo vale 1, mas não é 3×3  
- **Vermelho** — o quê = 1 **ou** como = 1  

Nenhum item ficou vermelho: o que estava incerto demais (GPS, atribuição automática) saiu na etapa 2.

---

## Matriz

| ID | Funcionalidade | O quê | Como | Cor | Por quê |
|---|---|---|---|---|---|
| F01 | Autenticar com e-mail e senha | 3 | 3 | Verde | Fluxo clássico de login; JWT e hash de senha previstos no Artefato 1 |
| F02 | Cadastrar, editar e desativar usuários | 3 | 3 | Verde | CRUD de contas com perfil; regra de negócio fechada |
| F03 | Incluir perfil motorista | 3 | 3 | Verde | Incluir um valor no conjunto de perfis e no cadastro |
| F04 | Restringir telas e APIs por perfil | 2 | 2 | Amarelo | Helena consulta e Renata governa acessos; a **matriz exata** ainda será detalhada na sprint. Middleware + rotas é padrão conhecido |
| F05 | Cadastrar e manter agências | 3 | 3 | Verde | Cadastro de ponto de coleta, campos do Artefato 1 |
| F06 | Cadastrar e manter lotes | 3 | 3 | Verde | Lote ligado à agência, data, técnico e status |
| F07 | Atualizar status do lote | 3 | 3 | Verde | Três estados: pendente, em triagem, concluído |
| F08 | Cadastrar equipamento no lote | 3 | 3 | Verde | Tipo, marca, modelo, série, estado |
| F09 | Listar equipamentos do lote | 3 | 3 | Verde | Conferência com o físico; mesma entidade de F08 |
| F10 | Editar equipamento já lançado | 3 | 3 | Verde | Mesmo cadastro de F08, operação de atualização |
| F11 | Registrar destinação | 3 | 3 | Verde | Reciclagem, reúso ou destruição; uma por equipamento |
| F12 | Não concluir lote sem destinação | 3 | 3 | Verde | Regra clara da jornada; validação ao mudar status |
| F13 | Dashboard de indicadores | 3 | 3 | Verde | Totais e quebras definidos na jornada do Marcos |
| F14 | Gerar PDF de conformidade do lote | 3 | 3 | Verde | Evidência da Helena; geração de PDF na stack prevista |
| F15 | Listar e baixar PDFs gerados | 3 | 3 | Verde | Arquivo do ciclo; depende de F14 |
| F16 | Incluir rota e motorista no PDF | 3 | 2 | Amarelo | O que entra no laudo está claro; o layout depende de F17/F18 |
| F17 | Montar rota com paradas e ordem | 3 | 2 | Amarelo | Escopo fechado (planejamento, sem GPS). Tabelas e telas novas, modelo a desenhar na sprint |
| F18 | Atribuir motorista à rota (manual) | 3 | 2 | Amarelo | Depende de F17 e do perfil motorista (F03); escolha manual, sem algoritmo |
| F19 | Motorista consultar a rota do dia na base | 3 | 2 | Amarelo | Tela de leitura filtrada pelo usuário logado |
| F20 | Status de recolhimento (recolhido / não / parcial) | 2 | 2 | Amarelo | Falta cravar se o status é da **parada** ou do **lote** |
| F21 | Gestor ver se as coletas foram feitas | 3 | 2 | Amarelo | Indicador alimentado por F20 |

**Divergência modelo × grupo:** nenhuma registrada nesta sessão. Se o grupo fechar a matriz de permissões (F04) ou o status de recolhimento (F20) antes da sprint, esses dois podem subir para verde.

---

## Síntese

| Cor | Quantidade | IDs |
|---|---|---|
| Verde | 14 | F01–F03, F05–F15 |
| Amarelo | 7 | F04, F16–F21 |
| Vermelho | 0 | — |

Leitura: rastreabilidade e cadastros estão verdes (negócio e stack claros). Amarelo concentra-se nas **rotas** e na **autorização por perfil**. O sequenciador espalha os amarelos entre ondas, sem juntar três na mesma.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Matriz preenchida a partir da visão, do escopo e da stack do Artefato 1. |
| 20/08/2026 | Justificativas sem status de implementação. |
