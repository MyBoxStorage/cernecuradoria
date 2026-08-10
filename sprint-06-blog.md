# Sprint 6 — Blog (estrutura vazia, pronta para o primeiro artigo)

> Pré-requisito: Sprints 0-5 concluídos. Regras de design/movimento de `sprint-01-home.md`
> valem aqui também.

## Contexto

Ainda não existe nenhum artigo escrito — este sprint entrega só a estrutura técnica e o estado
vazio da listagem, de forma que publicar o primeiro post no futuro seja só criar um arquivo,
sem precisar mexer em código.

## Sistema de conteúdo (sem CMS)

- Cada post é um arquivo MDX em `content/posts/[slug].mdx`, com frontmatter:
  ```
  title: string
  description: string (para meta description e resumo na listagem)
  date: string (ISO, ex: "2026-09-01")
  author: "Pedro Henrique" | "Alexandre Teixeira de Souza"
  ```
- Criar `lib/posts.ts` com funções para ler todos os posts do diretório, ordenar por data
  (mais recente primeiro), e buscar um post por slug — usadas tanto pela listagem quanto pela
  página individual e pelo `sitemap.ts` (que deve incluir automaticamente cada post publicado).
- Instalar o necessário para processar MDX (`@next/mdx` ou `next-mdx-remote`, à escolha do
  Cursor conforme melhor compatibilidade com Next.js 16 no momento da implementação).

## Rotas

### `/blog` — listagem

- Eyebrow: `Blog` + linha bronze.
- Título (H1): `Notas sobre curadoria, herança e o que fazer com o que fica.`
- **Estado vazio (situação atual, sem nenhum post ainda):** não usar o clichê "Nenhum post
  encontrado, volte em breve!". Em vez disso, um parágrafo curto e editorial:
  `Em breve, este espaço vai reunir reflexões sobre curadoria de espólios, o processo de
  inventário e as decisões que toda família enfrenta ao lidar com os bens de quem se foi. Por
  enquanto, para saber mais sobre como a Cerne funciona, veja `[como funciona o processo]` ou
  `[fale diretamente comigo]`.` (dois links, para `/como-funciona` e `/contato`).
- Quando houver posts: grid de 1 coluna (não cards com sombra/borda pesada — usar só uma linha
  fina de separação em `--border-operacao-subtle` entre um post e outro), cada item com título,
  data, resumo de 1-2 linhas, e "Ler mais →".

### `/blog/[slug]` — post individual

- Estrutura: eyebrow com a data + autor, título (H1), corpo do artigo em tipografia de leitura
  longa (`--font-sans`, `--fs-body`, `line-height` confortável — já definido em
  `--lh-relaxed`), largura máxima de leitura confortável (não a largura total da tela, texto
  corrido não deve passar de ~68-75 caracteres por linha).
- Rodapé do post: nome do autor + (se for o Pedro Henrique) link para `/sobre`.
- Reutilizar o `FinalCta` ao final de cada post.

## SEO e schema

- Cada post gera automaticamente: `<title>`, `meta description` (do frontmatter), schema
  `Article` (ou `BlogPosting`) com `author` referenciando o schema `Person` já existente (do
  Sprint 3) quando o autor for Pedro Henrique — se for o Alexandre Teixeira de Souza assinando
  algum artigo futuro sobre o universo dele, criar um segundo objeto `Person` simples só com
  `name` para esse caso, sem inventar mais dados sobre ele.
- `sitemap.ts` deve incluir `/blog` e cada `/blog/[slug]` publicado automaticamente, lendo do
  mesmo `lib/posts.ts`.
- Adicionar um feed RSS em `app/feed.xml/route.ts`, gerado a partir dos mesmos posts — ajuda
  mecanismos de descoberta de conteúdo (inclusive alguns robôs de IA) a encontrar posts novos
  sem esperar recrawl.
- Atualizar `public/llms.txt` (criado no Sprint 0) adicionando uma seção `## Blog` listando os
  posts existentes (vazio por enquanto, é só deixar a seção pronta na estrutura do arquivo para
  quando o primeiro post existir).

## O que NÃO fazer

- Não escrever nenhum post de exemplo/lorem ipsum "só para preencher" — a listagem vazia bem
  escrita é melhor do que conteúdo falso.
- Não implementar sistema de comentários, curtidas ou compartilhamento social — fora do escopo
  e do tom da marca.
- Não adicionar imagem de capa genérica de banco de imagens nos posts — se um post precisar de
  imagem no futuro, isso é decisão caso a caso, não um campo obrigatório do sistema agora.

## Ao final do sprint

`npm run build`, confirmar que `/blog` renderiza o estado vazio corretamente, confirmar que
`feed.xml` retorna XML válido mesmo sem posts, commit `"sprint 6: blog"` e push.
