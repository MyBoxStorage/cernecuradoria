# Auditoria de Qualidade — Site Institucional Cerne Curadoria
**Data:** 11/08/2026 · **Auditor:** independente, sem envolvimento na construção do site · **Escopo:** acessibilidade (WCAG), SEO técnico, GEO/AEO — não editorial, não visual.

---

## 0. Resumo da varredura de padrões atuais (Passo 0)

Verificado ao vivo via busca na web nesta sessão (não de memória):

1. **Core Web Vitals (ago/2026):** limiares "bom" permanecem **LCP < 2,5 s, INP < 200 ms, CLS < 0,1**, avaliados no percentil 75 de dados de campo (CrUX), sem mudança de threshold em 2026. Confirmado como fator de desempate no ranking, não determinante. Fontes: corewebvitals.io (mar/2026), launchcodex.com (jul/2026), technovapartners.com (jun/2026).
2. **WCAG:** a versão vigente e recomendada como padrão de mercado é **WCAG 2.2, Nível AA** (Recomendação W3C desde out/2023, elevada a norma ISO/IEC 40500:2025 em out/2025). WCAG 3.0 segue em Working Draft (mar/2026), sem previsão de finalização antes de 2028. **Confirma a premissa inicial do prompt** — nenhuma correção necessária. Fontes: pivotalaccessibility.com, ratedwithai.com (fev/2026), vervali.com (mai/2026).
3. **Rich results FAQPage/HowTo:** **confirmado descontinuado.** `HowTo` fora do Google desde set/2023 (desktop). `FAQPage` parou de aparecer no SERP em **7 de maio de 2026**; relatório do Search Console e Rich Results Test somem em junho/2026; suporte na API do GSC até agosto/2026. O schema em si **continua válido e sem penalidade** por permanecer no código — só não gera mais o acordeão visual no Google. Fontes: Search Engine Land, Search Engine Journal, getpassionfruit.com (mai/2026).
4. **llms.txt/GEO:** **segue sendo convenção de comunidade, não um padrão formal** (mantido via llmstxt.org, sem RFC formal até abr/2026). Evidência publicada em 2026 (SE Ranking, ~300 mil domínios) **não encontrou correlação entre ter llms.txt e ser citado por IA** — o próprio Google confirma que o arquivo não afeta AI Overviews/AI Mode. Onde o arquivo tem uso real e comprovado é como leitura por **agentes de código** (Cursor, Claude Code etc.) em sites de documentação — não é esse o caso aqui. O que de fato move citação por IA, segundo as mesmas fontes, é conteúdo "resposta direta" bem estruturado, consistência de entidade e presença em terceiros (não o llms.txt isoladamente). Fontes: presenc.ai (abr/2026), organikpi.com (jul/2026), ariashaw.com (jul/2026).
5. **Renderização Next.js/Vercel:** nenhuma mudança de rastreamento/indexação específica para Next.js/Vercel identificada nesta varredura que afete o projeto além do já sabido (SSG/ISR são bem suportados).
6. **Schema.org Organization/Service/Person:** nenhuma propriedade nova obrigatória identificada nesta varredura além das já em uso. `LocalBusiness`/NAP (endereço físico) não é obrigatório quando o negócio não tem endereço público de atendimento — ver achado 4.1 abaixo.

**Ajuste em relação à premissa inicial do prompt:** nenhum. As referências de partida (WCAG 2.2 AA; FAQPage descontinuado desde maio/2026) **se confirmaram exatamente como estavam descritas** no prompt.

**Limite de escopo desta auditoria (declarado por transparência):** o ambiente não tinha um scanner axe-core standalone nem Lighthouse-CLI prontos para rodar página a página nesta sessão. Foi executado `npm run build` e `npm run lint` limpos nesta sessão (evidência fresca), e foram lidos os relatórios Lighthouse já existentes no repositório (`lighthouse-desktop.json`, `lighthouse-mobile.json`, `lighthouse-desktop-prod.json`, `lighthouse-mobile-prod.json`, `lighthouse-a11y.json`, gerados em 10/08/2026, véspera desta auditoria) — **todos cobrem apenas a Home (`/`)**, nenhum cobre Sobre, Como Funciona, Contato ou Blog. O restante da auditoria de Sobre/Como Funciona/Contato/Blog foi feito por **revisão de código real** (não de documentação de planejamento), não por ferramenta automatizada rodada nesta sessão. Isso está marcado explicitamente em cada achado abaixo.

---

## 1. Tabela-resumo

| # | Categoria | Nota | Achados críticos | Achados médios |
|---|---|---|---|---|
| 1 | Rastreabilidade e indexação | Precisa de atenção | 1 | 1 |
| 2 | SEO on-page | Adequado | 0 | 2 |
| 3 | Core Web Vitals e performance | **Crítico** | 1 | 1 |
| 4 | Schema estruturado e consistência de entidade | Adequado | 0 | 1 |
| 5 | GEO/AEO | Adequado | 0 | 1 |
| 6 | E-E-A-T e sinais de confiança | Adequado | 0 | 0 |
| 7 | Acessibilidade (WCAG 2.2 AA) | Precisa de atenção | 0 | 4 |
| 8 | Mobile e responsividade | Precisa de atenção | 1 (compartilhado com #3) | 0 |
| 9 | Local SEO | Adequado | 0 | 1 |
| 10 | Segurança e configuração básica | Não testável até ativação | 0 | 0 |

---

## 2. Achados detalhados

### 1. Rastreabilidade e indexação

**1.1 — CRÍTICO/estrutural — `robots.txt` bloqueia rastreamento das mesmas páginas que dependem de `noindex` para sair do índice.**
- **Localização:** `app/robots.ts` (disallow de `/politica-de-privacidade` e `/termos-de-uso`) vs. `app/politica-de-privacidade/page.tsx` e `app/termos-de-uso/page.tsx` (ambas com `metadata.robots = { index: false, follow: true }`).
- **Evidência:** código lido diretamente — os dois mecanismos coexistem apontando para as mesmas URLs.
- **Por que importa:** é uma contradição técnica conhecida. Se o Googlebot é impedido de rastrear a página pelo `robots.txt`, ele **nunca chega a ler a tag `noindex`** — e se a URL for descoberta por outro caminho (ex.: um link direto, como o que já existe no formulário de contato para a Política de Privacidade), o Google pode listá-la mesmo assim, só que sem snippet, porque não conseguiu ler o conteúdo nem a instrução de exclusão. O padrão correto para remover uma página do índice de forma confiável é **usar só o `noindex`, sem bloquear o rastreamento** — ou, se o bloqueio por `robots.txt` é intencional, remover o `noindex` (redundante e ineficaz nesse caso).
- **Corrigir:** remover `/politica-de-privacidade` e `/termos-de-uso` do `disallow` em `app/robots.ts`, mantendo apenas o `noindex` nas duas páginas.
- **Fonte/justificativa:** comportamento documentado publicamente pelo próprio Google Search Central sobre a interação entre `robots.txt` e `meta robots` (conhecimento pré-existente, não verificado ao vivo nesta sessão — o comportamento é estável e não muda ano a ano, mas fica marcado como tal por transparência).

**1.2 — Médio — `sitemap.xml` usa `lastModified: new Date()` (hora do build) para todas as rotas estáticas, não a data real da última alteração de conteúdo.**
- **Localização:** `app/sitemap.ts`, linha do `staticRoutes.map`.
- **Evidência:** código lido diretamente — `lastModified: new Date()` é avaliado a cada build/deploy, então toda rota estática sempre aparece "modificada agora", mesmo quando nada mudou.
- **Por que importa:** um `lastmod` que muda a cada deploy sem mudança real de conteúdo é um sinal que o Google já demonstrou publicamente que aprende a ignorar ao longo do tempo — reduzindo a utilidade real do sinal quando o conteúdo *de fato* mudar.
- **Corrigir:** manter uma data de última edição real por página (mesmo que manual, num arquivo de constantes) só sendo atualizada quando o conteúdo textual da página mudar.
- **Não testável até a ativação:** validação do `sitemap.xml`/`robots.txt` reais contra o Google Search Console propriamente dito (o domínio ainda não está público).

### 2. SEO on-page

**2.1 — Médio — títulos e descriptions são únicos e bem escritos página a página** (Home, Sobre, Como Funciona, Contato, páginas legais), todos com `alternates.canonical` explícito por página — **Adequado**, sem achado aqui. Único ponto de atenção: o `layout.tsx` raiz não define `alternates.canonical` de fallback nem imagem padrão de Open Graph fora da já gerada por `opengraph-image.tsx` — isso é aceitável porque cada página define o seu, mas rotas futuras que esquecerem de declarar `canonical` ficarão sem um (Next.js não gera automaticamente).

**2.2 — Médio — Home: a seção "Origem" (`app/page.tsx`) não tem elemento de heading.**
- **Localização:** `app/page.tsx`, seção 4 ("Origem e confiança") — usa `<SectionLabel>Origem</SectionLabel>` + `<blockquote>`, sem `<h2>`/`<h3>` visível.
- **Evidência:** todas as outras seções da Home (`Como funciona`, `Onde atuamos`) têm `<h2>` correspondente; esta é a exceção.
- **Por que importa:** quebra a expectativa de hierarquia de heading por seção e prejudica navegação por heading em leitor de tela (usuário pulando de `<h2>` em `<h2>` simplesmente não vê essa seção listada).
- **Corrigir:** promover o texto do `SectionLabel` ou adicionar um `<h2>` visualmente equivalente ao blockquote.

### 3. Core Web Vitals e performance

**3.1 — CRÍTICO — LCP mobile falha o limiar "bom" com folga, tanto em produção quanto em dev.**
- **Localização:** Home (`/`), única rota com relatório Lighthouse disponível.
- **Evidência (ferramenta real, não estimativa):**

| Relatório | Ambiente | Performance | LCP | CLS | TBT |
|---|---|---|---|---|---|
| `lighthouse-mobile-prod.json` | mobile, build de produção | 80 | **5,6 s** | 0 | 40 ms |
| `lighthouse-mobile.json` | mobile, dev | 76 | **7,1 s** | 0 | 100 ms |
| `lighthouse-desktop-prod.json` | desktop, build de produção | 98 | 1,1 s | 0 | 0 ms |
| `lighthouse-desktop.json` | desktop, dev | 97 | 1,3 s | 0 | 0 ms |

- **Por que importa:** o limiar "bom" confirmado no Passo 0 é **LCP < 2,5 s**. Mesmo o número de produção (5,6 s) está mais de **2x acima do limiar "bom" e dentro da faixa "ruim"** (> 4 s), avaliado no formato que o Google realmente usa para ranquear (dado de campo mobile, que é historicamente o pior report, como os próprios artigos pesquisados no Passo 0 confirmam). Como CWV é sinal de desempate, isso deixa o site em desvantagem estrutural assim que entrar em disputa por conteúdo comparável — e é a métrica de performance mais fácil de justificar como prioridade #1 (ver seção 4 abaixo).
- **Corrigir:** identificar o elemento LCP mobile real (provavelmente o `<h1>` do hero, que usa a fonte Fraunces com `preload: true` — ou uma imagem/seção acima da dobra) e medir separadamente TTFB, tempo de carregamento de fonte e render-blocking em mobile especificamente; o gap entre desktop (1,1s) e mobile (5,6s) é grande demais para ser só "mobile é mais lento" — sugere um recurso específico penalizando desproporcionalmente conexões/CPUs mais lentas.
- **Limite desta auditoria:** só a Home foi medida. Sobre, Como Funciona e Contato (que carrega `ContactFlow.tsx`, client component maior) **não têm relatório Lighthouse gerado nesta sessão nem na anterior** — ficam como não testados, não como aprovados.

### 4. Schema estruturado e consistência de entidade

**4.1 — Médio — `Organization` não declara `PostalAddress`/NAP, e o tipo usado é `Organization` genérico, não `LocalBusiness`.**
- **Localização:** `lib/schema.ts`, função `organizationSchema()`.
- **Avaliação, não achado de defeito:** dado que a Cerne atende famílias na casa delas e não tem endereço público de atendimento (modelo de negócio confirmado no documento mestre do projeto), a ausência de `address`/NAP é **coerente com a operação real**, não um erro. Ainda assim, vale registrar: se em algum momento a Cerne tiver um endereço de correspondência formal (ex.: para o CNPJ), `PostalAddress` reforça consistência de entidade para GEO/Local SEO sem expor endereço de atendimento (que é diferente do endereço de registro da empresa).
- **Estrutura para os campos hoje vazios (`sameAs`) está correta:** confirmado em `lib/constants.ts` — `FOUNDER.sameAs: [] as readonly string[]`, reaproveitado tanto por `organizationSchema()` quanto por `personSchema()` a partir de uma única fonte. Quando o Instagram/LinkedIn existirem, basta preencher um array — **isso já foi verificado como corretamente implementado**, não como pendência nova (a pendência do dado em si já está registrada no `checklist-de-ativacao-site.md`).
- **Achado adicional real (não apenas estrutural):** o campo `telephone` do `Organization` schema **já está publicado com um número de WhatsApp pessoal placeholder** (`WHATSAPP_PHONE` em `lib/constants.ts`, comentado no próprio código como "substituir pelo número definitivo antes do lançamento"). Isso é esperado pré-lançamento e coberto pelo checklist existente — mas fica registrado aqui porque o dado já está **estruturalmente vinculado ao schema JSON-LD**, não só ao botão de WhatsApp visível; vale conferir os dois lugares (schema + botão) no momento da troca do número.

### 5. GEO/AEO

**5.1 — Médio — `llms.txt` implementado corretamente como arquivo, mas o investimento de expectativa deveria ser recalibrado à luz da evidência de 2026 (ver Passo 0, item 4).**
- **Localização:** `app/llms.txt/route.ts`.
- **Avaliação técnica do arquivo em si:** correto — gera lista de rotas reais + posts dinamicamente a partir de `getAllPosts()`, sem hardcode, `Content-Type` e cache-control adequados. **Adequado tecnicamente.**
- **Achado real:** o racional documentado no projeto ("schema mantido por valor de citação por IA") é otimista frente à evidência publicada em 2026 especificamente para `llms.txt` — a pesquisa do Passo 0 não encontrou estudo com correlação positiva entre o arquivo e citação por IA para sites de conteúdo/institucionais (diferente de sites de documentação técnica, onde agentes de código o consultam de fato). Isso não significa remover o arquivo (custo é baixo, e ele não atrapalha), mas significa que ele **não deve ser tratado como a alavanca principal de GEO** — o que de fato tem evidência (ver Top 5 abaixo) é outra coisa.
- **FAQPage schema:** mantido corretamente em Como Funciona mesmo após a descontinuação do rich result — decisão correta segundo o Passo 0 (schema não é banido, e pode ajudar mecanismos de IA a extrair pares pergunta/resposta mesmo sem gerar acordeão no Google). Fonte da fonte única de verdade (`FAQ_ITEMS` em `lib/como-funciona-content.ts`) reaproveitada tanto no schema quanto no componente visível — sem risco de divergência entre o que aparece na página e o que está no JSON-LD. **Adequado.**

### 6. E-E-A-T e sinais de confiança

Sem achados de defeito nesta categoria. Autoria visível (`Person` schema vinculado a `Organization` via `@id`, página Sobre com biografia real e nome do pai/negócio de origem citado) está implementada de forma tecnicamente correta e consistente entre HTML visível e JSON-LD. Página com foto placeholder tratada com `role="img"` e `aria-label` descritivo em vez de `<img>` quebrada — solução tecnicamente adequada para um estado temporário.

### 7. Acessibilidade (WCAG 2.2 AA)

**7.1 — Médio — contraste insuficiente confirmado por ferramenta automatizada (Lighthouse, que usa axe-core) no rodapé.**
- **Localização:** `.footer__col-title` (`components/ui/ui.css`, seletor `body > footer.footer > div > div.footer__col-title`), texto "Contato" no rodapé da Home.
- **Evidência real de ferramenta:** `lighthouse-desktop.json` → auditoria `color-contrast`, `score: 0` (falha), elemento identificado nominalmente no relatório.
- **Detalhe técnico:** a cor aplicada é a variável `--offwhite-70-on-charcoal` (mistura OKLab de 70% `#F4F1EA` com 30% `#1C2620`) sobre fundo `--cerne-charcoal` (`#1C2620`), em texto de **11px, uppercase, letter-spacing 0.08em** — tamanho abaixo do limiar de "texto grande" (que exigiria só 3:1); nesse tamanho a exigência AA é **4,5:1**. Não recalculei a razão exata à mão porque a mistura é em espaço OKLab (não é uma média linear simples de RGB) e uma estimativa manual seria pouco confiável — mas a falha já está confirmada pela ferramenta, que renderiza a página de verdade.
- **Corrigir:** testar a cor renderizada real num verificador de contraste (ex. o próprio DevTools do Chrome no elemento) e ajustar a mistura (aumentar a proporção de offwhite, ou aplicar a cor sólida `--cerne-offwhite` em vez da mistura) até passar de 4,5:1.
- **Alcance:** essa é a única falha de `color-contrast` encontrada na Home; **não testado** em Sobre/Como Funciona/Contato nesta sessão (mesma limitação do item 3.1).

**7.2 — Médio — ausência de link "pular para o conteúdo" (skip link).**
- **Localização:** `app/layout.tsx` — `<NavBar />` renderizado diretamente antes de `<main>`, sem `<a href="#main-content">` como primeiro elemento focável do `<body>`.
- **Por que importa:** WCAG 2.2, critério **2.4.1 Bypass Blocks (Nível A)** — o mais básico dos três níveis, não apenas AA. Sem skip link, um usuário de teclado/leitor de tela precisa passar pelo NavBar (com submenu mobile) em toda página antes de chegar ao conteúdo principal.
- **Corrigir:** adicionar um link de salto visualmente oculto (visível só no foco) no topo do `<body>`, apontando para um `id="main-content"` em `<main>`.

**7.3 — Médio — `ContactFlow.tsx`: o painel do passo atual recebe `aria-hidden="true"` durante a transição de 180 ms enquanto o elemento clicado ainda pode estar com foco.**
- **Localização:** `components/ContactFlow.tsx`, `<div className="contact-flow__panel..." aria-hidden={!panelVisible}>`.
- **Por que importa:** aplicar `aria-hidden="true"` a um contêiner que ainda contém o elemento com foco do teclado é um padrão de autoria ARIA desaconselhado — o comportamento entre navegadores/leitores de tela é inconsistente (alguns bloqueiam a movimentação de foco, outros deixam o foco "preso" num elemento tecnicamente invisível para tecnologia assistiva) e pode gerar confusão de navegação por teclado/leitor de tela nas transições entre os 4 passos do formulário.
- **Corrigir:** mover o foco explicitamente para o heading (`h2`) do novo passo ao trocar de painel (`ref.current?.focus()` num `<h2 tabIndex={-1}>`), ou remover o `aria-hidden` da transição e depender só da troca de conteúdo.

**7.4 — Médio — links de navegação ativos não usam `aria-current="page"`.**
- **Localização:** `components/ui/NavBar.tsx` — o estado ativo é sinalizado só via classe CSS (`navbar__link--active`), tanto no menu desktop quanto no mobile.
- **Por que importa:** é uma prática de ARIA recomendada (não um critério WCAG isolado, mas parte de boas práticas de navegação — WAI-ARIA Authoring Practices) para que tecnologia assistiva anuncie qual item do menu corresponde à página atual. Hoje essa informação é só visual.
- **Corrigir:** adicionar `aria-current={active ? "page" : undefined}` nos dois `<Link>` de item de menu.

**Pontos verificados e considerados adequados nesta categoria (registrados brevemente, sem elogio estendido, conforme instrução do prompt):**
- `FaqAccordion.tsx`: padrão de disclosure correto (`button` semântico dentro de `h3`, `aria-expanded`, `aria-controls`, `role="region"` + `aria-labelledby` no painel, `hidden` nativo). Adequado.
- `Input.tsx`: `<label>` envolvendo `<input>`/`<textarea>` — associação implícita válida em todos os campos do formulário de contato. Adequado.
- `:focus-visible` global definido em `styles/globals.css` (outline 1px sólido + offset 3px) — presente e consistente em todo o site, mas **não verificado** se a cor do outline (`--cerne-bronze`, `#B08D4F`) atinge 3:1 de contraste não-textual (WCAG 1.4.11) contra todos os fundos onde aparece; fica como item a confirmar, não como falha confirmada.
- `ContactFlow.tsx` respeita `prefers-reduced-motion` explicitamente via `matchMedia` antes de animar a troca de passos. Adequado.
- Honeypot anti-spam (`contact-honeypot`) usa `tabIndex={-1}` no campo real, evitando que apareça na ordem de tabulação — implementação correta do padrão.

### 8. Mobile e responsividade

Ver achado **3.1** (LCP mobile crítico) — a análise de responsividade de layout em si (sem quebra de grid, `.footer` e `.areas-grid` com breakpoints declarados em `ui.css`/`home.css`) não mostrou problema estrutural na revisão de código, mas **não foi testada visualmente em viewport real nesta sessão** (sem Playwright/browser automation executado neste escopo) — o achado crítico real e confirmado desta categoria é de performance, não de layout.

### 9. Local SEO

**9.1 — Médio — área de atendimento declarada de forma consistente, mas só em `Service`, não replicada no `Organization`.**
- **Localização:** `lib/schema.ts` — `serviceSchema()` lista `Rio de Janeiro` + todos os bairros de `NEIGHBORHOODS_ZONA_SUL`/`NEIGHBORHOODS_BARRA` em `areaServed`; `organizationSchema()` lista só `Rio de Janeiro` (cidade), sem os bairros.
- **Por que importa:** não é um erro — é normal a granularidade variar entre `Organization` (entidade) e `Service` (oferta) — mas para reforçar sinal de Local SEO por bairro de forma consistente em toda a entidade, replicar a lista de bairros também no `areaServed` do `Organization` é uma prática comum e de baixo custo, já que os dados já existem centralizados em `lib/constants.ts`.

### 10. Segurança e configuração básica

**Não testável até a ativação**, conforme já sinalizado no `checklist-de-ativacao-site.md` do próprio projeto — headers de segurança definitivos, HSTS e HTTPS dependem do domínio final conectado à Vercel. Nenhuma configuração básica incorreta foi encontrada no código (`next.config.ts` não define headers customizados nem os desfaz).

---

## 3. Top 5 ações que mais impactam ranqueamento e citação por IA agora

Priorizado por impacto real medido/confirmado nesta auditoria, não por facilidade:

1. **Resolver o LCP mobile (achado 3.1).** É o único achado desta auditoria com evidência numérica de ferramenta mostrando falha clara de um sinal de ranking confirmado (CWV), e mobile é onde a maioria do tráfego de busca acontece. Prioridade #1 incontestável.
2. **Corrigir o conflito `robots.txt` (disallow) × `noindex` nas páginas legais (achado 1.1).** Baixo esforço, mas é o tipo de contradição técnica que pode deixar URLs indexadas parcialmente (sem snippet) de forma incontrolável assim que o site for público — melhor resolver antes da ativação do domínio, não depois.
3. **Rodar Lighthouse + verificação de contraste em todas as páginas, não só a Home**, antes do lançamento — hoje só a Home tem dado real de performance/acessibilidade; Sobre, Como Funciona e principalmente Contato (que carrega o formulário multi-etapa em client-side) são as páginas de maior probabilidade de LCP/CLS pior e ainda não têm nenhuma medição.
4. **Não investir esforço adicional em `llms.txt`/GEO além do que já existe** (achado 5.1) — está tecnicamente correto e custou pouco, mas a evidência de 2026 não sustenta tratá-lo como alavanca principal. O esforço de GEO que a mesma pesquisa mostra ter evidência real — conteúdo em formato "resposta direta", consistência de entidade, presença em plataformas de terceiros — já está parcialmente coberto pelo FAQPage e pelo schema Person/Organization consistente; a lacuna real são os itens 3 e 4 do checklist de ativação do próprio projeto (perfis reais de Instagram/LinkedIn), que são precondição para esse tipo de sinal funcionar, não um problema técnico deste código.
5. **Corrigir o padrão de foco/ARIA na transição do `ContactFlow` (achado 7.3) e adicionar skip link (achado 7.2).** Ambos são baixo esforço e o formulário de contato é, por definição, a página de conversão do site — qualquer atrito real de navegação por teclado/leitor de tela ali tem custo direto de lead perdido, não só de conformidade.
