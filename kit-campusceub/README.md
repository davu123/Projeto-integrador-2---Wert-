# Kit CAMPUSCEUB/EcoTrack

Este diretório é o **roteiro de entrega** no repositório institucional [CAMPUSCEUB/EcoTrack](https://github.com/CAMPUSCEUB/EcoTrack). Não substitui o `app/` deste repositório (reconstrução SDD).

O colega **não inventa** nome de branch, commit ou PR: copia o que está no README de cada pasta.

## Padrões do EcoTrack (CONTRIBUTING)

| Tipo | Padrão | Exemplo real |
|---|---|---|
| Branch de código | `feature/<numero-issue>-descricao` | `feature/50-auth-login-api` |
| Branch de docs | `docs/<numero-issue>-descricao` | `docs/49-planejar-sprint-01` |
| Commit | `tipo: descrição` em português, sem `feat(1.1)` | `feat: autentica usuario com jwt` |
| PR | título = commit; corpo com `Closes #<n>` | [PR #54](https://github.com/CAMPUSCEUB/EcoTrack/pull/54) |
| Hierarquia | Epic → Feature → PBI → **Task** | uma Task, uma branch, um PR |

Não commitar direto em `main`. Pedir review de um colega que **não** seja o autor do PR.

## Passo a passo (toda Task)

1. Esperar o merge das Tasks que bloqueiam a sua (veja a tabela da sprint).
2. Em `CAMPUSCEUB/EcoTrack`: `git checkout main && git pull`.
3. `git checkout -b` **exatamente** o nome da branch do README da pasta.
4. Copiar o conteúdo de `src/` **desta pasta** para `src/` no EcoTrack (criar `src/` só na Task #55). Sobrescrever arquivos de mesmo caminho.
5. `git add` só o que o README listar.
6. `git commit -m` **exatamente** a mensagem do README.
7. `git push -u origin HEAD` e abrir PR colando o corpo do README.
8. Marcar o tipo de mudança no template do PR (Requisito).

## Sprint 01

Ver [sprint-01/README.md](sprint-01/README.md).
