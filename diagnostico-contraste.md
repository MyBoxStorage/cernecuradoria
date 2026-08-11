# Diagnóstico — Contraste real (antes de corrigir)

> Não é sprint de correção — só descoberta. A auditoria anterior apontou
> `.footer__col-title` como falha de contraste, mas o cálculo exato (OKLab, feito fora
> deste projeto) mostra que esse elemento passa com folga (~7:1, precisa de 4,5:1).
> A falha é real (confirmada em teste limpo, modo anônimo, Accessibility 96 na Home),
> mas em outro elemento — precisamos saber qual antes de mexer em qualquer CSS.

## O que fazer

1. Rodar Lighthouse (categoria Accessibility) ou `axe-core` nas 4 páginas (Home, Sobre,
   Como Funciona, Contato), em modo anônimo/sem extensão.
2. Para cada falha de `color-contrast` encontrada, reportar: o seletor CSS exato do
   elemento, o texto/página onde ele aparece, a cor de primeiro plano e de fundo
   computadas (valor final renderizado, não a variável CSS), e a razão de contraste
   medida pela ferramenta.
3. Não aplicar nenhuma correção ainda — só trazer o diagnóstico completo de volta.

## Ao final

Reportar a lista de elementos com falha real, um por um, com os dados acima.
