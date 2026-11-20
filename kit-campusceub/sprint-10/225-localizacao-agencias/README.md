# Task — CEP, endereço e coordenadas na tela de Agências

| Campo | Valor |
|---|---|
| Issue | https://github.com/CAMPUSCEUB/EcoTrack/issues/225 |
| Quem | Eduardo |
| PBI | US27 [#184](https://github.com/CAMPUSCEUB/EcoTrack/issues/184) — um único pai |
| Milestone | Sprint 10 - Adequações e implantação |
| Branch | `feature/225-localizacao-agencias` |
| Commit | `feat: adiciona cep, endereco e coordenadas na tela de agencias` |
| Destino | só `src/frontend` |
| Depende de | kits 2 e 3 da Sprint 10 na `main` (já estão) |

A issue #225 já existe. Não crie outra.

Não divide arquivo com nenhuma outra Task do kit. Pode ir em paralelo com o mapa e com os pontos de entrega. Sem ela, só a API grava coordenadas de agência, e o mapa fica vazio.

## Antes de copiar

Depois de `git checkout main && git pull`, confira em `src/frontend/src/pages/AgenciesPage.jsx`:

- o `FORM_INICIAL` tem `telefone: ''` (a #214 está na `main`);
- não há campo `cep` nem `latitude`.

Se estiver diferente, pare e avise o Code Review.

## O que copiar (sobrescrever)

- `src/frontend/src/pages/AgenciesPage.jsx`

É o da `main` mais o bloco novo.

- Formulário com **CEP**, **Endereço**, **Latitude** e **Longitude**, todos opcionais, como na API.
- Colar no campo Latitude um par copiado do Google Maps (`-15.793889, -47.882778`) preenche os dois campos.
- Vírgula decimal (`-15,79`) vai para a API com ponto.
- O formulário continua enviando o **telefone**: o `PUT /agencias/:id` grava `null` quando ele não vem.
- Campo em branco vai como `null` e apaga o valor salvo. Latitude e longitude vão juntas; só uma das duas recebe a mensagem de erro da API.
- Na edição, o CEP aparece com hífen.
- Lista com as colunas **Endereço** (com o CEP embaixo) e **Coordenadas** (“Sem coordenadas” quando falta).

Sem geocodificação: o endereço não vira coordenada sozinho.

## PR

Título: `feat: adiciona cep, endereco e coordenadas na tela de agencias`

Corpo: o template do repositório inteiro, com os títulos `##`.

- **Issue relacionada**: `Closes #225` e `Refs #184`.
- **Resumo**: CEP, endereço e coordenadas no cadastro de agência, sem perder o telefone.
- **Tipo de mudança**: Requisito.
- **Evidências**: print do formulário preenchido e da lista com as colunas novas.

## Como validar

- `npm run build` termina sem erro.
- Criar agência com CEP `70040-010`, endereço e o par `-15.79, -47.88` colado em Latitude: os dois campos se preenchem e a lista mostra o endereço, `CEP 70040-010` e as coordenadas.
- Editar só o nome: CEP, endereço, coordenadas e telefone continuam.
- Latitude `-15,8` com vírgula: salva como `-15.8`.
- Só a latitude preenchida: aparece a mensagem da API e nada é gravado.
- Apagar latitude e longitude e salvar: a lista mostra “Sem coordenadas”.
