# Sprint 0 — Fundação Técnica do Site Institucional Cerne Curadoria

> Prompt para o agente do Cursor executar. Este sprint cobre SÓ infraestrutura técnica —
> nenhum copy final de página ainda (isso vem nos sprints seguintes, seção por seção).
> Leia este arquivo inteiro antes de começar a codar.

## Contexto do projeto

A Cerne Curadoria é uma empresa de curadoria e intermediação de espólios/heranças,
full-service, atuando na Zona Sul do Rio de Janeiro e na Barra da Tijuca. O site institucional
vai ficar tecnicamente pronto e no ar, mas **fora de divulgação pública** até o dono do projeto
(Pedro Henrique) decidir ativar (comprar e conectar o domínio `.com.br`).

Antes de codar, leia estes dois arquivos para contexto de marca (não copie texto deles para o
site — são só referência de tom e regras):
- `../Identidade Visual/00-brand-brief-claude-design.md`
- `../Identidade Visual/Exportações Claude Design/Design System (código completo)/readme.md`

## Repositório

Repositório GitHub já criado e vazio: `https://github.com/MyBoxStorage/cernecuradoria`
Inicialize o projeto Next.js dentro dele (na raiz do repo).

## Stack obrigatória

- **Next.js 16.x** (versão estável mais recente), App Router, TypeScript, Turbopack (padrão).
- Priorizar Server Components; Client Components só onde houver interatividade real
  (formulário, banner de cookies, menu mobile, botão de WhatsApp).
- Deploy alvo: **Vercel**.
- Sem CMS nesta fase — conteúdo vive em arquivos do projeto (Markdown/TS), editado via Cursor.
- Sem Tailwind — o Design System já existente usa CSS puro com custom properties. Manter esse
  padrão para portabilidade total dos tokens (ver seção abaixo).

## 1. Estrutura de pastas (App Router)

```
app/
  layout.tsx              (layout raiz: fontes, metadata padrão, schema Organization, banner de cookies, NavBar, Footer, botão WhatsApp)
  page.tsx                (Home — placeholder por enquanto)
  sobre/page.tsx           (placeholder)
  como-funciona/page.tsx   (placeholder)
  contato/page.tsx         (placeholder)
  blog/page.tsx            (placeholder — listagem vazia)
  politica-de-privacidade/page.tsx  (placeholder, sem link na navegação)
  termos-de-uso/page.tsx            (placeholder, sem link na navegação)
  sitemap.ts
  robots.ts
components/
  ui/            (Button, Badge, Card, Input, NavBar, Footer)
  WhatsAppButton.tsx
  CookieConsentBanner.tsx
lib/
  schema.ts       (funções que geram os JSON-LD)
  constants.ts     (dados centrais: nome da empresa, telefone placeholder, áreas atendidas etc.)
styles/
  tokens.css       (cores, espaçamento — portado do Design System)
  globals.css
public/
  fonts/           (arquivos de fonte copiados)
  llms.txt
```

## 2. Portar o Design System (obrigatório — não redesenhar)

Fonte de verdade, já pronta, em:
`../Identidade Visual/Exportações Claude Design/Design System (código completo)/`

Copiar para o novo projeto:
- `tokens/colors.css`, `tokens/spacing.css`, `tokens/typography.css` → consolidar em
  `styles/tokens.css`, mantendo os nomes de variáveis exatamente como estão (`--cerne-charcoal`,
  `--cerne-bronze`, `--cerne-offwhite`, `--font-display`, `--font-sans`, `--fs-*`, `--space-*`,
  `--radius-*`, `--shadow-card`, etc.). Não inventar novos tokens de cor.
- `assets/fonts/Fraunces-Variable.ttf`, `Fraunces-Italic-Variable.ttf`,
  `Switzer-Regular.otf`, `Switzer-Medium.otf`, `Switzer-Semibold.otf`, `Switzer-Bold.otf`
  → copiar para `public/fonts/`.
- Fontes devem ser carregadas via `next/font/local` (self-hosted, zero requisição externa,
  melhora LCP), não via `@font-face` manual nem Google Fonts CDN. Configurar variável CSS
  `--font-display` para Fraunces e `--font-sans` para Switzer, mantendo os mesmos nomes de
  variável do Design System original para não quebrar nada que for portado depois.
- Os componentes de referência (Button, Badge, Card, Input, NavBar, Footer) estão em
  `guidelines/*.html` e `components/core/` do Design System original, em HTML/CSS puro (não
  React). Recriar como componentes React/TSX equivalentes em `components/ui/`, usando os
  mesmos tokens de cor, tipografia e espaçamento — a aparência final deve ser indistinguível do
  Design System original.
- Regra de paleta: **Modo Operação** é o modo do site inteiro (fundo off-white, texto charcoal,
  bronze só como detalhe mínimo — nunca fundo de área grande). Não usar Modo Presença (fundo
  escuro) em nenhuma página do site.

## 3. Componentes globais (layout.tsx)

**NavBar:** logo/wordmark "CERNE" (Fraunces, caixa alta) + "Curadoria" (Switzer, title case,
menor) à esquerda; links Home, Sobre, Como Funciona, Contato à direita. Mobile: menu hambúrguer.

**Footer:** três colunas — (1) wordmark + endereço genérico "Zona Sul do Rio de Janeiro e Barra
da Tijuca" (sem endereço físico, é modelo de atendimento, não loja); (2) links Instagram e
WhatsApp com `href` placeholder (`#` por enquanto, sinalizado com comentário `// TODO: link real`);
(3) nenhum link visível para Política de Privacidade/Termos de Uso ainda — essas páginas existem
no código mas não aparecem na navegação nem no footer até o Pedro Henrique liberar (usar uma
constante `SITE_LAUNCHED = false` em `lib/constants.ts` que controla essa visibilidade — quando
virar `true`, os links aparecem automaticamente).

**WhatsAppButton:** botão flutuante fixo, canto inferior direito, em todas as páginas. Número
placeholder: `5521973003715` (formato internacional). Texto de mensagem pré-preenchida sugerido:
"Olá, gostaria de saber mais sobre a Cerne Curadoria." Ícone simples (SVG próprio, sem
dependência de biblioteca de ícones colorida — traço fino em `--cerne-offwhite` sobre fundo
`--cerne-charcoal`, círculo, coerente com a paleta da marca, não o verde/branco padrão do
WhatsApp).

**CookieConsentBanner:** banner discreto (Modo Operação), aparece na primeira visita, com texto
curto + link para `/politica-de-privacidade` (mesmo estando oculta da navegação, a página existe
e o link do banner funciona) + botão "Aceitar" e botão "Recusar" — nunca pré-marcado, nunca
implícito. Guardar a escolha em cookie próprio (não em localStorage). Só carregar o script do
Google Analytics depois do aceite explícito.

## 4. Metadata, SEO técnico e GEO

**Metadata API (`app/layout.tsx`):** título padrão "Cerne Curadoria — Curadoria de Espólios no
Rio de Janeiro", template `%s | Cerne Curadoria` para páginas internas, meta description padrão,
Open Graph e Twitter Card configurados com valores reais (mesmo sem imagem OG ainda — usar uma
cor sólida `--cerne-charcoal` com o wordmark como OG image temporária, gerada via
`app/opengraph-image.tsx` do próprio Next.js, não uma imagem estática).

**Schema JSON-LD (`lib/schema.ts`), injetado no `layout.tsx` de toda página:**

Gerar dois blocos `application/ld+json`:

1. `Organization` (dados reais, não inventar nada além do listado):
   - `name`: "Cerne Curadoria"
   - `description`: "Curadoria e intermediação de espólios e heranças, com esvaziamento completo
     de imóveis, atendendo famílias na Zona Sul do Rio de Janeiro e na Barra da Tijuca."
   - `areaServed`: array com `{"@type":"City","name":"Rio de Janeiro"}` — sem `address` fixo
     (é um serviço que atende no imóvel do cliente, não uma loja com endereço próprio; não
     inventar endereço).
   - `telephone`: `"+5521973003715"` (placeholder, comentar no código que é provisório)
   - `founder`: objeto `Person` com `name: "Pedro Henrique"`, `jobTitle: "Fundador e Curador"`
   - `sameAs`: array vazio por enquanto (`[]`) — será preenchido depois com Instagram e LinkedIn
     reais quando existirem.
2. `WebSite` com `name` e `url` (usar variável de ambiente para a URL final, ver seção 6).

**`llms.txt`** (criar em `public/llms.txt`, conteúdo exato abaixo — ajustar apenas se alguma URL
mudar de nome depois):

```
# Cerne Curadoria

> Curadoria e intermediação de espólios e heranças no Rio de Janeiro. Esvaziamento completo
> de imóveis para famílias em processo de inventário, mudança ou divórcio, e para parceiros
> profissionais (advogados de sucessão, contadores, corretores). Atendimento na Zona Sul do
> Rio de Janeiro e na Barra da Tijuca.

## Empresa
- [Sobre](https://cernecuradoria.com.br/sobre): Quem fundou a Cerne Curadoria e por quê.
- [Como Funciona](https://cernecuradoria.com.br/como-funciona): O processo completo, do
  primeiro contato à entrega do imóvel.

## Contato
- [Contato](https://cernecuradoria.com.br/contato): Formulário de avaliação gratuita e
  WhatsApp.
```

**`robots.ts`:** permitir indexação de todas as páginas públicas (Home, Sobre, Como Funciona,
Contato, Blog) e bloquear explicitamente `/politica-de-privacidade` e `/termos-de-uso` só se
fizer sentido técnico — na prática, como essas páginas não têm link nenhum apontando para elas,
não precisam de `disallow`, mas adicione mesmo assim por segurança.

**`sitemap.ts`:** gerar dinamicamente a partir das rotas públicas (não incluir as páginas legais
ocultas nem nada de `/blog/[slug]` até existir conteúdo real).

**Nota sobre schema FAQ/HowTo:** quando chegarmos nas páginas de conteúdo (Como Funciona, FAQ),
não usar `HowTo` nem contar com `FAQPage` para gerar destaque visual no Google — esses rich
results foram descontinuados (HowTo desde 2023, FAQ em maio/2026). O valor deles hoje é só ajudar
robôs de IA a entender a página. Isso é só um aviso para os próximos sprints, não precisa
implementar esse schema agora.

## 5. Analytics e monitoramento

- **Google Analytics 4:** implementar via `next/script`, carregando só depois do aceite no
  banner de cookies. Usar `process.env.NEXT_PUBLIC_GA_ID` — deixar vazio no `.env.example` com
  comentário `# preencher com o Measurement ID do GA4 (formato G-XXXXXXX)`. Se a variável estiver
  vazia, o script não deve carregar (evitar erro em build).
- **Google Search Console:** adicionar `<meta name="google-site-verification" content="..." />`
  no `layout.tsx`, lendo de `process.env.NEXT_PUBLIC_GSC_VERIFICATION`, mesma lógica de variável
  vazia = não renderiza a tag.
- **Vercel Analytics + Speed Insights:** instalar `@vercel/analytics` e `@vercel/speed-insights`,
  adicionar `<Analytics />` e `<SpeedInsights />` no `layout.tsx` — funcionam nativamente sem
  nenhuma conta ou ID adicional, sempre ativos.

## 6. Variáveis de ambiente (`.env.example`)

```
# URL final do site (usar o domínio autogerado da Vercel até o .com.br ser conectado)
NEXT_PUBLIC_SITE_URL=

# Google Analytics 4 — Measurement ID (formato G-XXXXXXX)
NEXT_PUBLIC_GA_ID=

# Google Search Console — código de verificação (meta tag)
NEXT_PUBLIC_GSC_VERIFICATION=

# Destino do formulário de contato (definir no Sprint de Contato — deixar vazio por ora)
CONTACT_FORM_ENDPOINT=
```

## 7. O que NÃO fazer neste sprint

- Não escrever copy final de nenhuma página — usar títulos-placeholder simples tipo
  "Home — em construção" só para confirmar que a rota e o layout funcionam.
- Não buscar nem inserir nenhuma imagem/foto.
- Não implementar o formulário de contato de verdade nem o mini-quiz de qualificação — isso é
  sprint separado.
- Não conectar domínio customizado.
- Não criar conta em nenhum serviço externo (Vercel, Google Analytics, Search Console) — essas
  contas são de responsabilidade do Pedro Henrique (ver seção 8).

## 8. Passos manuais — fora do Cursor, de responsabilidade do Pedro Henrique

Estes passos não podem ser feitos pelo Cursor nem pela Claude (exigem login em contas pessoais):

1. **Vercel:** criar conta/projeto na Vercel, conectar ao repositório
   `github.com/MyBoxStorage/cernecuradoria`, e nas configurações do projeto → *Deployment
   Protection* → deixar **Standard Protection** ativado (é o padrão, gratuito em qualquer
   plano) — isso já protege o domínio `.vercel.app` autogerado, mostrando login antes de
   qualquer pessoa fora do time acessar.
2. **Google Analytics:** criar uma propriedade GA4 gratuita, copiar o Measurement ID e colar na
   variável `NEXT_PUBLIC_GA_ID` (no painel da Vercel, em *Environment Variables*).
3. **Google Search Console:** criar a propriedade (pode usar o domínio da Vercel por enquanto),
   copiar o código de verificação e colar em `NEXT_PUBLIC_GSC_VERIFICATION`.

Quando esses três passos estiverem prontos, é só avisar — o site já está preparado para ler
essas variáveis automaticamente, sem precisar mexer em código de novo.

## 9. Ao final do sprint

Cursor deve rodar `npm run build` para confirmar que não há erro, fazer commit com mensagem
`"sprint 0: fundação técnica"` e push para o repositório. Reportar ao final: quais rotas foram
criadas, se o build passou limpo, e qualquer decisão técnica tomada que não estava 100% explícita
neste documento.
