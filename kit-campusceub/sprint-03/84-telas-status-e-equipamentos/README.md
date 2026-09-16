# Task #84 — Telas de status do lote e equipamentos

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/84 |
| Quem | Eduardo (catch-up Sprint 03) |
| PBI | [#33](https://github.com/CAMPUSCEUB/EcoTrack/issues/33) US07; também cobre [#34](https://github.com/CAMPUSCEUB/EcoTrack/issues/34) US08 e [#35](https://github.com/CAMPUSCEUB/EcoTrack/issues/35) US09 |
| Milestone | Sprint 03 - Equipamentos e status |
| Branch | `feature/84-telas-status-e-equipamentos` |
| Commit | `feat: adiciona telas de status do lote e equipamentos` |
| Destino | só `src/frontend` |
| Depende de | merge da #83 e da #82 |

## O que copiar (sobrescrever)

- `src/frontend/src/App.jsx`
- `src/frontend/src/components/Sidebar.jsx`
- `src/frontend/src/pages/LotsPage.jsx`
- `src/frontend/src/pages/EquipmentFormPage.jsx` (novo)
- `src/frontend/src/pages/EquipmentListPage.jsx` (novo)
- `src/frontend/src/services/lotService.js`
- `src/frontend/src/services/equipmentApi.js` (novo)
- `src/frontend/src/utils/formatters.js`

Rotas `/lotes` (ciclo de status), `/equipamentos/novo` e `/equipamentos`. Listagem **sem** botão editar. **Não** copiar `newequipment.jsx`.

## PR

Título: `feat: adiciona telas de status do lote e equipamentos`

Cole o bloco abaixo no PR (`gh pr create --body`). **Não crie issue nova.**

```text
Closes #84

Tela de lotes com ciclo pendente / em_triagem / concluido. Cadastro e listagem de equipamentos. Sem edição de equipamento e sem destinação.

Como validar: logar, mudar status de um lote, cadastrar equipamento em /equipamentos/novo e ver a lista em /equipamentos. Não há botão editar na listagem.
```

## Como validar

- Em Lotes: botões Pendente, Em triagem e Concluir chamam PATCH.
- Menu: Equipamentos e Listagem.
- Cadastro exige lote; listagem mostra tipo, marca, modelo, série e estado.
- Sem destinação. Sem `newequipment`.
