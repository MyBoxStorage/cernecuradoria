# Sprint 7 — Revisão Final de SEO, GEO, Performance e Acessibilidade

> Pré-requisito: Sprints 0-6 concluídos. Este é o sprint de polimento final — não adiciona
> páginas novas, revisa e corrige tudo que já existe antes da ativação.

## 1. Contraste e acessibilidade de cor (achado importante)

O rótulo/eyebrow em `--cerne-bronze` sobre fundo `--cerne-offwhite`, usado em várias seções,
provavelmente não atinge o contraste mínimo de acessibilidade (WCAG AA exige 4.5:1 para texto
normal, 3:1 para texto grande/negrito). Ação:
- Medir o contraste real de `--cerne-bronze` (#B08D4F) sobre `--cerne-offwhite` (#F4F1EA) com uma
  ferramenta de contraste.
- Se não passar, **não trocar a cor por uma nova** (viola a regra das três cores) — em vez disso,
  usar uma variação tonal mais escura do próprio bronze (o Design System já permite variações de
  luminosidade dentro das três cores fixas, ex: um `--bronze-70` mais próximo do charcoal) só
  para o texto do rótulo, mantendo a linha decorativa fina no bronze original. Documentar essa
  decisão como comentário no CSS.
- Revisar da mesma forma qualquer outro texto pequeno em bronze pelo site.

## 2. Checklist de SEO por página

Para cada uma das páginas (Home, Sobre, Como Funciona, Contato, Blog, posts):
- `<title>` único e descritivo (nenhum duplicado).
- `meta description` única, dentro de 150-160 caracteres.
- Um único `<h1>` por página.
- Hierarquia de headings sem pular nível (h1 → h2 → h3, nunca h1 → h3 direto).
- `canonical` URL definida via Metadata API em cada rota.
- Todas as imagens (incluindo a foto da Sobre quando for adicionada) com `alt` descritivo.

## 3. Schema — validação cruzada

- Rodar o Rich Results Test do Google e um validador de schema.org em todas as páginas com
  JSON-LD (`Organization`, `WebSite`, `Person`, `Service`, `FAQPage`, `BreadcrumbList`,
  `Article`/`BlogPosting`) — corrigir qualquer erro ou warning.
- Confirmar que os dados do `founder` no `Organization` e o schema `Person` da Sobre batem
  exatamente (nome, cargo) — devem vir da mesma constante centralizada, não duplicados
  manualmente em dois lugares.

## 4. `llms.txt`, `robots.txt` e `sitemap.ts` — checagem final

- `llms.txt`: conferir que todas as URLs estão corretas e absolutas (usando
  `NEXT_PUBLIC_SITE_URL`), incluindo a seção de blog (mesmo vazia).
- `robots.txt`: confirmar que aponta para o `sitemap.xml` correto, permite crawling das páginas
  públicas e mantém `Disallow` nas duas páginas legais.
- `sitemap.ts`: confirmar que reflete exatamente as páginas públicas atuais + posts publicados
  (nenhuma rota placeholder ou legal aparecendo nele).

## 5. Performance (Core Web Vitals)

Meta: LCP abaixo de 2.5s, INP abaixo de 200ms, CLS abaixo de 0.1 — testado via Lighthouse no
próprio ambiente do Cursor e, depois do deploy, conferido nos dados reais do Vercel Speed
Insights.
- Confirmar que as fontes (`next/font/local`) não causam layout shift no carregamento.
- Confirmar que a animação de entrada do hero (Sprint 1) não atrasa o LCP — o texto do hero deve
  estar visível e mensurável rapidamente, a animação é só visual, não deve atrasar a pintura do
  conteúdo.
- Revisar bundle size: nenhuma dependência pesada desnecessária deve ter entrado ao longo dos
  sprints (ex: bibliotecas de ícone completas por engano).

## 6. Acessibilidade geral

- Navegação completa por teclado em todas as páginas (incluindo o fluxo de Contato e o acordeão
  de Como Funciona, já testados nos sprints anteriores — confirmar que continuam funcionando).
- `focus-visible` visível em todo elemento interativo (não só nos que já foram testados).
- Testar com leitor de tela básico (VoiceOver ou NVDA, o que o Cursor tiver disponível) ao menos
  na Home e no fluxo de Contato.
- Respeitar `prefers-reduced-motion` em todo lugar que tem animação (hero da Home, transição do
  fluxo de Contato).

## 7. Favicon e ícones do site

- Gerar favicon a partir do monograma já definido no Design System (
  `guidelines/brand-monogram-avatar.html`): letra "C" em Fraunces sobre fundo
  `--cerne-charcoal`, círculo. Gerar os tamanhos padrão do Next.js (`icon.tsx` via
  `next/og` ou arquivo estático) e `apple-icon`.

## 8. Página 404

- Criar `app/not-found.tsx` com o mesmo sistema visual do site (não a página de erro genérica do
  Next.js): mensagem curta e no tom da marca, ex: `Esta página não existe.` + link para a Home.
  Sem imagem de erro genérica, sem humor forçado — coerente com a discrição da marca.

## Ao final do sprint

`npm run build`, rodar Lighthouse (mobile e desktop) e reportar os números de LCP/INP/CLS,
confirmar todos os itens acima, commit `"sprint 7: revisão final de seo e performance"` e push.
Este é o último sprint antes da ativação — reportar qualquer pendência que ainda dependa de uma
decisão do Pedro Henrique (variáveis de ambiente, domínio, foto da Sobre) para ficar claro o que
falta antes do dia de ir ao ar.
