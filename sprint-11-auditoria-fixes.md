# Sprint 11 — Correções da Auditoria Independente (Acessibilidade + SEO Técnico)

> Baseado nos achados confirmados de `AUDITORIA-QUALIDADE-2026-08-11.md`. O achado de
> performance (3.1) foi remedido em modo anônimo e está resolvido — Performance 99, TBT 50ms.
> Não faz parte deste sprint. Os 4 itens abaixo são independentes disso e continuam válidos.

## 1. Conflito `robots.txt` × `noindex` nas páginas legais

**Achado 1.1.** `app/robots.ts` bloqueia rastreamento de `/politica-de-privacidade` e
`/termos-de-uso` via `disallow`, ao mesmo tempo que as duas páginas têm
`metadata.robots = { index: false }`. Os dois mecanismos juntos se anulam: se o Googlebot não
pode rastrear a página, nunca chega a ler a instrução `noindex`.

**Corrigir:** remover as duas rotas do `disallow` em `app/robots.ts`. O `noindex` sozinho já é
suficiente e é o método correto para manter uma página fora do índice enquanto permanece
acessível por link direto (como o link do formulário de Contato para a Política de Privacidade).

## 2. Skip link ausente

**Achado 7.2.** `app/layout.tsx` não tem um link de "pular para o conteúdo" antes do `<NavBar />`.
É o critério mais básico do WCAG (2.4.1 Bypass Blocks, Nível A — não é nem AA).

**Corrigir:** adicionar um link visualmente oculto (visível só ao receber foco) como primeiro
elemento focável do `<body>`, apontando para um `id="main-content"` a ser adicionado na tag
`<main>` já existente. Texto sugerido: "Pular para o conteúdo".

## 3. Foco preso na transição do `ContactFlow`

**Achado 7.3.** `components/ContactFlow.tsx` aplica `aria-hidden="true"` ao painel do passo
atual durante a transição de 180ms, podendo deixar o foco do teclado "preso" num elemento
tecnicamente invisível para tecnologia assistiva — comportamento inconsistente entre
navegadores/leitores de tela.

**Corrigir:** ao trocar de painel, mover o foco explicitamente para o `<h2>` (pergunta) do novo
passo, usando um `<h2 tabIndex={-1}>` com `ref.current?.focus()` disparado depois da troca —
em vez de depender do `aria-hidden` durante a transição.

## 4. `aria-current="page"` ausente no menu

**Achado 7.4.** `components/ui/NavBar.tsx` sinaliza o item ativo do menu só por classe CSS
(`navbar__link--active`), tanto no desktop quanto no mobile — informação puramente visual, não
lida por tecnologia assistiva.

**Corrigir:** adicionar `aria-current={active ? "page" : undefined}` em cada `<Link>` de item de
menu, nos dois layouts (desktop e mobile).

## O que NÃO fazer

- Não mexer em nada relacionado a performance/JavaScript — já confirmado adequado (Performance
  99 em modo anônimo, sem interferência de extensão).
- Não mexer em contraste do rodapé nesta sprint — fica para uma sprint própria, já que precisa de
  medição visual cuidadosa antes de qualquer ajuste de cor.

## Ao final do sprint

`npm run build`, testar manualmente com Tab a partir do topo da página (o skip link deve ser o
primeiro elemento focável e levar direto ao conteúdo), testar o fluxo de Contato com teclado
(Tab avançando pelas 4 etapas sem o foco "sumir" em nenhuma transição), confirmar visualmente que
o item ativo do menu está marcado no código (inspecionar o HTML renderizado), commit
`"sprint 11: correções da auditoria — a11y e seo técnico"` e push.
