# Task — Rota do dia no modo escuro, confirmação ao excluir rota e telefone da agência

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/214 |
| Quem | Eduardo |
| PBI | US26 [#183](https://github.com/CAMPUSCEUB/EcoTrack/issues/183) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/214-telas-de-operacao` |
| Commit | `feat: ajusta a rota do dia, a exclusao de rota e o telefone da agencia` |
| Destino | só `src/frontend` |
| Depende de | kit 1 da Sprint 10 na `main` (já está) |

A issue #214 já existe. Não crie outra.

Não divide arquivo com a #211, a #212 nem a #213.

## Antes de copiar

Depois de `git checkout main && git pull`, confira:

- `src/frontend/src/pages/DriverRoutePage.jsx` tem `const cardStyle = { background: '#fff', ...`;
- `src/frontend/src/pages/RoutesPage.jsx` tem a coluna **Recolhimento** (a Sprint 09 está na `main`);
- `src/frontend/src/pages/AgenciesPage.jsx` não tem o campo `telefone`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/DriverRoutePage.jsx`
- `src/frontend/src/pages/RoutesPage.jsx`
- `src/frontend/src/pages/AgenciesPage.jsx`

Os três são os da `main` mais o bloco novo.

- **`DriverRoutePage.jsx`**
  - **Modo escuro**: o cartão, o campo de data e a tabela usam as cores do tema (`var(--panel)`, `var(--text)`, `var(--border)`). Antes o cartão ficava branco com texto claro, ilegível.
  - Os botões de status não marcados ficam com o fundo do tema e a borda na cor do status.
  - O rótulo **Data** fica ligado ao campo (`htmlFor`).
  - **Parada só com lote**: mostra o `agencia_nome` que a API devolve. Com a #209 na `main`, o `GET /rotas/minha` traz a agência do lote nessa parada, e a tela mostra “Agência Norte · Lote #7”. Sem a agência na resposta, mostraria só “Lote #7”.
- **`RoutesPage.jsx`**: **Excluir** pede confirmação (“Excluir a rota #12? As paradas dela também serão excluídas.”). Antes excluía no clique. Heurística de Nielsen: prevenção de erro.
- **`AgenciesPage.jsx`**: campo **Telefone** no formulário (até 20 caracteres) e coluna na lista. Antes, editar uma agência pela tela apagava o telefone, porque o PUT da API grava `null` quando o campo não vem.

Fora desta Task: CEP, endereço e coordenadas no formulário de agências, origem e destino na tela de rotas, e mapa. Isso vem no kit 4 (seção “Kit 4” do README da sprint).

## PR

Título: `feat: ajusta a rota do dia, a exclusao de rota e o telefone da agencia`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #214` e `Refs #183`.
- **Resumo**: Rota do dia legível no modo escuro; confirmação antes de excluir rota; telefone no cadastro de agência, sem apagar na edição.
- **Tipo de mudança**: Requisito.
- **Evidências**: print da Rota do dia no modo escuro, da confirmação de exclusão e do formulário de agência com o telefone.

## Como validar

- `npm run build` termina sem erro.
- Motorista, **Rota do dia**, **Modo escuro**: cartão escuro, texto claro, botões legíveis.
- Administrador ou gestor, **Rotas**, **Excluir** → aparece a confirmação; **Cancelar** mantém a rota.
- **Agências**: criar com telefone → aparece na lista. Editar só o nome → o telefone continua.
