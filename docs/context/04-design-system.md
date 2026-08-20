# 04 — Sistema visual

Direção **já existente** em `referencia/frontend/src/styles/global.css`. Não inventar tema. Não aplicar tokens novos nesta spec.

## Intenção (quando houver UI)

Interface web desktop da Wert: painel claro com acento verde ambiental, logo Wert, sidebar + header (tema claro/escuro, fonte A+/A−, alto contraste). O `app/` **copia** esses estilos e o `Layout`; não redesenha.

## Paleta

Valores confirmados no CSS da raiz (`:root` e `[data-theme='dark']`):

| Token | Hex (claro) | Uso |
|---|---|---|
| `--bg` | `#f4f7f5` | Fundo |
| `--panel` | `#ffffff` | Cartões |
| `--text` | `#1f2937` | Texto |
| `--muted` | `#6b7280` | Secundário |
| `--border` | `#dde7df` | Bordas |
| `--accent` | `#14803c` | Ações / marca |
| `--accent-strong` | `#0f6a31` | Hover |
| `--accent-soft` | `#dff4e6` | Fundo de destaque |
| `--error` | `#b42318` | Erro |
| `--success` | `#0f8a43` | Sucesso |

Escuro: `--bg` `#0b1117`, `--panel` `#16212d`, `--accent` `#22c55e` (resto no mesmo arquivo). Alto contraste força borda/texto pretos ou brancos.

## Tipo e espaço

- Família: Inter, system-ui, Arial, sans-serif.
- Escala: `--font-scale` no `:root` (controles A+/A− no Header).
- Logo: `referencia/frontend/src/assets/logo-wert.png`.

## Fora (agora)

- Não criar design system paralelo.
- Não mudar hex “para ficar mais PI2”.
- Copiar `global.css`, `responsive.css`, `Layout.jsx`, `Header.jsx`, `Sidebar.jsx` (links só das telas já entregues naquela sprint) e o logo, quando a tarefa do ROADMAP pedir.
