# Esforço, valor de negócio e UX

| Campo | Valor |
|---|---|
| Etapa | 8 — Tabela de pesos |
| Data desta versão | 19/08/2026 |
| Status | Validado na sessão (19/08/2026) |
| Depende de | [Semáforo](../07-semaforo-tecnico-negocio/semaforo.md) |

Esforço = custo de **construir** a funcionalidade (na simulação do PI2 o núcleo também tem peso: já foi pago nas sprints passadas).

- **Esforço (E):** E (baixo) = 1 · EE (médio) = 2 · EEE (alto) = 3  
- **Negócio ($):** $ = 1 · $$ = 2 · $$$ = 3  
- **UX (♥):** ♥ = 1 · ♥♥ = 2 · ♥♥♥ = 3  

---

## Tabela

| ID | Funcionalidade | E | $ | ♥ | Cor | Leitura curta |
|---|---|---|---|---|---|---|
| F01 | Autenticar com e-mail e senha | EE | $$$ | ♥♥ | Verde | Sem login não há produto; sessão é esperado, não “delícia” |
| F02 | Cadastrar, editar e desativar usuários | EE | $$$ | ♥♥ | Verde | Renata e O1; tela administrativa |
| F03 | Incluir perfil motorista | E | $$ | ♥ | Verde | Pouca tela; destrava F18/F19 |
| F04 | Restringir telas e APIs por perfil | EE | $$$ | ♥♥♥ | Amarelo | Helena consulta sem estragar operação; Renata dorme tranquila |
| F05 | Cadastrar e manter agências | EE | $$$ | ♥♥ | Verde | Ponto de coleta; base do lote e da rota |
| F06 | Cadastrar e manter lotes | EE | $$$ | ♥♥♥ | Verde | Espinha da jornada |
| F07 | Atualizar status do lote | E | $$ | ♥♥ | Verde | Pendente → triagem → concluído |
| F08 | Cadastrar equipamento no lote | EE | $$$ | ♥♥♥ | Verde | Trabalho diário da Camila; rastreio |
| F09 | Listar equipamentos do lote | E | $$ | ♥♥ | Verde | Conferência com o físico |
| F10 | Editar equipamento já lançado | E | $ | ♥ | Verde | Correção pontual, pouco valor novo |
| F11 | Registrar destinação | EE | $$$ | ♥♥♥ | Verde | Fecha o ciclo ambiental |
| F12 | Não concluir lote sem destinação | E | $$ | ♥♥ | Verde | Evita PDF oco |
| F13 | Dashboard de indicadores | EE | $$$ | ♥♥♥ | Verde | Marcos pela manhã; O1 e O2 |
| F14 | Gerar PDF de conformidade | EE | $$$ | ♥♥♥ | Verde | Helena e auditoria |
| F15 | Listar e baixar PDFs | E | $$ | ♥♥ | Verde | Arquivo do ciclo |
| F16 | Incluir rota e motorista no PDF | E | $$ | ♥♥ | Amarelo | Laudo completo depois da expansão |
| F17 | Montar rota com paradas e ordem | EEE | $$$ | ♥♥♥ | Amarelo | Maior peça nova; O3 |
| F18 | Atribuir motorista à rota | EE | $$$ | ♥♥♥ | Amarelo | Substitui o zap de “quem vai” |
| F19 | Motorista consultar a rota do dia | EE | $$ | ♥♥♥ | Amarelo | Tela do Paulo na base; evita papel |
| F20 | Status de recolhimento | EE | $$$ | ♥♥♥ | Amarelo | Fecha a dor do atraso invisível |
| F21 | Gestor ver se as coletas foram feitas | E | $$$ | ♥♥♥ | Amarelo | Pouca tela se F20 existir; muito valor para o Marcos |

---

## Totais (para conferir o sequenciador)

Soma convertendo E/EE/EEE e equivalentes em 1/2/3:

| Origem | IDs | Soma E | Soma $ | Soma ♥ |
|---|---|---|---|---|
| Núcleo (11) | F01, F02, F05–F09, F11, F13–F15 | 19 | 31 | 27 |
| Complemento (4) | F03, F04, F10, F12 | 5 | 8 | 7 |
| Expansão (6) | F16–F21 | 11 | 16 | 16 |
| **Total** | 21 | **35** | **55** | **50** |

Lembrete das Regras de Ouro (etapa 9): no máximo 3 cartões por onda; soma de E ≤ 5; soma de $ ≥ 4 e de ♥ ≥ 4; no máximo 1 vermelho (aqui zero); uma onda não pode ter três cartões só amarelos/vermelhos.

---

## Histórico

| Data | O quê |
|---|---|
| 19/08/2026 | Pesos estimados na sessão a partir da jornada, dos objetivos e do tamanho real de cada peça no repositório. |
