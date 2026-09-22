# Kit CAMPUSCEUB/EcoTrack

Roteiro de entrega no repositório institucional [CAMPUSCEUB/EcoTrack](https://github.com/CAMPUSCEUB/EcoTrack). Não substitui o `app/` deste repositório.

O colega **não inventa** issue, branch, commit nem título de PR: copia o README da pasta da Task.

## Padrões (CONTRIBUTING do EcoTrack)

| Tipo | Padrão | Exemplo |
|---|---|---|
| Pasta neste kit | `<numero-issue>-descricao` | `79-crud-usuarios-api` |
| Branch de código | `feature/<numero-issue>-descricao` | `feature/79-crud-usuarios-api` |
| Branch de docs | `docs/<numero-issue>-descricao` | `docs/56-pdfs-lean-inception` |
| Commit | `tipo: descrição` em português, sem `feat(1.1)` | `feat: cadastra usuarios na api` |
| PR | título = commit; corpo com `Closes #<n>` | fecha a issue da pasta |
| Hierarquia | Epic → Feature → PBI → **Task** | uma Task, um PBI, uma branch, um PR |

Não commitar em `main`. Review de um colega que **não** é o autor; aceite do Code Review (Lucas) antes do merge.

## Corte ao criar um kit novo

Decisão de 22/09/2026. Vale da Sprint 04 em diante. A Sprint 03 não é modelo de corte.

- Uma Task implementa **um** PBI. O README da pasta cita um único número de PBI.
- No GitHub, a Task nasce com `--parent` nesse PBI. Uma issue só aceita um pai.
- API e tela continuam em PRs separados. O mesmo PBI pode ter duas Tasks (uma de API, uma de tela). Duas histórias não entram na mesma Task.
- O PR traz `Closes #<task>`. Isso fecha a Task. Não fecha o PBI nem a Feature. Quando todas as Tasks daquele PBI estiverem na `main`, fechar o PBI. Quando os PBIs da Feature estiverem fechados, fechar a Feature.
- Infra e documentação sem história (como a #55 e a #56) seguem sem PBI pai.

A Sprint 03 colocou US07, US08 e US09 nas Tasks #83 e #84. O GitHub guardou só a US07 como pai. Não repetir.

## Catch-up (Sprints 01–03)

Sequencial, um integrante por sprint, para treinar o workflow:

| Sprint | Quem | Tasks |
|---|---|---|
| 01 | Artur | #50–#53 (kit abaixo). #56 depois do código |
| 02 | Davi | #79–#82 |
| 03 | Eduardo | #83–#84 |

Ainda vale **um PR por Task**. API e tela não se misturam no mesmo PR. A partir da Sprint 04: Davi só API, Eduardo só tela, Artur só docs.

## Passo a passo (toda Task)

1. Abrir a **issue já existente** (link no README da pasta). Confirme que está atribuída a você. **Não crie outra issue.**
2. Esperar o merge das Tasks que bloqueiam a sua (tabela da sprint).
3. Em `CAMPUSCEUB/EcoTrack`: `git checkout main && git pull`.
4. `git checkout -b` **exatamente** a branch do README.
5. **Código:** copiar o `src/` **desta pasta** para `src/` no EcoTrack (criar `src/` só na #55). Sobrescrever o mesmo caminho. **Documentação (#56):** copiar `docs/` e `entregas/` da pasta da Task (PDFs + READMEs já prontos). Não copiar `src/`.
6. `git add` só o que o README listar.
7. `git commit -m` **exatamente** a mensagem do README.
8. `git push -u origin HEAD`.
9. Abrir o PR com o título e o corpo do README. O corpo **tem** de incluir `Closes #<n>` com o número da issue da pasta. Exemplo:

```powershell
gh pr create --title "feat: cadastra usuarios na api" --body @"
Closes #79

CRUD /usuarios com JWT. Perfis administrador, tecnico, gestor e auditor. Sem perfil motorista.

Como validar: GET /usuarios sem token → 401; com token, criar/listar/editar e PATCH de ativo.
"@
```

10. No template do EcoTrack: tipo Requisito (código) ou Documentação (#56). Pedir review (Lucas + um colega).

Sem `Closes #<n>`, a issue não fecha no merge.

## Sprints

| Sprint | Pasta | Issues |
|---|---|---|
| 01 — Login e agências | [sprint-01/README.md](sprint-01/README.md) | #50–#53, #55, #56 |
| 02 — Usuários e lotes | [sprint-02/README.md](sprint-02/README.md) | #79–#82 |
| 03 — Equipamentos e status | [sprint-03/README.md](sprint-03/README.md) | #83–#84 |
