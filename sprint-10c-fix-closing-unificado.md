# Sprint 10c — Correção: Fechamento da Sobre Volta a Ser Bloco Único

> Correção do Sprint 10b. O 10b fragmentou a frase final em pull-quote + legenda pequena — o
> resultado pareceu dois textos órfãos empilhados sem relação visual (feedback do Pedro
> Henrique, com print: "gambiarra amadora"). Diagnóstico correto: pull-quote é técnica pra
> *puxar um trecho* de um texto maior que continua ao redor — mas aqui não existe "resto do
> texto", a frase final já É o pensamento completo. Fragmentar algo que não deveria ser
> fragmentado foi o erro de raiz, não só tamanho ou espaçamento.

## O que já foi corrigido diretamente (Claude aplicou via acesso ao projeto)

- `app/sobre/page.tsx`: o fechamento voltou a ser um único `<blockquote>` com a frase inteira,
  sem quebra no meio.
- `styles/sobre.css`: `.sobre-closing-quote` agora usa `--fs-h1` (48px, não mais os 64px do
  `--fs-display`) com `font-variation-settings: var(--fv-deck)` (corte "deck" da Fraunces —
  opsz 40/wght 400, o corte que o próprio sistema já tinha pronto pra texto de destaque
  intermediário, nunca usado até agora) e `max-width: 34ch`. Mobile usa `--fs-h2` (36px).
  Classe `.sobre-closing-support` (órfã, do 10b) foi removida.

## O que o Cursor precisa fazer agora

1. Puxar as mudanças mais recentes do repositório (`git pull`) para sincronizar com os edits
   acima, feitos diretamente nos arquivos do projeto.
2. Rodar `npm run build` e confirmar que passa limpo.
3. Testar visualmente em mobile e desktop: o fechamento deve aparecer como um bloco de texto
   único, coerente, em tamanho intermediário — nem do tamanho do corpo normal, nem do tamanho do
   título de herói da página.
4. Commit `"sprint 10c: sobre — fechamento unificado, corte deck"` e push.

## O que NÃO fazer

- Não fragmentar o texto de novo.
- Não usar `--fs-display` (64px) nem `--fv-display` neste elemento — é intencionalmente mais
  discreto que um título de herói.
- Não reescrever nenhuma palavra do texto.
