# Sprint 10b — Correção: Pull-Quote do Fechamento Ficou Pesado Demais

> Correção de um erro de especificação do Sprint 10 (não de execução — o Cursor implementou
> exatamente o que foi pedido). O resultado ficou "grosseiro e amador" (feedback direto do Pedro
> Henrique, com print) porque a frase inteira do fechamento — que tem três cláusulas encadeadas —
> foi ampliada para 64px inteira, virando um bloco de texto gigante e pesado, o oposto do
> objetivo. Correção: tratar isso como um pull-quote de verdade (trecho curto), não como um
> parágrafo inteiro ampliado.

## O que muda

O texto de fechamento (nenhuma palavra muda) se divide exatamente no dois-pontos que ele já tem:

**Pull-quote (fica em `--fs-display`, mas agora só a primeira parte, curta):**
`"É esse olhar — herdado, e agora meu — que guio em cada avaliação."`

**Texto de apoio (volta a ser corpo normal, `--fs-body-lg`, não mais 64px):**
`"Cuidado com o que tem valor, discrição com quem está vivendo um momento difícil, e organização
para que tudo aconteça sem urgência desnecessária."`

## CSS corrigido

```css
.sobre-closing-quote {
  font-family: var(--font-display);
  font-size: var(--fs-display); /* 64px desktop — mas agora só para a frase curta */
  font-variation-settings: var(--fv-display);
  color: var(--cerne-charcoal);
  max-width: 20ch; /* volta ao valor já validado no pull-quote da Home, não 24ch */
  line-height: var(--lh-tight);
}

@media (max-width: 768px) {
  .sobre-closing-quote {
    font-size: var(--fs-h1); /* 48px mobile, sem mudança aqui */
  }
}

.sobre-closing-support {
  font-family: var(--font-sans);
  font-size: var(--fs-body-lg); /* 18px — corpo normal, não display */
  color: var(--cerne-charcoal);
  max-width: 42ch; /* largura de leitura confortável para corpo de texto */
  margin-top: var(--space-5);
}
```

## Por que isso é a correção certa, não só "diminuir o tamanho"

Um pull-quote existe para destacar um trecho curto e de impacto — nunca o parágrafo inteiro. A
frase original já tem a pausa natural certa (o dois-pontos separa a ideia central da lista de
três elementos que a detalha). Usar esse ponto de corte não é editar o texto, é reconhecer uma
divisão que a própria frase já tinha.

## O que NÃO fazer

- Não reescrever nenhuma palavra do texto original.
- Não usar `ch` como unidade de largura em elementos com `font-size` grande sem checar o
  resultado em pixels antes de aprovar — nesta correção, `20ch` a 64px já foi validado
  visualmente na Home (Sprint 8), então é seguro reaproveitar.
- Não aplicar esse ajuste a mais nenhum outro texto da página.

## Ao final do sprint

`npm run build`, conferir visualmente em mobile e desktop que o pull-quote agora ocupa uma altura
proporcional ao resto da página (não deve dominar a tela como antes), commit
`"sprint 10b: corrige pull-quote do fechamento da sobre"` e push.
