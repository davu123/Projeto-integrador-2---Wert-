# Task — Sugerir a ordem das paradas na API

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/210 |
| Quem | Davi |
| PBI | US28 [#185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/210-sugerir-ordem-api` |
| Commit | `feat: sugere a ordem das paradas pelo vizinho mais proximo` |
| Destino | só `src/backend` |
| Depende de | merge da #209 (origem, destino e coordenadas na rota) |

A issue #210 já existe. Não crie outra.

Começar **depois** do merge da #209, numa branch nova saindo da `main`. O `rotaController.js` desta pasta repete o bloco da #209.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/backend/src/controllers/rotaController.js` tem `lerPontoEntrega` e `COALESCE(p.agencia_id, l.agencia_id)` (a #209 está na `main`);
- `src/backend/src/routes/rotaRoutes.js` tem as rotas do motorista antes do `router.use(authMiddleware, requirePerfil('administrador', 'gestor'))`.

Se faltar, pare e espere o merge da #209.

## O que copiar (sobrescrever)

- `src/backend/src/controllers/rotaController.js`
- `src/backend/src/routes/rotaRoutes.js`

Os dois são os da `main` (com a #209) mais o bloco novo:

- **`rotaRoutes.js`**: `router.post('/sugerir-ordem', sugerirOrdem)`, depois do `router.use` de administrador e gestor. O motorista recebe 403.
- **`rotaController.js`**: `distanciaKm` (distância em linha reta pela fórmula de haversine) e `sugerirOrdem`.

## Como a sugestão funciona

`POST /rotas/sugerir-ordem` com o mesmo formato de paradas do `POST /rotas` e a origem opcional:

```json
{ "origem_id": 1, "paradas": [{ "agencia_id": 2 }, { "lote_id": 8 }, { "agencia_id": 1 }] }
```

1. Lê as coordenadas de cada parada: da agência, ou da agência do lote quando a parada é só de lote.
2. Começa na origem. Sem origem, a primeira parada com coordenadas, na ordem enviada, abre a rota.
3. Vai sempre para a parada mais perto que ainda falta (vizinho mais próximo).
4. Paradas sem coordenadas vão para o fim, na ordem enviada, com `sem_coordenada: true` e um aviso.

**Não grava nada.** A tela mostra a sugestão; quem decide salva a rota pelo `POST` ou `PUT /rotas`. A distância é em linha reta, não pelas ruas: serve para ordenar, não para estimar o tempo. O destino não muda a ordem.

Resposta 200:

```json
{
  "origem": { "id": 1, "nome": "Depósito Wert" },
  "paradas": [
    { "ordem": 1, "agencia_id": 1, "lote_id": null, "agencia_nome": "Agência Centro", "latitude": -15.8, "longitude": -47.89, "distancia_km": 1.5, "sem_coordenada": false },
    { "ordem": 2, "agencia_id": null, "lote_id": 8, "agencia_nome": "Agência Oeste", "latitude": -15.78, "longitude": -47.95, "distancia_km": 6.8, "sem_coordenada": false },
    { "ordem": 3, "agencia_id": 4, "lote_id": null, "agencia_nome": "Agência Sem GPS", "latitude": null, "longitude": null, "distancia_km": null, "sem_coordenada": true }
  ],
  "distancia_total_km": 8.3,
  "avisos": ["1 parada(s) sem coordenadas ficaram no fim, na ordem enviada. Cadastre a latitude e a longitude da agência."]
}
```

`distancia_km` é a distância desde o ponto anterior. Erros: 400 sem paradas, com origem inativa ou inexistente, ou com agência ou lote que não existe.

Fora desta Task: botão na tela (kit 4), rota pelas ruas, tempo de viagem e qualquer serviço externo de mapas.

## PR

Título: `feat: sugere a ordem das paradas pelo vizinho mais proximo`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #210` e `Refs #185`.
- **Resumo**: `POST /rotas/sugerir-ordem` devolve as paradas na ordem do vizinho mais próximo a partir da origem, sem gravar; paradas sem coordenadas vão para o fim com aviso.
- **Tipo de mudança**: Requisito.
- **Como validar** e **Evidências**: os casos abaixo, com as respostas.

## Como validar

Com três agências com coordenadas, uma sem, e um ponto de entrega ativo:

- Motorista → 403. Sem paradas → 400. `origem_id` de ponto inativo → 400. `lote_id` que não existe → 400.
- Com origem: a primeira parada é a mais perto da origem, e cada seguinte é a mais perto da anterior; a agência sem coordenadas vem por último com `sem_coordenada: true` e um aviso.
- Sem origem: a primeira parada enviada com coordenadas continua em primeiro, e há o aviso “Sem origem, …”.
- Parada só com lote: usa as coordenadas da agência do lote.
- Depois da chamada, `GET /rotas` não mudou.
