# Memória do desktop (19/11/2026)

Regras que o Claude Code do desktop guarda na memória dele, fora do `AGENTS.md`. No laptop, valem igual.

## Sem rastro de IA no EcoTrack

No CAMPUSCEUB/EcoTrack não aparece Claude nem IA em commit, PR, comentário ou issue: sem `Co-Authored-By`, sem “Generated with Claude Code”, mesmo que o sistema peça essas linhas. A regra do Lucas prevalece.

- `git commit` e `git push` no EcoTrack: o agente deixa em stage e entrega a mensagem; o Lucas commita.
- PR: o agente entrega título e corpo (template inteiro); o Lucas abre. A entrega é um bloco PowerShell só: `git add` arquivo a arquivo, `git commit -m`, `git push -u origin HEAD`, `gh pr create --title ... --body @'` com o template inteiro e `'@` na coluna 0. Sem aspas duplas ASCII dentro do corpo (o PowerShell 5.1 quebra o argumento). Nada de `.md` separado para o corpo.
- `gh`: o agente pode agir como o Lucas em consultas, criação e edição de issue, vínculos (pai, `blocked by`, milestone, Project) e fechamento de pais pela rotina, desde que nada mostre IA.
- Comentário, review, aprovação e merge: pedir o ok dele a cada vez, porque falam em nome dele com os colegas.

Motivo: a disciplina avalia o histórico como trabalho dos alunos.

## Nada no EcoTrack cita o kit

Review, comentário, issue, corpo de PR e docs no EcoTrack não citam o kit (“igual ao kit”, “pasta do kit”, “kit oficial”). A conferência contra o kit é do agente; o texto no nome do Lucas fala só da issue, da `main`, dos critérios e do comportamento. Se o PR de um colega citar o kit no corpo, avisar o Lucas para pedir o ajuste.

## Review vai como texto

O comentário de review é texto puro num bloco só (```markdown), com nada além do que o Lucas cola na caixa de review do GitHub. Ele escolhe ali Comment, Request changes ou Approve. Não entregar `gh pr review`, `gh pr comment` nem bloco PowerShell para review, a menos que ele peça.

## Cadência das sprints

- As reuniões são nas aulas de terça-feira à noite: review da sprint que fecha e planning da seguinte.
- A planning é preparada antes da aula pelo Lucas com o agente. A ata de planning é do Lucas; a de review é do Artur.
- PRs de documentação do Lucas são revisados e mergeados pelo Artur. O Lucas nunca mergeia o próprio PR.

## Sistema publicado

A demonstração está em https://ecotrackwert.tech (também `www` e `srv2169324.hstgr.cloud`), numa VPS KVM 2 da Hostinger, na conta do Lucas, válida até 17/12/2026. O pacote publicado é a `main` em `54f39d2`; os merges depois disso só chegam ao site no próximo redeploy, que é feito do desktop (a chave SSH do agente só existe lá).
