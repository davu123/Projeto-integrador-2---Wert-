# Task — Tela de pontos de entrega

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/226 |
| Quem | Eduardo |
| PBI | US27 [#184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/226-pontos-de-entrega` |
| Commit | `feat: cria a tela de pontos de entrega` |
| Destino | só `src/frontend` |
| Depende de | kits 2 e 3 da Sprint 10 na `main` (já estão) |

A issue #226 já existe. Não crie outra.

Não divide arquivo com o mapa nem com a localização das agências. A Task de origem e destino da rota usa o serviço criado aqui.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/src/auth/acesso.js` tem `paginaInicial`, `podeEscrever` e o item `/minha-conta` no `MENU`;
- `src/frontend/src/App.jsx` tem a rota `/rota-do-dia`;
- `src/frontend/src/services/api.js` tem `throw new Error(message);` no fim do tratamento de erro;
- não existe `src/frontend/src/pages/DeliveryPointsPage.jsx`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar

Criar:

- `src/frontend/src/pages/DeliveryPointsPage.jsx`
- `src/frontend/src/services/pontoEntregaService.js`

Sobrescrever:

- `src/frontend/src/auth/acesso.js`
- `src/frontend/src/App.jsx`
- `src/frontend/src/services/api.js`

Os sobrescritos são os da `main` mais o bloco novo.

- **`acesso.js`**: item **Pontos de entrega** (`/pontos-entrega`) no `MENU`, depois de **Rotas**, para administrador e gestor. São os perfis do `/pontos-entrega` na API.
- **`App.jsx`**: rota `/pontos-entrega` com o mesmo `href` do `MENU`. O `perfisDaRota` procura o `href` exato; fora do `MENU`, qualquer perfil logado entraria.
- **`api.js`**: o erro passa a levar o `status` da resposta (`error.status`). A mensagem não muda.
- **`pontoEntregaService.js`**: listar, criar, atualizar e excluir em `/pontos-entrega`.
- **`DeliveryPointsPage.jsx`**:
  - Formulário com nome, tipo (Depósito ou Destinadora), CEP, endereço, cidade, UF, latitude e longitude. Endereço e coordenadas são obrigatórios, como na API.
  - Colar um par do Google Maps em Latitude preenche os dois campos; vírgula decimal vira ponto.
  - Lista com tipo, endereço, coordenadas, situação (Ativo ou Inativo) e as ações **Editar**, **Desativar** ou **Reativar**, e **Excluir**.
  - **Desativar** tira o ponto da escolha de origem e destino de rota nova. A mensagem diz isso.
  - **Excluir** pede confirmação. Ponto usado numa rota recebe 409 da API; a tela explica e sugere **Desativar**.
  - Usa as classes do `global.css` (`card`, `form-grid`, `primary-btn`, `ghost-btn`, `alert`). O `global.css` não muda.

## PR

Título: `feat: cria a tela de pontos de entrega`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #226` e `Refs #184`.
- **Resumo**: tela de cadastro dos pontos de entrega (depósito e destinadora), com desativar e excluir, só para administrador e gestor.
- **Tipo de mudança**: Requisito.
- **Evidências**: print da lista, do formulário e da mensagem ao excluir ponto usado em rota.

## Como validar

- `npm run build` termina sem erro.
- Administrador ou gestor: o menu tem **Pontos de entrega**, logo depois de **Rotas**.
- Técnico, auditor ou motorista: o menu não tem o item, e abrir `/pontos-entrega` pelo endereço volta para o Dashboard (`/`), como nas outras páginas fora do perfil.
- Criar um depósito com o par de coordenadas colado: aparece na lista como Ativo.
- Sem endereço ou sem coordenadas: aparece a mensagem da API.
- **Desativar** e depois **Reativar**: a situação muda na lista.
- **Excluir** um ponto que nenhuma rota usa: pede confirmação e some.
- **Excluir** um ponto usado como origem ou destino: a tela diz que ele não pode ser excluído e sugere **Desativar**.
