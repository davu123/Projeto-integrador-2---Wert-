# Task — Editar equipamento na listagem

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/160 |
| Quem | Eduardo |
| PBI | [#36](https://github.com/CAMPUSCEUB/EcoTrack/issues/36) US10 — um único pai |
| Milestone | Sprint 09 - Fechamento da visão |
| Branch | `feature/160-tela-editar-equipamento` |
| Commit | `feat: edita equipamento na listagem` |
| Destino | só `src/frontend` |
| Depende de | merge da API de edição de equipamento (#158) |

A issue #160 já existe. Não crie outra. Começar **depois** do merge da #158: a tela chama o `PUT /equipamentos/:id`.

## Antes de copiar

Depois de `git checkout main && git pull`, confira que o `equipmentController.js` da `main` já tem `atualizarEquipamento`. Se faltar, a API ainda não entrou: pare e espere o merge.

## O que copiar (sobrescrever)

- `src/frontend/src/services/equipmentApi.js`
- `src/frontend/src/pages/EquipmentListPage.jsx`

O service é o da `main` mais `atualizarEquipamento(id, data)`. A página é a listagem da `main` com a edição dentro dela:

- Botão **Editar** em cada linha, só para quem pode cadastrar equipamento (administrador, gestor e técnico). O auditor continua vendo a lista sem o botão.
- O botão abre o formulário acima da tabela, com tipo, marca, modelo, número de série e estado. O lote aparece só como texto: não muda.
- **Salvar** chama a API, mostra a mensagem e recarrega a lista. Erro da API (por exemplo, número de série repetido) aparece no formulário. **Cancelar** fecha sem salvar.

A edição fica na própria listagem. Não criar rota nova como `/equipamentos/:id/editar`: o `App.jsx` protege cada rota pelo `href` exato do `MENU` do `acesso.js`, e uma rota fora do `MENU` deixaria qualquer perfil logado entrar. `App.jsx` e `acesso.js` não mudam.

## PR

Título: `feat: edita equipamento na listagem`

```text
Closes #160

A listagem de equipamentos ganha o botão Editar para administrador, gestor e técnico. O formulário edita tipo, marca, modelo, número de série e estado. O lote não muda.

Como validar: login de técnico, Listagem, Editar num equipamento, trocar o modelo e salvar. A lista mostra o novo modelo. Login de auditor: a lista aparece sem o botão.
```

## Como validar

- Técnico, gestor ou administrador veem a coluna **Ações** com **Editar**.
- Editar, trocar modelo e estado, **Salvar** → "Equipamento atualizado com sucesso." e a linha mostra os dados novos.
- Número de série de outro equipamento → a mensagem de 409 aparece no formulário e nada muda.
- **Cancelar** fecha o formulário sem salvar.
- Auditor vê a lista sem a coluna **Ações**.
- A tela **Equipamentos** (cadastro) continua igual.
