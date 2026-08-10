# Sprint 3 — Sobre

> Pré-requisito: Sprints 0, 1 e 2 concluídos. Regras de design e de movimento do
> `sprint-01-home.md` valem integralmente aqui — não repetidas na íntegra.

## Contexto importante

Esta é a página com nomes de pessoas reais (Pedro Henrique, fundador; Alexandre Teixeira de
Souza, seu pai, sócio da Cabral Antiguidades). O texto abaixo já foi revisado e aprovado
palavra por palavra — não parafrasear, resumir ou "melhorar" nada dele.

**Sem link para a Cabral Antiguidades** — cita-se o nome, sem `<a href>`. Não adicionar link
nenhum para site, Instagram ou Google Meu Negócio de terceiros nesta página.

## Estrutura e copy exato

### Intro (estilo hero, escala menor que a Home)

- Eyebrow: `Sobre`
- Título (H1): `Uma curadoria que nasce de outra.`
- Linha de abertura: `A Cerne Curadoria existe porque uma curadoria mais antiga encontrou um
  limite: a de obras de arte e antiguidades. Esta página conta como essa lacuna virou uma nova
  frente de trabalho — e quem cuida dela hoje.`

### Bloco do fundador

Layout: foto à esquerda (ou acima, no mobile), nome/cargo/texto à direita — evitar o padrão
genérico de "avatar circular centralizado + nome centralizado embaixo" (visual de card de
equipe de SaaS). A foto é retangular, sem `border-radius` de destaque (só o `--radius-md` padrão
do sistema, nunca círculo), com margem generosa ao redor, como uma foto de perfil editorial de
revista, não um avatar de produto.

**Placeholder da foto (até o Pedro Henrique enviar a foto real):** um bloco retangular sólido em
`--cerne-charcoal` (mesma proporção que a foto final vai ocupar, ex: 4:5 vertical), sem ícone de
upload nem texto "sem foto" — só a cor sólida, discreta, fácil de substituir depois. Deixar
comentário no código: `// TODO: substituir por foto real do Pedro Henrique antes do lançamento`.
Quando a foto real entrar, tratamento sugerido (documentar como comentário, não implementar
filtro agora): preto e branco ou dessaturada, para conversar com o resto do site sem foto
colorida "solta" no meio de um site tipográfico.

Nome e cargo, acima do parágrafo:
```
Pedro Henrique
Fundador e Curador
```

Parágrafo:
`Sou Pedro Henrique, fundador e curador da Cerne Curadoria. Antes de atuar neste universo,
passei alguns anos no mercado financeiro, com curadoria de projetos emergentes para
investimento — um trabalho de avaliar, selecionar e decidir com cuidado o que faz sentido levar
adiante. É o mesmo princípio que aplico hoje, só que diante do acervo de uma casa inteira, não
de uma carteira de projetos.`

### Bloco da origem (só texto, sem foto/logo de terceiros)

`A Cerne nasce de uma percepção do meu pai, Alexandre Teixeira de Souza, sócio da Cabral
Antiguidades — antiquário carioca dedicado à Pintura Acadêmica Brasileira desde o final dos
anos 90. Ao longo de anos avaliando acervos de arte, ele notou que boa parte das famílias com
quem trabalhava ainda precisava de alguém para cuidar do restante da casa — um espaço que a
curadoria de antiguidades tradicionalmente não alcança. Em vez de continuar indicando esse
trabalho a terceiros, ele me chamou para explorar essa frente por conta própria, com orientação
direta dele. Ele segue presente nas decisões da Cerne e, sempre que faz sentido, participa
pessoalmente de visitas.`

### Fechamento

`É esse olhar — herdado, e agora meu — que guio em cada avaliação: cuidado com o que tem valor,
discrição com quem está vivendo um momento difícil, e organização para que tudo aconteça sem
urgência desnecessária.`

Depois: reutilizar o componente `FinalCta` já usado em Home e Como Funciona (mesmo copy e botão).

## SEO e schema desta página

- `<title>`: `Sobre — Cerne Curadoria`
- `meta description`: `Conheça a origem da Cerne Curadoria: uma nova frente de trabalho nascida
  da curadoria de arte e antiguidades, fundada por Pedro Henrique.`
- Adicionar schema `Person` (em `lib/schema.ts`, reaproveitando os mesmos dados já usados no
  `founder` do schema `Organization` do Sprint 0 — centralizar essa informação numa única
  constante em `lib/constants.ts` para não haver risco de inconsistência entre as duas):
  - `name`: "Pedro Henrique"
  - `jobTitle`: "Fundador e Curador"
  - `worksFor`: referência ao `Organization`
  - `description`: usar o parágrafo do bloco do fundador, resumido em uma frase (não copiar o
    parágrafo inteiro para dentro do schema)
  - `sameAs`: array vazio por enquanto — sem LinkedIn ainda (fica pendente, documentado no
    projeto; quando existir, é só adicionar aqui, nenhum outro lugar do código precisa mudar)
- `BreadcrumbList` (Home → Sobre).

## O que NÃO fazer

- Não adicionar foto nem menção a nenhuma outra pessoa além de Pedro Henrique e Alexandre
  Teixeira de Souza.
- Não linkar para Cabral Antiguidades em nenhum formato (texto, schema `sameAs`, imagem).
- Não usar avatar circular nem qualquer tratamento de "card de equipe" genérico.
- Não implementar o filtro preto-e-branco/dessaturado agora — só documentar a intenção em
  comentário, já que ainda não existe foto real para aplicar o tratamento.

## Ao final do sprint

`npm run build`, conferir que o placeholder da foto tem a proporção certa e fica visualmente
discreto (não deve parecer "quebrado" ou "faltando"), testar responsividade (foto acima do texto
no mobile), commit `"sprint 3: sobre"` e push. Reportar como ficou o layout do bloco do fundador
e se algum ajuste de proporção foi necessário.
