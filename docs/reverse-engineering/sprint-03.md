# Sprint 3 — F07, F08, F09 (US07–US09)

Status do lote + cadastrar e listar equipamentos (sem PUT).

## Copiar / adaptar

**Schema:** tabela `dbo.equipamento` (estado `bom` / `danificado` / `inutilizavel`).

**API**

- Acrescentar `atualizarStatusLote` e `PATCH /lotes/:id/status` (trecho da referência).
- `equipmentController.js`, `equipmentRoutes.js` — só GET `/` e POST `/`.

**Front**

- Ligar `alterarStatus` em `LotsPage.jsx` / `lotService.js`.
- `EquipmentFormPage.jsx`, `EquipmentListPage.jsx`, `equipmentApi.js`.
- Sidebar: Equipamentos (novo) e Listagem.
- Não copiar `newequipment.jsx`.

## Não copiar

Destinação, PDF, dashboard, `PUT /equipamentos/:id`.

## Aceite da sprint

Mudar status do lote nos três valores; cadastrar equipamento num lote; listar equipamentos. Sem tela de editar equipamento.
