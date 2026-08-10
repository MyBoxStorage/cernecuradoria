# Sprint 7b — Otimização de fontes (ajuste pontual)

> Sprint pequeno, gerado a partir do resultado do Lighthouse do Sprint 7 (LCP mobile em 5.6s no
> lab, provavelmente inflado por CPU throttling + fontes servidas sem CDN em ambiente local —
> mas a causa real que vale corrigir mesmo assim é o formato dos arquivos de fonte).

## O que fazer

1. Converter os arquivos de fonte usados via `next/font/local` de `.ttf`/`.otf` para `.woff2`
   (30-50% menor no mesmo conteúdo, formato padrão para web desde muito tempo). Ferramentas como
   `fonttools`/`woff2` (Python) ou conversores online confiáveis servem — o resultado precisa
   preservar os eixos variáveis da Fraunces (`opsz`, `wght`) intactos, não é uma conversão
   trivial de "achatar" a fonte.
2. Confirmar que só o corte de fonte realmente usado acima da dobra (hero da Home) tem
   `preload: true` na configuração do `next/font/local` — os demais pesos/estilos carregam sob
   demanda, sem preload.
3. Se a Fraunces variável (com todos os eixos) ainda pesar muito mesmo em `.woff2`, considerar
   usar `font-variation-settings` fixo só nas poucas combinações que o site realmente usa
   (`--fv-display`, `--fv-deck`, `--fv-text`, `--fv-condensed`, já definidas em
   `typography.css`) em vez de expor o intervalo completo de variação — reduz o que o navegador
   precisa processar, sem mudar a aparência final em nada.

## Ao final

`npm run build`, rodar Lighthouse mobile de novo e comparar o LCP antes/depois, commit
`"sprint 7b: otimização de fontes"` e push. Reportar o número novo de LCP mobile.
