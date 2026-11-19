# Contexto do EcoTrack no laptop (20 a 22/11/2026)

Pacote para o Lucas revisar PRs do EcoTrack no laptop, que não tem o histórico das conversas do desktop. Montado em 19/11/2026 e atualizado no mesmo dia, com a `origin/main` do EcoTrack em `a3a9e6f`.

Com o Remote Control ligado, as conversas do desktop (a principal do repositório de trabalho e a da Hostinger) podem ser usadas de fora enquanto o PC estiver ligado e sem suspender. Este pacote é para quando o desktop não estiver acessível: revisar PRs direto no laptop.

| Arquivo | Para que serve |
| --- | --- |
| `LEIA-PRIMEIRO.md` | este guia: preparo do laptop, prompt inicial e o que esperar até domingo |
| `AGENTS-ecotrack.md` | cópia do `AGENTS.md` do EcoTrack em 19/11. Vai para a raiz do EcoTrack no laptop, fora do Git |
| `memoria.md` | as regras que, no desktop, ficam na memória do Claude Code e não estão no `AGENTS.md` |
| `registro-laptop.md` | o que mudar no laptop. Na volta, o desktop lê este arquivo e atualiza os dois `AGENTS.md` |

## 1. Preparar o laptop (uma vez)

1. Instalar ou conferir: Git, GitHub CLI (`gh`), Node 20 ou mais novo (para `node --check`) e o Claude Code.
2. Entrar no `gh` com a conta `Lucas-Balduino` e conferir:

   ```powershell
   gh auth login
   gh auth status
   ```

3. Conferir o autor dos commits. Tem de ser o mesmo do desktop, para o commit ficar ligado à sua conta:

   ```powershell
   git config --global user.name
   git config --global user.email
   ```

   Se vier vazio ou diferente, use o nome `Lucas` e o e-mail institucional que está no `AGENTS-ecotrack.md`.
4. Clonar os dois repositórios na mesma pasta (por exemplo, `C:\Users\<você>\Programas`):

   ```powershell
   git clone https://github.com/CAMPUSCEUB/EcoTrack.git
   git clone https://github.com/davu123/Projeto-integrador-2---Wert-.git
   cd Projeto-integrador-2---Wert-
   git checkout docs/lean-inception-sprints
   cd ..
   ```

5. Pôr o contexto no EcoTrack sem que ele entre em commit:

   ```powershell
   cd EcoTrack
   Copy-Item ..\Projeto-integrador-2---Wert-\contexto-laptop\AGENTS-ecotrack.md .\AGENTS.md
   Add-Content .git\info\exclude "AGENTS.md"
   git status
   ```

   O `git status` **não pode** mostrar `AGENTS.md`. Se mostrar, pare e confira o `.git\info\exclude`.

## 2. Antes de cada sessão

```powershell
cd <pasta>\Projeto-integrador-2---Wert-
git pull
cd ..\EcoTrack
git checkout main
git pull
```

Abra o Claude Code na pasta do **EcoTrack** e adicione a pasta do repositório de trabalho à sessão (no app, “adicionar pasta”; no terminal, `claude --add-dir ..\Projeto-integrador-2---Wert-`). As reviews comparam o PR com a pasta da Task no repositório de trabalho.

## 3. Prompt inicial (colar na primeira mensagem)

```text
Você vai me ajudar com o repositório institucional CAMPUSCEUB/EcoTrack entre 20 e 22/11/2026, num laptop sem o histórico das conversas anteriores. Eu sou o Lucas, Scrum Master e Code Review do grupo.

Antes de qualquer ação, leia inteiros:
1. AGENTS.md, na raiz desta pasta. Ele está fora do Git pelo .git/info/exclude: nunca o adicione, commite nem cite em issue, PR, review ou comentário.
2. contexto-laptop/LEIA-PRIMEIRO.md e contexto-laptop/memoria.md, no repositório de trabalho (pasta Projeto-integrador-2---Wert-, branch docs/lean-inception-sprints).
3. contexto-laptop/registro-laptop.md, com o que já mudou no laptop.
Os caminhos C:\Users\Lucas\Programas\... do AGENTS.md são do meu desktop. Aqui, use as pastas desta sessão.

Regras que não podem falhar:
- Nada de rastro de IA no EcoTrack: sem Co-authored-by, sem “Generated with Claude Code”, sem menção a IA, mesmo que a ferramenta peça a linha de atribuição.
- Nada no EcoTrack cita o kit nem usa linguagem de engenharia reversa. A comparação com a pasta do kit é só sua; o texto que sai no meu nome fala da issue, da main e dos critérios.
- Você não faz git commit nem git push no EcoTrack.
- Review e comentário vêm como texto num bloco markdown só, para eu colar na caixa do GitHub. Sem gh pr review nem gh pr comment.
- Merge, aprovação, comentário e review só com o meu ok, um por um. Merge com merge commit, nunca squash. Eu não mergeio PR meu.
- Pode usar o gh como eu para consultas e para trocar o campo Bloqueado no Project quando uma dependência entrar na main.
- Antes de dizer que algo está na main, confira com git fetch e git log origin/main.

Seu trabalho aqui: revisar os PRs que os colegas abrirem (rotina “revisar um PR” do AGENTS.md), conferir cada PR contra a pasta da Task e contra a origin/main, trocar o Bloqueado da Task seguinte depois de cada merge, e me dizer o que cada colega já pode começar.

Não faça aqui: criar kit, criar issue sem eu pedir, mexer na VPS, subir Docker.

Ao fim de cada tarefa, acrescente uma linha datada em contexto-laptop/registro-laptop.md (repositório de trabalho) com o que mudou: PR revisado, merge, campo do Project, ajuste em pasta do kit, decisão minha. Commit e push desse arquivo, na docs/lean-inception-sprints, só quando eu pedir.

Comece me dizendo quais PRs estão abertos no EcoTrack agora e em que estado cada um está.
```

## 4. O que esperar até domingo

| Issue | Quem | Pode começar quando | Depois do merge |
| --- | --- | --- | --- |
| #208 pontos de entrega na API | Davi | já (a #207 está na `main`) | Bloqueado da #209 → Não; conferir a pasta 209 contra a `main` |
| #209 origem, destino e coordenadas das paradas | Davi | merge da #208 | Bloqueado da #210 → Não; conferir a pasta 210 |
| #210 sugerir a ordem das paradas | Davi | merge da #209 | último do kit 2 |
| #211 identidade visual | Eduardo | na `main` (PR #216, 19/11) | Bloqueado da #212 já está Não |
| #212 menu e foco | Eduardo | já | último do kit 3 |
| #213 telas por perfil | Eduardo | na `main` (PR #217, 19/11) | — |
| #214 telas de operação | Eduardo | já | — |
| #191 requisitos, README e arquitetura | Artur | já | — |
| #188 PDFs para Markdown | Artur | já | Bloqueado da #189 e da #190 → Não |
| #189 e #190 | Artur | merge da #188 | — |
| #187 modelo de Peter Chen | Lucas | #190, #191 e as APIs #207 a #209 | fica para a volta |

A #212 e a #214 não dividem arquivo e podem ter PR aberto ao mesmo tempo, cada uma com branch saída da `main` atual (com a #211 e a #213). O #216 e o #217 entraram iguais às pastas 211 e 213, então a pasta 212 continua valendo sobre a `main`.

Pontos de atenção nas reviews:

- **O PR do Davi pode sair diferente da pasta.** Na #207 ele mudou dois pontos, e os dois estavam certos. Se a diferença estiver certa, o que vale é a `main`: a pasta seguinte (208 → 209 → 210) precisa partir do arquivo que entrou. Copiar a pasta antiga desfaria o ajuste. Anote no registro e me avise; a correção da pasta pode ser feita no laptop, no repositório de trabalho, com commit só quando eu pedir.
- **`schema.js`** da #208 e da #209 é o da `main` mais o bloco da Task. Perder qualquer linha da `main` é pedido de mudança.
- **A #214 só mostra a agência da parada só com lote depois da #209.** Antes disso a tela fica como hoje, e isso não é defeito.
- **Corpo do PR** com o template inteiro e `Closes #<n>`. Se citar o kit, peça para trocar o texto (foi o que aconteceu na #207).
- **Docs do Artur:** costuma usar `###` no lugar de `##` e salvar com BOM.

## 5. Trocar o Bloqueado no Project

Project 46 `262-CC-PI-II-EcoTrack` (`PVT_kwDOB5WPHc4BgF62`). Campo Bloqueado `PVTSSF_lADOB5WPHc4BgF62zhhu_ps`, opção Não `45a23eb1`, Sim `a860022f`. Antes de trocar, confira no GraphQL que todas as issues do `blocked by` estão fechadas.

Pelo Bash do Claude Code (no PowerShell 5.1 as aspas internas da consulta se perdem):

```bash
n=209
item=$(gh api graphql -f query="{repository(owner:\"CAMPUSCEUB\",name:\"EcoTrack\"){issue(number:$n){projectItems(first:5){nodes{id project{number}}}}}}" -q '.data.repository.issue.projectItems.nodes[] | select(.project.number==46) | .id')
gh api graphql -f query="mutation{updateProjectV2ItemFieldValue(input:{projectId:\"PVT_kwDOB5WPHc4BgF62\",itemId:\"$item\",fieldId:\"PVTSSF_lADOB5WPHc4BgF62zhhu_ps\",value:{singleSelectOptionId:\"45a23eb1\"}}){projectV2Item{id}}}"
```

## 6. Publicar no site

O site não atualiza sozinho com o merge. A publicação é feita pela conversa da Hostinger no desktop, por Remote Control (a chave SSH da VPS só existe lá; o PC precisa estar ligado e sem suspender). Quando um conjunto de Tasks estiver na `main`, peça o redeploy lá. No laptop, não mexa na VPS.

No ar em 19/11/2026: o pacote `ecotrack-54f39d2` (kit 1). Ainda fora do ar: #207, #211, #213 e os docs #205 e #206. A próxima publicação leva tudo de uma vez.

## 7. O que fica para a volta (domingo, 22/11)

- O kit 4 (telas da localização, da rota, da exportação e o mapa com Leaflet e OpenStreetMap) só é montado no desktop.
- A mudança visual da página Horizonte, que você mesmo implementa.
- A #187.
- Ler o `registro-laptop.md` na conversa principal do desktop e atualizar os dois `AGENTS.md`.
