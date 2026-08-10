# Sprint 9b — Correção: linha de pontos quebrando em duas linhas

> Bug encontrado no resultado do Sprint 9 (screenshot anexado pelo Pedro Henrique): a linha de
> pontos gerada em `.leader::after` está quebrando e sobrando uma segunda linha de pontos
> pendurada abaixo de cada item. Causa: a especificação original não tinha `white-space: nowrap`
> nem posicionamento absoluto — o navegador tenta quebrar a string longa de pontos como texto
> normal antes do `overflow: hidden` conseguir cortar. Correção abaixo, testada contra a técnica
> de referência (CSS-Tricks, "A Perfect Table of Contents").

## CSS corrigido (substituir o `.leader` e `.leader::after` do Sprint 9 por isto)

```css
.area-list-item .leader {
  position: relative; /* necessário para o ::after absoluto funcionar */
  flex: 1;
  overflow: hidden;
  margin-inline: 0.5ch;
  height: 1.2em; /* mesma altura da linha de texto, evita a caixa esticar */
}

.area-list-item .leader::after {
  position: absolute;
  inset: 0;
  white-space: nowrap; /* impede a quebra de linha que causou o bug */
  content: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .";
  color: var(--cerne-bronze);
  letter-spacing: 0.15em;
}
```

A mudança essencial: `position: absolute` no `::after` (tira do fluxo normal, não empurra
altura) + `white-space: nowrap` (garante que a string nunca quebra, só é cortada pelo
`overflow: hidden` do container `.leader`, que precisa de `position: relative` para o absolute
funcionar corretamente).

## Ao final

`npm run build`, conferir visualmente nas mesmas 3 larguras já testadas no Sprint 9 (375px,
768px, 1440px) que não sobra nenhuma linha de pontos extra em nenhum item das duas colunas,
commit `"sprint 9b: corrige quebra da linha de pontos"` e push.
