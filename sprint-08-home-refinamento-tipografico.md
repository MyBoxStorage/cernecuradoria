# Sprint 8 — Home: Refinamento Tipográfico (Ritmo e Hierarquia)

> Pré-requisito: Sprint 1 (Home) já implementado. Este sprint AJUSTA a Home existente — não
> recria nada, não muda copy, não muda estrutura de seções. É um refinamento cirúrgico baseado
> em pesquisa (não em preferência estética), para resolver a sensação de "vazio" identificada
> após o primeiro deploy.

## Contexto

A Home ficou fiel à especificação do Sprint 1, mas o resultado ficou visualmente monótono — o
espaço em branco generoso, sem nenhum contraste de escala ao longo do caminho, virou vazio em vez
de "menos, com mais cuidado". Este sprint corrige isso com 3 mudanças pontuais, todas
reaproveitando o sistema de tokens já existente (só um valor novo é adicionado, com
justificativa técnica documentada abaixo). Nenhuma cor nova, nenhum ícone, nenhuma animação de
scroll — a correção é 100% tipográfica e estrutural.

## 1. Novos tokens em `styles/tokens.css`

Adicionar, sem remover nada existente:

```css
/* Tamanho fluido para o numeral grande do "Como Funciona" — nunca menor que 56px (mobile),
   nunca maior que 144px (desktop grande). Usa rem+vw (não vw puro) por acessibilidade: vw puro
   não responde ao zoom do navegador e viola WCAG 1.4.4 (Resize Text). */
--fs-numeral: clamp(3.5rem, 2.5rem + 5vw, 9rem);

/* Eixo variável da Fraunces no topo do intervalo óptico da fonte (9–144), para o numeral expressar
   ao máximo a personalidade de display nesse tamanho. Mesmo peso do H1 (560), só o eixo óptico
   muda. */
--fv-numeral: "opsz" 144, "wght" 560;
```

## 2. Títulos de seção (H2) — Como Funciona, Onde Atuamos, Origem

Nas três seções da Home que usam `<h2>` (título "Da avaliação à entrega...", "Zona Sul do Rio de
Janeiro e Barra da Tijuca.", e o eyebrow "Origem" — este último recebe tratamento à parte, ver
item 4), aplicar `font-size: var(--fs-h1)` (48px) no lugar do que hoje resolve para
`--fs-h2` (36px).

**Importante:** a tag HTML continua `<h2>` — não mudar para `<h1>` nem duplicar H1 na página
(quebraria a hierarquia de heading validada no Sprint 7 e a única H1 da Home continua sendo o
título do hero). Isso é só uma mudança de classe CSS/tamanho visual, não de tag semântica.

## 3. Numerais do "Como Funciona" (resumo, 4 passos)

Hoje os numerais `01`–`04` são pequenos (tratados como legenda). Trocar para:

```css
.step-number {
  font-family: var(--font-display); /* Fraunces */
  font-size: var(--fs-numeral);
  font-variation-settings: var(--fv-numeral);
  color: var(--cerne-charcoal);
  line-height: 1;
}
```

Layout: o numeral grande fica acima do título do passo (Avaliação/Visita/Leilão
especializado/Entrega), não mais ao lado em tamanho pequeno. Título e descrição de cada passo
mantêm o tamanho já implementado no Sprint 1 — só o numeral cresce. Em mobile (4 colunas → 1
coluna, comportamento já existente), o numeral acompanha o `clamp()` normalmente, ficando menor
mas ainda proeminente (mínimo 56px).

**Não** aplicar esse tratamento aos numerais da página "Como Funciona" completa (`/como-funciona`,
Sprint 2) neste sprint — fica de fora do escopo por ora, tratado depois se fizer sentido replicar
a consistência entre as duas páginas.

## 4. Seção "Origem" — reestruturada como pull-quote

Esta é a mudança estrutural. O parágrafo único de hoje se divide em duas partes, usando
exatamente o texto já aprovado (nenhuma palavra nova):

**Pull-quote** (elemento novo, `<blockquote>` ou `<p>` com classe própria):
```css
.origem-quote {
  font-family: var(--font-display);
  font-size: var(--fs-display); /* 64px — reaproveita o token do H1 do hero, não cria tamanho novo */
  font-variation-settings: var(--fv-display); /* mesmo eixo já usado no hero */
  color: var(--cerne-charcoal);
  max-width: 20ch;
  line-height: var(--lh-tight);
}
```
Texto: `"O mesmo cuidado que avalia uma pintura acadêmica hoje se estende ao restante da casa."`

**Texto de apoio** (abaixo ou ao lado do pull-quote, corpo normal `--fs-body`, largura mais
estreita que o pull-quote):
Texto: `"A Cerne nasce da experiência de curadoria de arte e antiguidades de uma galeria carioca
com décadas de atuação no Rio de Janeiro."`

O link `Conhecer a história →` continua depois do texto de apoio, sem mudança.

**Restrição importante:** este é o único pull-quote de toda a Home (e do site, por enquanto). Não
replicar esse padrão em nenhuma outra seção — é um elemento de destaque único e deliberado, não
um componente reutilizável a ser espalhado pela página.

## O que NÃO fazer

- Não mudar nenhuma palavra do copy já aprovado — só reorganizar/redimensionar.
- Não adicionar cor nova, ícone, imagem ou animação de scroll.
- Não aplicar o pull-quote a mais de uma seção.
- Não mudar a tag semântica de nenhum heading.
- Não tocar nas páginas Sobre, Como Funciona ou Contato neste sprint.

## Ao final do sprint

`npm run build`, testar o `clamp()` do numeral em pelo menos 3 larguras de viewport (375px,
768px, 1440px) para confirmar que fica entre 56px e 144px como esperado, testar `prefers-reduced-motion`
(não deve ter sido afetado, já que nada disso é animação), testar zoom do navegador em 200% na
seção Origem para confirmar que o texto redimensiona corretamente (validação do uso de rem+vw),
commit `"sprint 8: home — refinamento tipográfico"` e push. Reportar como ficou visualmente cada
uma das 3 mudanças.
