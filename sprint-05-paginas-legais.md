# Sprint 5 — Páginas Legais (Política de Privacidade e Termos de Uso)

> Pré-requisito: Sprints 0-4 concluídos. Estas páginas já existem como placeholder desde o
> Sprint 0, ocultas da navegação por `SITE_LAUNCHED = false`. Este sprint escreve o conteúdo
> real — continuam ocultas até o Pedro Henrique liberar.

## Contexto importante

O CNPJ da Cerne Curadoria ainda não está formalizado. Todo campo que dependeria dele
(razão social completa, número do CNPJ, endereço fiscal) deve usar o placeholder exato
`[a preencher após a formalização do CNPJ]` — não inventar nem deixar em branco silenciosamente,
para ficar óbvio o que falta antes da ativação do site.

Tom: mais neutro e procedural do que o resto do site (é natural em página legal), mas sem soar
frio ou hostil — ainda é a Cerne falando.

## Política de Privacidade (`app/politica-de-privacidade/page.tsx`)

Título (H1): `Política de Privacidade`
Subtítulo: `Última atualização: [data do lançamento]`

**1. Quem somos**
`A Cerne Curadoria, [a preencher após a formalização do CNPJ], é responsável pelo tratamento dos
dados pessoais coletados neste site.`

**2. Quais dados coletamos**
`Quando você preenche o formulário de contato, coletamos: nome, telefone/WhatsApp, bairro do
imóvel, e as respostas sobre o momento do processo e o perfil do acervo. Também usamos cookies
de análise (Google Analytics e Vercel Analytics) para entender como o site é usado, só depois do
seu consentimento no banner de cookies.`

**3. Para que usamos esses dados**
`Usamos os dados do formulário exclusivamente para entrar em contato e conduzir a avaliação
inicial do seu caso. Usamos os dados de navegação (cookies) para melhorar o site. Não vendemos
nem compartilhamos seus dados com terceiros para fins de marketing.`

**4. Com quem compartilhamos**
`Os dados do formulário passam pelo Resend, serviço técnico responsável por entregar o e-mail
até nós — ele não usa esses dados para nenhum outro fim. Os dados de navegação passam pelo
Google Analytics e pela Vercel Analytics, sob as políticas de privacidade dessas empresas.`

**5. Por quanto tempo guardamos**
`Guardamos os dados do formulário pelo tempo necessário para conduzir a avaliação e, se você se
tornar cliente, pelo prazo exigido para a prestação do serviço. Você pode pedir a exclusão a
qualquer momento (ver item 7).`

**6. Cookies**
`Usamos cookies essenciais (para lembrar sua escolha no banner de consentimento) e cookies de
análise (só após seu aceite). Você pode recusar os cookies de análise sem prejuízo ao uso do
site.`

**7. Seus direitos**
`Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode a qualquer momento
solicitar acesso, correção ou exclusão dos seus dados, e revogar seu consentimento. Para isso,
entre em contato pelo WhatsApp [placeholder] ou pelo e-mail [a preencher].`

**8. Contato**
`Dúvidas sobre esta política podem ser enviadas para [e-mail a preencher após ativação].`

## Termos de Uso (`app/termos-de-uso/page.tsx`)

Título (H1): `Termos de Uso`
Subtítulo: `Última atualização: [data do lançamento]`

**1. Aceitação**
`Ao usar este site, você concorda com estes termos. Se não concordar, pedimos que não utilize o
site.`

**2. Sobre o conteúdo do site**
`As informações aqui, incluindo a descrição do processo de curadoria e leilão, são de caráter
geral e informativo. As condições específicas de cada caso — prazos, valores, cláusulas — são
definidas individualmente em contrato, após conversa direta com a Cerne Curadoria.`

**3. Formulário de contato**
`O envio do formulário não gera nenhum compromisso ou contrato entre as partes. Ele é o início
de uma conversa, sujeita a avaliação e aceite mútuo antes de qualquer serviço começar.`

**4. Propriedade intelectual**
`Todo o conteúdo deste site — textos, identidade visual, tipografia — pertence à Cerne
Curadoria, [a preencher após a formalização do CNPJ], e não pode ser reproduzido sem
autorização.`

**5. Limitação de responsabilidade**
`Fazemos o possível para manter as informações deste site atualizadas e corretas, mas não
garantimos ausência total de erros. Nenhuma informação aqui substitui a avaliação individual de
cada caso.`

**6. Alterações**
`Estes termos podem ser atualizados a qualquer momento. A data no topo desta página indica a
última revisão.`

**7. Legislação aplicável**
`Estes termos são regidos pelas leis brasileiras, com foro na comarca do Rio de Janeiro/RJ para
resolução de eventuais conflitos.`

**8. Contato**
`Dúvidas sobre estes termos podem ser enviadas para [e-mail a preencher após ativação].`

## SEO destas páginas

- Ambas com `<meta name="robots" content="noindex, follow" />` — não devem ser indexadas pelo
  Google enquanto forem páginas de apoio, mesmo depois do lançamento (páginas legais raramente
  precisam competir por ranqueamento; o importante é existirem e serem linkáveis, não
  ranquearem).
- Não precisam de schema estruturado.
- Não entram no `sitemap.ts`.

## O que NÃO fazer

- Não preencher CNPJ, e-mail ou telefone reais que ainda não existem — usar exatamente os
  placeholders indicados.
- Não adicionar essas páginas à NavBar nem ao Footer visível (continuam controladas por
  `SITE_LAUNCHED`).
- Não estilizar essas páginas de forma diferente do restante do site — mesmo sistema tipográfico
  e de espaçamento, só com hierarquia mais simples (título + itens numerados, sem seções
  decorativas).

## Ao final do sprint

`npm run build`, confirmar que as duas páginas são acessíveis por URL direta mas não aparecem em
nenhum link visível do site, confirmar a tag `noindex`, commit `"sprint 5: páginas legais"` e
push.
