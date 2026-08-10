# Sprint 9 — Home: Seção "Onde Atuamos" como Índice Editorial

> Pré-requisito: Sprint 8 já implementado (títulos de seção em 48px, numerais grandes no Como
> Funciona, pull-quote na Origem). Este sprint ajusta SÓ a seção "Onde Atuamos" da Home — nada
> mais na página muda.

## Contexto

Depois do Sprint 8, a seção "Onde Atuamos" ficou entre dois pontos fortes da página (numerais
grandes antes, pull-quote gigante depois) e por contraste passou a ler como a parte mais "plana"
da Home — a lista de bairros com régua horizontal entre os itens tem cara de tabela/planilha, não
de conteúdo editorial. A correção usa uma convenção tipográfica real de índice/sumário (dot
leader), não decoração nova.

## O que muda: régua horizontal → linha de pontos (dot leader)

Trocar o `border-bottom` que hoje separa cada item da lista por uma linha de pontos conectando o
nome do bairro a um numeral discreto do lado direito — a mesma lógica visual de um sumário de
livro ("Leblon . . . . . . . 01"). Aplicar nas duas colunas (Zona Sul e Barra da Tijuca).

## CSS exato

```css
.area-list-item {
  display: flex;
  align-items: baseline;
  font-family: var(--font-sans);
  font-size: var(--fs-body-lg); /* 18px — sobe do tamanho atual */
  padding-block: var(--space-4);
}

.area-list-item .nome {
  white-space: nowrap;
}

.area-list-item .leader {
  flex: 1;
  overflow: hidden;
  margin-inline: 0.5ch;
}

.area-list-item .leader::after {
  content: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .";
  color: var(--cerne-bronze);
  letter-spacing: 0.15em;
}

.area-list-item .indice {
  font-family: var(--font-display); /* Fraunces, ecoa os numerais do Como Funciona em escala bem menor */
  font-variation-settings: "opsz" 24, "wght" 460;
  font-size: 15px;
  color: var(--cerne-charcoal);
  opacity: 0.6;
}
```

**Remove:** o `border-bottom`/régua que existe hoje entre cada item da lista — sai de cena,
substituído pela linha de pontos.

## Numeração

Sequencial dentro de cada coluna, não compartilhada entre as duas:
- Zona Sul: `01` a `11` (Leblon → São Conrado, na ordem que já está implementada)
- Barra da Tijuca: `01` a `03` (Barra da Tijuca → Joá, na ordem já implementada)

## Acessibilidade — obrigatório, não opcional

A linha de pontos gerada via `::after` com `content` em texto puro é lida por leitores de tela
como uma sequência de "ponto, ponto, ponto..." antes de cada numeral, o que é uma experiência
ruim e documentada. Resolver assim:

```html
<div class="area-list-item">
  <span class="nome">Leblon</span>
  <span class="leader" aria-hidden="true"></span>
  <span class="indice" aria-hidden="true">01</span>
</div>
```

O numeral index é só decorativo/de wayfinding visual — não carrega informação que falte em outro
lugar (o nome do bairro já é o conteúdo real), por isso pode ficar totalmente oculto de leitores
de tela sem perda de informação.

## O que NÃO fazer

- Não adicionar mapa, ícone ou imagem.
- Não mudar os nomes dos bairros, a ordem ou a divisão em duas colunas.
- Não tocar no título da seção (já ajustado no Sprint 8) nem em nenhuma outra seção da Home.
- Não usar o numeral índice em tamanho grande — ele é deliberadamente pequeno e discreto (15px),
  para não competir com os numerais grandes do "Como Funciona".

## Ao final do sprint

`npm run build`, testar a linha de pontos em pelo menos 3 larguras (375px, 768px, 1440px) para
confirmar que ela se ajusta sem quebrar o alinhamento do numeral à direita, testar com um leitor
de tela (VoiceOver/NVDA, o que estiver disponível) que o `aria-hidden` está funcionando — a
leitura deve ir direto de "Leblon" para o próximo item, sem "ponto ponto ponto" nem "zero um" no
meio, commit `"sprint 9: onde atuamos — índice editorial"` e push. Reportar como ficou visualmente
e se o teste de leitor de tela passou.
