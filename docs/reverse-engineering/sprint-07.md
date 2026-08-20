# Sprint 7 — F17, F18 (US17, US18)

**Sem fonte na referência.** Planejamento de rota e atribuição **manual** de motorista. Sem GPS e sem algoritmo.

## Implementar

- Tabelas `rota` (data, motorista_id nullable até F18) e `parada` (rota_id, agencia_id e/ou lote_id, ordem).
- CRUD de rota com paradas ordenadas.
- Atribuir usuário com perfil `motorista` à rota.
- Telas web para o Marcos (gestor): montar rota, escolher motorista na mão.
- Sidebar: item de rotas para gestor/admin.

## Não fazer

Mapa, otimização, app nativo, tela do Paulo (sprint 8).

## Aceite da sprint

Criar rota com duas paradas em ordem; atribuir um motorista cadastrado na sprint 6. Nada de coordenadas.
