# Sprint 1 — Home

> Prompt para o agente do Cursor executar. Pré-requisito: Sprint 0 concluído (fundação técnica,
> Design System portado, componentes de UI existentes em `components/ui/`). Este sprint substitui
> o placeholder de `app/page.tsx` pela Home de verdade — layout, copy final e schema desta página.

## Regra de ouro deste sprint (leia antes de tudo)

O objetivo explícito é que este site **não pareça "feito por IA"** — nem no código gerado, nem
no resultado visual. Isso é uma prioridade tão importante quanto o SEO. Antes de implementar
qualquer seção, revise mentalmente contra esta lista de proibições:

**Nunca fazer:**
- Cantos arredondados além do que já está nos tokens (`--radius-sm: 2px`, `--radius-md: 4px`).
  Nunca `border-radius` grande, nunca pill-shape em botão ou input.
- Glassmorphism, `backdrop-filter: blur()`, gradientes decorativos de fundo, sombras coloridas.
- Ícones de biblioteca genérica (Lucide, Font Awesome, Heroicons etc.) ou emoji. O Design
  System não usa ícones — a marca se apoia em tipografia e espaço. Onde parecer que "falta um
  ícone", a resposta correta é resolver com tipografia/espaço, não adicionar um.
- O padrão "hero centralizado + 3 caixinhas com ícone e texto embaixo" — é o layout mais
  repetido em sites genéricos/gerados por IA. As seções abaixo têm estrutura própria, seguir
  exatamente como descrito, não substituir por esse padrão.
- Blocos de "número grande + label pequeno" tipo contador de estatística (ex: "500+ clientes") —
  não temos esse tipo de dado e não é o tom da marca.
- Animação decorativa espalhada (hover crescendo em tudo, fade em cada linha ao rolar,
  elementos flutuando). Ver seção de movimento abaixo — só um momento de entrada é permitido.
- Qualquer cor fora das três da paleta (`--cerne-charcoal`, `--cerne-bronze`, `--cerne-offwhite`)
  e suas variações tonais já definidas em `tokens.css`.

**Fazer, como assinatura visual da página:**
- Tipografia com contraste dramático de verdade: título de hero grande e com peso pesado da
  Fraunces (eixo óptico alto, `--fv-display`), versus corpo de texto pequeno e discreto
  (`--fv-text`). A diferença de peso visual entre os dois é a personalidade da página — não
  suavizar isso.
- Espaço em branco generoso e deliberado entre seções (usar os tokens `--space-9` /
  `--space-10` entre seções, não só `--space-6`/`--space-7`). O espaço vazio comunica a mesma
  ideia que o serviço entrega: menos, com mais cuidado. Não comprimir a página para "caber mais
  coisa visível".
- O único elemento decorativo permitido, repetido de forma consistente (não decorativa
  gratuita): uma linha fina horizontal em `--cerne-bronze` (2px de altura, largura curta,
  40-64px) acompanhando um pequeno rótulo/eyebrow em versalete antes de cada título de seção —
  mesmo padrão já usado no grid de Instagram do Design System. Esse é o "assinatura" visual do
  site inteiro. Não usar esse elemento decorativo em nenhum outro lugar além disso.

## Movimento (a única exceção às "zero animações")

Um único momento orquestrado permitido: no carregamento da Home, o hero (eyebrow → título →
subtítulo → botão) aparece em sequência curta e suave (fade + leve deslocamento vertical,
100-150ms de defasagem entre cada elemento, nunca mais que 400ms de duração total por elemento).
Nada mais na página anima ao rolar. Respeitar `prefers-reduced-motion: reduce` (desativar
completamente a sequência se o usuário tiver essa preferência ativada).

## Estrutura da página (5 seções, nesta ordem)

### 1. Hero

Layout: eyebrow pequeno em versalete + título grande (Fraunces, peso alto) + subtítulo (Switzer,
corpo) + um único botão de ação. Fundo `--cerne-offwhite` (Modo Operação — nunca fundo escuro
aqui). Alinhamento à esquerda, não centralizado (centralizar tudo é outro tique de template
genérico). Espaço generoso acima e abaixo.

Copy exato:
- Eyebrow: `Curadoria de espólios`
- Título (H1): `O mesmo cuidado de uma curadoria de arte, agora para a casa inteira.`
- Subtítulo: `A Cerne Curadoria realiza o esvaziamento completo de imóveis em processos de
  inventário, mudança ou divórcio, com curadoria e leilão especializado — na Zona Sul do Rio de
  Janeiro e na Barra da Tijuca.`
- Botão único: `Solicitar avaliação gratuita` → link para `/contato`

Nenhum segundo botão/link concorrendo nesta seção.

### 2. Como funciona (resumo)

Eyebrow: `Como funciona` + linha bronze (o elemento de assinatura descrito acima).
Título de seção (H2): `Da avaliação à entrega, com clareza em cada etapa.`

4 passos em sequência horizontal (desktop) / vertical (mobile), cada um com número simples
(01–04, aqui os numerais fazem sentido porque é uma sequência real) + título curto + uma linha
de descrição:

1. **Avaliação** — Vídeo e fotos da casa, sem compromisso.
2. **Visita** — Curadoria presencial e explicação de todo o processo.
3. **Leilão especializado** — Cada peça avaliada e destinada com cuidado.
4. **Entrega** — Imóvel esvaziado, com clareza do início ao fim.

Abaixo dos 4 passos, um link discreto (não botão): `Ver o processo completo →` levando para
`/como-funciona`.

### 3. Áreas de atendimento

Eyebrow: `Onde atuamos` + linha bronze.
Título (H2): `Zona Sul do Rio de Janeiro e Barra da Tijuca.`

Lista tipográfica (não mapa, não cards com ícone) dos bairros, organizada em duas colunas
simples:

Coluna 1 — Zona Sul: Leblon, Ipanema, Gávea, Jardim Botânico, Lagoa, Botafogo, Flamengo,
Laranjeiras, Urca, Copacabana, São Conrado.
Coluna 2 — Barra da Tijuca: Barra da Tijuca, Recreio dos Bandeirantes, Joá.

Nota para o Pedro Henrique (deixar como comentário no código, não como texto visível): se algum
bairro dessa lista não fizer sentido atender ou se faltar algum, é só remover/adicionar — a
lista foi montada com base na divisão geográfica padrão da Zona Sul do Rio, não em dado
confirmado caso a caso.

### 4. Origem e confiança

Eyebrow: `Origem` + linha bronze.
Duas ou três linhas, sem título grande de seção nesta parte (mantém o tom de nota breve, não de
seção com peso igual às outras):

`A Cerne nasce da experiência de curadoria de arte e antiguidades de uma galeria carioca com
décadas de atuação no Rio de Janeiro. O mesmo cuidado que avalia uma pintura acadêmica hoje se
estende ao restante da casa.`

Link discreto: `Conhecer a história →` levando para `/sobre`.

### 5. CTA final

Fundo `--cerne-charcoal` (única seção da Home em Modo Presença invertido — usar aqui como
fechamento de página é aceitável e cria contraste editorial deliberado, não decorativo).
Texto curto + botão:

`Uma avaliação inicial não tem custo nem compromisso. É uma conversa para entender a situação
da família e explicar como o processo funciona.`

Botão: `Solicitar avaliação gratuita` → `/contato` (mesmo destino do hero, texto idêntico —
consistência de rótulo é intencional, não repetição por preguiça).

## SEO desta página específica

- `<title>`: `Cerne Curadoria — Curadoria de Espólios na Zona Sul do Rio de Janeiro`
- `meta description`: `Esvaziamento completo de imóveis em inventário, mudança ou divórcio.
  Curadoria de espólios com discrição e cuidado, na Zona Sul do Rio de Janeiro e Barra da
  Tijuca.`
- `H1` único da página é o título do hero. Não repetir "Cerne Curadoria" dentro do H1 (o nome já
  está na NavBar e no title tag — o H1 deve descrever o benefício, não repetir a marca).
- Adicionar, além do schema `Organization`/`WebSite` global (já implementado no layout no
  Sprint 0), um schema `Service` específico desta página no `page.tsx` da Home:
  - `name`: "Curadoria e Esvaziamento de Espólios"
  - `provider`: referência ao `Organization` já definido
  - `areaServed`: reaproveitar a lista de bairros da seção 3 como array de `{"@type":"Place","name": "..."}`, mais `{"@type":"City","name":"Rio de Janeiro"}`
  - `serviceType`: "Curadoria de espólio"

## O que NÃO fazer neste sprint

- Não implementar o formulário de contato real (isso é sprint próprio) — o botão da Home só
  faz `<Link href="/contato">`, a página de destino continua placeholder até o sprint dela.
- Não usar nenhuma foto/imagem além do que já existe (fontes, OG image gerada no Sprint 0).
- Não adicionar nenhuma seção além das 5 descritas acima, mesmo que pareça "faltar algo" — a
  Home enxuta é decisão deliberada, não incompletude.
- Não escrever nenhuma variação de copy diferente da especificada acima. Se algo parecer
  melhorável, sinalizar no relatório final em vez de reescrever por conta própria.

## Ao final do sprint

Rodar `npm run build`, conferir que a Home renderiza corretamente em mobile e desktop
(especialmente a lista de bairros em 2 colunas — deve virar 1 coluna empilhada em mobile), testar
o `prefers-reduced-motion`, fazer commit `"sprint 1: home"` e push. Reportar: prints ou descrição
de como cada seção ficou, qualquer ajuste de espaçamento que precisou fugir levemente dos tokens
padrão para funcionar bem visualmente, e confirmação de que nenhuma das proibições da seção
"Regra de ouro" foi violada.
