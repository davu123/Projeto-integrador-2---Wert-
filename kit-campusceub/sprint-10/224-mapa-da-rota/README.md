# Task — Mapa da rota na tela de Rotas e na Rota do dia

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/224 |
| Quem | Eduardo |
| PBI | US28 [#185](https://github.com/CAMPUSCEUB/EcoTrack/issues/185) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/224-mapa-da-rota` |
| Commit | `feat: mostra a rota no mapa` |
| Destino | só `src/frontend` |
| Depende de | kits 2 e 3 da Sprint 10 na `main` (já estão) |

A issue #224 já existe. Não crie outra.

É a Task mais importante do kit: o mapa não sai do corte.

Não divide arquivo com a Task de localização das agências nem com a de pontos de entrega. As Tasks de Google Maps e Waze, de origem e destino e de sugerir ordem partem dos arquivos desta.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/package.json` não tem `leaflet`;
- `src/frontend/src/pages/RoutesPage.jsx` tem a coluna **Recolhimento** e o `window.confirm` do **Excluir**;
- `src/frontend/src/pages/DriverRoutePage.jsx` tem `const cardStyle = { background: 'var(--panel)', ...`;
- `src/frontend/src/components/` não tem `RouteMap.jsx`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar

Criar:

- `src/frontend/src/components/RouteMap.jsx`
- `src/frontend/src/components/RouteMap.css`
- `src/frontend/src/components/RouteDetails.jsx`

Sobrescrever:

- `src/frontend/package.json`
- `src/frontend/package-lock.json`
- `src/frontend/src/pages/RoutesPage.jsx`
- `src/frontend/src/pages/DriverRoutePage.jsx`

Os sobrescritos são os da `main` mais o bloco novo.

- **`package.json` e `package-lock.json`**: `leaflet@1.9.4` e `react-leaflet@4.2.1` (a versão 4 é a que funciona com React 18). Os dois arquivos entram no commit. Depois de copiar, rode `npm ci` em `src/frontend`. No Docker de desenvolvimento, suba com `docker compose up --build -V`: o `-V` recria o volume do `node_modules`, senão o container não acha o `react-leaflet`.
- **`RouteMap.jsx`**: mapa do OpenStreetMap, sem chave de API.
  - Mostra a origem (**O**), as paradas numeradas na ordem e o destino (**D**), ligados por linha reta tracejada. O caminho pelas ruas fica com o Google Maps e o Waze, na Task seguinte.
  - Marcadores em `divIcon`, sem imagem: o ícone padrão do Leaflet quebra no build do Vite.
  - Parada já marcada no recolhimento fica cinza.
  - Parada sem coordenadas fica fora do mapa, com o aviso “Fora do mapa, sem coordenadas: …”.
  - Sem nenhum ponto com coordenadas, mostra só o aviso, sem mapa.
  - A atribuição do OpenStreetMap fica visível no canto do mapa (exigência da licença).
  - Zoom pela roda do mouse desligado, para a página continuar rolando.
- **`RouteMap.css`**: altura do mapa (360 px, 280 px no celular), cores dos marcadores e da legenda. Arquivo próprio: o `global.css` não muda.
- **`RouteDetails.jsx`**: painel aberto em **Ver no mapa**, com origem, destino, motorista, mapa e a lista das paradas com endereço e recolhimento.
- **`RoutesPage.jsx`**: botão **Ver no mapa** na lista. O painel abre embaixo e fecha em **Fechar mapa** ou ao excluir a rota aberta.
- **`DriverRoutePage.jsx`**: cada rota mostra a **Saída**, a **Entrega**, o mapa e a coluna **Endereço**.

A API não muda: o `GET /rotas` e o `GET /rotas/minha` já devolvem `origem`, `destino`, e o endereço e as coordenadas de cada parada. A parada só com lote vem com a agência do lote.

Fora desta Task: links do Google Maps e do Waze, GPX, origem e destino no formulário, sugerir ordem.

## PR

Título: `feat: mostra a rota no mapa`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #224` e `Refs #185`.
- **Resumo**: mapa do OpenStreetMap com origem, paradas numeradas e destino em Rotas (Ver no mapa) e na Rota do dia.
- **Tipo de mudança**: Requisito.
- **Evidências**: print do mapa em Rotas e na Rota do dia, com o aviso de parada sem coordenadas.

## Como validar

- `npm ci` e `npm run build` terminam sem erro.
- O `git diff --stat` mostra `package.json` e `package-lock.json` só com o `leaflet`, o `react-leaflet` e o `@react-leaflet/core`.
- Administrador ou gestor, **Rotas**, **Ver no mapa** numa rota com origem, destino e paradas com coordenadas: o mapa carrega, com **O**, **1**, **2**… e **D** ligados em linha reta, e a atribuição do OpenStreetMap aparece.
- Rota com uma parada sem coordenadas: ela fica fora do mapa e aparece no aviso.
- Rota sem nenhum ponto com coordenadas: só o aviso, sem erro.
- Motorista, **Rota do dia**: Saída, Entrega, mapa e endereço. Marcar uma parada como **Recolhido** deixa o número dela cinza.
- **Modo escuro**: o painel e a tabela continuam legíveis.
- Sem coordenadas cadastradas ainda, use a API (`PUT /agencias/:id` com `latitude` e `longitude`) ou espere a Task de localização das agências.
