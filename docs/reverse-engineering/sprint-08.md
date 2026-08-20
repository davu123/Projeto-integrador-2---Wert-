# Sprint 8 — F19, F20 (US19, US20)

**Sem fonte na referência.** Motorista na **base** (web desktop). Status simples de recolhimento.

## Implementar

- `GET` da rota do dia filtrada por `req.usuario.id` (motorista logado).
- Tela do Paulo: ver paradas e ordem; **sem** mapa ao vivo.
- Status por parada ou lote: `recolhido`, `nao_recolhido`, `parcial` + `PATCH` com poucos campos.
- Menu do perfil motorista aponta para essa tela.

## Não fazer

GPS, editar rota (isso é do gestor), PDF com rota (sprint 9), indicador gerencial completo (sprint 9).

## Aceite da sprint

Login como motorista mostra só a rota atribuída a ele; marcar uma parada como recolhida persiste e reaparece no GET.
