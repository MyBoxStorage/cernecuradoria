# Sprint 10 — Sobre: Fechamento em Pull-Quote e Ritmo Narrativo

> Pré-requisito: Sprint 3 (Sobre) já implementado. Ajuste pontual — mesma lógica de restrição
> já usada nos Sprints 8/9 na Home, adaptada para uma página de narrativa contínua (não modular).
> Nenhuma palavra do copy muda, só tratamento visual e espaçamento.

## Contexto

A Sobre é uma narrativa única e contínua, diferente da Home (que é modular, várias seções). Por
isso o ajuste aqui é mais discreto: um único pull-quote no fechamento da história (não um por
bloco), e mais presença para o parágrafo que carrega o núcleo da narrativa (a origem, via o pai).

## 1. Parágrafo final vira pull-quote

Hoje: `"É esse olhar — herdado, e agora meu — que guio em cada avaliação: cuidado com o que tem
valor, discrição com quem está vivendo um momento difícil, e organização para que tudo aconteça
sem urgência desnecessária."` está em corpo de texto normal.

Trocar para o mesmo tratamento de pull-quote já implementado na seção Origem da Home (Sprint 8),
reaproveitando os tokens existentes — não criar nada novo:

```css
.sobre-closing-quote {
  font-family: var(--font-display); /* Fraunces */
  font-size: var(--fs-display); /* 64px desktop */
  font-variation-settings: var(--fv-display);
  color: var(--cerne-charcoal);
  max-width: 24ch;
  line-height: var(--lh-tight);
}

@media (max-width: 768px) {
  .sobre-closing-quote {
    font-size: var(--fs-h1); /* 48px mobile, mesmo padrão já usado no pull-quote da Home */
  }
}
```

Este é o único pull-quote de toda a página Sobre — não aplicar a mais nenhum outro parágrafo.

## 2. Parágrafo da origem ganha mais presença

O parágrafo `"A Cerne nasce de uma percepção do meu pai, Alexandre Teixeira de Souza..."` sobe de
`--fs-body` (16px) para `--fs-body-lg` (18px) — é o núcleo narrativo da página (a história por
trás da empresa), merece mais peso que um parágrafo de apoio qualquer, sem precisar de um
segundo pull-quote.

## 3. Reduzir o espaço entre o bloco do fundador e o parágrafo da origem

Hoje existe um espaço vertical grande entre o fim do bloco foto+bio (Pedro Henrique) e o início
do parágrafo da origem, fazendo esse parágrafo parecer desconectado do resto — como se fosse um
adendo, não a continuação natural da história. Reduzir esse espaçamento para o equivalente a
`var(--space-8)` (mesma ordem de grandeza do espaço entre outras seções relacionadas da página,
não o espaço usado entre blocos totalmente distintos).

## O que NÃO fazer

- Não mudar nenhuma palavra do copy.
- Não aplicar pull-quote ao parágrafo da origem nem ao parágrafo de bio — só ao fechamento.
- Não adicionar eyebrow/rótulo novo no meio da página — a Sobre continua como narrativa única,
  não uma sequência de seções rotuladas como a Home.
- Não tocar no bloco foto+bio (nome, cargo, parágrafo ao lado da foto) nem no placeholder da foto.

## Ao final do sprint

`npm run build`, testar o pull-quote final em mobile e desktop (confirmar que não estoura a
largura em telas pequenas), conferir visualmente que o parágrafo da origem não ficou mais
"solto" do bloco do fundador, commit `"sprint 10: sobre — fechamento em pull-quote"` e push.
