# Sprint 9c — Onde Atuamos: Rebalancear Colunas

> Pré-requisito: Sprints 9 e 9b implementados (índice com linha de pontos, sem bug de quebra).
> Ajuste de grid, não de conteúdo ou estilo — a Zona Sul (11 bairros) deixava uma coluna muito
> mais alta que a Barra da Tijuca (3 bairros), sobrando um vazio grande ao lado da coluna curta.

## O que muda

A lista de "Zona Sul" se divide em duas colunas (6 + 5 bairros), a lista de "Barra da Tijuca"
continua como está. Resultado: 3 colunas de altura parecida, no lugar de 2 colunas desiguais.

**Divisão exata da Zona Sul:**
- Coluna A (6 itens): Leblon, Ipanema, Gávea, Jardim Botânico, Lagoa, Botafogo
- Coluna B (5 itens): Flamengo, Laranjeiras, Urca, Copacabana, São Conrado

**Numeração:** continua sequencial de 01 a 11 entre as duas colunas (Coluna A: 01–06, Coluna B:
07–11) — não reinicia em 01 na Coluna B, porque ainda é a mesma lista/categoria, só quebrada em
duas colunas por razão de layout. Barra da Tijuca continua com numeração própria, 01–03, sem
mudança.

**Rótulo "ZONA SUL":** aparece só acima da Coluna A. A Coluna B não repete o rótulo — a
numeração contínua (07 em diante) já deixa claro que é continuação da mesma lista, não uma
categoria nova. Colocar a Coluna A e a Coluna B com um espaçamento horizontal menor entre elas
do que o espaçamento entre o bloco Zona Sul (A+B) e o bloco Barra da Tijuca — isso reforça
visualmente que A+B são uma coisa só, e Barra da Tijuca é outra.

## Grid

```css
.areas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--space-6); /* mesmo valor já usado entre Zona Sul/Barra da Tijuca hoje */
  row-gap: var(--space-7);
}

.areas-grid .zona-sul-a { grid-column: 1; }
.areas-grid .zona-sul-b { grid-column: 2; }
.areas-grid .barra-tijuca { grid-column: 3; }
```

## Responsivo

- Desktop (>1024px): 3 colunas lado a lado, como especificado acima.
- Tablet (768–1024px): 2 colunas — Zona Sul A + Zona Sul B na primeira linha, Barra da Tijuca
  ocupando a linha de baixo sozinha (`grid-template-columns: repeat(2, 1fr)`, Barra da Tijuca
  com `grid-column: 1 / -1`).
- Mobile (≤768px): 1 coluna, empilhado na ordem Zona Sul A → Zona Sul B → Barra da Tijuca (mesmo
  comportamento de empilhamento que já existia antes deste sprint, só que agora com 3 blocos em
  vez de 2).

## O que NÃO fazer

- Não mudar o estilo do índice (linha de pontos, numeral) implementado nos Sprints 9/9b — só a
  divisão em colunas muda.
- Não adicionar nem remover nenhum bairro da lista.
- Não tocar em nenhuma outra seção da Home.

## Ao final do sprint

`npm run build`, testar as 3 larguras de referência (375px, 768px, 1440px) conferindo o
comportamento responsivo descrito acima, confirmar visualmente que as alturas das 3 colunas no
desktop ficam próximas (sem vazio grande sobrando), commit
`"sprint 9c: onde atuamos — rebalancear colunas"` e push.
